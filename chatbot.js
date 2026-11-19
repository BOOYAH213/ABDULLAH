(() => {
  const url = window.SUPABASE_URL;
  const key = window.SUPABASE_ANON_KEY;
  const supabaseLib = window.supabase;
  const client = supabaseLib && url && key && !url.startsWith("YOUR_") && !key.startsWith("YOUR_")
    ? supabaseLib.createClient(url, key)
    : null;

  const text = (tag, className, value) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (value) node.textContent = value;
    return node;
  };
  const visitorId = (() => {
    try {
      const storageKey = "abdullahChatVisitorId";
      let id = localStorage.getItem(storageKey);
      if (!id) {
        id = globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
        localStorage.setItem(storageKey, id);
      }
      return id;
    } catch { return `${Date.now()}-${Math.random().toString(36).slice(2)}`; }
  })();

  let toggle = document.getElementById("chatToggle");
  let panel = document.getElementById("chatPanel");
  let messages = document.getElementById("chatMessages");
  let form = document.getElementById("chatForm");
  let input = document.getElementById("chatInput");
  let status;

  if (!toggle || !panel || !messages || !form || !input) {
    const widget = text("div", "chat-widget");
    toggle = text("button", "chat-toggle", "اسألني");
    toggle.id = "chatToggle";
    toggle.type = "button";
    panel = text("section", "chat-panel");
    panel.id = "chatPanel";
    panel.hidden = true;
    panel.appendChild(text("div", "chat-head", "مساعد عبدالله"));
    messages = text("div", "chat-messages");
    messages.id = "chatMessages";
    panel.appendChild(messages);
    form = text("form", "chat-form");
    form.id = "chatForm";
    input = document.createElement("input");
    input.id = "chatInput";
    input.maxLength = 1000;
    input.placeholder = "اسألني أي شيء...";
    const send = text("button", "", "إرسال");
    send.type = "submit";
    form.append(input, send);
    panel.appendChild(form);
    widget.append(panel, toggle);
    document.body.appendChild(widget);
  }

  // Detach the old FAQ-only click handler embedded in index.html.
  const replacementToggle = toggle.cloneNode(true);
  toggle.replaceWith(replacementToggle);
  toggle = replacementToggle;

  // Remove any older FAQ-only submit handler already attached by a previous version.
  const replacementForm = form.cloneNode(true);
  form.replaceWith(replacementForm);
  form = replacementForm;
  input = form.querySelector("input");
  input.maxLength = 1000;
  input.placeholder = "اسألني أي شيء...";
  input.setAttribute("aria-label", "اكتب رسالتك للمساعد");
  const send = form.querySelector('button[type="submit"]') || form.querySelector("button");
  status = panel.querySelector(".chat-status");
  if (!status) {
    status = text("div", "chat-status");
    panel.insertBefore(status, form);
  }
  if (!panel.querySelector(".chat-notice")) {
    panel.insertBefore(text("div", "chat-notice", "قد تُحفظ رسائلك لمراجعتها. لا ترسل معلومات حساسة."), status);
  }

  const addMessage = (who, value) => {
    const message = text("div", `chat-message ${who}`, value);
    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
  };
  if (!messages.children.length) {
    addMessage("bot", "أهلًا! أنا مساعد ذكي. اسألني أي شيء، وسأحاول مساعدتك.");
  }

  toggle.addEventListener("click", () => {
    panel.hidden = !panel.hidden;
    toggle.setAttribute("aria-expanded", String(!panel.hidden));
    if (!panel.hidden) input.focus();
  });

  const history = [];
  let lastSentAt = 0;
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const question = input.value.trim();
    if (!question || question.length > 1000 || send?.disabled) return;
    if (Date.now() - lastSentAt < 1000) return;
    lastSentAt = Date.now();
    input.value = "";
    addMessage("visitor", question);
    if (!client) {
      addMessage("bot", "المساعد غير جاهز حاليًا. يرجى المحاولة لاحقًا.");
      return;
    }

    send.disabled = true;
    status.textContent = "جارٍ تجهيز الرد...";
    try {
      const { data, error } = await client.functions.invoke("chat", {
        body: { question, history: history.slice(-10) }
      });
      if (error) throw error;
      const answer = typeof data?.answer === "string" && data.answer.trim()
        ? data.answer.trim()
        : "لم أتمكن من تجهيز رد مناسب. جرّب صياغة السؤال بطريقة أخرى.";
      history.push({ role: "user", text: question }, { role: "model", text: answer });
      addMessage("bot", answer);
      status.textContent = "";
      const { error: saveError } = await client.from("chat_inquiries").insert({ visitor_id: visitorId, question, answer });
      if (saveError) status.textContent = "الرد يعمل، لكن لم يُحفظ السجل. شغّل supabase/chatbot.sql في Supabase.";
    } catch (error) {
      console.error("Chat assistant error:", error);
      addMessage("bot", "تعذر الوصول للمساعد الآن. تأكد من نشر دالة الذكاء الاصطناعي وإعداد Gemini API key في Supabase.");
      status.textContent = "";
    } finally {
      send.disabled = false;
      input.focus();
    }
  });

  function addAdminTranscript() {
    const dashboard = document.getElementById("dashboardPanel");
    if (!dashboard || !client || document.getElementById("chatAdminTranscript")) return;
    const section = text("section", "chat-admin");
    section.id = "chatAdminTranscript";
    section.appendChild(text("h4", "", "استفسارات الزوار مع البوت"));
    const refresh = text("button", "", "تحديث المحادثات");
    refresh.type = "button";
    const list = text("div", "chat-log-list");
    const message = text("p", "chat-status");
    section.append(refresh, message, list);
    dashboard.appendChild(section);
    const load = async () => {
      message.textContent = "جارٍ تحميل المحادثات...";
      list.replaceChildren();
      const { data, error } = await client.from("chat_inquiries")
        .select("question,answer,created_at")
        .order("created_at", { ascending: false })
        .limit(100);
      if (error) { message.textContent = "تعذر تحميلها. شغّل supabase/chatbot.sql في Supabase."; return; }
      message.textContent = data.length ? `آخر ${data.length} استفسارًا` : "لا توجد محادثات بعد.";
      for (const item of data) {
        const entry = text("article", "chat-log-entry");
        entry.append(
          text("time", "", new Date(item.created_at).toLocaleString()),
          text("p", "", `الزائر: ${item.question}`),
          text("p", "", `المساعد: ${item.answer}`)
        );
        list.appendChild(entry);
      }
    };
    refresh.addEventListener("click", load);
    load();
  }

  if (client) {
    client.auth.getSession().then(({ data }) => { if (data.session) addAdminTranscript(); });
    client.auth.onAuthStateChange((_event, session) => {
      if (session) addAdminTranscript();
      else document.getElementById("chatAdminTranscript")?.remove();
    });
    document.getElementById("adminToggle")?.addEventListener("click", () => {
      client.auth.getSession().then(({ data }) => { if (data.session) addAdminTranscript(); });
    });
  }
})();
