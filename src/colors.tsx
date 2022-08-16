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
  START: "#006600"
};

export const COLORS_1 = {
  BACKGROUND: "#FFFFFF",
  BACKGROUND2: "#F9EEE7",
  PRIMARY: "#553C3A",
  INGREDIENT: "#F9CBAD",
  COOK: "#A35E77",
  CONTAINER: "#B6BCB1",
  TIME: "#BDA3AC",
  SOMENICEGREEN: "#799576",
  SOMEPOOPGREEN: "#A8A543",
  SOMECORIANDERGREEN: "#6C9C34",
  BACKGROUND_ALT: "#FFFAF4",
  BACKGROUND_EMPH: "#FFF2E0",
  BACKGROUND_EMPH2: "#FFE5C2"
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
