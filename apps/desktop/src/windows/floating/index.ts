import { BrowserWindow, Rectangle, screen } from "electron";
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
    // parent: mainWindowAtom.get() || undefined,
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

  floatingWindow.setOpacity(getSettings().floatingWindow.opacity / 100)

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

  let previousBounds: Rectangle | null = null
  floatingWindow.on('focus', () => {
    if (getSettings().floatingWindow.opaqueOnFocus) {
      floatingWindow.setOpacity(1)
    }
    if (getSettings().floatingWindow.shrinkOnBlur) {
      if (!previousBounds) {
        return
      }
      setTimeout(() => {
        if (!previousBounds) {
          return
        }
        floatingWindow.setBounds(previousBounds, true)
      }, 100)
    }
  })
  floatingWindow.on('blur', () => {
    if (getSettings().floatingWindow.opaqueOnFocus) {
      floatingWindow.setOpacity(getSettings().floatingWindow.opacity / 100)
    }
    if (getSettings().floatingWindow.shrinkOnBlur) {
      previousBounds = floatingWindow.getBounds()
      const { x, y, width, height } = previousBounds
      const display = screen.getDisplayMatching(previousBounds)
      const { x: dx, y: dy, width: dw, height: dh } = display.workArea
      const shrinkWidth = 145
      const shrinkHeight = 50
      // Find center of window
      const centerX = x + width / 2
      const centerY = y + height / 2
      // Find center of display
      const displayCenterX = dx + dw / 2
      const displayCenterY = dy + dh / 2
      // Determine quadrant
      let newX = x
      let newY = y
      if (centerX < displayCenterX && centerY < displayCenterY) {
        // Top-left: keep top-left corner
        newX = x
        newY = y
      } else if (centerX >= displayCenterX && centerY < displayCenterY) {
        // Top-right: keep top-right corner
        newX = x + (width - shrinkWidth)
        newY = y
      } else if (centerX < displayCenterX && centerY >= displayCenterY) {
        // Bottom-left: keep bottom-left corner
        newX = x
        newY = y + (height - shrinkHeight)
      } else {
        // Bottom-right: keep bottom-right corner
        newX = x + (width - shrinkWidth)
        newY = y + (height - shrinkHeight)
      }
      floatingWindow.setBounds({ x: Math.round(newX), y: Math.round(newY), width: shrinkWidth, height: shrinkHeight }, true)
    }
  })

  floatingWindowAtom.set(floatingWindow)
}