import "@testing-library/jest-dom";
import "./NeoteHueSelect";
import { html, rawHtml } from "@neote/render";

describe("NeoteHueSelect", () => {
  it("should render", () => {
    const [wrapper] = html` <neote-hue-select></neote-hue-select> `;

    expect(rawHtml(wrapper)).toEqual(
      '<neote-hue-select><div class="color-wheel-wrapper"> <div class="color-wheel"></div> </div><input type="number" value="0"></neote-hue-select>',
    );
  });
});
