import styled from "@emotion/styled";
import { Recipe } from "../model/recipe";
import { RecipeGraph } from "../recipeGraph/recipeGraph";

const IngredientsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 33vw;
  overflow-y: auto;
  -webkit-overflow-scrolling: auto;
`;
export const Ingredients = ({ recipe, recipeGraph }: { recipe: Recipe; recipeGraph: RecipeGraph }) => {
  const i = recipe.ingredients;
  return <IngredientsContainer></IngredientsContainer>;
};
