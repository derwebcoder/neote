// See the Electron documentation for details on how to use preload scripts:

import { ipcRenderer } from "electron";
import OpenAI from "openai";

// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  // we can also expose variables, not just functions
});

contextBridge.exposeInMainWorld("neote", {
  ai: {
    chatCompletion: (
      messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[],
    ) => {
      return ipcRenderer.invoke("ai:chatCompletion", messages);
    },
  },
});
