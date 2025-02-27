import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  // we point this to our web project folder
  root: "../web/",
  plugins: [react()],
  build: {
    // this is relative to the `root` directory, so we need to go back to our desktop folder
    // and in the original VitePlugin of Forge, this is a string template that receives the
    // renderer name, see https://github.com/electron/forge/blob/main/packages/plugin/vite/src/config/vite.renderer.config.ts#L15C15-L15C39
    // As we only have one renderer in our case, we're fine with hard coding the name here.
    outDir: "../desktop/.vite/renderer/main_window",
  },
  server: {
    watch: {
      // Enable HMR whenever one of the other packages is updated
      ignored: ["!**/node_modules/@neote/**"],
    },
  },
});
