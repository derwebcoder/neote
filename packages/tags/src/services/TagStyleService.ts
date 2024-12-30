import {
  getDefaultTagStyle,
  TagStyle,
  TagStyles,
} from "../config/TagStyleConfig";

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
    localStorage.setItem(this.LS_KEY, style);
    this.init();
  }

  private load(): TagStyle {
    const storedValue = localStorage.getItem(this.LS_KEY);
    if (!storedValue || !TagStyles.includes(storedValue as TagStyle)) {
      return getDefaultTagStyle();
    }
    return storedValue as TagStyle;
  }
}
