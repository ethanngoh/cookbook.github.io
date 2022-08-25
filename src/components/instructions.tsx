import { css, cx } from "@emotion/css";
import styled from "@emotion/styled";
import { Recipe } from "../model/recipe";
import { RecipeAction } from "../model/recipeAction";
import { RecipeActionsView } from "../recipeGraph/recipeGraph";
import { Instruction } from "./instructionText";

const InstructionsListDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 33vw;
  overflow-y: auto;
  -webkit-overflow-scrolling: auto;
`;

export const Instructions = ({
  recipe,
  currentStep,
  actions
}: {
  recipe: Recipe;
  currentStep: number;
  actions: RecipeActionsView;
}) => {
  return (
    <div>
      <h2>Instructions</h2>
      <InstructionsListDiv>
        <InstructionsContent actions={actions} recipe={recipe} currentStep={currentStep} />
      </InstructionsListDiv>
    </div>
  );
};

const InstructionAreaContainer = styled.div`
  margin-top: 1em;
  height: 100%;
  display: flex;
  align-items: center;
`;

const InstructionArea = styled.div`
  overflow: hidden;
  height: 50vh;
  display: flex;
  flex-direction: column;
  gap: 1.75em;
`;

const InstructionsContent = ({
  actions,
  recipe,
  currentStep
}: {
  actions: RecipeActionsView;
  recipe: Recipe;
  currentStep: number;
}) => {
  debugger;
  var data = [...actions.prev, actions.current, ...actions.next];

  const globalShift = 0;
  const itemSpacingMultiplier = 4;

  const determinePlacement = (itemIndex: number) => {
    // Dont shift until step 3
    if (currentStep < 3) {
      return 0;
    }
    // currentstep - 2 is so that the current step is around the center.
    return globalShift - itemSpacingMultiplier * (currentStep - 2);
  };

  return (
    <InstructionAreaContainer>
      <InstructionArea>
        {data.map((item: RecipeAction, i: number) => (
          <div
            className={cx(
              css`
                transition: transform 0.4s ease, opacity 0.4s ease;
                font-weight: ${currentStep === i ? "bold" : "regular"};
              `,
              {
                active: currentStep === i
              }
            )}
            key={item.id}
            style={{
              transform: `translateY(${determinePlacement(i)}rem)`
            }}
          >
            <Instruction recipeAction={item} recipe={recipe} i={i} />
          </div>
        ))}
      </InstructionArea>
    </InstructionAreaContainer>
  );
};
