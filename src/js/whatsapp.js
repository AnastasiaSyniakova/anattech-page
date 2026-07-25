/* ============================================================
   whatsapp.js
   ------------------------------------------------------------
   Arma el link wa.me con el mensaje pre-cargado.
   encodeURIComponent convierte espacios y acentos en algo
   que la URL entiende. Sin eso el mensaje llega roto.
   ============================================================ */

import { CONFIG } from "./config.js";
import { getIdioma } from "./i18n.js";

export function initWhatsApp() {
  actualizarLinks();
  // Si cambia el idioma, el mensaje pre-cargado cambia también
  document.addEventListener("idioma:cambiado", actualizarLinks);
}

function actualizarLinks() {
  const { numero, mensaje } = CONFIG.whatsapp;
  const texto = mensaje[getIdioma()] ?? mensaje.es;
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

  ["waFloat", "footerWa"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.href = url;
  });
}
