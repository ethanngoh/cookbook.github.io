import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { useState } from "react";
import { COLORS_1 } from "./colors";
import { CytoscapeBridge } from "./components/cytoscapeBridge";
import { CytoscapeControls } from "./components/cytoscapeControls";
import { Instructions } from "./components/instructions";
import { Navigation } from "./components/navigation/navigation";
import { useBackgroundColor } from "./hooks/useBackgroundColor";
import { toCytoscapeOptions } from "./recipeGraph/cytoscapeOptions";
import { convertToGraph } from "./recipeGraph/recipeReader";
import * as recipes from "./recipes.json";

const Container = styled.div`
  width: 100vw;
  // overflow: hidden;
  max-height: 100vh;
  max-width: 100vw;
`;

const CenteredPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: top;
`;

const PageFlow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: top;
`;

const App = () => {
  useBackgroundColor(COLORS_1.BACKGROUND_ALT);
  const [currentStep, setStep] = useState(0);
  const recipe = recipes;
  const recipeGraph = convertToGraph(recipe);
  const subGraph = recipeGraph.getRecipeStep(currentStep);
  const actions = subGraph.getRecipeActions(currentStep);
  const cyOptions = toCytoscapeOptions(subGraph.nodes, subGraph.edges);

  return (
    <Container>
      <Navigation />
      <CenteredPageContainer>
        <Instructions recipe={recipe} recipeGraph={recipeGraph} step={currentStep} actions={actions} />
        <CytoscapeBridge
          currentStep={currentStep}
          setStep={setStep}
          maxStep={recipeGraph.maxSteps}
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
  );
};

export default App;
