// Supabase project settings (Project Settings > API). The publishable/anon key is
// intended for browser use; database access must be protected by the RLS policies
// in supabase/schema.sql. Never put a service_role or secret key here.
window.SUPABASE_URL = "https://qtrmgbpwlvubqqrpbqkr.supabase.co";
window.SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0cm1nYnB3bHZ1YnFxcnBicWtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ4MzkwODcsImV4cCI6MjExMDQxNTA4N30.oqCvWhcIfyOpeEthT35GBQ8McVLndmOw41NRnUU9nXA";

// Explicit GitHub Pages project paths avoid loading the assets from the wrong URL.
const chatbotStyles = document.createElement("link");
chatbotStyles.rel = "stylesheet";
chatbotStyles.href = "/ABDULLAH/chatbot.css?v=4";
document.head.appendChild(chatbotStyles);

const chatbotScript = document.createElement("script");
chatbotScript.src = "/ABDULLAH/chatbot.js?v=4";
chatbotScript.async = false;
chatbotScript.onerror = () => console.error("Chatbot failed to load:", chatbotScript.src);
document.body.appendChild(chatbotScript);
