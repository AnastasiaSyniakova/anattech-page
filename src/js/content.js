/* ============================================================
   content.js
   ------------------------------------------------------------
   Los datos del sitio, separados de cómo se ven.
   Guardamos CLAVES de traducción, no texto: así el contenido
   funciona en cualquier idioma automáticamente.

   PARA AGREGAR UN PASO: sumás un objeto al array. Nada más.
   ============================================================ */

export const STEPS = [
  {
    n: "01",
    titleKey: "step1Title",
    textKey: "step1Text",
    durationKey: "step1Duration",
  },
  {
    n: "02",
    titleKey: "step2Title",
    textKey: "step2Text",
    durationKey: "step2Duration",
  },
  {
    n: "03",
    titleKey: "step3Title",
    textKey: "step3Text",
    durationKey: "step3Duration",
  },
];

export const SECTORS = [
  { value: "", key: "sectorPlaceholder" },
  { value: "salud", key: "sectorHealth" },
  { value: "educacion", key: "sectorEdu" },
  { value: "inmobiliaria", key: "sectorReal" },
  { value: "ecommerce", key: "sectorShop" },
  { value: "belleza", key: "sectorBeauty" },
  { value: "otro", key: "sectorOther" },
];
