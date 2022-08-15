import styled from "@emotion/styled";

import { Recipe } from "../model/recipe";
import {
  CombineAction,
  OvenAction,
  RecipeAction,
  SauteAction,
  ServeAction,
  StartAction,
  TransferAction
} from "../model/recipeAction";
import { getContainerName, getIngredientName } from "./recipeReader";

function conjunction(words: string[]) {
  return [...words.slice(0, -1), `and ${words.at(-1)}`].join(", ");
}

const IngredientSpan = styled.span`
  background-color: yellow;
`;

const ContainerSpan = styled.span`
  background-color: #ddd;
`;

const TimeSpan = styled.span`
  background-color: #0cc;
`;

const HeatSpan = styled.span`
  background-color: #c00;
`;

const SettingSpan = styled.span`
  background-color: #cc0;
`;

export const InstructionText = ({ recipeAction, recipe }: { recipeAction: RecipeAction; recipe: Recipe }) => {
  if (recipeAction.action === "combine") {
    return combineAction(recipeAction as CombineAction, recipe);
  } else if (recipeAction.action === "start") {
    return startAction(recipe, recipeAction as StartAction);
  } else if (recipeAction.action === "saute") {
    return sauteAction(recipe, recipeAction as SauteAction);
  } else if (recipeAction.action === "transfer") {
    return transferAction(recipe, recipeAction as TransferAction);
  } else if (recipeAction.action === "oven") {
    return ovenAction(recipe, recipeAction as OvenAction);
  } else if (recipeAction.action === "serve") {
    return serveAction(recipe, recipeAction as ServeAction);
  }
  throw "unrecognized recipe action";
};

const combineAction = (action: CombineAction, recipe: Recipe) => {
  const ingredientNames = action.ingredientIds.map((e) => getIngredientName(recipe, e));
  const ingredientsText = conjunction(ingredientNames);
  const containerText = getContainerName(recipe, action.containerId);

  return (
    <span>
      Combine <IngredientSpan>{ingredientsText}</IngredientSpan> in <ContainerSpan>{containerText}</ContainerSpan>.
    </span>
  );
};

function startAction(recipe: Recipe, action: StartAction) {
  const containerText = getContainerName(recipe, action.containerId);
  return (
    <span>
      Start with a <ContainerSpan>{containerText}</ContainerSpan>.
    </span>
  );
}

function sauteAction(recipe: Recipe, action: SauteAction) {
  const containerText = getContainerName(recipe, action.containerId);
  return (
    <span>
      Saute contents of <ContainerSpan>{containerText}</ContainerSpan> for <TimeSpan>{action.time}</TimeSpan> on{" "}
      <HeatSpan>{action.heat}</HeatSpan> heat.
    </span>
  );
}

function transferAction(recipe: Recipe, action: TransferAction) {
  const fromContainerText = getContainerName(recipe, action.fromContainerId);
  const toContainerText = getContainerName(recipe, action.toContainerId);
  return (
    <span>
      Transfer contents from <ContainerSpan>{fromContainerText}</ContainerSpan> to{" "}
      <ContainerSpan>{toContainerText}</ContainerSpan>.
    </span>
  );
}

function ovenAction(recipe: Recipe, action: OvenAction) {
  const containerText = getContainerName(recipe, action.containerId);
  return (
    <span>
      Set oven on <SettingSpan>{action.setting}</SettingSpan> at <HeatSpan>{action.temperature}</HeatSpan> and cook{" "}
      <ContainerSpan>{containerText}</ContainerSpan> for <TimeSpan>{action.time}</TimeSpan>.
    </span>
  );
}

function serveAction(recipe: Recipe, action: ServeAction) {
  const containerText = getContainerName(recipe, action.containerId);
  return (
    <span>
      Serve <ContainerSpan>{containerText}</ContainerSpan>.
    </span>
  );
}
