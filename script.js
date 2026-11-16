const LANG_KEY = "abdullahPortfolioLang";
const translations = {
  ar: {
    navAbout: "من أنا", navSkills: "المهارات", navProjects: "المشاريع", navContact: "التواصل", navAdmin: "لوحة التحكم",
    heroTag: "الأمن السيبراني • تطوير المواقع", heroName: "عبدالله", heroRole: "Cybersecurity & Web Developer",
    heroText: "أعمل على بناء تجارب رقمية آمنة، فعّالة، واحترافية من خلال دمج الأمن السيبراني مع تصميم المواقع وتطوير الحلول التقنية.",
    viewProjects: "استعراض المشاريع", contactMe: "تواصل معي", statFocus: "تركيز على الحماية", statDevelopment: "تطوير المواقع", statBilingual: "موقع بلغتين",
    aboutEyebrow: "من أنا", aboutTitle: "مطور مواقع وأمن سيبراني", aboutText1: "أنا عبدالله، أعمل على الدمج بين الأمن السيبراني وتطوير الواجهات الرقمية لبناء منصات آمنة وسريعة ومريحة للمستخدم.",
    aboutText2: "أركز على حماية الأنظمة، تطوير المواقع، وتحسين تجربة المستخدم من خلال حلول تقنية فعالة ومتقدمة.", skillsEyebrow: "المهارات", skillsTitle: "ما الذي أقدمه؟",
    skill1Title: "الأمن السيبراني", skill1Text: "مفاهيم الأمن السيبراني، تقييم الأمان، وحماية الأنظمة والتطبيقات.", skill2Title: "تطوير المواقع", skill2Text: "تصميم مواقع حديثة وتطبيقات ويب سريعة وقابلة للتطوير.",
    skill3Title: "تجربة المستخدم", skill3Text: "واجهة مستخدم واضحة، احترافية، ومتجاوبة مع مختلف الأجهزة.", skill4Title: "الأداء والتحسين", skill4Text: "تحسين سرعة الموقع، تجربة المستخدم، واستقرار الأنظمة.",
    projectsEyebrow: "المشاريع", projectsTitle: "أحدث الأعمال", contactEyebrow: "تواصل", contactTitle: "للتعاون أو الاستفسار", adminTitle: "لوحة التحكم",
    emailLabel: "البريد الإلكتروني", passwordLabel: "كلمة المرور", loginBtn: "دخول", projectTitleLabel: "عنوان المشروع", projectCategoryLabel: "الفئة", projectImageLabel: "رابط الصورة", projectLinkLabel: "رابط المشروع", projectDescLabel: "وصف المشروع", saveProjectBtn: "حفظ المشروع", logoutBtn: "تسجيل الخروج",
    visit: "عرض المشروع", delete: "حذف", loginError: "تعذر تسجيل الدخول. تحقق من البريد وكلمة المرور.", configError: "إعداد الاتصال بقاعدة البيانات غير مكتمل. راجع ملف supabase-config.js.", loadError: "تعذر تحميل المشاريع حاليًا.", noProjects: "لا توجد مشاريع منشورة حاليًا.", saved: "تم حفظ المشروع.", saveError: "تعذر حفظ المشروع.", deleted: "تم حذف المشروع.", deleteError: "تعذر حذف المشروع."
  },
  en: {
    navAbout: "About", navSkills: "Skills", navProjects: "Projects", navContact: "Contact", navAdmin: "Dashboard",
    heroTag: "Cybersecurity • Web Development", heroName: "Abdullah", heroRole: "Cybersecurity & Web Developer",
    heroText: "I build secure, efficient, and professional digital experiences by combining cybersecurity with web design and technical solutions.",
    viewProjects: "View Projects", contactMe: "Contact Me", statFocus: "Security Focus", statDevelopment: "Web Development", statBilingual: "Bilingual Website",
    aboutEyebrow: "About", aboutTitle: "Web Developer & Cybersecurity", aboutText1: "I'm Abdullah, blending cybersecurity with digital interface development to create safe, fast, and user-friendly platforms.",
    aboutText2: "I focus on system protection, web development, and improving user experience through effective technical solutions.", skillsEyebrow: "Skills", skillsTitle: "What I Offer",
    skill1Title: "Cybersecurity", skill1Text: "Cybersecurity fundamentals, security assessment, and protection of systems and applications.", skill2Title: "Web Development", skill2Text: "Modern websites and scalable web applications built for performance and reliability.",
    skill3Title: "User Experience", skill3Text: "Clear, professional, responsive interfaces for devices of all sizes.", skill4Title: "Performance Optimization", skill4Text: "Improving speed, user experience, and system stability.",
    projectsEyebrow: "Projects", projectsTitle: "Selected Work", contactEyebrow: "Contact", contactTitle: "For partnerships or inquiries", adminTitle: "Dashboard",
    emailLabel: "Email address", passwordLabel: "Password", loginBtn: "Sign in", projectTitleLabel: "Project title", projectCategoryLabel: "Category", projectImageLabel: "Image URL", projectLinkLabel: "Project URL", projectDescLabel: "Description", saveProjectBtn: "Save project", logoutBtn: "Sign out",
    visit: "View project", delete: "Delete", loginError: "Sign-in failed. Check your email and password.", configError: "Database configuration is incomplete. Check supabase-config.js.", loadError: "Projects could not be loaded.", noProjects: "No published projects yet.", saved: "Project saved.", saveError: "Project could not be saved.", deleted: "Project deleted.", deleteError: "Project could not be deleted."
  }
};

