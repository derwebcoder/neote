import { WebAppBridge } from "@neote/shared";

export type AppEnvironment = WebAppBridge & {
  isApp: true,
}

export type BrowserEnvironment = {
  isApp: false
}

export type Environment = AppEnvironment | BrowserEnvironment;