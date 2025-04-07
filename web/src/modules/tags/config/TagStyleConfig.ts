export const TagStyles = [
  "basic",
  "chip-light",
  "chip-dark",
  "chip-border",
  "chip-icon-light",
  "chip-icon-dark",
  "neon",
  "token-gradient-light",
  "token-gradient-dark",
] as const;

export type TagStyle = (typeof TagStyles)[number];

export const getDefaultTagStyle = (): TagStyle => "chip-light";

export const TagStyleNameMap: Record<TagStyle, string> = {
  basic: "Basic",
  "chip-light": "Chip (light)",
  "chip-dark": "Chip (dark)",
  "chip-border": "Chip outline",
  "chip-icon-light": "Chip icon (light)",
  "chip-icon-dark": "Chip icon (border)",
  "token-gradient-light": "Token gradient (light)",
  "token-gradient-dark": "Token gradient (dark)",
  neon: "Neon",
};