const state = { lang: localStorage.getItem(LANG_KEY) || "ar", client: null, user: null, projects: [] };
const el = (id) => document.getElementById(id);
const ui = {
  body: document.body, langToggle: el("langToggle"), adminToggle: el("adminToggle"), adminModal: el("adminModal"),
  loginPanel: el("loginPanel"), dashboardPanel: el("dashboardPanel"), closeAdmin: el("closeAdmin"),
  adminEmail: el("adminEmail"), adminPassword: el("adminPassword"), loginBtn: el("loginBtn"), logoutBtn: el("logoutBtn"),
  projectForm: el("projectForm"), projectGrid: el("projectGrid"), authMessage: el("authMessage"), projectMessage: el("projectMessage")
};

function t(key) { return translations[state.lang][key] || key; }
function setMessage(node, text, isError = false) {
  node.textContent = text;
  node.style.color = isError ? "var(--danger)" : "var(--primary)";
}
function applyLanguage(lang) {
  state.lang = lang;
  ui.body.dataset.lang = lang;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  localStorage.setItem(LANG_KEY, lang);
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const value = t(node.dataset.i18n);
    if (value) node.textContent = value;
  });
  ui.langToggle.textContent = lang === "ar" ? "AR / EN" : "EN / AR";
  renderProjects();
}
function safeExternalUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : "";
  } catch { return ""; }
}
function renderProjects() {
  ui.projectGrid.replaceChildren();
  if (!state.projects.length) {
    const empty = document.createElement("p");
    empty.className = "about-content";
    empty.textContent = t("noProjects");
    ui.projectGrid.appendChild(empty);
    return;
  }
  for (const project of state.projects) {
    const card = document.createElement("article");
    card.className = "project-card";
    const imageUrl = safeExternalUrl(project.image_url || "");
    if (imageUrl) {
      const image = document.createElement("div");
      image.className = "project-thumb";
      image.style.backgroundImage = `url("${imageUrl.replaceAll('"', '%22')}")`;
      card.appendChild(image);
    }
    const body = document.createElement("div");
    body.className = "project-body";
    const meta = document.createElement("div");
    meta.className = "project-meta";
    const category = document.createElement("span");
    category.className = "project-tag";
    category.textContent = project.category;
    meta.appendChild(category);
    const linkUrl = safeExternalUrl(project.project_url || "");
    if (linkUrl) {
      const link = document.createElement("a");
      link.className = "project-link";
      link.href = linkUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = t("visit");
      meta.appendChild(link);
    }
    body.appendChild(meta);
    const title = document.createElement("h3");
    title.textContent = project.title;
    body.appendChild(title);
    const description = document.createElement("p");
    description.textContent = project.description;
    body.appendChild(description);
    if (state.user && project.owner_id === state.user.id) {
      const remove = document.createElement("button");
      remove.type = "button";
      remove.textContent = t("delete");
      remove.setAttribute("aria-label", `${t("delete")}: ${project.title}`);
      remove.style.cssText = "margin-top:14px;padding:8px 12px;border:1px solid var(--line);border-radius:10px;background:transparent;color:var(--danger);cursor:pointer";
      remove.addEventListener("click", () => deleteProject(project.id));
      body.appendChild(remove);
    }
    card.appendChild(body);
    ui.projectGrid.appendChild(card);
  }
}
async function loadProjects() {
  if (!state.client) return;
  const { data, error } = await state.client.from("projects").select("id,owner_id,title,category,description,image_url,project_url,is_published,created_at").order("created_at", { ascending: false });
  if (error) {
    setMessage(ui.projectMessage, t("loadError"), true);
    return;
  }
  state.projects = data || [];
  renderProjects();
}
function showLogin() {
  ui.loginPanel.classList.remove("hidden");
  ui.dashboardPanel.classList.add("hidden");
}
function showDashboard() {
  ui.loginPanel.classList.add("hidden");
  ui.dashboardPanel.classList.remove("hidden");
}
function openAdmin() {
  ui.adminModal.classList.remove("hidden");
  ui.adminModal.setAttribute("aria-hidden", "false");
  ui.authMessage.textContent = "";
  ui.projectMessage.textContent = "";
  if (state.user) showDashboard(); else showLogin();
}
function closeAdmin() {
  ui.adminModal.classList.add("hidden");
  ui.adminModal.setAttribute("aria-hidden", "true");
  ui.adminPassword.value = "";
}
async function signIn() {
  if (!state.client) {
    setMessage(ui.authMessage, t("configError"), true);
    return;
  }
  const email = ui.adminEmail.value.trim();
  const password = ui.adminPassword.value;
  if (!email || !password) return;
  ui.loginBtn.disabled = true;
  const { data, error } = await state.client.auth.signInWithPassword({ email, password });
  ui.loginBtn.disabled = false;
  if (error) {
    setMessage(ui.authMessage, t("loginError"), true);
    return;
  }
  state.user = data.user;
  showDashboard();
  await loadProjects();
}
async function signOut() {
  if (state.client) await state.client.auth.signOut();
  state.user = null;
  showLogin();
  renderProjects();
}
async function addProject(event) {
  event.preventDefault();
  if (!state.user || !state.client) return;
  const project = {
    owner_id: state.user.id,
    title: el("projectTitle").value.trim(),
    category: el("projectCategory").value.trim(),
    description: el("projectDesc").value.trim(),
    image_url: el("projectImage").value.trim() || null,
    project_url: el("projectLink").value.trim() || null,
    is_published: true
  };
  const { error } = await state.client.from("projects").insert(project);
  if (error) {
    setMessage(ui.projectMessage, t("saveError"), true);
    return;
  }
  ui.projectForm.reset();
  setMessage(ui.projectMessage, t("saved"));
  await loadProjects();
}
async function deleteProject(id) {
  if (!state.user || !state.client) return;
  const { error } = await state.client.from("projects").delete().eq("id", id);
  if (error) {
    setMessage(ui.projectMessage, t("deleteError"), true);
    return;
  }
  setMessage(ui.projectMessage, t("deleted"));
  await loadProjects();
}
async function init() {
  applyLanguage(state.lang);
  ui.langToggle.addEventListener("click", () => applyLanguage(state.lang === "ar" ? "en" : "ar"));
  ui.adminToggle.addEventListener("click", openAdmin);
  ui.closeAdmin.addEventListener("click", closeAdmin);
  ui.loginBtn.addEventListener("click", signIn);
  ui.adminPassword.addEventListener("keydown", (event) => { if (event.key === "Enter") signIn(); });
  ui.logoutBtn.addEventListener("click", signOut);
  ui.projectForm.addEventListener("submit", addProject);
  ui.adminModal.addEventListener("click", (event) => { if (event.target === ui.adminModal) closeAdmin(); });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape" && !ui.adminModal.classList.contains("hidden")) closeAdmin(); });

  const url = window.SUPABASE_URL;
  const key = window.SUPABASE_ANON_KEY;
  if (!window.supabase || !url || !key || url.startsWith("YOUR_") || key.startsWith("YOUR_")) {
    setMessage(ui.authMessage, t("configError"), true);
    return;
  }
  state.client = window.supabase.createClient(url, key);
  const { data: { session } } = await state.client.auth.getSession();
  state.user = session?.user || null;
  state.client.auth.onAuthStateChange((_event, sessionState) => {
    state.user = sessionState?.user || null;
    renderProjects();
    if (state.user && !ui.adminModal.classList.contains("hidden")) showDashboard();
  });
  await loadProjects();
}

init();
