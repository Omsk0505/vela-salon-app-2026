/** Cloudflare Worker entry point for the vinext-starter template. */
// Telegram credentials are preserved by the Cloudflare build deploy command.
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
  AI?: { run(model: string, input: { messages: Array<{ role: string; content: string }>; temperature?: number; max_tokens?: number }): Promise<{ response?: string }> };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // Handle Telegram setup at the Worker boundary so production secrets are
    // read from the actual Cloudflare binding passed to this Worker.
    if (url.pathname === "/api/telegram/setup") {
      const token = (env as Env & { TELEGRAM_BOT_TOKEN?: string }).TELEGRAM_BOT_TOKEN;
      if (!token) {
        return Response.json({ error: "TELEGRAM_BOT_TOKEN is not configured" }, { status: 503 });
      }
      const webhookUrl = new URL("/api/telegram/webhook", request.url).toString();
      const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/setWebhook`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url: webhookUrl, allowed_updates: ["message"] }),
      });
      const result = (await telegramResponse.json()) as { ok?: boolean; description?: string };
      const ok = result.ok === true;
      return Response.json({ ok, description: result.description ?? null, webhookUrl }, { status: ok ? 200 : 502 });
    }

    // Keep the AI call at the Worker boundary so the Cloudflare binding is
    // always the real production binding, even when the route adapter hides it.
    if (url.pathname === "/api/assistant" && request.method === "POST") {
      const body = await request.json().catch(() => null) as { messages?: Array<{ role: string; content: string }> } | null;
      const messages = Array.isArray(body?.messages) ? body.messages.slice(-12) : [];
      if (!messages.length) return Response.json({ error: "Сообщение не передано" }, { status: 400 });
      if (!env.AI) return Response.json({ error: "Workers AI binding не настроен" }, { status: 503 });
      const system = { role: "system", content: "Ты — живой ИИ-администратор VELA. Отвечай по-русски естественно и кратко. Уточняй услугу, дату, время и мастера; не выдумывай свободные окна и не подтверждай запись без проверки расписания." };
      try {
        const result = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", { messages: [system, ...messages], temperature: 0.4, max_tokens: 220 });
        return result.response?.trim() ? Response.json({ reply: result.response.trim() }) : Response.json({ error: "ИИ не вернул ответ" }, { status: 502 });
      } catch (error) {
        return Response.json({ error: `Workers AI: ${error instanceof Error ? error.message : String(error)}` }, { status: 502 });
      }
    }

      if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
      }

      // Make the live Worker environment available to Vinext route handlers.
      // Some runtime paths expose an empty `cloudflare:workers` env proxy.
      (globalThis as typeof globalThis & { __VELA_ENV?: Env }).__VELA_ENV = env;
      return handler.fetch(request, env, ctx);
  },
};

export default worker;
