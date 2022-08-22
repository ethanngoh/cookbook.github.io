import styled from "@emotion/styled";
import { RecipeGraph } from "../recipeGraph/recipeGraph";

const NonCurrentInstructionList = styled.ol`
  font-family: "Inter", sans-serif;
  display: flex;
  flex-direction: column;
  opacity: 0.5;
  margin-top: 0.5em;
  gap: 0em;
`;

const Item = styled.li`
  padding: 0.5em;
  font-size: 1rem;
`;

export const DebugView = ({ recipeGraph, currentStep }: { recipeGraph: RecipeGraph; currentStep: number }) => {
  return (
    <NonCurrentInstructionList>
      <Item>Debug</Item>
      <Item>Max Steps: {recipeGraph.maxSteps}</Item>
      <Item>Current Step: {currentStep}</Item>
    </NonCurrentInstructionList>
  );
};
