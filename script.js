const DEFAULT_PASSWORD = "admin123";
const STORAGE_KEY = "abdullahPortfolioProjects";
const LANG_KEY = "abdullahPortfolioLang";

const DEFAULT_PROJECTS = [
  {
    id: crypto.randomUUID ? crypto.randomUUID() : "p1",
    title: "SecurePortal",
    category: "Cybersecurity",
    description: "Platform for monitoring digital threats and presenting security insights in a clear dashboard.",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=900&q=80",
    link: "#"
  },
  {
    id: crypto.randomUUID ? crypto.randomUUID() : "p2",
    title: "CityFlow",
    category: "Web Platform",
    description: "A modern digital platform for efficient city service management and user interaction.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
    link: "#"
  },
  {
    id: crypto.randomUUID ? crypto.randomUUID() : "p3",
    title: "ShieldHouse",
    category: "Protection Systems",
    description: "A secure project highlighting data protection, monitoring, and safer user experiences.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    link: "#"
  }
];

const translations = {
  ar: {
    navAbout: "من أنا",
    navSkills: "المهارات",
    navProjects: "المشاريع",
    navContact: "التواصل",
    navAdmin: "لوحة التحكم",
    heroTag: "الأمن السيبراني • تطوير المواقع",
    heroName: "عبدالله",
    heroRole: "Cybersecurity & Web Developer",
    heroText: "أعمل على بناء تجارب رقمية آمنة، فعّالة، واحترافية من خلال دمج الأمن السيبراني مع تصميم المواقع وتطوير الحلول التقنية.",
    viewProjects: "استعراض المشاريع",
    contactMe: "تواصل معي",
    statExperience: "سنوات خبرة",
    statProjects: "مشاريع",
    statFocus: "تركيز على الحماية",
    aboutEyebrow: "من أنا",
    aboutTitle: "مطور مواقع وأمن سيبراني",
    aboutText1: "أنا عبدالله، أعمل على الدمج بين الأمن السيبراني وتطوير الواجهات الرقمية لبناء منصات آمنة وسريعة ومريحة للمستخدم.",
    aboutText2: "أركز على حماية الأنظمة، تطوير المواقع، وتحسين تجربة المستخدم من خلال حلول تقنية فعالة ومتقدمة.",
    skillsEyebrow: "المهارات",
    skillsTitle: "ما الذي أقدمه؟",
    skill1Title: "الأمن السيبراني",
    skill1Text: "تحليل الثغرات، تقييم الأمان، حماية الأنظمة والتطبيقات.",
    skill2Title: "تطوير المواقع",
    skill2Text: "تصميم مواقع حديثة وتطبيقات ويب سريعة وقابلة للتطوير.",
    skill3Title: "تجربة المستخدم",
    skill3Text: "واجهة مستخدم واضحة، احترافية، ومتجاوبة مع مختلف الأجهزة.",
    skill4Title: "الأداء والتحسين",
    skill4Text: "تحسين سرعة الموقع، تجربة المستخدم، واستقرار الأنظمة.",
    projectsEyebrow: "المشاريع",
    projectsTitle: "أحدث الأعمال",
    contactEyebrow: "تواصل",
    contactTitle: "للتعاون أو الاستفسار",
    adminTitle: "لوحة التحكم",
    passwordLabel: "كلمة المرور",
    loginBtn: "دخول",
    projectTitleLabel: "عنوان المشروع",
    projectCategoryLabel: "الفئة",
    projectImageLabel: "رابط الصورة",
    projectLinkLabel: "رابط المشروع",
    projectDescLabel: "وصف المشروع",
    saveProjectBtn: "حفظ المشروع",
    logoutBtn: "تسجيل الخروج"
  },
  en: {
    navAbout: "About",
    navSkills: "Skills",
    navProjects: "Projects",
    navContact: "Contact",
    navAdmin: "Dashboard",
    heroTag: "Cybersecurity • Web Development",
    heroName: "Abdullah",
    heroRole: "Cybersecurity & Web Developer",
    heroText: "I build secure, efficient, and professional digital experiences by combining cybersecurity with web design and technical solutions.",
    viewProjects: "View Projects",
    contactMe: "Contact Me",
    statExperience: "Years of Experience",
    statProjects: "Projects",
    statFocus: "Security Focus",
    aboutEyebrow: "About",
    aboutTitle: "Web Developer & Cybersecurity Specialist",
    aboutText1: "I'm Abdullah, blending cybersecurity with digital interface development to create safe, fast, and user-friendly platforms.",
    aboutText2: "I focus on system protection, web development, and improving user experience through efficient and advanced technical solutions.",
    skillsEyebrow: "Skills",
    skillsTitle: "What I Offer",
    skill1Title: "Cybersecurity",
    skill1Text: "Vulnerability analysis, risk assessment, and protection of systems and applications.",
    skill2Title: "Web Development",
    skill2Text: "Modern websites and scalable web applications built for performance and reliability.",
    skill3Title: "User Experience",
    skill3Text: "Clear, professional, and responsive interfaces for devices of all sizes.",
    skill4Title: "Performance Optimization",
    skill4Text: "Improving speed, stability, and the overall quality of systems and interfaces.",
    projectsEyebrow: "Projects",
    projectsTitle: "Selected Work",
    contactEyebrow: "Contact",
    contactTitle: "For partnerships or inquiries",
    adminTitle: "Dashboard",
    passwordLabel: "Password",
    loginBtn: "Login",
    projectTitleLabel: "Project Title",
    projectCategoryLabel: "Category",
    projectImageLabel: "Image URL",
    projectLinkLabel: "Project Link",
    projectDescLabel: "Project Description",
    saveProjectBtn: "Save Project",
    logoutBtn: "Logout"
  }
};

