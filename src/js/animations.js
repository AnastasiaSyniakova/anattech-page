/* ============================================================
   animations.js
   ------------------------------------------------------------
   IntersectionObserver = "avisame cuando este elemento
   entre en pantalla". Mucho más eficiente que escuchar scroll.

   Respetamos prefers-reduced-motion: si el usuario pidió
   menos animación en su sistema, mostramos todo directo.
   ============================================================ */

const sinMovimiento = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

/* ---------- aparecer al scrollear ---------- */

let observerReveal = null;

export function initReveal() {
  if (sinMovimiento) {
    document
      .querySelectorAll(".reveal")
      .forEach((el) => el.classList.add("is-visible"));
    return;
  }

  observerReveal = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-visible");
        observerReveal.unobserve(e.target); // se anima una sola vez
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
  );

  observarNuevos();
}

/** Llamar después de renderizar contenido nuevo. */
export function observarNuevos() {
  if (!observerReveal) return;
  document.querySelectorAll(".reveal:not(.is-visible)").forEach((el) => {
    observerReveal.observe(el);
  });
}

/* ---------- contadores ---------- */

export function initContadores() {
  const nums = document.querySelectorAll("[data-target]");

  if (sinMovimiento) {
    nums.forEach(mostrarFinal);
    return;
  }

  const obs = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((e) => {
        if (!e.isIntersecting) return;
        animarNumero(e.target);
        obs.unobserve(e.target);
      });
    },
    { threshold: 0.5 },
  );

  nums.forEach((n) => obs.observe(n));
}

function mostrarFinal(el) {
  const { target, prefix = "", suffix = "" } = el.dataset;
  el.textContent = prefix + target + suffix;
}

function animarNumero(el) {
  const objetivo = parseInt(el.dataset.target, 10);
  const prefijo = el.dataset.prefix || "";
  const sufijo = el.dataset.suffix || "";
  const duracion = 1100;
  const inicio = performance.now();

  function frame(ahora) {
    const t = Math.min((ahora - inicio) / duracion, 1);
    const suave = 1 - Math.pow(1 - t, 3); // ease-out cubic
    el.textContent = prefijo + Math.round(objetivo * suave) + sufijo;
    if (t < 1) requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}
