// /* ============================================================
//    i18n.js  —  internacionalización (i-18-n)
//    ------------------------------------------------------------
//    CÓMO FUNCIONA
//    1. Todo el texto vive en el objeto TEXTS, por idioma.
//    2. En el HTML marcás los elementos:
//         data-i18n="key"           → reemplaza el texto
//         data-i18n-html="key"      → reemplaza HTML (permite <em>)
//         data-i18n-attr="content"    → reemplaza un atributo
//    3. applyLang() recorre el DOM y completa todo.

//    PARA AGREGAR UN IDIOMA: sumalo a TEXTOS y a CONFIG.langs.
//    ============================================================ */

import { CONFIG } from "./config.js";

export const TEXTS = {
  es: {
    metaTitle: "Anattech · Automatización con IA para tu negocio",
    metaDesc:
      "Automatizamos la atención por WhatsApp, las reservas y el seguimiento de clientes",

    navHow: "Cómo funciona",
    navContact: "Contacto",
    ctaNav: "Diagnóstico gratis",

    heroPill: "Automatizá tus operaciones con IA",
    heroTitle: "Hacé que tu negocio <em>trabaje por vos</em>, las 24 horas",
    heroSub:
      "Automatizamos la atención por WhatsApp, las reservas y el seguimiento de clientes",
    ctaPrimary: "Pedí tu diagnóstico gratis",
    ctaSecondary: "Cómo funciona",

    howEyebrow: "Cómo funciona",
    howTitle: "Tres pasos. Sin que cambies cómo trabajás",
    howIntro:
      "Conectamos las herramientas que ya usás para automatizar tus procesos. Integrá WhatsApp, Telegram, Google Calendar u otras plataformas para centralizar la información, reducir tareas manuales y trabajar de manera más eficiente.",

    botCtaTitle: "Hablá con el bot antes de contratarnos",
    closeLabel: "Cerrar",

    step1Title: "Diagnóstico",
    step1Text:
      "Analizamos durante 20 minutos cómo trabajás actualmente e identificamos las 3 tareas que más tiempo consumen.",
    step1Duration: "20 min",
    step2Title: "Implementación",
    step2Text:
      "Diseñamos el sistema y lo conectamos a tus herramientas actuales.",
    step2Duration: "1–2 semanas",
    step3Title: "Soporte",
    step3Text:
      "Monitoreamos el sistema, realizamos los ajustes necesarios e incorporamos nuevas automatizaciones a medida que tu negocio crece.",
    step3Duration: "Continuo",

    formEyebrow: "Empezá acá",
    formTitle: "Diagnóstico gratuito de 20 minutos.",
    formIntro:
      "Analizamos juntos cómo funciona tu operación, identificamos qué procesos se pueden automatizar y estimamos cuánto tiempo podrías ahorrar.",
    fieldName: "Nombre",
    fieldContact: "Email o WhatsApp",
    fieldSector: "Tu negocio",
    fieldMessage: "¿En qué estás perdiendo más tiempo?",
    errName: "Poné tu nombre así te puedo escribir bien.",
    errContact: "Necesito un email válido o un número para contactarte.",
    errSector: "Elegí tu rubro para preparar el diagnóstico.",
    formSubmit: "Pedir diagnóstico gratis",
    formSending: "Enviando…",
    formNote: "Te respondo dentro de las 24 horas",
    formError: "Algo falló al enviar. Probá de nuevo o escribime por WhatsApp.",
    successTitle: "¡Listo!",
    successText: "Te escribo dentro de las próximas 24 horas para coordinar.",

    sectorPlaceholder: "Elegí una opción",
    sectorHealth: "Salud / Consultorio",
    sectorEdu: "Educación online",
    sectorReal: "Inmobiliaria",
    sectorShop: "E-commerce",
    sectorBeauty: "Estética / Belleza",
    sectorOther: "Otro",

    footerTagline: "Automatización con IA para negocios.",
  },

  en: {
    metaTitle: "Anattech · AI automation for your business",
    metaDesc: "We automate WhatsApp support, bookings and client follow-up.",

    navHow: "How it works",
    navContact: "Contact",
    ctaNav: "Free assessment",

    heroPill: "Automate your operations with AI",
    heroTitle: "Keep your business <em>working for you</em> 24/7",
    heroSub: "We automate WhatsApp support, bookings and client follow-up",
    ctaPrimary: "Get your free assessment",
    ctaSecondary: "How it works",

    howEyebrow: "How it works",
    howTitle: "Automate your business in three simple steps",
    howIntro:
      "We connect the tools you already use, such as WhatsApp, Telegram, and Google Calendar to streamline your workflows, reduce manual work, and keep everything in one place.",

    botCtaTitle: "Talk to the bot before you hire us.",
    closeLabel: "Close",

    step1Title: "Assessment",
    step1Text:
      "In a focused 20-minute session, we review how your business operates and identify the three tasks taking up the most time.",
    step1Duration: "20 min",
    step2Title: "Implementation",
    step2Text:
      "We build a solution around your existing workflow and integrate it with the tools your team already uses.",
    step2Duration: "1–2 weeks",
    step3Title: "Support",
    step3Text:
      "We monitor performance, fine-tune the system, and introduce new automations as your business evolves.",
    step3Duration: "Ongoing",

    formEyebrow: "Start here",
    formTitle: "Free 20-minute assessment.",
    formIntro:
      "We look at your operation together and tell you what can be automated and how much time it would save.",
    fieldName: "Name",
    fieldContact: "Email or WhatsApp",
    fieldSector: "Industry",
    fieldMessage: "What is eating most of your time?",
    errName: "Please add your name.",
    errContact: "I need a valid email or phone number.",
    errSector: "Pick your industry so I can prepare.",
    formSubmit: "Request free assessment",
    formSending: "Sending…",
    formNote: "I'll get back to you within 24 hours",
    formError: "Something went wrong. Try again or message me on WhatsApp.",
    successTitle: "Done!",
    successText: "I will be in touch with you within the next 24 hours.",

    sectorPlaceholder: "Choose one",
    sectorHealth: "Health / Clinic",
    sectorEdu: "Online education",
    sectorReal: "Real estate",
    sectorShop: "E-commerce",
    sectorBeauty: "Beauty / Wellness",
    sectorOther: "Other",

    footerTagline: "AI automation for small businesses.",
  },
};

