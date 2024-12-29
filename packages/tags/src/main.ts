import { DI } from "@neote/dependency-injection";
import "./components/NeoteTag";
import "./components/NeoteHueSelect";
import { TagService } from "./services/TagService";
import * as stories from "./stories";

DI.inject("TagService", new TagService());

const app = document.getElementById("app");

if (!app) {
  throw new Error("#app missing in index.html");
}
const storiesSorted = Object.values(stories).sort((a, b) => a.order - b.order);
for (const story of storiesSorted) {
  const storyWrapper = document.createElement("div");
  storyWrapper.classList.add("story");
  const root = document.createElement("div");
  root.classList.add("story-root");
  const title = document.createElement("span");
  title.innerText = story.title;
  storyWrapper.appendChild(title);
  storyWrapper.appendChild(root);
  story.render(root);
  app.appendChild(storyWrapper);
}
