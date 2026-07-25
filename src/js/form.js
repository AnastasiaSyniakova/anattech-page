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

  const exito = document.getElementById("formSuccess");
  const boton = document.getElementById("submitBtn");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (form._gotcha.value) return; // bot detectado, ignorar en silencio
    if (!validar(form)) return;

    setCargando(boton, true);

    try {
      await enviar(new FormData(form));

      form.hidden = true;
      exito.hidden = false;
      exito.scrollIntoView({ behavior: "smooth", block: "center" });
    } catch (err) {
      console.error("Error al enviar:", err);
      alert(t("formError"));
    } finally {
      setCargando(boton, false);
    }
  });

  /* limpiar el error apenas el usuario corrige */
  form.addEventListener("input", (e) => {
    e.target.closest(".field")?.classList.remove("is-invalid");
  });
}

/* ---------- validación ---------- */

function validar(form) {
  let ok = true;

  form
    .querySelectorAll(".field")
    .forEach((f) => f.classList.remove("is-invalid"));

  if (form.nombre.value.trim().length < 2) {
    marcarError(form.nombre);
    ok = false;
  }
  if (!contactoValido(form.contacto.value)) {
    marcarError(form.contacto);
    ok = false;
  }
  if (!form.rubro.value) {
    marcarError(form.rubro);
    ok = false;
  }

  return ok;
}

function marcarError(input) {
  input.closest(".field")?.classList.add("is-invalid");
}

function contactoValido(valor) {
  const v = valor.trim();
  const esEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
  const esTelefono = /^[\d\s+()\-]{8,}$/.test(v);
  return esEmail || esTelefono;
}

/* ---------- envío ---------- */

async function enviar(formData) {
  const datos = Object.fromEntries(formData);
  delete datos._gotcha;

  /* modo demo: todavía no hay endpoint */
  if (!CONFIG.form.endpoint) {
    console.log(
      "%c[DEMO] Datos del formulario:",
      "color:#10402D;font-weight:bold",
      datos,
    );
    await esperar(CONFIG.form.demoDelay);
    return { ok: true, demo: true };
  }

  /* envío real */
  const res = await fetch(CONFIG.form.endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(datos),
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

/* ---------- estado del botón ---------- */

function setCargando(boton, cargando) {
  if (!boton) return;
  boton.disabled = cargando;
  boton.querySelector("span").textContent = cargando
    ? t("formSending")
    : t("formSubmit");
}
