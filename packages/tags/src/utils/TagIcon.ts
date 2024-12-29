import { TagIconMap } from "../config/TagIconConfig";
import { Cache } from "./Cache";

export class TagIcon extends Cache<string, keyof typeof TagIconMap> {
  public default(): keyof typeof TagIconMap {
    return "hash";
  }
}
