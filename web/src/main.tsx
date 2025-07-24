import { StrictMode } from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createRouter,
  createHashHistory,
} from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { DI } from "@/modules/dependency-injection";
import { NoteDB } from "@/modules/notes/db/NoteDB";
import { NoteService } from "@/modules/notes/services/NoteService";
import { TagDB, TagService } from "@/modules/tags";
import { initEnvironment, isAppEnvironment } from "@/modules/environment";
import { initSettingsStore } from "@/modules/settings/stores/settingsStore";

initEnvironment()

if (isAppEnvironment()) {
  window.document.body.classList.add('is-app')
}

// We need hash routing for the desktop app
const hashHistory = createHashHistory();

// Create a new router instance
const router = createRouter({ routeTree, history: hashHistory });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

initSettingsStore()

  ; (async () => {

    const noteDB = new NoteDB();
    const noteService = new NoteService(noteDB);
    DI.inject("NoteService", noteService);
    const tagDB = new TagDB();
    const tagService = await TagService.construct(tagDB);
    DI.inject("TagService", tagService);

    (window as any).DI = DI;

    // Render the app
    const rootElement = document.getElementById("root")!;
    if (!rootElement.innerHTML) {
      const root = ReactDOM.createRoot(rootElement);
      root.render(
        <StrictMode>
          <RouterProvider router={router} />
        </StrictMode>,
      );
    }

    // const log = document.getElementById("log")!
    // log.style.display = "block";
    // log.innerHTML = `hash: ${window.location.hash}`;
  })()
