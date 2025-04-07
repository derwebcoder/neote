import { html, render } from "lit-html";

export type Story = {
  title: string;
  order: number;
  render: (root: HTMLElement) => void;
};

export const getCenteredWrapper = () => {
  const container = document.createElement("div");
  render(
    html`
      <div
        style="
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          width: 100%;
          padding: 8px;
          box-sizing: border-box;
        "
      ></div>
    `,
    container,
  );
  const wrapper = container.querySelector("div");
  if (!wrapper) throw new Error("Wrapper not found");
  return wrapper;
};
