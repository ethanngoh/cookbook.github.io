import { IconType } from "react-icons";

interface ViewBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

function zoomSvg(viewBox: ViewBox, zoomFactor: number) {
  const newWidth = viewBox.width / zoomFactor;
  const newHeight = viewBox.height / zoomFactor;

  viewBox.x = (viewBox.width - newWidth) / 2;
  viewBox.y = (viewBox.height - newHeight) / 2;
  viewBox.width = newWidth;
  viewBox.height = newHeight;
  return viewBox;
}

export function iconToSvgString(iconType: IconType, backgroundColor: string = "#fff", fill: string = "#000") {
  var svgPath = iconType({});
  var pathD = svgPath.props.children[0].props.d;
  var viewBoxRaw = svgPath.props.attr.viewBox;

  const pattern: RegExp = /(\d+) (\d+) (\d+) (\d+)?/g;
  const match = pattern.exec(viewBoxRaw);
  if (!match) {
    console.log(`invalid viewBox string ${viewBoxRaw}`);
    return "";
  }

  var viewBox: ViewBox = {
    x: parseInt(match[1]),
    y: parseInt(match[2]),
    width: parseInt(match[3]),
    height: parseInt(match[4])
  };

  viewBox = zoomSvg(viewBox, 0.6);

  const svg = `<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE svg>
    <svg xmlns='http://www.w3.org/2000/svg' width="${viewBox.width}px" height="${viewBox.height}px" viewBox="${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}" style="background-color:${backgroundColor}"> 
      <path fill="${fill}" d="${pathD}">
      </path>
    </svg>`;

  return svg;
}

export function svgForCssBackgroundImage(svgXml: string) {
  const svg = encodeURIComponent(svgXml);
  const ret = `url('data:image/svg+xml;utf8,${svg}')`;
  return ret;
}
