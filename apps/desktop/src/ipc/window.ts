import { ipcMain } from "electron";
import { createFloatingWindow } from "../windows/floating";

export const registerWindowIPC = () => {
  ipcMain.handle("window:openFloatingEditor", async (event, messages) => {
    createFloatingWindow()
  });
}