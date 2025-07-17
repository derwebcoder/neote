import { ipcMain } from "electron";
import { getSettings, setSettings } from "../storage";
import { Settings } from "../types/storage";

export const registerSettingsIPC = () => {
  ipcMain.handle("settings:get", () => getSettings())
  ipcMain.handle("settings:set", (event, settings: Settings) => setSettings(settings))
}