const state = {
  lang: localStorage.getItem(LANG_KEY) || "ar",
  projects: JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") || DEFAULT_PROJECTS,
  authenticated: false
};

const elements = {
  body: document.body,
  langToggle: document.getElementById("langToggle"),
  adminToggle: document.getElementById("adminToggle"),
  adminModal: document.getElementById("adminModal"),
  loginPanel: document.getElementById("loginPanel"),
  dashboardPanel: document.getElementById("dashboardPanel"),
  closeAdmin: document.getElementById("closeAdmin"),
  adminPassword: document.getElementById("adminPassword"),
  loginBtn: document.getElementById("loginBtn"),
  logoutBtn: document.getElementById("logoutBtn"),
  projectForm: document.getElementById("projectForm"),
  projectGrid: document.getElementById("projectGrid")
};

function saveProjects() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.projects));
}

function applyLanguage(lang) {
  state.lang = lang;
  elements.body.dataset.lang = lang;
  localStorage.setItem(LANG_KEY, lang);

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    const translation = translations[lang][key];
    if (translation) {
      node.textContent = translation;
    }
  });

  elements.langToggle.textContent = lang === "ar" ? "AR / EN" : "EN / AR";
  document.documentElement.lang = lang;
}

function buildProjectCard(project) {
  const card = document.createElement("article");
  card.className = "project-card";

  const title = project.title || "My Project";
  const category = project.category || "Project";
  const description = project.description || "A secure and modern digital experience.";
  const image = project.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80";
  const link = project.link || "#";

  card.innerHTML = `
    <div class="project-thumb" style="background-image: url('${image}')"></div>
    <div class="project-body">
      <div class="project-meta">
        <span class="project-tag">${category}</span>
        <a class="project-link" href="${link}" target="_blank" rel="noreferrer">Visit</a>
      </div>
      <h3>${title}</h3>
      <p>${description}</p>
    </div>
  `;

  return card;
}

function renderProjects() {
  elements.projectGrid.innerHTML = "";

  state.projects.forEach((project) => {
    elements.projectGrid.appendChild(buildProjectCard(project));
  });
}

function openAdminModal() {
  elements.adminModal.classList.remove("hidden");
  elements.adminModal.setAttribute("aria-hidden", "false");
  elements.adminPassword.value = "";
  elements.loginPanel.classList.remove("hidden");
  elements.dashboardPanel.classList.add("hidden");
  state.authenticated = false;
}

function closeAdminModal() {
  elements.adminModal.classList.add("hidden");
  elements.adminModal.setAttribute("aria-hidden", "true");
  elements.adminPassword.value = "";
  elements.loginPanel.classList.remove("hidden");
  elements.dashboardPanel.classList.add("hidden");
  state.authenticated = false;
}

function authenticate() {
  const value = elements.adminPassword.value.trim();

  if (value === DEFAULT_PASSWORD) {
    state.authenticated = true;
    elements.loginPanel.classList.add("hidden");
    elements.dashboardPanel.classList.remove("hidden");
    return;
  }

  alert(state.lang === "ar" ? "كلمة المرور غير صحيحة" : "Incorrect password");
}

function logout() {
  state.authenticated = false;
  elements.loginPanel.classList.remove("hidden");
  elements.dashboardPanel.classList.add("hidden");
  elements.adminPassword.value = "";
}

function addProject(event) {
  event.preventDefault();

  const title = document.getElementById("projectTitle").value.trim();
  const category = document.getElementById("projectCategory").value.trim();
  const image = document.getElementById("projectImage").value.trim();
  const link = document.getElementById("projectLink").value.trim();
  const description = document.getElementById("projectDesc").value.trim();

  if (!title || !category || !description) {
    alert(state.lang === "ar" ? "يرجى تعبئة الحقول المطلوبة" : "Please fill in the required fields");
    return;
  }

  const project = {
    id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
    title,
    category,
    description,
    image: image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    link: link || "#"
  };

  state.projects.unshift(project);
  saveProjects();
  renderProjects();
  event.target.reset();
}

function init() {
  applyLanguage(state.lang);
  renderProjects();

  elements.langToggle.addEventListener("click", () => {
    const nextLang = state.lang === "ar" ? "en" : "ar";
    applyLanguage(nextLang);
  });

  elements.adminToggle.addEventListener("click", openAdminModal);
  elements.closeAdmin.addEventListener("click", closeAdminModal);
  elements.loginBtn.addEventListener("click", authenticate);
  elements.logoutBtn.addEventListener("click", logout);
  elements.projectForm.addEventListener("submit", addProject);

  elements.adminModal.addEventListener("click", (event) => {
    if (event.target === elements.adminModal) {
      closeAdminModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !elements.adminModal.classList.contains("hidden")) {
      closeAdminModal();
    }
  });
}

init();



























































