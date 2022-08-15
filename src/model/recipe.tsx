import { Ingredient } from "./ingredient";
import { RecipeAction } from "./recipeAction";

export interface Container {
  id: string;
  name: string;
  size: string;
}

export interface Tool {
  id: string;
  name: string;
}

export interface Recipe {
  id: string;
  name: string;
  ingredients: Ingredient[];
  containers: Container[];
  tools: Tool[];
  steps: RecipeAction[];
}
