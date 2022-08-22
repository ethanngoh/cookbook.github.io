import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { Recipe } from "../model/recipe";
import { RecipeActionsView, RecipeGraph } from "../recipeGraph/recipeGraph";
import { VerticalCarousel } from "./verticalCarousel";

const InstructionsListDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 33vw;
  overflow-y: auto;
  -webkit-overflow-scrolling: auto;
`;

export const Instructions = ({
  recipe,
  recipeGraph,
  currentStep,
  actions
}: {
  recipe: Recipe;
  recipeGraph: RecipeGraph;
  currentStep: number;
  actions: RecipeActionsView;
}) => {
  return (
    <InstructionsListDiv>
      <VerticalCarousel actions={actions} recipe={recipe} currentStep={currentStep} />
    </InstructionsListDiv>
  );
};
