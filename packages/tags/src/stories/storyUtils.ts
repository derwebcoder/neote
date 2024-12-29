export type Story = {
  title: string;
  order: number;
  render: (root: HTMLElement) => void;
};

export const getCenteredWrapper = () => {
  const wrapper = document.createElement("div");
  wrapper.style.display = "flex";
  wrapper.style.justifyContent = "center";
  wrapper.style.alignItems = "center";
  wrapper.style.height = "100%";
  wrapper.style.width = "100%";
  wrapper.style.padding = "8px";
  wrapper.style.boxSizing = "border-box";
  return wrapper;
};
