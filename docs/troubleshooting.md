# Some troubleshooting advice

## I don't see a custom component being rendered

The custom element probably wasn't properly rendered. Make sure to import the `defineX()` function from the custom element.

## There is only a black dot in place of a tag (or other custom element)

The `neote-tag` custom element has not been initialized correctly. It has an indirect dependency on the TagService being available in the dependency injection tool. Make sure to initialize it first and add it to the DI. See for example the Storybook story of the tags.

## The desktop app build only shows 'Not found' or a blank page

Something could be wrong with the tanstack setup in /web and how the page is loaded in `/apps/desktop`. 
First of all make sure both the `/web/vite.config.ts` and `/apps/desktop/vite.renderer.config.mts` share the same or similar config that's necessary to build.
Then check the tanstack initializer in `/web/src/main.tsx`. At the time of writing this we're using the HashHistory, meaning the corresponding pages created in `/web/routes` can be referenced using the hash, for example: `#/floating` (note the path format). In the desktop app, make sure the windows are all loading the same file `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html` and the hash is correctly configured.

## Something is wrong with the desktop app build

For debugging you can run `npm run package` in the desktop apps folder.
Then in a terminal execute `npx @electron/asar extract out/neote-darwin-arm64/neote.app/Contents/Resources/app.asar ./tmp` to unpack the neote.app and have a look at the vite build files in `./tmp`.

## neote was stopped unexpectedly - desktop app error

It could be that another window was still running and not exited correctly. Just ignore and try a second time.