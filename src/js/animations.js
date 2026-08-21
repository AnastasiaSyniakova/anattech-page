/* ============================================================
   animations.js
   ------------------------------------------------------------
   IntersectionObserver = "avisame cuando este elemento
   entre en pantalla". Mucho más eficiente que escuchar scroll.

   Respetamos prefers-reduced-motion: si el usuario pidió
   menos animación en su sistema, mostramos todo directo.
   ============================================================ */

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

/* ---------- aparecer al scrollear ---------- */

let revealObserver = null;

export function initReveal() {
  if (prefersReducedMotion) {
    document
      .querySelectorAll(".reveal")
      .forEach((el) => el.classList.add("is-visible"));
    return;
  }

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-visible");
        revealObserver.unobserve(e.target); // se anima una sola vez
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
  );

  observeNew();
}

/** Llamar después de renderizar contenido nuevo. */
export function observeNew() {
  if (!revealObserver) return;
  document.querySelectorAll(".reveal:not(.is-visible)").forEach((el) => {
    revealObserver.observe(el);
  });
}

/* ---------- titular: entrada palabra por palabra ---------- */

/** Envuelve cada palabra (y cada elemento inline, como <em>) en un
 *  <span class="word"> para animarlas con blur-in escalonado en CSS,
 *  y agrega el cursor de terminal parpadeante al final del titular. */
export function animateHeadline(selector) {
  const el = document.querySelector(selector);
  if (!el) return;

  const cursor = document.createElement("span");
  cursor.className = "cursor";
  cursor.setAttribute("aria-hidden", "true");

  if (prefersReducedMotion) {
    el.appendChild(cursor);
    return;
  }

  const frag = document.createDocumentFragment();
  let i = 0;

  Array.from(el.childNodes).forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      node.textContent.split(/(\s+)/).forEach((part) => {
        if (part === "") return;
        if (/^\s+$/.test(part)) {
          frag.appendChild(document.createTextNode(part));
          return;
        }
        const span = document.createElement("span");
        span.className = "word";
        span.style.setProperty("--i", i++);
        span.textContent = part;
        frag.appendChild(span);
      });
    } else {
      const span = document.createElement("span");
      span.className = "word";
      span.style.setProperty("--i", i++);
      span.appendChild(node.cloneNode(true));
      frag.appendChild(span);
    }
  });

  el.innerHTML = "";
  el.appendChild(frag);
  el.appendChild(cursor);
}
