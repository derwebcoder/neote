import { BrowserEnvironment } from "$/types/Environments"

export const getBrowserEnvironment = (): BrowserEnvironment => {
  return {
    isApp: false,
  }
}