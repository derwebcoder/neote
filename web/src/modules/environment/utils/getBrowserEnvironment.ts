import { BrowserEnvironment } from "@/modules/environment/types/Environments"

export const getBrowserEnvironment = (): BrowserEnvironment => {
  return {
    isApp: false,
  }
}