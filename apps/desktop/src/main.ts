import { app, BrowserWindow, protocol } from "electron";
import started from "electron-squirrel-startup";
import { createMainWindow } from "./windows/main";
import { loadStorage } from "./storage";
import { registerSettingsIPC } from "./ipc/settings";
import { registerAIIPC } from "./ipc/ai";   
import { registerWindowIPC } from "./ipc/window";
import { registerNeoteAppProtocol } from "./protocols/neote-app";

// we should register a custom protocol to fulfill this security advice: 
// https://www.electronjs.org/docs/latest/tutorial/security#18-avoid-usage-of-the-file-protocol-and-prefer-usage-of-custom-protocols
// and therefore also be able to disable fuse FuseV1Options.GrantFileProtocolExtraPrivileges
protocol.registerSchemesAsPrivileged([
  {
    scheme: 'neote-app',
    privileges: {
      standard: true,
      secure: true,
      supportFetchAPI: true,

    }
  }
])

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {

  registerNeoteAppProtocol()

  registerAIIPC()
  registerWindowIPC()
  registerSettingsIPC()

  loadStorage()

  createMainWindow()
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
