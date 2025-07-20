// See the Electron documentation for details on how to use preload scripts:

import { ipcRenderer } from "electron";
import { SharedSettings, WebAppBridge } from "@neote/shared";

// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("neote", {
  isApp: true,
  window: {
    openFloatingEditor: () => {
      return ipcRenderer.invoke("window:openFloatingEditor");
    },
  },
  settings: {
    get: () => ipcRenderer.invoke("settings:get"),
    set: (settings: SharedSettings) => ipcRenderer.invoke("settings:set", settings),
  }
} satisfies WebAppBridge);
