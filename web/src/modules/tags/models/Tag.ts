import { TagIconMap } from "../config/TagIconConfig";

export class Tag {
  constructor(
    private name: string,
    private description: string = "",
    private icon: keyof typeof TagIconMap = "hash",
    private hue: number = 0,
    private state: "draft" | "stored" = "draft",
  ) {}

  public getName() {
    return this.name;
  }

  public getDescription() {
    return this.description;
  }

  public setDescription(description: string) {
    this.description = description;
  }

  public getIcon() {
    return this.icon;
  }

  public setIcon(icon: keyof typeof TagIconMap) {
    this.icon = icon;
  }

  public getHue() {
    return this.hue;
  }

  public setHue(hue: number) {
    this.hue = hue;
  }

  public getState() {
    return this.state;
  }

  public setState(state: "draft" | "stored") {
    this.state = state;
  }
}

export type TagBasic = {
  description: string;
  icon: string;
  hue: number;
};

export type TagExistingDocument = PouchDB.Core.ExistingDocument<TagBasic>;
export type TagDocument = PouchDB.Core.Document<TagBasic>;
