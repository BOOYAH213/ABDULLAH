// Supabase Edge Function: secure Gemini-backed website chat.
// Deploy this function to the Supabase project and set GEMINI_API_KEY as a secret.
const corsHeaders = {
  "Access-Control-Allow-Origin": "https://booyah213.github.io",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json; charset=utf-8",
};

Deno.serve(async (request: Request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const origin = request.headers.get("origin");
  if (origin && origin !== "https://booyah213.github.io" && origin !== "http://localhost:8000") {
    return json({ error: "Origin not allowed" }, 403);
  }

  const apiKey = Deno.env.get("GEMINI_API_KEY");
  if (!apiKey) return json({ error: "Gemini is not configured" }, 503);

  try {
    const body = await request.json();
    const question = typeof body?.question === "string" ? body.question.trim().slice(0, 1000) : "";
    if (!question) return json({ error: "Please provide a question" }, 400);
    const incoming = Array.isArray(body?.history) ? body.history.slice(-10) : [];
    const history = incoming
      .filter((item: unknown) => item && typeof item === "object")
      .map((item: { role?: unknown; text?: unknown }) => ({
        role: item.role === "model" ? "model" : "user",
        parts: [{ text: typeof item.text === "string" ? item.text.slice(0, 2000) : "" }],
      }))
      .filter((item: { parts: { text: string }[] }) => item.parts[0].text.length > 0);

    const model = Deno.env.get("GEMINI_MODEL") || "gemini-2.5-flash";
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: "You are a helpful general-purpose AI assistant on Abdullah's portfolio website. Answer a wide variety of questions, not just questions about the website. Reply in the language used by the visitor, be clear and respectful, and say when you are uncertain. For questions about Abdullah, only use information present on the portfolio website; do not invent personal details. Do not claim to be Gemini; introduce yourself as the website's AI assistant." }],
        },
        contents: [...history, { role: "user", parts: [{ text: question }] }],
        generationConfig: { maxOutputTokens: 700, temperature: 0.7 },
      }),
    });
    const result = await response.json();
    if (!response.ok) {
      console.error("Gemini API returned", response.status, result?.error?.message);
      return json({ error: "AI provider request failed" }, 502);
    }
    const answer = result?.candidates?.[0]?.content?.parts
      ?.map((part: { text?: string }) => part.text || "")
      .join("")
      .trim();
    if (!answer) return json({ error: "No answer returned" }, 502);
    return json({ answer });
  } catch (error) {
    console.error("Chat function error:", error);
    return json({ error: "Invalid request or temporary service error" }, 500);
  }
});

function json(body: Record<string, string>, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: corsHeaders });
}
