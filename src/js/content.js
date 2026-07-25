/* ============================================================
   content.js
   ------------------------------------------------------------
   Los datos del sitio, separados de cómo se ven.
   Guardamos CLAVES de traducción, no texto: así el contenido
   funciona en cualquier idioma automáticamente.

   PARA AGREGAR UN PASO: sumás un objeto al array. Nada más.
   ============================================================ */

export const STATS = [
  { valor: 12, sufijo: "h", clave: "statHours" },
  { valor: 50, prefijo: "−", sufijo: "%", clave: "statNoShow" },
  { valor: 24, sufijo: "/7", clave: "statAlways" },
  { valor: 3, sufijo: " seg", clave: "statSpeed" },
];

export const PASOS = [
  { n: "01", titulo: "step1Title", texto: "step1Text" },
  { n: "02", titulo: "step2Title", texto: "step2Text" },
  { n: "03", titulo: "step3Title", texto: "step3Text" },
];

export const RUBROS = [
  { valor: "", clave: "sectorPlaceholder" },
  { valor: "salud", clave: "sectorHealth" },
  { valor: "educacion", clave: "sectorEdu" },
  { valor: "inmobiliaria", clave: "sectorReal" },
  { valor: "ecommerce", clave: "sectorShop" },
  { valor: "belleza", clave: "sectorBeauty" },
  { valor: "otro", clave: "sectorOther" },
];
