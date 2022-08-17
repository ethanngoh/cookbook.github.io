import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { ChecklistItem } from "./checklistItem";
import { Instruction } from "./instructionText";
import { Recipe } from "../model/recipe";
import { RecipeAction } from "../model/recipeAction";
import { RecipeActionsView, RecipeGraph } from "../recipeGraph/recipeGraph";

const InstructionsListDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 33vw;
  overflow-y: auto;
  -webkit-overflow-scrolling: auto;
`;

const InstructionListProps = css`
  gap: 0em;
`;

const RecipeName = styled.h1`
  font-size: 48px;
  font-family: "Lexend Deca", sans-serif;
  font-weight: 400;
`;

const NonCurrentInstructionList = styled.ol`
  font-family: "Inter", sans-serif;
  display: flex;
  flex-direction: column;
  opacity: 0.5;
  margin-top: 0.5em;
  ${InstructionListProps};
`;

const CurrentInstructionList = styled.ol`
  color: #000;
  font-family: "Inter", sans-serif;
  font-size: 1.5em;
  display: flex;
  flex-direction: column;
  ${InstructionListProps};
`;

export const Instructions = ({
  recipe,
  recipeGraph,
  step,
  actions
}: {
  recipe: Recipe;
  recipeGraph: RecipeGraph;
  step: number;
  actions: RecipeActionsView;
}) => {
  return (
    <InstructionsListDiv>
      <RecipeName>{recipe.name}</RecipeName>
      <NonCurrentInstructionList>
        {actions.prev.map((e) => {
          return (
            <ChecklistItem>
              <Instruction recipeAction={e} recipe={recipe} />
            </ChecklistItem>
          );
        })}
      </NonCurrentInstructionList>
      <CurrentInstructionList>
        <ChecklistItem>
          <Instruction recipeAction={actions.current} recipe={recipe} />
        </ChecklistItem>
      </CurrentInstructionList>
      <NonCurrentInstructionList>
        {actions.next.map((e) => {
          return (
            <ChecklistItem>
              <Instruction recipeAction={e} recipe={recipe} />
            </ChecklistItem>
          );
        })}
      </NonCurrentInstructionList>
      <hr />
      <br />
      <NonCurrentInstructionList>
        <ChecklistItem>Debug</ChecklistItem>
        <ChecklistItem>Max Steps: {recipeGraph.maxSteps}</ChecklistItem>
        <ChecklistItem>Current Step: {step}</ChecklistItem>
      </NonCurrentInstructionList>
    </InstructionsListDiv>
  );
};
