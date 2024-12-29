import { html } from "./lib/html";

const app = document.querySelector("#app");

const [wrapper] = html`
  <div style="">
    <h1>Hello World</h1>
    <p>The fact that this is working is awesome!</p>
  </div>
`;

app?.appendChild(wrapper);
