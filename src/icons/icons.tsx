import { IconType } from "react-icons";
import { BiDish } from "react-icons/bi";
import { FaArrowAltCircleRight, FaCarrot } from "react-icons/fa";
import { GiGasStove } from "react-icons/gi";
import { MdOutlineMicrowave } from "react-icons/md";
import { COLORS, COLORS_1 } from "../colors";
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
    source: IconSource.Png,
    borderColor: COLORS.VEGETABLE,
    url: "img/png/corn.jpeg"
  },
  prep: {
    source: IconSource.ReactIcon,
    reactIconType: FaArrowAltCircleRight,
    backgroundColor: "#fff",
    fill: COLORS_1.GRAPH_ENDPOINT,
    borderColor: COLORS_1.GRAPH_ENDPOINT,
    svgCss: ""
  },
  serve: {
    source: IconSource.ReactIcon,
    reactIconType: BiDish,
    backgroundColor: "#fff",
    fill: COLORS_1.GRAPH_ENDPOINT,
    borderColor: COLORS_1.GRAPH_ENDPOINT,
    svgCss: ""
  },
  fryingPan: {
    source: IconSource.Png,
    borderColor: COLORS.CONTAINER,
    url: "img/png/frying-pan.png"
  },
  castIronPan: {
    source: IconSource.Png,
    borderColor: COLORS.CONTAINER,
    url: "img/png/cast-iron-pan.jpg"
  },
  shallot: {
    source: IconSource.Png,
    url: "img/png/shallot.jpeg",
    borderColor: COLORS.VEGETABLE
  },
  butter: {
    source: IconSource.Png,
    url: "img/png/butter.jpeg",
    borderColor: COLORS.DAIRY
  },
  pepper: {
    source: IconSource.Png,
    url: "img/png/black-pepper.jpeg",
    borderColor: COLORS.CONDIMENT
  },
  bellPepper: {
    source: IconSource.Png,
    url: "img/png/bell-pepper_chopped.jpeg",
    borderColor: COLORS.VEGETABLE
  },
  mozzarellaShredded: {
    source: IconSource.Png,
    url: "img/png/mozzarella_shredded.jpeg",
    borderColor: COLORS.DAIRY
  },
  salt: {
    source: IconSource.Png,
    url: "img/png/salt.jpeg",
    borderColor: COLORS.CONDIMENT
  },
  sourCream: {
    source: IconSource.Png,
    url: "img/png/sour-cream.jpeg",
    borderColor: COLORS.DAIRY
  },
  sugar: {
    source: IconSource.Png,
    url: "img/png/sugar.jpeg",
    borderColor: COLORS.CONDIMENT
  },
  stove: {
    source: IconSource.ReactIcon,
    reactIconType: GiGasStove,
    backgroundColor: "#fff",
    fill: COLORS.APPLIANCE,
    borderColor: COLORS.APPLIANCE,
    svgCss: fryingPan
  },
  microwave: {
    source: IconSource.ReactIcon,
    reactIconType: MdOutlineMicrowave,
    backgroundColor: "#fff",
    fill: COLORS.APPLIANCE,
    borderColor: COLORS.APPLIANCE,
    svgCss: fryingPan
  },
  prepBowl: {
    source: IconSource.Png,
    url: "img/png/prepBowl.png",
    borderColor: COLORS.CONTAINER
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

export function getIconStyle(iconName: string) {
  const anyIconInfo = ICONS[iconName];

  if (!anyIconInfo) {
    debugger;
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
      const reactIconInfo = anyIconInfo as ReactIconInfo;
      return {
        "background-image": reactIconInfo.svgCss,
        "border-color": reactIconInfo.borderColor
      };
    case IconSource.Svg:
      const svgIconInfo = anyIconInfo as SvgIconInfo;
      return {
        "background-image": svgIconInfo.url,
        "border-color": svgIconInfo.borderColor
      };
  }
}
