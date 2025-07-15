# Learnings

## Custom Elements + Document Picture in Picture + React = Broken

Apparently it is not possible to register a custom element in another window when rendering it inside of react, at least not in the one returned by the documentpictureinpicture mode in Chromium.

This returns the following error:
```
Uncaught NotSupportedError: Failed to execute 'createElement' on 'Document': The result must be in the same document
    at completeWork (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=4947fdcd:8149:39)
    at runWithFiberInDEV (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=4947fdcd:1485:72)
    at completeUnitOfWork (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=4947fdcd:10976:22)
    at performUnitOfWork (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=4947fdcd:10882:29)
    at workLoopSync (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=4947fdcd:10728:43)
    at renderRootSync (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=4947fdcd:10711:13)
    at performWorkOnRoot (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=4947fdcd:10330:215)
    at performWorkOnRootViaSchedulerTask (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=4947fdcd:11623:9)
    at MessagePort.performWorkUntilDeadline (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=4947fdcd:36:50)
```

See https://github.com/facebook/react/issues/33783