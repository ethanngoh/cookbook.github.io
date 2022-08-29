import * as cornCheeseRecipe from "./cornCheese.json";
import * as mushroomRisottoRecipe from "./mushroomRisotto.json";
import * as gremolataRecipe from "./gremolata.json";

export const cornCheese = cornCheeseRecipe;
export const mushroomRisotto = mushroomRisottoRecipe;
export const gremolata = gremolataRecipe;

export const allRecipes = [cornCheese, gremolata, mushroomRisotto];
export type RawRecipeType = any;
