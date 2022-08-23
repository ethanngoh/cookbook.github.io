export interface BaseRecipeAction {
  action: string;
  graph: string;
  id: string;
  containerId: string;
  description?: string;
}

export interface PrepAction extends BaseRecipeAction {
  container: string;
}

export interface CookAction extends BaseRecipeAction {
  container: string;
}

export interface ServeAction extends BaseRecipeAction {}

export interface CombineAction extends BaseRecipeAction {
  ingredientIds: string[];
}

export interface SauteAction extends BaseRecipeAction {
  heat: string;
  time: string;
}

export interface TransferAction extends BaseRecipeAction {
  fromContainerId: string;
  toContainerId: string;
}

export interface OvenAction extends BaseRecipeAction {
  setting: string;
  temperature: string;
  time: string;
}

export interface KnifeAction extends BaseRecipeAction {
  cutStyle: string;
  ingredientIds: string[];
}

export type RecipeAction =
  | PrepAction
  | CombineAction
  | SauteAction
  | TransferAction
  | OvenAction
  | ServeAction
  | KnifeAction;
