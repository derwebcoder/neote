import type { Globals } from "@neote/types/globals";

declare global {
  interface Window {
    neote: Globals;
    bus: "factor";
  }
}
