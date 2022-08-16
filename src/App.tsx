import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { useState } from "react";
import { ChecklistItem } from "./components/checklistItem";
import { CytoscapeBridge } from "./components/cytoscapeBridge";
import { Navigation } from "./components/navigation/navigation";
import { toCytoscapeOptions } from "./recipeGraph/cytoscapeOptions";
import { InstructionText } from "./recipeGraph/instructionText";
import { convertToGraph } from "./recipeGraph/recipeReader";
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
const NonCurrentItems = styled.ol`
  font-family: "Inter", sans-serif;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  opacity: 0.5;
`;

const Container = styled.div`
  width: 100vw;
  overflow: hidden;
  max-height: 100vh;
  max-width: 100vw;
`;

const CurrentItems = styled.ol`
  color: #000;
  font-family: "Inter", sans-serif;
  font-size: 1.5em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  margin: 1em 0;
`;

const CenteredPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const App = () => {
  const [step, setStep] = useState(0);
  const recipe = recipes;
  const recipeGraph = convertToGraph(recipe);
  const subGraph = recipeGraph.getRecipeStep(step);
  const actions = subGraph.getRecipeActions(step);
  const cyOptions = toCytoscapeOptions(subGraph.nodes, subGraph.edges);

  return (
    <Container>
      <Navigation />
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
          <NonCurrentItems>
            {actions.prev.map((e) => {
              return (
                <ChecklistItem>
                  <InstructionText recipeAction={e} recipe={recipe} />
                </ChecklistItem>
              );
            })}
          </NonCurrentItems>
          <CurrentItems>
            <ChecklistItem>
              <InstructionText recipeAction={actions.current} recipe={recipe} />
            </ChecklistItem>
          </CurrentItems>
          <NonCurrentItems>
            {actions.next.map((e) => {
              return (
                <ChecklistItem>
                  <InstructionText recipeAction={e} recipe={recipe} />
                </ChecklistItem>
              );
            })}
          </NonCurrentItems>
          <hr />
          <br />
          <NonCurrentItems>
            <ChecklistItem>Debug</ChecklistItem>
            <ChecklistItem>Max Steps: {recipeGraph.maxSteps}</ChecklistItem>
            <ChecklistItem>Current Step: {step}</ChecklistItem>
          </NonCurrentItems>
        </Instructions>
      </div>
    </Container>
  );
};

export default App;
