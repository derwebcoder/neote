import { BrowserWindow } from "electron";
import { getStorage, saveStorage } from "../storage";

export const rememberWindow = (id: string, window: BrowserWindow) => {
  const storage = getStorage()

  if (storage.windowBounds?.[id]) {
    window.setBounds(storage.windowBounds[id])
  }

  const handleClose = () => {
    const bounds = window.getBounds()
    if (bounds.width <= 140 || bounds.height <= 50) {
      return
    }
    storage.windowBounds = storage.windowBounds || {}
    storage.windowBounds[id] = bounds
    saveStorage(storage)
  }

  window.on('close', handleClose)

  return window
}