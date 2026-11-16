// Supabase project settings (Project Settings > API). The publishable/anon key is
// intended for browser use; database access must be protected by the RLS policies
// in supabase/schema.sql. Never put a service_role or secret key here.
window.SUPABASE_URL = "https://qtrmgbpwlvubqqrpbqkr.supabase.co";
window.SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0cm1nYnB3bHZ1YnFxcnBicWtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ4MzkwODcsImV4cCI6MjExMDQxNTA4N30.oqCvWhcIfyQpeEthT35GBQ8McVLndmOw41NRnUU9nXA";

// Load the FAQ chatbot on the published site.
const chatbotStyles = document.createElement("link");
chatbotStyles.rel = "stylesheet";
chatbotStyles.href = "chatbot.css?v=2";
document.head.appendChild(chatbotStyles);
const chatbotScript = document.createElement("script");
chatbotScript.src = "chatbot.js?v=2";
document.body.appendChild(chatbotScript);
