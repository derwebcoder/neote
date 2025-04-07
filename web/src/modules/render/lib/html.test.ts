import { rawHtml } from "../utils/rawHtml";
import { html } from "./html";

describe("html", () => {
  it("should render stuff", () => {
    const [wrapper] = html`
      <div class="hello">
        <span>This is a ${"test"}</span>
      </div>
    `;
    expect(rawHtml(wrapper)).toEqual(
      '<div class="hello"> <span>This is a test</span> </div>',
    );
  });

  it("should render stuff and return refs", () => {
    const [wrapper, span, b] = html`
      <div class="hello">
        <span>This is a test</span>
        <span ref data-test="hellos">This is another span</span>
        <p>This is <b ref>interesting</b>.</p>
      </div>
    `;

    expect(rawHtml(wrapper)).toEqual(
      '<div class="hello"> <span>This is a test</span> <span data-test="hellos">This is another span</span> <p>This is <b>interesting</b>.</p> </div>',
    );
    expect(span.textContent).toEqual("This is another span");
    expect(b.innerHTML).toEqual("interesting");
  });

  it("should render stuff and return refs even with expressions", () => {
    const expression = "awesome";
    const [wrapper, span] = html`
      <aside>
        <h1>Test 123</h1>
        <p>This is <span ref data-reference="feeling">${expression}</span>.</p>
      </aside>
    `;

    expect(rawHtml(wrapper)).toEqual(
      '<aside> <h1>Test 123</h1> <p>This is <span data-reference="feeling">awesome</span>.</p> </aside>',
    );
    expect(span.innerHTML).toEqual("awesome");
    expect(span.getAttribute("data-reference")).toEqual("feeling");
  });
});
