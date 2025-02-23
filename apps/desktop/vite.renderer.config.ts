import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    // Ensure Vite pre-bundles the external package correctly.
    include: ["events", "spark-md5", "vuvuzela", "remove-accents", "react-dom"],
  },
  server: {
    watch: {
      ignored: ["!**/node_modules/@neote/**"],
    },
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
      // This flag forces a default export to be added if the imported module is only named
      requireReturnsDefault: "auto",
    },
  },
});
