import "@testing-library/jest-dom";
import "./NeoteHueSelect";
import { html, rawHtml } from "@neote/render";

describe("NeoteTag", () => {
  it("should render", () => {
    const [wrapper] = html`<neote-tag name="mytag"></neote-tag>`;

    expect(rawHtml(wrapper)).toEqual('<neote-tag name="mytag"></neote-tag>');
  });
});
