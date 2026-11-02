import { NextRequest } from "next/server";

type ChatMessage = { role: "user" | "assistant" | "system"; content: string };

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as { messages?: ChatMessage[] } | null;
  const messages = Array.isArray(body?.messages) ? body.messages.slice(-12) : [];
  if (!messages.length) return Response.json({ error: "Сообщение не передано" }, { status: 400 });
  const runtime = (globalThis as typeof globalThis & { __VELA_ENV?: Record<string, unknown> }).__VELA_ENV ?? {};
  const ai = runtime.AI as { run?: (model: string, input: unknown) => Promise<{ response?: string }> } | undefined;
  const system: ChatMessage = { role: "system", content: "Ты — ИИ-администратор VELA, сервиса записи клиентов. Отвечай только на русском языке, естественно, доброжелательно и кратко. Твоя главная цель — помочь клиенту записаться: выясни услугу, желаемую дату, удобное время и мастера, затем подведи к подтверждению записи. Можно обсуждать только услуги, цены, мастеров, расписание, адрес, подготовку к визиту и отмену или перенос записи. Если клиент уходит в постороннюю тему, вежливо скажи, что ты помогаешь с записью, и задай следующий вопрос для оформления визита. Не выдумывай услуги, цены, свободные окна или подтверждение записи: если данных нет, честно скажи, что администратору нужно проверить расписание. Задавай максимум один понятный вопрос за сообщение. Не используй английские слова и фразы." };
  if (ai?.run) {
    const result = await ai.run("@cf/meta/llama-3.2-3b-instruct", { messages: [system, ...messages], temperature: 0.4, max_tokens: 220 });
    if (result.response?.trim()) return Response.json({ reply: result.response.trim() });
  }
  const apiKey = String(runtime.AI_API_KEY ?? runtime.OPENAI_API_KEY ?? "");
  const baseUrl = String(runtime.AI_BASE_URL ?? "https://api.openai.com/v1").replace(/\/$/, "");
  if (!apiKey) return Response.json({ error: "AI_API_KEY не настроен на сервере" }, { status: 503 });
  const response = await fetch(`${baseUrl}/chat/completions`, { method: "POST", headers: { "content-type": "application/json", authorization: `Bearer ${apiKey}` }, body: JSON.stringify({ model: String(runtime.AI_MODEL ?? "gpt-4o-mini"), messages: [system, ...messages], temperature: 0.4, max_tokens: 220 }) });
  const payload = (await response.json().catch(() => null)) as { choices?: Array<{ message?: { content?: string } }>; error?: { message?: string } } | null;
  if (!response.ok) return Response.json({ error: payload?.error?.message ?? "AI-сервис временно недоступен" }, { status: 502 });
  const text = payload?.choices?.[0]?.message?.content?.trim();
  if (!text) return Response.json({ error: "ИИ не вернул ответ" }, { status: 502 });
  return Response.json({ reply: text });
}
