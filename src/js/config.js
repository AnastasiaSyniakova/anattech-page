/* ============================================================
   config.js
   ------------------------------------------------------------
   Todo lo configurable del sitio vive acá.
   Si algo hay que cambiar seguido, va en este archivo.
   ============================================================ */

export const CONFIG = {
  marca: "Anattech",

  // --- WhatsApp ---
  // Formato internacional SIN + ni espacios: 549 + área sin 0 + número sin 15
  whatsapp: {
    numero: "5491137748200",
    mensaje: {
      es: "Hola! Vi la web y quiero saber más sobre automatización para mi negocio.",
      en: "Hi! I saw your site and I would like to know more about automation.",
    },
  },

  // --- Formulario ---
  // Creá una cuenta gratis en formspree.io o web3forms.com y pegá el endpoint.
  // Mientras esté vacío, el formulario simula el envío y loguea en consola.
  form: {
    endpoint: "", // ej: 'https://formspree.io/f/xxxxxxx'
    demoDelay: 700, // ms de espera falsa en modo demo
  },

  // --- Idiomas ---
  idiomas: ["es", "en"],
  idiomaPorDefecto: "es",
};
