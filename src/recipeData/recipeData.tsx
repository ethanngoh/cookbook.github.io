import * as cornCheeseRecipe from "./cornCheese.json";
import * as mushroomRisottoRecipe from "./mushroomRisotto.json";
import * as gremolataRecipe from "./gremolata.json";
import * as pulutHitamRecipe from "./pulutHitam.json";

export const cornCheese = cornCheeseRecipe;
export const mushroomRisotto = mushroomRisottoRecipe;
export const gremolata = gremolataRecipe;
export const pulutHitam = pulutHitamRecipe;

export const allRecipes = [cornCheese, gremolata, mushroomRisotto, pulutHitam];
export type RawRecipeType = any;
