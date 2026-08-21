/* ============================================================
   config.js
   ------------------------------------------------------------
   Todo lo configurable del sitio vive acá.
   Si algo hay que cambiar seguido, va en este archivo.
   ============================================================ */

export const CONFIG = {
  brand: "Anattech",

  // --- WhatsApp ---
  // Formato internacional SIN + ni espacios: 549 + área sin 0 + número sin 15
  whatsapp: {
    number: "5491156155171",
    message: {
      es: "Hola! Quiero saber más sobre automatización para mi negocio.",
      en: "Hi! I would like to know more about automation.",
    },
  },

  // --- Telegram ---
  // Pegá acá el link de tu bot (ej: https://t.me/tu_bot).
  telegram: {
    botUrl: "https://t.me/anattech_Telegram_bot",
  },

  // --- Formulario ---
  // Creá una cuenta gratis en formspree.io o web3forms.com y pegá el endpoint.
  // Mientras esté vacío, el formulario simula el envío y loguea en consola.
  form: {
    endpoint: "https://formspree.io/f/mljrjnwo",
    demoDelay: 700, // ms de espera falsa en modo demo
  },

  // --- Idiomas ---
  langs: ["es", "en"],
  defaultLang: "es",
};
