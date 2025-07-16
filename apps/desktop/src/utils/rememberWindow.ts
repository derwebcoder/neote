import { BrowserWindow } from "electron";
import { getStorage, saveStorage } from "../storage";

export const rememberWindow = (id: string, window: BrowserWindow) => {
  const storage = getStorage()

  if (storage.windowBounds?.[id]) {
    window.setBounds(storage.windowBounds[id])
  }

  const handleClose = () => {
    storage.windowBounds = storage.windowBounds || {}
    storage.windowBounds[id] = window.getBounds()
    saveStorage(storage)
  }

  window.on('close', handleClose)

  return window
}