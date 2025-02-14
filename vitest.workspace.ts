import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  "./packages/editor/vite.config.ts",
  "./packages/dependency-injection/vite.config.ts",
  "./packages/tags/vite.config.ts",
  "./packages/render/vite.config.ts"
])
