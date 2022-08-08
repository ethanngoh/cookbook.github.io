import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { Sprite, Stage } from "react-pixi-fiber/index.js";
import * as PIXI from "pixi.js";
import { FaBeer } from "react-icons/fa";
import { IconType } from "react-icons";
import { ChecklistItem } from "./components/checklistItem";

function iconToSvgString(iconType: IconType, size: number) {
  var svgPath = iconType({ size: size });
  var pathD = svgPath.props.children[0].props.d;
  var viewBox = svgPath.props.attr.viewBox;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}"> 
    <path fill="#000000" d="${pathD}">
    </path>
  </svg>`;

  console.log(svg);
  // console.log(renderToString(svgPath));
  // return renderToString(svgPath);
  return svg;
}

function Icon(props: any) {
  const b = iconToSvgString(FaBeer, 150);
  return <Sprite texture={PIXI.Texture.from(b)} height={props.size} width={props.size} {...props} />;
}

const size = {
  kindleFire: [1920, 1200],
  ipad: [2048, 1536]
};

export function getWindowSize() {
  var width = window.innerWidth > 0 ? window.innerWidth : window.screen.width;
  var height = window.innerHeight > 0 ? window.innerHeight : window.screen.height;
  return {
    width: width,
    height: height
  };
}

const Instructions = styled.div`
  display: flex;
  flex-direction: column;
  width: 33%;
`;
const PreviousItems = styled.div`
  color: #ccc;
  font-family: "Inter", sans-serif;
  font-size: 1.5em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;

const CurrentItems = styled.div`
  color: #000;
  font-family: "Inter", sans-serif;
  font-size: 1.5em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  margin: 1em 0;
`;

const App = () => {
  const window = getWindowSize();

  return (
    <div
      className={css`
        display: flex;
        justify-content: left;
        align-items: top;
        width: 90%;
      `}
    >
      {/* <Stage options={{ backgroundColor: 0x777777, width: (window.width / 3) * 2, height: window.height * 0.9 }}>
        <Icon x={0} y={0} size={60} />
        <Icon x={400} y={400} size={40} />
      </Stage> */}
      <Instructions>
        <h1>Food name</h1>
        <PreviousItems>
          <ChecklistItem>step 1</ChecklistItem>
          <ChecklistItem>step 2</ChecklistItem>
          <ChecklistItem>step 3</ChecklistItem>
        </PreviousItems>
        <CurrentItems>
          <ChecklistItem>step 1</ChecklistItem>
          <ChecklistItem>step 2</ChecklistItem>
          <ChecklistItem>step 3</ChecklistItem>
        </CurrentItems>
        <PreviousItems>
          <ChecklistItem>step 1</ChecklistItem>
          <ChecklistItem>step 2</ChecklistItem>
          <ChecklistItem>step 3</ChecklistItem>
        </PreviousItems>
      </Instructions>
    </div>
  );
};

export default App;
