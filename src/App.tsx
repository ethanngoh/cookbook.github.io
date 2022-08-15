import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { ChecklistItem } from "./components/checklistItem";
import { CytoscapeBridge } from "./components/cytoscapeBridge";
import { convertToGraph } from "./recipeGraph/recipeReader";
import { toCytoscapeOptions } from "./recipeGraph/cytoscapeOptions";
import * as recipes from "./recipes.json";
import { useState } from "react";
import { CytoscapeNavLeft, CytoscapeNavRight } from "./components/cytoscapeNavigation";

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
  const [step, setStep] = useState(0);
  const recipe = recipes;
  const recipeGraph = convertToGraph(recipe);
  const [rNodes, rEdges] = recipeGraph.getRecipeStep(step);
  const cyOptions = toCytoscapeOptions(rNodes, rEdges);
  // debugger;

  return (
    <div
      className={css`
        display: flex;
        justify-content: left;
        align-items: top;
        overflow-y: hidden;
      `}
    >
      <CytoscapeBridge
        currentStep={step}
        setStep={setStep}
        maxStep={recipeGraph.maxSteps}
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
        <PreviousItems>
          <ChecklistItem>Debug</ChecklistItem>
          <ChecklistItem>Max Steps: {recipeGraph.maxSteps}</ChecklistItem>
          <ChecklistItem>Current Step: {step}</ChecklistItem>
        </PreviousItems>
      </Instructions>
    </div>
  );
};

export default App;
