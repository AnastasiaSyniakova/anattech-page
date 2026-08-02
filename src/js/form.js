/* ============================================================
   form.js
   ------------------------------------------------------------
   ACÁ SÍ ES NECESARIO async/await: mandar datos por la red
   toma un tiempo desconocido y hay que esperar la respuesta.
   El resto del sitio es sincrónico.

   Sin endpoint configurado → modo demo (loguea en consola).
   Con endpoint → envío real.
   ============================================================ */

import { CONFIG } from "./config.js";
import { t } from "./i18n.js";

export function initForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const successEl = document.getElementById("formSuccess");
  const submitBtn = document.getElementById("submitBtn");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (form._gotcha.value) return; // bot detectado, ignorar en silencio
    if (!validate(form)) return;

    setLoading(submitBtn, true);

    try {
      await send(new FormData(form));

      form.hidden = true;
      successEl.hidden = false;
      successEl.scrollIntoView({ behavior: "smooth", block: "center" });
    } catch (err) {
      console.error("Error al enviar:", err);
      alert(t("formError"));
    } finally {
      setLoading(submitBtn, false);
    }
  });

  /* limpiar el error apenas el usuario corrige */
  form.addEventListener("input", (e) => {
    e.target.closest(".field")?.classList.remove("is-invalid");
  });
}

/* ---------- validación ---------- */

function validate(form) {
  let ok = true;

  form
    .querySelectorAll(".field")
    .forEach((f) => f.classList.remove("is-invalid"));

  // nombre / contacto / rubro: coinciden con el atributo name="" del HTML,
  // no se pueden renombrar acá sin cambiar el HTML también
  if (form.nombre.value.trim().length < 2) {
    markError(form.nombre);
    ok = false;
  }
  if (!isValidContact(form.contacto.value)) {
    markError(form.contacto);
    ok = false;
  }
  if (!form.rubro.value) {
    markError(form.rubro);
    ok = false;
  }

  return ok;
}

function markError(input) {
  input.closest(".field")?.classList.add("is-invalid");
}

function isValidContact(value) {
  const v = value.trim();
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
  const isPhone = /^[\d\s+()\-]{8,}$/.test(v);
  return isEmail || isPhone;
}

/* ---------- envío ---------- */

async function send(formData) {
  const data = Object.fromEntries(formData);
  delete data._gotcha;

  /* modo demo: todavía no hay endpoint */
  if (!CONFIG.form.endpoint) {
    console.log(
      "%c[DEMO] Datos del formulario:",
      "color:#10402D;font-weight:bold",
      data,
    );
    await wait(CONFIG.form.demoDelay);
    return { ok: true, demo: true };
  }

  /* envío real */
  const res = await fetch(CONFIG.form.endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/* ---------- estado del botón ---------- */

function setLoading(button, loading) {
  if (!button) return;
  button.disabled = loading;
  button.querySelector("span").textContent = loading
    ? t("formSending")
    : t("formSubmit");
}
