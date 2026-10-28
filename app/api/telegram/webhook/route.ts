import { env } from "cloudflare:workers";

type TelegramUpdate = {
  message?: {
    chat?: { id?: number };
    text?: string;
    from?: { first_name?: string };
  };
};

export async function GET() {
  return Response.json({ ok: true, service: "vela-telegram-webhook" });
}

export async function POST(request: Request) {
  const runtimeEnv = ((globalThis as typeof globalThis & { __VELA_ENV?: Record<string, unknown> }).__VELA_ENV ?? env) as Record<string, unknown>;
  const token = runtimeEnv.TELEGRAM_BOT_TOKEN ?? process.env.TELEGRAM_BOT_TOKEN;
  if (typeof token !== "string" || !token) {
    return Response.json({ error: "Telegram token is not configured" }, { status: 503 });
  }

  const update = (await request.json()) as TelegramUpdate;
  const chatId = update.message?.chat?.id;
  if (typeof chatId !== "number") return Response.json({ ok: true });

  const name = update.message?.from?.first_name || "друг";
  const text = update.message?.text?.toLowerCase() || "";
  const reply = text.includes("стоп")
    ? "Хорошо, больше не буду присылать сообщения. Напишите «старт», чтобы возобновить."
    : `Здравствуйте, ${name}! Я VELA — помощник салона.\n\nНапишите услугу и желаемый день, например: «маникюр завтра вечером».`;

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text: reply }),
  });

  return Response.json({ ok: true });
}
