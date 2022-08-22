export enum ColorKey {
  PRIMARY = "PRIMARY",
  BACKGROUND = "BACKGROUND"
}

export type ColorPalette = {
  [key in ColorKey]: string;
};

export const COLORS = {
  NAVY: "#15214B",
  WHITE: "#FFFFFF",
  BLACK: "#000000",
  VEGETABLE: "#3C891A",
  DAIRY: "#D3C3C3",
  CONDIMENT: "#b59672",
  CONTAINER: "#000",
  APPLIANCE: "#000",
  ENDPOINT: "#84CE31",
  COMBINE: "#31CECA",
  SAUTE: "#CE3135",
  TRANSFER: "#BBB"
};

export const COLORS_1 = {
  BACKGROUND: "#FFFFFF",
  BACKGROUND2: "#fbf6f0",
  BACKGROUND3: "#DDD",
  PRIMARY: "#3a1c36",
  INGREDIENT: "#F9CBAD",
  COOK: "#A35E77",
  CONTAINER: "#B6BCB1",
  TIME: "#BDA3AC",
  SOMENICEGREEN: "#51734e",
  SOMEPOOPGREEN: "#A8A543",
  SOMECORIANDERGREEN: "#6C9C34",
  BACKGROUND_ALT: "#FFFAF4",
  BACKGROUND_EMPH: "#FFF2E0",
  BACKGROUND_EMPH2: "#FFE5C2",
  TOMATO: "#da3e3f"
};

export const LIGHT_COLORS: ColorPalette = {
  PRIMARY: "#15214B",
  BACKGROUND: "#FFFFFF"
};

export const DARK_COLORS: ColorPalette = {
  PRIMARY: "#6E78A6",
  BACKGROUND: "#15214B"
};

export function getColor(colorKey: keyof ColorPalette) {
  var prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDarkScheme ? DARK_COLORS[colorKey] : LIGHT_COLORS[colorKey];
}
