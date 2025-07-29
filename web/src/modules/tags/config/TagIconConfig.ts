// import { icons } from "feather-icons";
import * as icons from "lucide";

export const getDefaultIcon = (): keyof typeof TagIconMap => {
  return "hash";
};

const getSvgIcon = (icon: any) => {
  const svg = icons.createElement(icon);
  svg.setAttribute("width", "16");
  svg.setAttribute("height", "16");
  svg.setAttribute("stroke-width", "1.5");
  return svg.outerHTML;
};

export const TagIconMap = {
  "triangle-alert": getSvgIcon(icons.TriangleAlert),
  bookmark: getSvgIcon(icons.Bookmark),
  calendar: getSvgIcon(icons.Calendar),
  gift: getSvgIcon(icons.Gift),
  hash: getSvgIcon(icons.Hash),
  heart: getSvgIcon(icons.Heart),
  "circle-help": getSvgIcon(icons.CircleHelp),
  info: getSvgIcon(icons.Info),
  lock: getSvgIcon(icons.Lock),
  mail: getSvgIcon(icons.Mail),
  "map-pin": getSvgIcon(icons.MapPin),
  shield: getSvgIcon(icons.Shield),
  star: getSvgIcon(icons.Star),
  user: getSvgIcon(icons.User),
  users: getSvgIcon(icons.Users),
  zap: getSvgIcon(icons.Zap),
} as const;

export const TagIconNames = Object.keys(TagIconMap) as (keyof typeof TagIconMap)[];
