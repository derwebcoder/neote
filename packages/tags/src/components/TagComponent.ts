import { DI } from "@neote/dependency-injection";
import { TagIconMap } from "../config/TagIconConfig";
import { Tag } from "../models/Tag";
import { TagService } from "../services/TagService";

export class TagComponent extends HTMLElement {
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
    console.log("load", this.tag);

    this.unwatch = this.tagService.watch(name, (tag) => {
      this.tag = tag;
      this.render();
    });

    this.render();
  }

  private async render() {
    if (!this.tag) {
      console.log("render none");
      this.innerText = "";
      return;
    }
    console.log("render", this.tag);
    this.innerText = this.tag.name;

    this.style.setProperty(
      "--icon",
      `url(data:image/svg+xml;utf8,${encodeURIComponent(TagIconMap[this.tag.icon])})`,
    );

    this.style.setProperty("--hue-color", this.tag.hue.toString());
  }
}

customElements.define("neote-tag", TagComponent);
