import styled from "@emotion/styled";
import { COLORS } from "../colors";
import { Ingredient } from "../model/ingredient";
import { Recipe, Tool } from "../model/recipe";

const IngredientsDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 33vw;
  gap: 0.5rem;
`;

const StepNumber = styled.span`
  background: ${COLORS.LIST_BULLET};
  border-radius: 1000px;
  padding: 0.25rem 0.5rem;
`;

const IngredientAmount = styled.td`
  white-space: nowrap;
  padding: 1rem 2rem;
  font-weight: 700;
`;

export const Ingredients = ({ recipe }: { recipe: Recipe }) => {
  return (
    <IngredientsDiv>
      <h2>Ingredients</h2>
      <table>
        <tbody>
          {recipe.ingredients.map((item: Ingredient, i: number) => (
            <tr key={item.id}>
              <td>
                <StepNumber>{i + 1}</StepNumber>
              </td>
              <IngredientAmount>
                {item.amount.value} {item.amount.unit}
              </IngredientAmount>
              <td style={{ width: "100%" }}>{item.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Tools Required</h2>
      <table>
        <tbody>
          {recipe.tools.map((item: Tool, i: number) => (
            <tr key={item.id}>
              <td>
                <StepNumber>{i + 1}</StepNumber>
              </td>
              <td style={{ width: "100%", padding: "1rem 2rem" }}>{item.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </IngredientsDiv>
  );
};
