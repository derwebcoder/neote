import { TagIconMap } from "../config/TagIconMap";

export class Tag {
  constructor(
    public name: string,
    public description: string = "",
    public icon: keyof typeof TagIconMap = "hash",
  ) {}
}
