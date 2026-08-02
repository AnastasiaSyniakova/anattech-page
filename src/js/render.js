/* ============================================================
   render.js
   ------------------------------------------------------------
   Convierte los arrays de content.js en HTML.
   Patrón: array.map(...).join('') → innerHTML

   Este es el mismo modelo mental que usa React:
   los datos mandan, la interfaz es el resultado.
   ============================================================ */

import { STATS, STEPS, SECTORS } from "./content.js";
import { t } from "./i18n.js";

export function renderStats() {
  const container = document.getElementById("stats");
  if (!container) return;

  container.innerHTML = STATS.map(
    (s) => `
    <li class="stat">
      <span class="stat__num"
            data-target="${s.value}"
            data-prefix="${s.prefix ?? ""}"
            data-suffix="${s.suffixKey ? t(s.suffixKey) : (s.suffix ?? "")}">0</span>
      <span class="stat__label">${t(s.key)}</span>
    </li>
  `,
  ).join("");
}

export function renderSteps() {
  const container = document.getElementById("steps");
  if (!container) return;

  container.innerHTML = STEPS.map(
    (step) => `
    <li class="step reveal">
      <span class="step__num" aria-hidden="true">${step.n}</span>
      <h3 class="step__title">${t(step.titleKey)}</h3>
      <p class="step__text">${t(step.textKey)}</p>
    </li>
  `,
  ).join("");
}

export function renderSectors() {
  const select = document.getElementById("rubro");
  if (!select) return;

  const current = select.value; // no perder lo que el usuario ya eligió

  select.innerHTML = SECTORS.map(
    (s) => `
    <option value="${s.value}">${t(s.key)}</option>
  `,
  ).join("");

  select.value = current;
}

/** Vuelve a pintar todo lo que depende del idioma. */
export function renderAll() {
  renderStats();
  renderSteps();
  renderSectors();
}
