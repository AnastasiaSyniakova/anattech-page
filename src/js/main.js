/* ============================================================
   main.js  —  punto de entrada
   ------------------------------------------------------------
   El único script cargado desde el HTML.
   Importa el resto y define el ORDEN de arranque.

   IMPORTANTE (Vite): el CSS se importa ACÁ, no con un <link>
   en el HTML. Vite lo procesa, minifica y lo inyecta solo.

   Orden de arranque:
   idioma → render → animaciones
   (las animaciones tienen que ver el HTML ya creado)
   ============================================================ */

import "../css/styles.css";

import { initI18n } from "./i18n.js";
import { renderAll } from "./render.js";
import { initReveal, initCounters, observeNew } from "./animations.js";
import { initNav } from "./nav.js";
import { initWhatsApp } from "./whatsapp.js";
import { initForm } from "./form.js";

function init() {
  initI18n(); // 1. define el idioma y traduce el HTML estático
  renderAll(); // 2. crea las secciones dinámicas
  initNav();
  initWhatsApp();
  initForm();
  initReveal(); // 3. observa los .reveal (incluidos los recién creados)
  initCounters();

  document.getElementById("year").textContent = new Date().getFullYear();
}

/* Si cambia el idioma, volvemos a pintar el contenido dinámico */
document.addEventListener("lang:changed", () => {
  renderAll();
  observeNew();
  document
    .querySelectorAll("#steps .reveal")
    .forEach((el) => el.classList.add("is-visible"));
});

/* Con Vite, el script ya se ejecuta después de parsear el HTML,
   pero este chequeo no molesta y es una buena costumbre. */
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
