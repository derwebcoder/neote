import { Rectangle } from "electron"
import { SharedSettings } from "@neote/shared"

export type WindowBounds = {
  [name: string]: Rectangle
}

export type Storage = {
  windowBounds?: WindowBounds,
  settings: SharedSettings,
}