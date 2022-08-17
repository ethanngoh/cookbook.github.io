import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { COLORS_1 } from "../colors";
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
import { getContainerName, getIngredientName } from "../recipeGraph/recipeReader";

const HighlightedText = css`
  padding: 0.2rem 0.4rem;
`;

const IngredientSpan = styled.span`
  background-color: ${COLORS_1.INGREDIENT};
  ${HighlightedText};
`;

const ContainerSpan = styled.span`
  background-color: ${COLORS_1.CONTAINER};
  ${HighlightedText};
`;

const TimeSpan = styled.span`
  background-color: ${COLORS_1.TIME};
  ${HighlightedText};
`;

const HeatSpan = styled.span`
  background-color: ${COLORS_1.COOK};
  ${HighlightedText};
`;

const SettingSpan = styled.span`
  background-color: ${COLORS_1.COOK};
  ${HighlightedText};
`;

const InstructionDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StepNumber = styled.span`
  background: ${COLORS_1.BACKGROUND_EMPH2};
  border-radius: 1000px;
  padding: 0.5rem;
`;

const InstructionTextSpan = styled.span`
  line-height: 1.75rem;
`;

export const Instruction = ({ recipeAction, recipe }: { recipeAction: RecipeAction; recipe: Recipe }) => {
  return (
    <InstructionDiv>
      <StepNumber>{recipeAction.id}</StepNumber>
      <InstructionText recipe={recipe} recipeAction={recipeAction} />
    </InstructionDiv>
  );
};

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

function conjunction(words: string[]) {
  const wordsHtml = words.map((e) => (
    <InstructionTextSpan>
      <IngredientSpan>{e}</IngredientSpan>,{" "}
    </InstructionTextSpan>
  ));
  const wordsHtmlLast = (
    <InstructionTextSpan>
      and <IngredientSpan>{words.at(-1)}</IngredientSpan>
    </InstructionTextSpan>
  );
  const thing = [...wordsHtml.slice(0, -1), wordsHtmlLast];
  return <>{thing}</>;
}

const combineAction = (action: CombineAction, recipe: Recipe) => {
  const ingredientNames = action.ingredientIds.map((e) => getIngredientName(recipe, e));
  const ingredientsText = conjunction(ingredientNames);
  const containerText = getContainerName(recipe, action.containerId);

  return (
    <InstructionTextSpan>
      Combine {ingredientsText} in <ContainerSpan>{containerText}</ContainerSpan>.
    </InstructionTextSpan>
  );
};

function startAction(recipe: Recipe, action: StartAction) {
  const containerText = getContainerName(recipe, action.containerId);
  return (
    <InstructionTextSpan>
      Start with a <ContainerSpan>{containerText}</ContainerSpan>.
    </InstructionTextSpan>
  );
}

function sauteAction(recipe: Recipe, action: SauteAction) {
  const containerText = getContainerName(recipe, action.containerId);
  return (
    <InstructionTextSpan>
      Saute contents of <ContainerSpan>{containerText}</ContainerSpan> for <TimeSpan>{action.time}</TimeSpan> on{" "}
      <HeatSpan>{action.heat}</HeatSpan> heat.
    </InstructionTextSpan>
  );
}

function transferAction(recipe: Recipe, action: TransferAction) {
  const fromContainerText = getContainerName(recipe, action.fromContainerId);
  const toContainerText = getContainerName(recipe, action.toContainerId);
  return (
    <InstructionTextSpan>
      Transfer contents from <ContainerSpan>{fromContainerText}</ContainerSpan> to{" "}
      <ContainerSpan>{toContainerText}</ContainerSpan>.
    </InstructionTextSpan>
  );
}

function ovenAction(recipe: Recipe, action: OvenAction) {
  const containerText = getContainerName(recipe, action.containerId);
  return (
    <InstructionTextSpan>
      Set oven on <SettingSpan>{action.setting}</SettingSpan> at <HeatSpan>{action.temperature}</HeatSpan> and cook{" "}
      <ContainerSpan>{containerText}</ContainerSpan> for <TimeSpan>{action.time}</TimeSpan>.
    </InstructionTextSpan>
  );
}

function serveAction(recipe: Recipe, action: ServeAction) {
  const containerText = getContainerName(recipe, action.containerId);
  return (
    <InstructionTextSpan>
      Serve <ContainerSpan>{containerText}</ContainerSpan>.
    </InstructionTextSpan>
  );
}
