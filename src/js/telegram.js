/* ============================================================
   telegram.js
   ------------------------------------------------------------
   Modal "Hablá con el bot": aparece una sola vez cuando el
   usuario cruza de la sección "Cómo funciona" a "Contacto",
   y se cierra con el botón, el fondo o Escape.
   ============================================================ */

import { CONFIG } from "./config.js";

export function initTelegram() {
  const link = document.getElementById("botLink");
  if (link) link.href = CONFIG.telegram.botUrl;

  const modal = document.getElementById("botModal");
  const backdrop = document.getElementById("botModalBackdrop");
  const closeBtn = document.getElementById("botCardClose");
  const contactSection = document.getElementById("contacto");
  if (!modal || !contactSection) return;

  let lastFocused = null;

  const openModal = () => {
    lastFocused = document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    closeBtn?.focus();
  };

  const closeModal = () => {
    modal.hidden = true;
    document.body.style.overflow = "";
    lastFocused?.focus();
  };

  closeBtn?.addEventListener("click", closeModal);
  backdrop?.addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeModal();
  });

  /* Se muestra la primera vez que "Contacto" entra en pantalla,
     es decir, al cruzar el límite entre la 2ª y la 3ª sección. */
  const trigger = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        openModal();
        trigger.disconnect();
      });
    },
    { threshold: 0.15 },
  );
  trigger.observe(contactSection);
}
