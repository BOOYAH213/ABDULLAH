(() => {
  // Render the widget even if Supabase is unavailable; FAQ replies work locally.
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

  const widget = text("div", "chat-widget");
  const toggle = text("button", "chat-toggle", "اسألني");
  toggle.type = "button";
  toggle.setAttribute("aria-expanded", "false");
  const panel = text("section", "chat-panel");
  panel.hidden = true;
  panel.setAttribute("aria-label", "محادثة المساعد");
  const header = text("div", "chat-head", "مساعد عبدالله");
  const messages = text("div", "chat-messages");
  messages.setAttribute("aria-live", "polite");
  const notice = text("div", "chat-notice", "قد تُحفظ رسائلك ليتمكن صاحب الموقع من مراجعتها. لا ترسل معلومات حساسة.");
  const status = text("div", "chat-status");
  const form = text("form", "chat-form");
  const input = document.createElement("input");
  input.type = "text";
  input.maxLength = 1000;
  input.placeholder = "اكتب سؤالك...";
  input.setAttribute("aria-label", "اكتب سؤالك");
  const send = text("button", "", "إرسال");
  send.type = "submit";
  form.append(input, send);
  panel.append(header, messages, notice, status, form);
  widget.append(toggle, panel);
  document.body.appendChild(widget);

  const addMessage = (who, value) => {
    messages.appendChild(text("div", `chat-message ${who}`, value));
    messages.scrollTop = messages.scrollHeight;
  };
  addMessage("bot", "أهلًا! اسألني عن خدمات عبدالله أو مشاريعه أو طريقة التواصل.");
  toggle.addEventListener("click", () => {
    panel.hidden = !panel.hidden;
    toggle.setAttribute("aria-expanded", String(!panel.hidden));
    if (!panel.hidden) input.focus();
  });

  function replyTo(question) {
    const q = question.toLocaleLowerCase().replace(/[؟?!.،,]/g, " ");
    if (/مشروع|المشاريع|اعمال|أعمال|portfolio|project/.test(q)) return "تقدر تشوف المشاريع المنشورة في قسم «المشاريع» بالموقع. إذا كان عندك سؤال عن مشروع محدد، اذكر اسمه.";
    if (/خدمات|تطوير|موقع|website|service|web/.test(q)) return "عبدالله يعمل في تطوير المواقع وتجربة المستخدم، ويركز أيضًا على أساسيات الأمن السيبراني وحماية التطبيقات.";
    if (/تواصل|اتصال|ايميل|إيميل|بريد|contact|email/.test(q)) return "انزل إلى قسم «التواصل» في الموقع واستخدم وسائل التواصل الموجودة هناك.";
    if (/امن|أمن|سيبر|حماي|cyber|security/.test(q)) return "يركز عبدالله على مفاهيم الأمن السيبراني وتقييم الأمان وحماية الأنظمة والتطبيقات. أرسل تفاصيل استفسارك عبر قسم التواصل.";
    if (/مرحبا|مرحب|اهلا|أهلا|سلام|hello|hi\b/.test(q)) return "أهلًا وسهلًا! كيف أقدر أساعدك؟ اسألني عن الخدمات أو المشاريع أو التواصل.";
    return "ما عندي جواب دقيق لهذا السؤال الآن. اكتب تفاصيل أكثر أو تواصل مع عبدالله من قسم «التواصل» في الموقع.";
  }

  let lastSentAt = 0;
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const question = input.value.trim();
    if (!question || question.length > 1000) return;
    const now = Date.now();
    if (now - lastSentAt < 1200) return;
    lastSentAt = now;
    input.value = "";
    addMessage("visitor", question);
    const answer = replyTo(question);
    addMessage("bot", answer);
    status.textContent = "";
    if (!client) return;
    const { error } = await client.from("chat_inquiries").insert({ visitor_id: visitorId, question, answer });
    if (error) status.textContent = "تعذر حفظ المحادثة. شغّل supabase/chatbot.sql في Supabase.";
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
      const { data, error } = await client.from("chat_inquiries").select("question,answer,created_at").order("created_at", { ascending: false }).limit(100);
      if (error) { message.textContent = "تعذر تحميلها. تأكد من تشغيل supabase/chatbot.sql في Supabase."; return; }
      message.textContent = data.length ? `آخر ${data.length} استفسارًا` : "لا توجد محادثات بعد.";
      for (const item of data) {
        const entry = text("article", "chat-log-entry");
        entry.append(text("time", "", new Date(item.created_at).toLocaleString()), text("p", "", `الزائر: ${item.question}`), text("p", "", `البوت: ${item.answer}`));
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
