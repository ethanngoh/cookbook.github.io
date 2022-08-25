export interface BaseRecipeAction {
  action: string;
  graph: string;
  id: string;
  containerId: string;
  notes?: string;
}

export interface BasePrepAction {
  action: string;
  graph: string;
  id: string;
  containerIds: string[];
  notes?: string;
}

export interface PrepAction extends BasePrepAction {}

export interface KnifeAction extends BasePrepAction {
  cutStyle: string;
  ingredientIds: string[];
}

export interface WashAction extends BasePrepAction {
  ingredientIds: string[];
}

export interface CookAction extends BaseRecipeAction {
  container: string;
}

export interface FoodProcessorAction extends BaseRecipeAction {
  setting: string;
}

export interface ServeAction extends BaseRecipeAction {}

export interface CombineAction extends BaseRecipeAction {
  ingredientIds: string[];
}

export interface SauteAction extends BaseRecipeAction {
  heat: string;
  time: string;
}

export interface ReduceAction extends BaseRecipeAction {}

export interface TransferAction extends BaseRecipeAction {
  fromContainerId: string;
  toContainerId: string;
}

export interface AssembleAction {
  action: string;
  graph: string;
  id: string;
  containerIds: string[];
  notes?: string;
}

export interface OvenAction extends BaseRecipeAction {
  setting: string;
  temperature: string;
  time: string;
}

export type RecipeAction =
  | PrepAction
  | CombineAction
  | SauteAction
  | TransferAction
  | OvenAction
  | ServeAction
  | KnifeAction
  | WashAction
  | AssembleAction
  | FoodProcessorAction;
