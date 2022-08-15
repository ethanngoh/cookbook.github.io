import { FaCarrot } from "react-icons/fa";
import { GiCorn } from "react-icons/gi";
import { IconType } from "react-icons";
import { COLORS } from "../colors";
import { svgForCssBackgroundImage } from "./svgIcon";

export interface IconInfo {
  iconType: IconType;
  backgroundColor: string;
  fill: string;
  borderColor: string;
  svgCss: string;
}

const ICONS: { [key: string]: IconInfo } = {
  carrot: { iconType: FaCarrot, backgroundColor: "#fff", fill: "#ED9121", borderColor: COLORS.VEGETABLE, svgCss: "" },
  corn: { iconType: GiCorn, backgroundColor: "#eee", fill: "#FBEC5D", borderColor: COLORS.VEGETABLE, svgCss: "" }
};

Object.keys(ICONS).forEach((e) => {
  const iconInfo = ICONS[e];
  const iconSvg = svgForCssBackgroundImage(iconInfo.iconType, iconInfo.backgroundColor, iconInfo.fill);
  iconInfo["svgCss"] = iconSvg;
});

export function getIcon(iconName: string) {
  return ICONS[iconName];
}
