import { protocol, net } from "electron";
import path from "path";
import { pathToFileURL } from "url";

export const registerNeoteAppProtocol = () => {
  // copied from https://www.electronjs.org/docs/latest/api/protocol#protocolhandlescheme-handler
  protocol.handle('neote-app', (req) => {
    const { host, pathname } = new URL(req.url)
    // bundle is just a random host name coming right after the protocol
    if (host !== 'bundle') {
      return new Response('bad', {
        status: 400,
        headers: { 'content-type': 'text/html' }
      })
    }

    // This checks for paths that escape the bundle, e.g.
    // neote-app://bundle/renderer/../../secret_file.txt
    // First we need to define the safe base path as the .vite/renderer output folder.
    // __dirname (the location of the electron main build file) is pointing to .vite/build 
    // That means we need to go up one level to get to the .vite/renderer output folder.
    const viteOutputFolder = path.join(__dirname, '../renderer')
    // we concatenate the viteOutputFolder with the relative pathname
    const pathToServe = path.join(viteOutputFolder, pathname)
    // we check if the pathToServe is inside the viteOutputFolder by returning the relative path
    const relativePath = path.relative(viteOutputFolder, pathToServe)
    // if the relative path begins with .. it means it tries to go out of the .vite/renderer folder
    // which we want to prevent to avoid security issues
    const isSafe = relativePath && !relativePath.startsWith('..') && !path.isAbsolute(relativePath)
    const fileUrl = pathToFileURL(pathToServe).toString()
    if (!isSafe) {
      return new Response(`neote error: bad file loading url`, {
      // return new Response(`dirname: ${__dirname}, pathToServe: ${pathToServe}, relativePath: ${relativePath}, isSafe: ${isSafe}, pathToFileURL: ${fileUrl}`, {
        status: 400,
        headers: { 'content-type': 'text/html' },
      })
    }

    return net.fetch(fileUrl)
  })
}