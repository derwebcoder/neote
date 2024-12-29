/// <reference types="vitest/config" />

// Configure Vitest (https://vitest.dev/config/)

import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  // we ignore this error for now until vitest 3.0.0 is out
  // see https://github.com/vitest-dev/vitest/discussions/7075#discussioncomment-11541298
  test: {
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
    globals: true,
  },
  plugins: [tsconfigPaths()],
});
