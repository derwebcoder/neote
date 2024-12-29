import { TagIconMap } from "../config/TagIconConfig";

export class Tag {
  constructor(
    public name: string,
    public description: string = "",
    public icon: keyof typeof TagIconMap = "hash",
    public hue: number = 0,
    public state: "draft" | "stored",
  ) {}
}

export type TagBasic = {
  description: string;
  icon: string;
  hue: number;
};

export type TagExistingDocument = PouchDB.Core.ExistingDocument<TagBasic>;
export type TagDocument = PouchDB.Core.Document<TagBasic>;
