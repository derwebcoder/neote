import { Rectangle } from "electron"

export type Storage = {
  windowBounds?: {
    [name: string]: Rectangle
  }
}