/* ============================================================
   content.js
   ------------------------------------------------------------
   Los datos del sitio, separados de cómo se ven.
   Guardamos CLAVES de traducción, no texto: así el contenido
   funciona en cualquier idioma automáticamente.

   PARA AGREGAR UN PASO: sumás un objeto al array. Nada más.
   ============================================================ */

export const STATS = [
  { value: 12, suffix: "h", key: "statHours" },
  { value: 50, prefix: "−", suffix: "%", key: "statNoShow" },
  { value: 24, suffix: "/7", key: "statAlways" },
  { value: 3, suffixKey: "statSpeedSuffix", key: "statSpeed" },
];

export const STEPS = [
  { n: "01", titleKey: "step1Title", textKey: "step1Text" },
  { n: "02", titleKey: "step2Title", textKey: "step2Text" },
  { n: "03", titleKey: "step3Title", textKey: "step3Text" },
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
