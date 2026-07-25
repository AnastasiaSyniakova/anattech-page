/* ============================================================
   render.js
   ------------------------------------------------------------
   Convierte los arrays de content.js en HTML.
   Patrón: array.map(...).join('') → innerHTML

   Este es el mismo modelo mental que usa React:
   los datos mandan, la interfaz es el resultado.
   ============================================================ */

import { STATS, PASOS, RUBROS } from "./content.js";
import { t } from "./i18n.js";

export function renderStats() {
  const cont = document.getElementById("stats");
  if (!cont) return;

  cont.innerHTML = STATS.map(
    (s) => `
    <li class="stat">
      <span class="stat__num"
            data-target="${s.valor}"
            data-prefix="${s.prefijo ?? ""}"
            data-suffix="${s.sufijo ?? ""}">0</span>
      <span class="stat__label">${t(s.clave)}</span>
    </li>
  `,
  ).join("");
}

export function renderPasos() {
  const cont = document.getElementById("steps");
  if (!cont) return;

  cont.innerHTML = PASOS.map(
    (p) => `
    <li class="step reveal">
      <span class="step__num" aria-hidden="true">${p.n}</span>
      <h3 class="step__title">${t(p.titulo)}</h3>
      <p class="step__text">${t(p.texto)}</p>
    </li>
  `,
  ).join("");
}

export function renderRubros() {
  const select = document.getElementById("rubro");
  if (!select) return;

  const actual = select.value; // no perder lo que el usuario ya eligió

  select.innerHTML = RUBROS.map(
    (r) => `
    <option value="${r.valor}">${t(r.clave)}</option>
  `,
  ).join("");

  select.value = actual;
}

/** Vuelve a pintar todo lo que depende del idioma. */
export function renderTodo() {
  renderStats();
  renderPasos();
  renderRubros();
}
