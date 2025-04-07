import { rawHtml } from "../utils/rawHtml";
import { html, render } from "lit-html";

describe("html", () => {
  it("should render stuff", () => {
    const container = document.createElement("div");
    render(
      html`
        <div class="hello">
          <span>This is a ${"test"}</span>
        </div>
      `,
      container,
    );
    const wrapper = container.querySelector("div");
    if (!wrapper) throw new Error("Wrapper not found");

    expect(rawHtml(wrapper)).toEqual(
      '<div class="hello"> <span>This is a test</span> </div>',
    );
  });

  it("should render stuff and return refs", () => {
    const container = document.createElement("div");
    render(
      html`
        <div class="hello">
          <span>This is a test</span>
          <span ref data-test="hellos">This is another span</span>
          <p>This is <b ref>interesting</b>.</p>
        </div>
      `,
      container,
    );
    const wrapper = container.querySelector("div");
    if (!wrapper) throw new Error("Wrapper not found");
    const span = container.querySelector('[data-test="hellos"]');
    const b = container.querySelector("b");
    if (!span || !b) throw new Error("Required elements not found");

    expect(rawHtml(wrapper)).toEqual(
      '<div class="hello"> <span>This is a test</span> <span data-test="hellos">This is another span</span> <p>This is <b>interesting</b>.</p> </div>',
    );
    expect(span.textContent).toEqual("This is another span");
    expect(b.innerHTML).toEqual("interesting");
  });

  it("should render stuff and return refs even with expressions", () => {
    const expression = "awesome";
    const container = document.createElement("div");
    render(
      html`
        <aside>
          <h1>Test 123</h1>
          <p>
            This is <span ref data-reference="feeling">${expression}</span>.
          </p>
        </aside>
      `,
      container,
    );
    const wrapper = container.querySelector("aside");
    if (!wrapper) throw new Error("Wrapper not found");
    const span = container.querySelector('[data-reference="feeling"]');
    if (!span) throw new Error("Required elements not found");

    expect(rawHtml(wrapper)).toEqual(
      '<aside> <h1>Test 123</h1> <p>This is <span data-reference="feeling">awesome</span>.</p> </aside>',
    );
    expect(span.innerHTML).toEqual("awesome");
    expect(span.getAttribute("data-reference")).toEqual("feeling");
  });
});
