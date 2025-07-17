import { BrowserWindow, screen } from "electron";
import path from "node:path";
import { floatingWindowAtom, mainWindowAtom } from "../../state/windows";
import { rememberWindow } from "../../utils/rememberWindow";
import { getSettings } from "../../storage";


export const createFloatingWindow = () => {
  const currentScreen = screen.getDisplayNearestPoint(mainWindowAtom.get()?.getBounds() || { x: 0, y: 0 })
  const floatingWindow = rememberWindow('floating', new BrowserWindow({
    x: currentScreen.size.width - 400,
    y: currentScreen.size.height - 200,
    width: 380,
    height: 180,
    parent: mainWindowAtom.get() || undefined,
    // remove the default titlebar
    titleBarStyle: 'hidden',
    // expose window controls in Windows/Linux
    ...(process.platform !== 'darwin' ? { titleBarOverlay: true } : {}),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  }));

  // see https://www.electronjs.org/docs/latest/api/base-window#winsetalwaysontopflag-level-relativelevel
  floatingWindow.setAlwaysOnTop(true, 'floating')

  floatingWindow.setOpacity(getSettings().floatingWindow.opacity)

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

  floatingWindowAtom.set(floatingWindow)
}