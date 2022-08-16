export enum FontKey {
  BODY = "BODY",
  HEADING = "HEADING"
}

export type FontPalette = {
  [key in FontKey]: string;
};

export const FONT_PALETTE_1: FontPalette = {
  BODY: '"Inter", sans-serif',
  HEADING: "Lexend Deca"
};

export function getFont(fontKey: keyof FontPalette) {
  return FONT_PALETTE_1[fontKey];
}
