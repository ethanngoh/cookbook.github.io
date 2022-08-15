export interface BaseRecipeAction {
  action: string;
  graph: string;
  id: string;
  description?: string;
}

export interface StartAction extends BaseRecipeAction {
  container: string;
}

export interface CombineAction extends BaseRecipeAction {
  ingredients: string[];
}

export interface SauteAction extends BaseRecipeAction {
  heat: string;
  time: string;
}

export interface TransferAction extends BaseRecipeAction {
  from: string;
  to: string;
}

export interface OvenAction extends BaseRecipeAction {
  setting: string;
  temperature: string;
  time: string;
}

export interface ServeAction extends BaseRecipeAction {}

export type RecipeAction = StartAction | CombineAction | SauteAction | TransferAction | OvenAction | ServeAction;
