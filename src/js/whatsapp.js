/* ============================================================
   whatsapp.js
   ------------------------------------------------------------
   Arma el link wa.me con el mensaje pre-cargado.
   encodeURIComponent convierte espacios y acentos en algo
   que la URL entiende. Sin eso el mensaje llega roto.
   ============================================================ */

import { CONFIG } from "./config.js";
import { getLang } from "./i18n.js";

export function initWhatsApp() {
  updateLinks();
  // Si cambia el idioma, el mensaje pre-cargado cambia también
  document.addEventListener("lang:changed", updateLinks);
}

function updateLinks() {
  const { number, message } = CONFIG.whatsapp;
  const text = message[getLang()] ?? message.es;
  const url = `https://wa.me/${number}?text=${encodeURIComponent(text)}`;

  ["waFloat", "footerWa"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.href = url;
  });
}
