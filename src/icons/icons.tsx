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
  bellPepper: {
    source: IconSource.Png,
    url: "img/png/bell-pepper_chopped.png",
    borderColor: COLORS.GRAPH_NODE_VEGETABLE
  },
  "bellPepper.dice": {
    source: IconSource.Png,
    url: "img/png/bell-pepper_chopped.png",
    borderColor: COLORS.GRAPH_NODE_VEGETABLE
  },
  butter: {
    source: IconSource.Png,
    url: "img/png/butter.png",
    borderColor: COLORS.GRAPH_NODE_DAIRY
  },
  carrot: {
    source: IconSource.ReactIcon,
    reactIconType: FaCarrot,
    backgroundColor: COLORS.GRAPH_NODE_ICON_LIGHT,
    fill: "#ED9121",
    borderColor: COLORS.GRAPH_NODE_VEGETABLE,
    svgCss: ""
  },
  castIronPan: {
    source: IconSource.Png,
    borderColor: COLORS.GRAPH_NODE_CONTAINER,
    url: "img/png/cast-iron-pan.png"
  },
  cook: {
    source: IconSource.ReactIcon,
    reactIconType: GiCampCookingPot,
    backgroundColor: COLORS.GRAPH_NODE_ICON_LIGHT,
    fill: COLORS.GRAPH_COOK,
    borderColor: COLORS.GRAPH_COOK,
    svgCss: ""
  },
  chickenStock: {
    source: IconSource.Png,
    borderColor: COLORS.GRAPH_NODE_CONDIMENT,
    url: "img/png/chicken-stock.png"
  },
  corn: {
    source: IconSource.Png,
    borderColor: COLORS.GRAPH_NODE_VEGETABLE,
    url: "img/png/corn.png"
  },
  foodProcessor: {
    source: IconSource.Png,
    borderColor: COLORS.GRAPH_NODE_APPLIANCE,
    url: "img/png/food-processor.png"
  },
  fryingPan: {
    source: IconSource.Png,
    borderColor: COLORS.GRAPH_NODE_CONTAINER,
    url: "img/png/frying-pan.png"
  },
  garlic: {
    source: IconSource.Png,
    borderColor: COLORS.GRAPH_NODE_VEGETABLE,
    url: "img/png/garlic.png"
  },
  "garlic.dice": {
    source: IconSource.Png,
    borderColor: COLORS.GRAPH_NODE_VEGETABLE,
    url: "img/png/garlic_chopped.png"
  },
  lemon: {
    source: IconSource.Png,
    borderColor: COLORS.GRAPH_NODE_VEGETABLE,
    url: "img/png/lemon.png"
  },
  lemonZest: {
    source: IconSource.Png,
    borderColor: COLORS.GRAPH_NODE_VEGETABLE,
    url: "img/png/lemon-zest.png"
  },
  microwave: {
    source: IconSource.ReactIcon,
    reactIconType: MdOutlineMicrowave,
    backgroundColor: COLORS.GRAPH_NODE_ICON_LIGHT,
    fill: COLORS.GRAPH_NODE_APPLIANCE,
    borderColor: COLORS.GRAPH_NODE_APPLIANCE,
    svgCss: fryingPan
  },
  mozzarellaShredded: {
    source: IconSource.Png,
    url: "img/png/mozzarella_shredded.png",
    borderColor: COLORS.GRAPH_NODE_DAIRY
  },
  mushroom: {
    source: IconSource.Png,
    url: "img/png/mushroom.png",
    borderColor: COLORS.GRAPH_NODE_DAIRY
  },
  oliveOil: {
    source: IconSource.Png,
    url: "img/png/olive-oil.png",
    borderColor: COLORS.GRAPH_NODE_CONDIMENT
  },
  onion: {
    source: IconSource.Png,
    url: "img/png/onion.png",
    borderColor: COLORS.GRAPH_NODE_VEGETABLE
  },
  "onion.dice": {
    source: IconSource.Png,
    url: "img/png/onion_chopped.png",
    borderColor: COLORS.GRAPH_NODE_VEGETABLE
  },
  oven: {
    source: IconSource.Svg,
    url: "img/homestuff-svg/oven.svg",
    borderColor: COLORS.GRAPH_NODE_APPLIANCE
  },
  parmesean: {
    source: IconSource.Png,
    url: "img/png/parmesean.png",
    borderColor: COLORS.GRAPH_NODE_CONDIMENT
  },
  parsley: {
    source: IconSource.Png,
    url: "img/png/parsley.png",
    borderColor: COLORS.GRAPH_NODE_VEGETABLE
  },
  pepper: {
    source: IconSource.Png,
    url: "img/png/black-pepper.png",
    borderColor: COLORS.GRAPH_NODE_CONDIMENT
  },
  plate: {
    source: IconSource.Png,
    url: "img/png/plate.png",
    borderColor: COLORS.GRAPH_NODE_CONDIMENT
  },
  prep: {
    source: IconSource.ReactIcon,
    reactIconType: FaArrowAltCircleRight,
    backgroundColor: COLORS.GRAPH_NODE_ICON_LIGHT,
    fill: COLORS.GRAPH_ENDPOINT,
    borderColor: COLORS.GRAPH_ENDPOINT,
    svgCss: ""
  },
  prepBowl: {
    source: IconSource.Png,
    url: "img/png/prepBowl.png",
    borderColor: COLORS.GRAPH_NODE_CONTAINER
  },
  riceSushi: {
    source: IconSource.Png,
    url: "img/png/rice-sushi.png",
    borderColor: COLORS.GRAPH_NODE_CONDIMENT
  },
  salt: {
    source: IconSource.Png,
    url: "img/png/salt.png",
    borderColor: COLORS.GRAPH_NODE_CONDIMENT
  },
  saucepan: {
    source: IconSource.Png,
    url: "img/png/saucepan.png",
    borderColor: COLORS.GRAPH_NODE_CONTAINER
  },
  serve: {
    source: IconSource.ReactIcon,
    reactIconType: BiDish,
    backgroundColor: COLORS.GRAPH_NODE_ICON_LIGHT,
    fill: COLORS.GRAPH_ENDPOINT,
    borderColor: COLORS.GRAPH_ENDPOINT,
    svgCss: ""
  },
  shallot: {
    source: IconSource.Png,
    url: "img/png/shallot.png",
    borderColor: COLORS.GRAPH_NODE_VEGETABLE
  },
  "shallot.dice": {
    source: IconSource.Png,
    url: "img/png/shallot_chopped.png",
    borderColor: COLORS.GRAPH_NODE_VEGETABLE
  },
  sourCream: {
    source: IconSource.Png,
    url: "img/png/sour-cream.png",
    borderColor: COLORS.GRAPH_NODE_DAIRY
  },
  stove: {
    source: IconSource.ReactIcon,
    reactIconType: GiGasStove,
    backgroundColor: COLORS.GRAPH_NODE_ICON_LIGHT,
    fill: COLORS.GRAPH_NODE_APPLIANCE,
    borderColor: COLORS.GRAPH_NODE_APPLIANCE,
    svgCss: fryingPan
  },
  sugar: {
    source: IconSource.Png,
    url: "img/png/sugar.png",
    borderColor: COLORS.GRAPH_NODE_CONDIMENT
  },
  thyme: {
    source: IconSource.Png,
    url: "img/png/thyme.png",
    borderColor: COLORS.GRAPH_NODE_VEGETABLE
  },
  whiteWine: {
    source: IconSource.Png,
    url: "img/png/white-wine.png",
    borderColor: COLORS.GRAPH_NODE_CONDIMENT
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
