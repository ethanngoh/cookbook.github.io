import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { ChecklistItem } from "./components/checklistItem";
import { CytoscapeBridge } from "./components/cytoscapeBridge";
import { convertToGraph } from "./recipeGraph/recipeGraphReader";
import { toCytoscapeOptions } from "./recipeGraph/toCytoscape";
import * as recipes from "./recipes.json";

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
  width: 33vw;
  height: 100vh;
  overflow-y: auto;
  -webkit-overflow-scrolling: auto;
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
  const recipe = recipes;
  const recipeGraph = convertToGraph(recipe);
  const cyOptions = toCytoscapeOptions(recipeGraph.nodes, recipeGraph.edges);

  return (
    <div
      className={css`
        display: flex;
        justify-content: left;
        align-items: top;
        height: 100vh;
        overflow-y: hidden;
      `}
    >
      <CytoscapeBridge
        id={"cy"}
        nodes={cyOptions.nodes}
        edges={cyOptions.edges}
        style={cyOptions.style}
        layout={cyOptions.layout}
      />
      <Instructions>
        <h1
          className={css`
            font-size: 48px;
            font-family: "Lexend Deca", sans-serif;
            font-weight: 400;
          `}
        >
          {recipe.name}
        </h1>
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
