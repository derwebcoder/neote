import { create } from "@storybook/theming";

// see https://storybook.js.org/docs/configure/user-interface/theming
export default create({
  base: "light",
  brandTitle: "Neote Design System",
  brandUrl: "",
  brandImage: "",
  brandTarget: "",

  //
  colorPrimary: "#3A10E5",
  colorSecondary: "#585C6D",

  // UI
  appBg: "#ffffff",
  appContentBg: "#ffffff",
  appPreviewBg: "#ffffff",
  appBorderColor: "#ffffff",
  appBorderRadius: 4,

  // Toolbar default and active colors
  barTextColor: "#9E9E9E",
  barSelectedColor: "#585C6D",
  barHoverColor: "#585C6D",
  barBg: "#ffffff",

  // Form colors
  inputBg: "#ffffff",
  inputBorder: "#10162F",
  inputTextColor: "#10162F",
  inputBorderRadius: 2,
});
