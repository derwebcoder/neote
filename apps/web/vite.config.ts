import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// !!! Whatever we update here, we probably also want to update in ..desktop/vite.renderer.config.ts

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      // Enable HMR whenever one of the other packages is updated
      ignored: ["!**/node_modules/@neote/**"],
    },
  },
});
