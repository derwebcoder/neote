import { createAtom } from "@xstate/store";
import { BrowserWindow } from "electron";

export const mainWindowAtom = createAtom<BrowserWindow | null>(null)

export const floatingWindowAtom = createAtom<BrowserWindow | null>(null)