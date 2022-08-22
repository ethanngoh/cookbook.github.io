import { css, cx } from "@emotion/css";
import { Recipe } from "../model/recipe";
import { RecipeAction } from "../model/recipeAction";
import { RecipeActionsView } from "../recipeGraph/recipeGraph";
import { Instruction } from "./instructionText";

export const VerticalCarousel = ({
  actions,
  recipe,
  currentStep
}: {
  actions: RecipeActionsView;
  recipe: Recipe;
  currentStep: number;
}) => {
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
    <div
      className={css`
        margin-top: 1em;
        display: flex;
        flex-direction: column;
      `}
    >
      <div
        className={css`
          height: 100%;
          display: flex;
          align-items: center;
        `}
      >
        <div
          className={css`
            overflow: hidden;
            height: 50vh;
            display: flex;
            flex-direction: column;
            gap: 1.75em;
          `}
        >
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
              <Instruction recipeAction={item} recipe={recipe} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
