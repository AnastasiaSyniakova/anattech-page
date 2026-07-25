// /* ============================================================
//    i18n.js  —  internacionalización (i-18-n)
//    ------------------------------------------------------------
//    CÓMO FUNCIONA
//    1. Todo el texto vive en el objeto TEXTOS, por idioma.
//    2. En el HTML marcás los elementos:
//         data-i18n="clave"           → reemplaza el texto
//         data-i18n-html="clave"      → reemplaza HTML (permite <em>)
//         data-i18n-attr="content"    → reemplaza un atributo
//    3. aplicarIdioma() recorre el DOM y completa todo.

//    PARA AGREGAR UN IDIOMA: sumalo a TEXTOS y a CONFIG.idiomas.
//    ============================================================ */

import { CONFIG } from "./config.js";

export const TEXTOS = {
  es: {
    metaTitle: "Anattech · Automatización con IA para tu negocio",
    metaDesc:
      "Automatizamos la atención por WhatsApp, las reservas y el seguimiento de clientes.",

    navHow: "Cómo funciona",
    navContact: "Contacto",
    ctaNav: "Diagnóstico gratis",

    heroPill: "Automatizá tus operaciones con IA",
    heroTitle: "Hacé que tu negocio <em>trabaje por vos</em>, las 24 horas",
    heroSub:
      "Automatizamos la atención por WhatsApp, las reservas y el seguimiento de clientes.",
    ctaPrimary: "Pedí tu diagnóstico gratis",
    ctaSecondary: "Cómo funciona",

    statHours: "Ahorradas por mes",
    statNoShow: "Menos ausencias",
    statAlways: "Atención activa",
    statSpeed: "Tiempo de respuesta",

    howEyebrow: "Cómo funciona",
    howTitle: "Tres pasos. Sin que cambies cómo trabajás.",
    howIntro:
      "Conectamos las herramientas que ya usás para automatizar tus procesos. Integrá WhatsApp, Telegram, Google Calendar u otras plataformas para centralizar la información, reducir tareas manuales y trabajar de manera más eficiente.",

    step1Title: "Diagnóstico",
    step1Text:
      "Analizamos durante 20 minutos cómo trabajás actualmente e identificamos las 3 tareas que más tiempo consumen.",
    step2Title: "Implementación",
    step2Text:
      "Diseñamos el sistema y lo conectamos a tus herramientas actuales.",
    step3Title: "Soporte",
    step3Text:
      "Monitoreamos el sistema, realizamos los ajustes necesarios e incorporamos nuevas automatizaciones a medida que tu negocio crece.",

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
    formNote: "Te respondo dentro de las 24 horas. Sin spam.",
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
    heroTitle: "Keep your business working for <em>you</em> 24/7.",
    heroSub:
      "We automate WhatsApp support, bookings and client follow-up. No more enquiries lost at eleven at night.",
    ctaPrimary: "Get your free assessment",
    ctaSecondary: "How it works",

    statHours: "Saved per month",
    statNoShow: "Fewer no-shows",
    statAlways: "Always on",
    statSpeed: "Response time",

    howEyebrow: "How it works",
    howTitle: "Automate your business in three simple steps.",
    howIntro:
      "We connect the tools you already use, such as WhatsApp, Telegram, and Google Calendar to streamline your workflows, reduce manual work, and keep everything in one place.",

    step1Title: "Assessment",
    step1Text:
      "In a focused 20-minute session, we review how your business operates and identify the three tasks taking up the most time.",
    step2Title: "Implementation",
    step2Text:
      "We build a solution around your existing workflow and integrate it with the tools your team already uses.",
    step3Title: "Support",
    step3Text:
      "We monitor performance, fine-tune the system, and introduce new automations as your business evolves.",

    formEyebrow: "Start here",
    formTitle: "Free 20-minute assessment.",
    formIntro:
      "We look at your operation together and tell you what can be automated and how much time it would save. No commitment.",
    fieldName: "Name",
    fieldContact: "Email or WhatsApp",
    fieldSector: "Industry",
    fieldMessage: "What is eating most of your time?",
    errName: "Please add your name.",
    errContact: "I need a valid email or phone number.",
    errSector: "Pick your industry so I can prepare.",
    formSubmit: "Request free assessment",
    formSending: "Sending…",
    formNote: "I reply within 24 hours. No spam.",
    formError: "Something went wrong. Try again or message me on WhatsApp.",
    successTitle: "Done!",
    successText: "I will write to you within the next 24 hours.",

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

/* ---------- estado ---------- */

let idiomaActual = CONFIG.idiomaPorDefecto;

export function getIdioma() {
  return idiomaActual;
}

/** Devuelve el texto de una clave en el idioma activo. */
export function t(clave) {
  return (
    TEXTOS[idiomaActual]?.[clave] ??
    TEXTOS[CONFIG.idiomaPorDefecto][clave] ??
    clave
  );
}

/* ---------- aplicar al DOM ---------- */

export function aplicarIdioma(idioma) {
  if (!TEXTOS[idioma]) return;
  idiomaActual = idioma;

  document.documentElement.lang = idioma === "es" ? "es-AR" : "en";

  // Texto plano
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const clave = el.dataset.i18n;
    const attr = el.dataset.i18nAttr; // data-i18n-attr="content"
    if (attr) {
      el.setAttribute(attr, t(clave));
    } else {
      el.textContent = t(clave);
    }
  });

  // HTML (permite etiquetas dentro del texto, ej. <em>)
  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    el.innerHTML = t(el.dataset.i18nHtml);
  });

  // Guardar preferencia y avisar al resto de la app
  try {
    localStorage.setItem("idioma", idioma);
  } catch (_) {
    /* modo incógnito, no pasa nada */
  }

  document.dispatchEvent(
    new CustomEvent("idioma:cambiado", { detail: { idioma } }),
  );
}

/* ---------- selector de idioma ---------- */

export function initI18n() {
  // Preferencia guardada > idioma del navegador > default
  let inicial = CONFIG.idiomaPorDefecto;
  try {
    const guardado = localStorage.getItem("idioma");
    if (guardado && TEXTOS[guardado]) inicial = guardado;
    else if (navigator.language?.startsWith("en")) inicial = "en";
  } catch (_) {
    /* noop */
  }

  const cont = document.getElementById("langSwitch");
  if (cont) {
    cont.innerHTML = CONFIG.idiomas
      .map(
        (id) =>
          `<button type="button" class="lang-switch__btn" data-lang="${id}">${id.toUpperCase()}</button>`,
      )
      .join("");

    cont.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-lang]");
      if (!btn) return;
      aplicarIdioma(btn.dataset.lang);
      marcarActivo(cont);
    });
  }

  aplicarIdioma(inicial);
  marcarActivo(cont);
}

function marcarActivo(cont) {
  if (!cont) return;
  cont.querySelectorAll("[data-lang]").forEach((b) => {
    b.classList.toggle("is-active", b.dataset.lang === idiomaActual);
  });
}
