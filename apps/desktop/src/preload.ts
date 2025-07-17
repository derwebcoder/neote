// See the Electron documentation for details on how to use preload scripts:

import { ipcRenderer } from "electron";
import OpenAI from "openai";
import { Settings } from "./types/storage";

// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("neote", {
  isApp: true,
  ai: {
    chatCompletion: (
      messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[],
    ) => {
      return ipcRenderer.invoke("ai:chatCompletion", messages);
    },
  },
  window: {
    openFloatingEditor: () => {
      return ipcRenderer.invoke("window:openFloatingEditor");
    },
  },
  settings: {
    get: () => ipcRenderer.invoke("settings:get"),
    set: (settings: Settings) => ipcRenderer.invoke("settings:set", settings),
  }
});