/* ---------- state ---------- */

let currentLang = CONFIG.defaultLang;

export function getLang() {
  return currentLang;
}

/** Returns the text for a key in the active language. */
export function t(key) {
  return TEXTS[currentLang]?.[key] ?? TEXTS[CONFIG.defaultLang][key] ?? key;
}

/* ---------- apply to the DOM ---------- */

export function applyLang(lang) {
  if (!TEXTS[lang]) return;
  currentLang = lang;

  document.documentElement.lang = lang === "es" ? "es-AR" : "en";

  // Plain text
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    const attr = el.dataset.i18nAttr; // data-i18n-attr="content"
    if (attr) {
      el.setAttribute(attr, t(key));
    } else {
      el.textContent = t(key);
    }
  });

  // HTML (allows tags inside the text, e.g. <em>)
  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    el.innerHTML = t(el.dataset.i18nHtml);
  });

  // Save preference and notify the rest of the app
  try {
    localStorage.setItem("lang", lang);
  } catch (_) {
    /* incognito mode, no problem */
  }

  document.dispatchEvent(new CustomEvent("lang:changed", { detail: { lang } }));
}

/* ---------- language switcher ---------- */

export function initI18n() {
  // Saved preference > browser language > default
  let initial = CONFIG.defaultLang;
  try {
    const saved = localStorage.getItem("lang");
    if (saved && TEXTS[saved]) initial = saved;
    else if (navigator.language?.startsWith("en")) initial = "en";
  } catch (_) {
    /* noop */
  }

  const container = document.getElementById("langSwitch");
  if (container) {
    container.innerHTML = CONFIG.langs
      .map(
        (id) =>
          `<button type="button" class="lang-switch__btn" data-lang="${id}">${id.toUpperCase()}</button>`,
      )
      .join("");

    container.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-lang]");
      if (!btn) return;
      applyLang(btn.dataset.lang);
      markActive(container);
    });
  }

  applyLang(initial);
  markActive(container);
}

function markActive(container) {
  if (!container) return;
  container.querySelectorAll("[data-lang]").forEach((b) => {
    b.classList.toggle("is-active", b.dataset.lang === currentLang);
  });
}
