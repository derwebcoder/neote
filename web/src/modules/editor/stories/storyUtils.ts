import { html } from "@/modules/render";

export type Story = {
  title: string;
  order: number;
  render: (root: HTMLElement) => void;
};

export const getCenteredWrapper = () => {
  const [wrapper] = html`
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
  `;
  return wrapper;
};
