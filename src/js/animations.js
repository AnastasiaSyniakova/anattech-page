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

/* ---------- contadores ---------- */

export function initCounters() {
  const nums = document.querySelectorAll("[data-target]");

  if (prefersReducedMotion) {
    nums.forEach(showFinal);
    return;
  }

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        animateNumber(e.target);
        obs.unobserve(e.target);
      });
    },
    { threshold: 0.5 },
  );

  nums.forEach((n) => obs.observe(n));
}

function showFinal(el) {
  const { target, prefix = "", suffix = "" } = el.dataset;
  el.textContent = prefix + target + suffix;
}

function animateNumber(el) {
  const target = parseInt(el.dataset.target, 10);
  const prefix = el.dataset.prefix || "";
  const suffix = el.dataset.suffix || "";
  const duration = 1100;
  const start = performance.now();

  function frame(now) {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
    el.textContent = prefix + Math.round(target * eased) + suffix;
    if (t < 1) requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}
