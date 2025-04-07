import { html, render } from "lit-html";

const app = document.querySelector("#app");

const container = document.createElement("div");
render(
  html`
    <div>
      <h1>Hello World</h1>
      <p>The fact that this is working is awesome!</p>
    </div>
  `,
  container,
);

const wrapper = container.querySelector("div");
if (!wrapper) throw new Error("Wrapper not found");
app?.appendChild(wrapper);
