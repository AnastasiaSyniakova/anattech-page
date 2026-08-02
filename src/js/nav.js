/* ============================================================
   nav.js
   ------------------------------------------------------------
   Header pegajoso + menú mobile.
   Nota de accesibilidad: aria-expanded le dice a los lectores
   de pantalla si el menú está abierto o cerrado.
   ============================================================ */

export function initNav() {
  const header = document.getElementById("header");
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");

  /* sombra/borde cuando bajás */
  if (header) {
    const onScroll = () =>
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  if (!burger || !nav) return;

  const toggle = (open) => {
    const isOpen = open ?? !nav.classList.contains("is-open");
    nav.classList.toggle("is-open", isOpen);
    burger.classList.toggle("is-open", isOpen);
    burger.setAttribute("aria-expanded", String(isOpen));
  };

  burger.addEventListener("click", () => toggle());

  /* cerrar al tocar un link */
  nav.addEventListener("click", (e) => {
    if (e.target.closest("a")) toggle(false);
  });

  /* cerrar con Escape */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") toggle(false);
  });
}
