import { ipcMain } from "electron";
import { getSettings, setSettings } from "../storage";
import { SharedSettings } from "@neote/shared";

export const registerSettingsIPC = () => {
  ipcMain.handle("settings:get", () => getSettings())
  ipcMain.handle("settings:set", (event, settings: SharedSettings) => setSettings(settings))
}