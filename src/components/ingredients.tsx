import styled from "@emotion/styled";
import { COLORS_1 } from "../colors";
import { Ingredient } from "../model/ingredient";
import { Recipe } from "../model/recipe";
import { RecipeGraph } from "../recipeGraph/recipeGraph";

const IngredientsDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 33vw;
  gap: 0.5rem;
`;

const StepNumber = styled.span`
  background: ${COLORS_1.BACKGROUND_EMPH2};
  border-radius: 1000px;
  padding: 0.25rem 0.5rem;
`;

const IngredientAmount = styled.td`
  white-space: nowrap;
  padding: 1rem 2rem;
  font-weight: 700;
`;

const IngredientText = ({ item }: { item: Ingredient }) => {
  return (
    <div key={item.id}>
      <span>
        {item.amount.value} {item.amount.unit} {item.name}
      </span>
    </div>
  );
};

export const Ingredients = ({ recipe }: { recipe: Recipe }) => {
  return (
    <IngredientsDiv>
      <h2>Ingredients</h2>
      <table>
        {recipe.ingredients.map((item: Ingredient, i: number) => (
          <tr key={item.id}>
            <td>
              <StepNumber>{(i + 10).toString(32)}</StepNumber>
            </td>
            <IngredientAmount>
              {item.amount.value} {item.amount.unit}
            </IngredientAmount>
            <td style={{ width: "100%" }}>{item.name}</td>
          </tr>
        ))}
      </table>
    </IngredientsDiv>
  );
};
