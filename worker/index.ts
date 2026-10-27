/** Cloudflare Worker entry point for the vinext-starter template. */
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
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/telegram/setup") {
      const token = (env as Env & { TELEGRAM_BOT_TOKEN?: string }).TELEGRAM_BOT_TOKEN;
      if (!token) {
        return Response.json({ error: "TELEGRAM_BOT_TOKEN is not configured" }, { status: 503 });
      }
      const webhookUrl = new URL("/api/telegram/webhook", request.url).toString();
      const telegramResponse = await fetch("https://api.telegram.org/bot" + token + "/setWebhook", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url: webhookUrl, allowed_updates: ["message"] }),
      });
      const result = (await telegramResponse.json()) as { ok?: boolean; description?: string };
      const ok = result.ok === true;
      return Response.json({ ok, description: result.description ?? null, webhookUrl }, { status: ok ? 200 : 502 });
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

    return handler.fetch(request, env, ctx);
  },
};

export default worker;
