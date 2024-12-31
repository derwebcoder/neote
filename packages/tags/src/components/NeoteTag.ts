import { DI } from "@neote/dependency-injection";
import { TagIconMap } from "../config/TagIconConfig";
import { Tag } from "../models/Tag";
import { TagService } from "../services/TagService";
import "./NeoteTag.css";

export class NeoteTag extends HTMLElement {
  static observedAttributes = ["name"];
  private tag?: Tag;
  private tagService?: TagService;
  private unwatch?: () => void;
  private connected = false;

  constructor() {
    super();
  }

  connectedCallback() {
    this.load(this.getAttribute("name"));
    this.connected = true;
  }

  disconnectedCallback() {
    this.unwatch?.();
  }

  adoptedCallback() {
    this.render();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (!this.connected) {
      return;
    }
    if (name === "name" && oldValue !== newValue) {
      this.load(newValue);
    }
  }

  private async load(name: string | null) {
    this.unwatch?.();

    if (!name) {
      throw new Error("neote-tag: attribute 'name' is required");
    }

    this.tagService = await DI.resolveAsync("TagService");
    this.tag = this.tagService.get(name);

    this.unwatch = this.tagService.observe(name, (tag) => {
      this.tag = tag;
      this.render();
    });

    this.render();
  }

  private async render() {
    if (!this.tag) {
      this.innerText = "";
      return;
    }
    this.innerText = this.tag.getName();

    this.style.setProperty(
      "--icon",
      `url(data:image/svg+xml;utf8,${encodeURIComponent(TagIconMap[this.tag.getIcon()])})`,
    );

    this.style.setProperty("--hue-color", this.tag.getHue().toString());
  }
}

customElements.define("neote-tag", NeoteTag);
