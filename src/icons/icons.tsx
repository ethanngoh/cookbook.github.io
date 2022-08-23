import { IconType } from "react-icons";
import { BiDish } from "react-icons/bi";
import { FaArrowAltCircleRight, FaCarrot } from "react-icons/fa";
import { GiCampCookingPot, GiGasStove } from "react-icons/gi";
import { MdOutlineMicrowave } from "react-icons/md";
import { COLORS } from "../colors";
import { fryingPan } from "./svgRaws";
import { iconToSvgString, svgForCssBackgroundImage } from "./svgReactIcon";

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
  url: string;
}

export interface ReactIconInfo extends IconInfo {
  backgroundColor: string;
  fill: string;
  reactIconType: IconType;
  svgCss: string;
}

export interface PngIconInfo extends IconInfo {
  url: string;
}

type AnyIconInfo = SvgIconInfo | ReactIconInfo | PngIconInfo;

export const ICONS: { [key: string]: AnyIconInfo } = {
  carrot: {
    source: IconSource.ReactIcon,
    reactIconType: FaCarrot,
    backgroundColor: COLORS.GRAPH_NODE_ICON_LIGHT,
    fill: "#ED9121",
    borderColor: COLORS.GRAPH_NODE_VEGETABLE,
    svgCss: ""
  },
  corn: {
    source: IconSource.Png,
    borderColor: COLORS.GRAPH_NODE_VEGETABLE,
    url: "img/png/corn.jpeg"
  },
  prep: {
    source: IconSource.ReactIcon,
    reactIconType: FaArrowAltCircleRight,
    backgroundColor: COLORS.GRAPH_NODE_ICON_LIGHT,
    fill: COLORS.GRAPH_ENDPOINT,
    borderColor: COLORS.GRAPH_ENDPOINT,
    svgCss: ""
  },
  cook: {
    source: IconSource.ReactIcon,
    reactIconType: GiCampCookingPot,
    backgroundColor: COLORS.GRAPH_NODE_ICON_LIGHT,
    fill: COLORS.GRAPH_COOK,
    borderColor: COLORS.GRAPH_COOK,
    svgCss: ""
  },
  serve: {
    source: IconSource.ReactIcon,
    reactIconType: BiDish,
    backgroundColor: COLORS.GRAPH_NODE_ICON_LIGHT,
    fill: COLORS.GRAPH_ENDPOINT,
    borderColor: COLORS.GRAPH_ENDPOINT,
    svgCss: ""
  },
  fryingPan: {
    source: IconSource.Png,
    borderColor: COLORS.GRAPH_NODE_CONTAINER,
    url: "img/png/frying-pan.png"
  },
  castIronPan: {
    source: IconSource.Png,
    borderColor: COLORS.GRAPH_NODE_CONTAINER,
    url: "img/png/cast-iron-pan.jpg"
  },
  shallot: {
    source: IconSource.Png,
    url: "img/png/shallot.jpeg",
    borderColor: COLORS.GRAPH_NODE_VEGETABLE
  },
  "shallot.dice": {
    source: IconSource.Png,
    url: "img/png/shallot_chopped.jpeg",
    borderColor: COLORS.GRAPH_NODE_VEGETABLE
  },
  butter: {
    source: IconSource.Png,
    url: "img/png/butter.jpeg",
    borderColor: COLORS.GRAPH_NODE_DAIRY
  },
  pepper: {
    source: IconSource.Png,
    url: "img/png/black-pepper.jpeg",
    borderColor: COLORS.GRAPH_NODE_CONDIMENT
  },
  bellPepper: {
    source: IconSource.Png,
    url: "img/png/bell-pepper_chopped.jpeg",
    borderColor: COLORS.GRAPH_NODE_VEGETABLE
  },
  "bellPepper.dice": {
    source: IconSource.Png,
    url: "img/png/bell-pepper_chopped.jpeg",
    borderColor: COLORS.GRAPH_NODE_VEGETABLE
  },
  mozzarellaShredded: {
    source: IconSource.Png,
    url: "img/png/mozzarella_shredded.jpeg",
    borderColor: COLORS.GRAPH_NODE_DAIRY
  },
  salt: {
    source: IconSource.Png,
    url: "img/png/salt.jpeg",
    borderColor: COLORS.GRAPH_NODE_CONDIMENT
  },
  sourCream: {
    source: IconSource.Png,
    url: "img/png/sour-cream.jpeg",
    borderColor: COLORS.GRAPH_NODE_DAIRY
  },
  sugar: {
    source: IconSource.Png,
    url: "img/png/sugar.jpeg",
    borderColor: COLORS.GRAPH_NODE_CONDIMENT
  },
  stove: {
    source: IconSource.ReactIcon,
    reactIconType: GiGasStove,
    backgroundColor: COLORS.GRAPH_NODE_ICON_LIGHT,
    fill: COLORS.GRAPH_NODE_APPLIANCE,
    borderColor: COLORS.GRAPH_NODE_APPLIANCE,
    svgCss: fryingPan
  },
  microwave: {
    source: IconSource.ReactIcon,
    reactIconType: MdOutlineMicrowave,
    backgroundColor: COLORS.GRAPH_NODE_ICON_LIGHT,
    fill: COLORS.GRAPH_NODE_APPLIANCE,
    borderColor: COLORS.GRAPH_NODE_APPLIANCE,
    svgCss: fryingPan
  },
  prepBowl: {
    source: IconSource.Png,
    url: "img/png/prepBowl.png",
    borderColor: COLORS.GRAPH_NODE_CONTAINER
  }
};

Object.keys(ICONS).forEach((e) => {
  const iconInfo = ICONS[e];
  if (iconInfo.source === IconSource.ReactIcon) {
    const reactIconInfo = iconInfo as ReactIconInfo;
    const iconSvg = iconToSvgString(reactIconInfo.reactIconType, reactIconInfo.backgroundColor, reactIconInfo.fill);
    reactIconInfo.svgCss = svgForCssBackgroundImage(iconSvg);
  }
});
