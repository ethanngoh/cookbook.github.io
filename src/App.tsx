import styled from "@emotion/styled";
import { useState } from "react";
import { COLORS } from "./colors";
import { CytoscapeBridge } from "./components/cytoscapeBridge";
import { CytoscapeControls } from "./components/cytoscapeControls";
import { Ingredients } from "./components/ingredients";
import { Instructions } from "./components/instructions";
import { Navigation } from "./components/navigation/navigation";
import { Pictures } from "./components/pictures";
import { TabControls } from "./components/tabControls";
import { useBackgroundColor } from "./hooks/useBackgroundColor";
import * as recipes from "./recipeData/recipeData";

import { toCytoscapeOptions } from "./recipeGraph/cytoscapeOptions";
import { convertToGraph } from "./recipeGraph/recipeReader";

const Container = styled.div`
  width: 100vw;
  // overflow: hidden;
  max-height: 100vh;
  max-width: 100vw;
`;

const CenteredPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
`;

const LeftPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
`;

const RecipeName = styled.h1`
  font-size: 48px;
  font-family: "Inter", sans-serif;
  font-weight: 400;
`;

const App = () => {
  useBackgroundColor(COLORS.BACKGROUND);
  const [currentStep, setStep] = useState(0);
  const [currentRecipe, setRecipe] = useState(recipes.cornCheese);
  const recipeGraph = convertToGraph(currentRecipe);
  const subGraph = recipeGraph.getRecipeStep(currentStep);
  const actions = recipeGraph.getRecipeActions(currentStep);
  const cyOptions = toCytoscapeOptions(subGraph.nodes, subGraph.edges);
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <>
      <Container>
        <Navigation setRecipe={setRecipe} />
        <CenteredPageContainer>
          <LeftPageContainer>
            <RecipeName>{currentRecipe.name}</RecipeName>
            <TabControls currentTab={currentTab} setCurrentTab={setCurrentTab}>
              <Instructions recipe={currentRecipe} currentStep={currentStep} actions={actions} />
              <Ingredients recipe={currentRecipe} />
              <Pictures images={currentRecipe.images} />
            </TabControls>
            {/* <DebugView recipeGraph={recipeGraph} currentStep={currentStep} /> */}
          </LeftPageContainer>
          <CytoscapeBridge
            id={"cy"}
            nodes={cyOptions.nodes}
            edges={cyOptions.edges}
            style={cyOptions.style}
            layout={cyOptions.layout}
          />
        </CenteredPageContainer>
        <CenteredPageContainer>
          <CytoscapeControls currentStep={currentStep} setStep={setStep} maxStep={recipeGraph.maxSteps} />
        </CenteredPageContainer>
      </Container>
    </>
  );
};

export default App;
