import { defineWorkspace } from "vitest/config";

// see https://vitest.dev/guide/workspace#defining-a-workspace
export default defineWorkspace([
  "/config/*/vite.config.ts",
  "/packages/*/vite.config.ts",
  "/apps/*/vite.config.ts",
]);
