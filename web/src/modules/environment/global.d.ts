import { Environment } from "$/types/Environments";

declare global {
  interface Window {
    neote?: Environment
  }
}

export type { }