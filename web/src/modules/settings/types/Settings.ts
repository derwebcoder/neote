import { SharedSettings } from "@neote/shared";

export type Settings = {
  general: {
    animations: {
      enabled: boolean
    },
  }
} & SharedSettings