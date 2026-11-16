# Gemini AI chatbot setup

The website chat calls a Supabase Edge Function so the Gemini API key is never included in browser code or committed to GitHub.

1. Create a Gemini API key in Google AI Studio. Keep it private; do not paste it into this repository, the website, or a chat message.
2. In the Supabase project connected to this site, deploy `supabase/functions/chat/index.ts` as an Edge Function named `chat`.
3. In Supabase Edge Function secrets, add `GEMINI_API_KEY` with your key. Optionally add `GEMINI_MODEL`; the function defaults to `gemini-2.5-flash`.
4. In Supabase SQL Editor, run `supabase/chatbot.sql` once if you want to store visitor questions and answers for the dashboard.
5. Wait for the function deployment, then refresh the website. A Google AI plan, usage limits, and possible charges may apply; set budget/quotas in Google AI Studio/Cloud.

Never put a Gemini API key or Supabase service-role key in `index.html`, `chatbot.js`, or any public frontend file.
