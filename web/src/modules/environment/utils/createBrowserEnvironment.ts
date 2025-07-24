import { BrowserEnvironment } from "$/types/Environments"

export const createBrowserEnvironment = (): BrowserEnvironment => {
  return {
    isApp: false,
  }
}