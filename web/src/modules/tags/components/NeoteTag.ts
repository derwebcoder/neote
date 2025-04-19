import { DI } from "@/modules/dependency-injection";
import { TagIconMap } from "../config/TagIconConfig";
import { Tag } from "../models/Tag";
import { TagService } from "../services/TagService";
import "./NeoteTag.css";
import { CustomElement } from "@/modules/types/CustomElement";

type NeoteTagAttributes = {
  name: string;
};

export class NeoteTag extends HTMLElement implements NeoteTagAttributes {
  static observedAttributes = ["name"];
  private _name: string = "";
  private tag?: Tag;
  private tagService?: TagService;
  private unwatch?: () => void;
  private connected = false;

  constructor() {
    super();
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
    this.setAttribute("name", this._name);
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
      this.render();
      return;
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
    this.innerText =
      this.tag?.getName() ?? this.getAttribute("name") ?? "(unknown)";

    this.style.setProperty(
      "--icon",
      `url(data:image/svg+xml;utf8,${encodeURIComponent(TagIconMap[this.tag?.getIcon() ?? "hash"])})`,
    );

    this.style.setProperty("--hue-color", this.tag?.getHue().toString() ?? "1");
  }
}

customElements.define("neote-tag", NeoteTag);

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "neote-tag": CustomElement<NeoteTag, NeoteTagAttributes>;
    }
  }
}
