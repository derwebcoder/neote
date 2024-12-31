import {
  getDefaultTagStyle,
  TagStyle,
  TagStyles,
} from "../config/TagStyleConfig";
import { local } from "../utils/localStorage";

export class TagStyleService {
  private LS_KEY = "tag_style";
  private state: TagStyle;
  private root: HTMLElement = document.body;

  constructor() {
    this.state = this.load();
  }

  public init(root?: HTMLElement) {
    if (root) {
      this.root = root;
    }

    this.root.setAttribute("data-tag-style", this.state);
  }

  public getStyle() {
    return this.state;
  }

  public updateStyle(style: TagStyle) {
    this.state = style;
    local.set(this.LS_KEY, style);
    this.init();
  }

  private load(): TagStyle {
    const storedValue = local.get(this.LS_KEY);
    if (!storedValue || !TagStyles.includes(storedValue as TagStyle)) {
      return getDefaultTagStyle();
    }
    return storedValue as TagStyle;
  }
}
