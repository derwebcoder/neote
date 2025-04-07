import "@testing-library/jest-dom";
import { html, render } from "lit-html";
import "./NeoteHueSelect";

describe("NeoteHueSelect", () => {
  it("should render", async () => {
    const container = document.createElement("div");
    render(html`<neote-hue-select></neote-hue-select>`, container);
    const wrapper = container.querySelector("neote-hue-select");
    if (!wrapper) throw new Error("Wrapper not found");

    expect(wrapper.outerHTML).toEqual(
      '<neote-hue-select><div class="color-wheel-wrapper"> <div class="color-wheel"></div> </div><input type="number" value="0"></neote-hue-select>',
    );
  });
});
