import { FaCarrot, FaArrowAltCircleRight } from "react-icons/fa";
import { GiCorn, GiGasStove, GiSaucepan } from "react-icons/gi";
import { IconType } from "react-icons";
import { COLORS } from "../colors";
import { iconToSvgString, svgForCssBackgroundImage } from "./svgReactIcon";
import { fryingPan } from "./svgRaws";
import { MdOutlineMicrowave } from "react-icons/md";

export enum IconSource {
  Svg = "svg",
  Png = "png",
  ReactIcon = "ReactIcon"
}

export interface IconInfo {
  source: IconSource;
  borderColor: string;
}

export interface SvgIconInfo extends IconInfo {
  backgroundColor: string;
  fill: string;
  svgCss: string;
}

export interface ReactIconInfo extends SvgIconInfo {
  reactIconType: IconType;
}

export interface PngIconInfo extends IconInfo {
  url: string;
}

type AnyIconInfo = SvgIconInfo | ReactIconInfo | PngIconInfo;

const ICONS: { [key: string]: AnyIconInfo } = {
  carrot: {
    source: IconSource.ReactIcon,
    reactIconType: FaCarrot,
    backgroundColor: "#fff",
    fill: "#ED9121",
    borderColor: COLORS.VEGETABLE,
    svgCss: ""
  },
  corn: {
    source: IconSource.ReactIcon,
    reactIconType: GiCorn,
    backgroundColor: "#eee",
    fill: "#FBEC5D",
    borderColor: COLORS.VEGETABLE,
    svgCss: ""
  },
  start: {
    source: IconSource.ReactIcon,
    reactIconType: FaArrowAltCircleRight,
    backgroundColor: "#fff",
    fill: COLORS.START,
    borderColor: COLORS.START,
    svgCss: ""
  },
  frying_pan: {
    source: IconSource.ReactIcon,
    reactIconType: GiSaucepan,
    backgroundColor: "#fff",
    fill: COLORS.BLACK,
    borderColor: COLORS.BLACK,
    svgCss: fryingPan
  },
  shallot: {
    source: IconSource.Png,
    url: "https://live.staticflickr.com/1261/1413379559_412a540d29_b.jpg",
    borderColor: COLORS.VEGETABLE
  },
  stove: {
    source: IconSource.ReactIcon,
    reactIconType: GiGasStove,
    backgroundColor: "#fff",
    fill: COLORS.BLACK,
    borderColor: COLORS.BLACK,
    svgCss: fryingPan
  },
  microwave: {
    source: IconSource.ReactIcon,
    reactIconType: MdOutlineMicrowave,
    backgroundColor: "#fff",
    fill: COLORS.BLACK,
    borderColor: COLORS.BLACK,
    svgCss: fryingPan
  }
};

Object.keys(ICONS).forEach((e) => {
  const iconInfo = ICONS[e];
  if (iconInfo.source == IconSource.ReactIcon) {
    const reactIconInfo = iconInfo as ReactIconInfo;
    const iconSvg = iconToSvgString(reactIconInfo.reactIconType, reactIconInfo.backgroundColor, reactIconInfo.fill);
    reactIconInfo.svgCss = svgForCssBackgroundImage(iconSvg);
  }
});

export function getNodeStyle(iconName: string) {
  const anyIconInfo = ICONS[iconName];
  if (!anyIconInfo) {
    return {
      "background-image": "https://live.staticflickr.com/7272/7633179468_3e19e45a0c_b.jpg",
      "border-color": "black"
    };
  }

  switch (anyIconInfo.source) {
    case IconSource.Png:
      const pngIconInfo = anyIconInfo as PngIconInfo;
      return {
        "background-image": pngIconInfo.url,
        "border-color": pngIconInfo.borderColor
      };
    case IconSource.ReactIcon:
    case IconSource.Svg:
      const svgIconInfo = anyIconInfo as SvgIconInfo;
      return {
        "background-image": svgIconInfo.svgCss,
        "border-color": svgIconInfo.borderColor
      };
  }
}
