import "./components/NeoteEditor";
import "./components/NeoteTagSuggestions";
import * as stories from "./stories";
import "./index.css";
import { html, render } from "lit-html";

(async () => {
  const app = document.getElementById("app");

  if (!app) {
    throw new Error("#app missing in index.html");
  }

  const storiesSorted = Object.values(stories).sort(
    (a, b) => a.order - b.order,
  );
  for (const story of storiesSorted) {
    const container = document.createElement("div");
    render(
      html`
        <div class="story">
          <span>${story.title}</span>
          <div class="story-root"></div>
        </div>
      `,
      container,
    );
    const wrapper = container.querySelector(".story");
    const storyRoot = container.querySelector(".story-root");
    if (!wrapper || !storyRoot) throw new Error("Required elements not found");
    story.render(storyRoot as HTMLElement);
    app.appendChild(wrapper);
  }
})();
