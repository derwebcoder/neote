import { Rectangle } from "electron"

export type WindowBounds = {
  [name: string]: Rectangle
}

export type Settings = {
  floatingWindow: {
    opacity: number,
    opaqueOnFocus: boolean,
    shrinkOnBlur: boolean,
  }
}

export type Storage = {
  windowBounds?: WindowBounds,
  settings: Settings,
}