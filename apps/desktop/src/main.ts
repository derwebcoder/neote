import { app, BrowserWindow, ipcMain } from "electron";
import path from "node:path";
import started from "electron-squirrel-startup";
import OpenAI from "openai";
import { createMainWindow } from "./windows/main";
import { loadStorage } from "./storage";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  const openai = new OpenAI({
    baseURL: "http://localhost:11434/v1/",
    // required but ignored
    apiKey: "ollama",
  });

  ipcMain.handle("ai:chatCompletion", async (event, messages) => {
    try {
      const completion = await openai.chat.completions.create({
        model: "llama3.2",
        messages,
      });
      return completion.choices[0].message;
    } catch (error) {
      return false;
    }
  });

  ipcMain.handle("window:openFloatingEditor", async (event, messages) => {
    const floatingWindow = new BrowserWindow({
      width: 1000,
      height: 600,
      // remove the default titlebar
      titleBarStyle: 'hidden',
      // expose window controls in Windows/Linux
      ...(process.platform !== 'darwin' ? { titleBarOverlay: true } : {}),
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
      },
    });

    // see https://www.electronjs.org/docs/latest/api/base-window#winsetalwaysontopflag-level-relativelevel
    floatingWindow.setAlwaysOnTop(true, 'floating')

    floatingWindow.setOpacity(1)

    floatingWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true })
  
    // and load the index.html of the app.
    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
      // mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
      floatingWindow.loadURL("http://localhost:5173/floating");
      floatingWindow.webContents.openDevTools();
    } else {
      floatingWindow.loadFile(
        path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/floating.html`),
      );
    }
  });

  loadStorage()
  createMainWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
