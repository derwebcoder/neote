import { rawHtml } from "./rawHtml";

describe("rawHtml", () => {
  it("should cleanup any unnecessary whitespace in an html string", () => {
    const input = `
      <html>
        <head>
          <title>Hello world</title>
        </head>
        <body>
          <div class="hello world">good</div>
          <aside data-test="aside">
            <span>let it be</span>
            <span>tonight</span>
          </aside>
        </body>
      </html>
    `;
    const output =
      '<html> <head> <title>Hello world</title> </head> <body> <div class="hello world">good</div> <aside data-test="aside"> <span>let it be</span> <span>tonight</span> </aside> </body> </html>';

    expect(rawHtml(input)).toEqual(output);
  });

  it("should return clean html for an HTMLElement", () => {
    const wrapper = document.createElement("div");
    wrapper.setAttribute("id", "wrapper");

    const span = document.createElement("span");
    span.className = "text-sm bold";

    wrapper.appendChild(span);

    const output = '<div id="wrapper"><span class="text-sm bold"></span></div>';

    expect(rawHtml(wrapper)).toEqual(output);
  });
});
