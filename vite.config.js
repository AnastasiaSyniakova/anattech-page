import { defineConfig } from "vite";

/*
  base: le dice a Vite que el sitio NO vive en la raíz del dominio,
  sino en un subdirectorio — que es como funcionan los GitHub Pages
  de un repositorio (a diferencia de un usuario/organización).

  DEBE coincidir EXACTAMENTE con el nombre de tu repo, entre barras.
  Repo: anattech-page  →  base: '/anattech-page/'
*/
export default defineConfig({
  base: "/",
});
