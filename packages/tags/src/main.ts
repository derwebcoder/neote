import { DI } from "@neote/dependency-injection";
import "./components/NeoteTag";
import "./components/NeoteHueSelect";
import "./components/NeoteTagStyleSelection";
import { TagService } from "./services/TagService";
import * as stories from "./stories";
import { html } from "@neote/render";

DI.inject("TagService", new TagService());

const app = document.getElementById("app");

if (!app) {
  throw new Error("#app missing in index.html");
}

const storiesSorted = Object.values(stories).sort((a, b) => a.order - b.order);
for (const story of storiesSorted) {
  const [wrapper, storyRoot] = html`
    <div class="story">
      <span>${story.title}</span>
      <div ref class="story-root"></div>
    </div>
  `;
  story.render(storyRoot);
  app.appendChild(wrapper);
}
