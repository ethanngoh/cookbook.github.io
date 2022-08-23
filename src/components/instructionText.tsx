import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { COLORS } from "../colors";
import { Recipe } from "../model/recipe";
import {
  CombineAction,
  CookAction,
  KnifeAction,
  OvenAction,
  PrepAction,
  RecipeAction,
  SauteAction,
  ServeAction,
  TransferAction
} from "../model/recipeAction";
import { getContainerName, getIngredientName } from "../recipeGraph/recipeReader";

const HighlightedText = css`
  padding: 0.2rem 0.4rem;
`;

const IngredientSpan = styled.span`
  background-color: ${COLORS.INSTRUCTIONS_INGREDIENT};
  ${HighlightedText};
`;

type ConjunctionSpanProps = {
  bgColor: string;
  textColor: string;
};

const ConjunctionSpan = styled.span<ConjunctionSpanProps>`
  background-color: ${(props: ConjunctionSpanProps) => props.bgColor};
  color: ${(props: ConjunctionSpanProps) => props.textColor};
  ${HighlightedText};
`;

const ContainerSpan = styled.span`
  background-color: ${COLORS.INSTRUCTIONS_CONTAINER};
  ${HighlightedText};
`;

const TimeSpan = styled.span`
  background-color: ${COLORS.INSTRUCTIONS_TIME};
  ${HighlightedText};
`;

const HeatSpan = styled.span`
  background-color: ${COLORS.INSTRUCTIONS_COOK};
  color: ${COLORS.INSTRUCTIONS_LIGHT_TEXT};
  ${HighlightedText};
`;

const SettingSpan = styled.span`
  background-color: ${COLORS.INSTRUCTIONS_COOK};
  color: ${COLORS.INSTRUCTIONS_LIGHT_TEXT};
  ${HighlightedText};
`;

const CutStyleSpan = styled.span`
  background-color: ${COLORS.INSTRUCTIONS_CUT_STYLE};
  color: ${COLORS.INSTRUCTIONS_LIGHT_TEXT};
  ${HighlightedText};
`;

const InstructionDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StepNumber = styled.span`
  background: ${COLORS.LIST_BULLET};
  border-radius: 1000px;
  padding: 0.5rem 0.7rem;
  margin-right: 1rem;
`;

const InstructionTextSpan = styled.span`
  line-height: 1.75rem;
`;

export const Instruction = ({ recipeAction, recipe, i }: { recipeAction: RecipeAction; recipe: Recipe; i: number }) => {
  return (
    <InstructionDiv>
      <StepNumber>{i}</StepNumber>
      <InstructionText recipe={recipe} recipeAction={recipeAction} />
    </InstructionDiv>
  );
};

export const InstructionText = ({ recipeAction, recipe }: { recipeAction: RecipeAction; recipe: Recipe }) => {
  if (recipeAction.action === "combine") {
    return combineAction(recipeAction as CombineAction, recipe);
  } else if (recipeAction.action === "prep") {
    return prepAction(recipe, recipeAction as PrepAction);
  } else if (recipeAction.action === "cook") {
    return cookAction(recipe, recipeAction as CookAction);
  } else if (recipeAction.action === "saute") {
    return sauteAction(recipe, recipeAction as SauteAction);
  } else if (recipeAction.action === "transfer") {
    return transferAction(recipe, recipeAction as TransferAction);
  } else if (recipeAction.action === "oven") {
    return ovenAction(recipe, recipeAction as OvenAction);
  } else if (recipeAction.action === "serve") {
    return serveAction(recipe, recipeAction as ServeAction);
  } else if (recipeAction.action === "knife") {
    return knifeAction(recipe, recipeAction as KnifeAction);
  }
  throw new Error("unrecognized recipe action");
};

function conjunction(words: string[], backgroundColor: string, textColor?: string) {
  const resolvedTextColor = textColor ? textColor : "inherit";

  if (words.length === 1) {
    return (
      <InstructionTextSpan>
        <ConjunctionSpan bgColor={backgroundColor} textColor={resolvedTextColor}>
          {words.at(0)}
        </ConjunctionSpan>
        ,{" "}
      </InstructionTextSpan>
    );
  }

  const wordsHtml = words.map((e) => (
    <InstructionTextSpan>
      <ConjunctionSpan bgColor={backgroundColor} textColor={resolvedTextColor}>
        {e}
      </ConjunctionSpan>
      ,{" "}
    </InstructionTextSpan>
  ));
  const wordsHtmlLast = (
    <InstructionTextSpan>
      and{" "}
      <ConjunctionSpan bgColor={backgroundColor} textColor={resolvedTextColor}>
        {words.at(-1)}
      </ConjunctionSpan>
    </InstructionTextSpan>
  );
  const thing = [...wordsHtml.slice(0, -1), wordsHtmlLast];
  return <>{thing}</>;
}

const combineAction = (action: CombineAction, recipe: Recipe) => {
  const ingredientNames = action.ingredientIds.map((e) => getIngredientName(recipe, e));
  const ingredientsText = conjunction(ingredientNames, COLORS.INSTRUCTIONS_INGREDIENT);
  const containerText = getContainerName(recipe, action.containerId);

  return (
    <InstructionTextSpan>
      Combine {ingredientsText} in <ContainerSpan>{containerText}</ContainerSpan>.
    </InstructionTextSpan>
  );
};

function prepAction(recipe: Recipe, action: PrepAction) {
  const containerNames = action.containerIds.map((c) => getContainerName(recipe, c));
  const containerText = conjunction(containerNames, COLORS.INSTRUCTIONS_CONTAINER);

  return <InstructionTextSpan>Start with {containerText}</InstructionTextSpan>;
}

function cookAction(recipe: Recipe, action: CookAction) {
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

function knifeAction(recipe: Recipe, action: KnifeAction) {
  const ingredientNames = action.ingredientIds.map((e) => getIngredientName(recipe, e));
  const ingredientsText = conjunction(ingredientNames, COLORS.INSTRUCTIONS_PREP);
  const containerText = getContainerName(recipe, action.containerId);
  return (
    <InstructionTextSpan>
      Use knife to <CutStyleSpan>{action.cutStyle}</CutStyleSpan> {ingredientsText} and place into{" "}
      <ContainerSpan>{containerText}</ContainerSpan>.
    </InstructionTextSpan>
  );
}
