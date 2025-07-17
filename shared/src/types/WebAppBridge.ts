import { SharedSettings } from "./SharedSettings"

export type WebAppBridge = {
  isApp: boolean,
  window: {
    openFloatingEditor: () => void,
  },
  settings: {
    get: () => Promise<SharedSettings>,
    set: (settings: SharedSettings) => Promise<void>,
  }
}