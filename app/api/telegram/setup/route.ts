import { env } from "cloudflare:workers";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const token = (env as unknown as Record<string, unknown>).TELEGRAM_BOT_TOKEN ?? process.env.TELEGRAM_BOT_TOKEN;

  if (typeof token !== "string" || !token) {
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

  return Response.json(
    { ok, description: result.description ?? null, webhookUrl },
    { status: ok ? 200 : 502 },
  );
}
