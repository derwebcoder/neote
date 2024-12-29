import feather from "feather-icons";

export const getDefaultIcon = (): keyof typeof TagIconMap => {
  return "hash";
};

export const TagIconMap = {
  "alert-triangle": feather.icons["alert-triangle"].toSvg({
    width: 16,
    height: 16,
    "stroke-width": 1.5,
  }),
  bookmark: feather.icons["bookmark"].toSvg({
    width: 16,
    height: 16,
    "stroke-width": 1.5,
  }),
  calendar: feather.icons["calendar"].toSvg({
    width: 16,
    height: 16,
    "stroke-width": 1.5,
  }),
  gift: feather.icons["gift"].toSvg({
    width: 16,
    height: 16,
    "stroke-width": 1.5,
  }),
  hash: feather.icons["hash"].toSvg({
    width: 16,
    height: 16,
    "stroke-width": 1.5,
  }),
  heart: feather.icons["heart"].toSvg({
    width: 16,
    height: 16,
    "stroke-width": 1.5,
  }),
  "help-circle": feather.icons["help-circle"].toSvg({
    width: 16,
    height: 16,
    "stroke-width": 1.5,
  }),
  info: feather.icons["info"].toSvg({
    width: 16,
    height: 16,
    "stroke-width": 1.5,
  }),
  lock: feather.icons["lock"].toSvg({
    width: 16,
    height: 16,
    "stroke-width": 1.5,
  }),
  mail: feather.icons["mail"].toSvg({
    width: 16,
    height: 16,
    "stroke-width": 1.5,
  }),
  "map-pin": feather.icons["map-pin"].toSvg({
    width: 16,
    height: 16,
    "stroke-width": 1.5,
  }),
  shield: feather.icons["shield"].toSvg({
    width: 16,
    height: 16,
    "stroke-width": 1.5,
  }),
  star: feather.icons["star"].toSvg({
    width: 16,
    height: 16,
    "stroke-width": 1.5,
  }),
  user: feather.icons["user"].toSvg({
    width: 16,
    height: 16,
    "stroke-width": 1.5,
  }),
  users: feather.icons["users"].toSvg({
    width: 16,
    height: 16,
    "stroke-width": 1.5,
  }),
  zap: feather.icons["zap"].toSvg({
    width: 16,
    height: 16,
    "stroke-width": 1.5,
  }),
} as const;
