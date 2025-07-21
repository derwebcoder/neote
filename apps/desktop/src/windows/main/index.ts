import { BrowserWindow } from "electron";
import path from "node:path";
import { mainWindowAtom } from "../../state/windows";
import { rememberWindow } from "../../utils/rememberWindow";

export const createMainWindow = () => {
  const mainWindow = rememberWindow('main', new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  }))

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    // mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    mainWindow.loadURL("http://localhost:5173/");
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
  } else {
    // the neote-app protocol expects a bundle host and a path relative to the .vite/renderer output folder
    mainWindow.loadURL("neote-app://bundle/main_window/index.html");
  }

  mainWindowAtom.set(mainWindow)
}