import { StrictMode } from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createRouter,
  createMemoryHistory,
} from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { DI } from "@/modules/dependency-injection";
import { NoteDB } from "@/modules/notes/db/NoteDB";
import { NoteService } from "@/modules/notes/services/NoteService";
import { TagDB, TagService } from "@/modules/tags";
import { getBrowserEnvironment, isAppEnvironment } from "@/lib/environmentUtils";

// If neote exists, it means we are in the desktop app
// and it was set by the preload script
if (!window.neote) {
  window.neote = getBrowserEnvironment()
}

if (isAppEnvironment(window.neote)) {
  window.document.body.classList.add('is-app')
}

// We need memory routing for the desktop app
const memoryHistory = createMemoryHistory({
  initialEntries: [window.location.pathname], // Pass your initial url
});
// Create a new router instance
const router = createRouter({ routeTree, history: memoryHistory });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

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
