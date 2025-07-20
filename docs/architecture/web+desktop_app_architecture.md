# Web + Desktop App Architecture Explained

While `/web` contains the main application, the same one is also used for the `/apps/desktop` setup.

## Development

During development it is required to run the `/web` frontend using `npm run dev` as the windows in the desktop app currently load the `http://localhost:5173` url.

## Build

Both use `vite` as their build tool (on the desktop side we're using the electron forge + vite boilerplate), that means it's easy to share the same configuration in the `/web/vite.config.ts` and `/apps/desktop/vite.renderer.config.mts`.

The most important bit is the configuration of the vite renderer in the desktop app. It simply points the `root` to the `/web` folder. And it will generate the build files at the `"../apps/desktop/.vite/renderer/main_window"` location to make sure that electron forge picks this up when packaging the app.

This means we have a single static build of the web app with an `index.html` file as the root. This file will then be loaded in the production builds of the desktop app.

As we're using tanstack router with the HashHistory configuration, we can supply a path in form of a hash value when loading the file inside of a browser window.

## Data and Messaging

We use the common `ipcMain` handler for receiving messages in the main thread and the common `contextBridge` to provide data from main to the renderer thread and invoke the `ipcMain` handler.

## Troubleshooting

See [troubleshooting.md](../troubleshooting.md)