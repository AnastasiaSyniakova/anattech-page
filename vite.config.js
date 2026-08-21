import { defineConfig } from "vite";

/*
  base: le dice a Vite dónde vive el sitio dentro del dominio.

  Este proyecto usa un dominio propio (ver public/CNAME → anattech.com),
  así que vive en la raíz y base tiene que quedar en '/'.

  Si en algún momento se saca el CNAME y se vuelve a servir desde
  github.io/<usuario>/anattech-page/, hay que cambiar esto a
  '/anattech-page/' (debe coincidir EXACTAMENTE con el nombre del repo).
*/
export default defineConfig({
  base: "/",
});
