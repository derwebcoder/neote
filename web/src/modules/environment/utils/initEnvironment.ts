import { createBrowserEnvironment } from "$/utils/createBrowserEnvironment"

export const initEnvironment = () => {
  // If neote exists, it means we are in the desktop app
  // because it was set by the preload script
  // otherwise we create it with the browser environment defaults
  if (!window.neote) {
    window.neote = createBrowserEnvironment()
  }
}