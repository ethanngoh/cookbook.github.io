import { FaCarrot, FaArrowAltCircleRight } from "react-icons/fa";
import { GiCorn, GiSaucepan } from "react-icons/gi";
import { IconType } from "react-icons";
import { COLORS } from "../colors";
import { iconToSvgString, svgForCssBackgroundImage } from "./svgReactIcon";

export interface IconInfo {
  reactIconType: IconType;
  backgroundColor: string;
  fill: string;
  borderColor: string;
  svgCss: string;
}

const ICONS: { [key: string]: IconInfo } = {
  carrot: {
    reactIconType: FaCarrot,
    backgroundColor: "#fff",
    fill: "#ED9121",
    borderColor: COLORS.VEGETABLE,
    svgCss: ""
  },
  corn: { reactIconType: GiCorn, backgroundColor: "#eee", fill: "#FBEC5D", borderColor: COLORS.VEGETABLE, svgCss: "" },
  start: {
    reactIconType: FaArrowAltCircleRight,
    backgroundColor: "#fff",
    fill: COLORS.START,
    borderColor: COLORS.START,
    svgCss: ""
  },
  frying_pan: {
    reactIconType: GiSaucepan,
    backgroundColor: "#fff",
    fill: COLORS.BLACK,
    borderColor: COLORS.BLACK,
    svgCss: ""
  }
};

Object.keys(ICONS).forEach((e) => {
  const iconInfo = ICONS[e];
  const iconSvg = iconToSvgString(iconInfo.reactIconType, iconInfo.backgroundColor, iconInfo.fill);
  iconInfo["svgCss"] = svgForCssBackgroundImage(iconSvg);
});

export function getIcon(iconName: string) {
  return ICONS[iconName];
}
