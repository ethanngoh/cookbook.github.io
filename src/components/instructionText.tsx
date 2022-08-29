import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { COLORS } from "../colors";
import { Recipe } from "../model/recipe";
import {
  CombineAction,
  CookAction,
  KnifeAction,
  OvenAction,
  BasePrepAction,
  RecipeAction,
  SauteAction,
  ServeAction,
  TransferAction,
  WashAction,
  ReduceAction,
  AssembleAction,
  FoodProcessorAction,
  PressureCookerAction
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
  if (recipeAction.action === "assemble") {
    return assembleAction(recipe, recipeAction as AssembleAction);
  } else if (recipeAction.action === "combine") {
    return combineAction(recipeAction as CombineAction, recipe);
  } else if (recipeAction.action === "cook") {
    return cookAction(recipe, recipeAction as CookAction);
  } else if (recipeAction.action === "foodProcessor") {
    return foodProcessorAction(recipe, recipeAction as FoodProcessorAction);
  } else if (recipeAction.action === "knife") {
    return knifeAction(recipe, recipeAction as KnifeAction);
  } else if (recipeAction.action === "oven") {
    return ovenAction(recipe, recipeAction as OvenAction);
  } else if (recipeAction.action === "prep") {
    return prepAction(recipe, recipeAction as BasePrepAction);
  } else if (recipeAction.action === "pressureCooker") {
    return pressureCookerAction(recipe, recipeAction as PressureCookerAction);
  } else if (recipeAction.action === "reduce") {
    return reduceAction(recipe, recipeAction as ReduceAction);
  } else if (recipeAction.action === "saute") {
    return sauteAction(recipe, recipeAction as SauteAction);
  } else if (recipeAction.action === "serve") {
    return serveAction(recipe, recipeAction as ServeAction);
  } else if (recipeAction.action === "transfer") {
    return transferAction(recipe, recipeAction as TransferAction);
  } else if (recipeAction.action === "wash") {
    return washAction(recipe, recipeAction as WashAction);
  }
  throw new Error(`unrecognized recipe action ${recipeAction.action}`);
};

function conjunction(words: string[], backgroundColor: string, textColor?: string) {
  const resolvedTextColor = textColor ? textColor : "inherit";

  if (words.length === 1) {
    return (
      <InstructionTextSpan>
        <ConjunctionSpan bgColor={backgroundColor} textColor={resolvedTextColor}>
          {words.at(0)}
        </ConjunctionSpan>
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
  const containerText = <ContainerSpan>{getContainerName(recipe, action.containerId)}</ContainerSpan>;

  return (
    <InstructionTextSpan>
      Combine {ingredientsText} in {containerText}.
    </InstructionTextSpan>
  );
};

function prepAction(recipe: Recipe, action: BasePrepAction) {
  const containerNames = action.containerIds.map((c) => getContainerName(recipe, c));
  const containerText = conjunction(containerNames, COLORS.INSTRUCTIONS_CONTAINER);

  return <InstructionTextSpan>Start with {containerText}.</InstructionTextSpan>;
}

function cookAction(recipe: Recipe, action: CookAction) {
  const containerText = <ContainerSpan>{getContainerName(recipe, action.containerId)}</ContainerSpan>;
  return (
    <InstructionTextSpan>
      Start with a {containerText}. {action.notes}
    </InstructionTextSpan>
  );
}

function sauteAction(recipe: Recipe, action: SauteAction) {
  const containerText = <ContainerSpan>{getContainerName(recipe, action.containerId)}</ContainerSpan>;
  const time = <TimeSpan>{action.time}</TimeSpan>;
  const heat = <HeatSpan>{action.heat}</HeatSpan>;
  return (
    <InstructionTextSpan>
      Saute contents of {containerText} for {time} on {heat} heat. {action.notes}
    </InstructionTextSpan>
  );
}

function transferAction(recipe: Recipe, action: TransferAction) {
  const fromContainerText = <ContainerSpan>{getContainerName(recipe, action.fromContainerId)}</ContainerSpan>;
  const toContainerText = <ContainerSpan>{getContainerName(recipe, action.toContainerId)}</ContainerSpan>;
  return (
    <InstructionTextSpan>
      Transfer contents from {fromContainerText} to {toContainerText}. {action.notes}
    </InstructionTextSpan>
  );
}

function ovenAction(recipe: Recipe, action: OvenAction) {
  const setting = <SettingSpan>{action.setting}</SettingSpan>;
  const heat = <HeatSpan>{action.temperature}</HeatSpan>;
  const containerText = <ContainerSpan>{getContainerName(recipe, action.containerId)}</ContainerSpan>;
  const time = <TimeSpan>{action.time}</TimeSpan>;
  return (
    <InstructionTextSpan>
      Set oven on {setting} at {heat} and cook {containerText} for {time}. {action.notes}
    </InstructionTextSpan>
  );
}

function serveAction(recipe: Recipe, action: ServeAction) {
  const containerText = <ContainerSpan>{getContainerName(recipe, action.containerId)}</ContainerSpan>;
  return (
    <InstructionTextSpan>
      Serve {containerText}. {action.notes}
    </InstructionTextSpan>
  );
}

function knifeAction(recipe: Recipe, action: KnifeAction) {
  const ingredientNames = action.ingredientIds.map((e) => getIngredientName(recipe, e));
  const ingredientsText = conjunction(ingredientNames, COLORS.INSTRUCTIONS_PREP);
  const containerNames = action.containerIds.map((c) => getContainerName(recipe, c));
  const containerText = conjunction(containerNames, COLORS.INSTRUCTIONS_CONTAINER);
  const cutStyle = <CutStyleSpan>{action.cutStyle}</CutStyleSpan>;
  return (
    <InstructionTextSpan>
      Use knife to {cutStyle} {ingredientsText} and place into {containerText}. {action.notes}
    </InstructionTextSpan>
  );
}

function washAction(recipe: Recipe, action: WashAction) {
  const ingredientNames = action.ingredientIds.map((e) => getIngredientName(recipe, e));
  const ingredientsText = conjunction(ingredientNames, COLORS.INSTRUCTIONS_PREP);
  const containerNames = action.containerIds.map((c) => getContainerName(recipe, c));
  const containerText = conjunction(containerNames, COLORS.INSTRUCTIONS_CONTAINER);
  return (
    <InstructionTextSpan>
      Wash {ingredientsText} and place into {containerText}. {action.notes}
    </InstructionTextSpan>
  );
}

function assembleAction(recipe: Recipe, action: AssembleAction) {
  const containerNames = action.containerIds.map((c) => getContainerName(recipe, c));
  const containerText = conjunction(containerNames, COLORS.INSTRUCTIONS_CONTAINER);
  return (
    <InstructionTextSpan>
      Assemble contents from {containerText} onto the serving plate. {action.notes}
    </InstructionTextSpan>
  );
}

function reduceAction(recipe: Recipe, action: ReduceAction) {
  const containerText = <ContainerSpan>{getContainerName(recipe, action.containerId)}</ContainerSpan>;
  return (
    <InstructionTextSpan>
      Reduce contents of {containerText}. {action.notes}
    </InstructionTextSpan>
  );
}

function foodProcessorAction(recipe: Recipe, action: FoodProcessorAction) {
  const setting = <SettingSpan>{action.setting}</SettingSpan>;
  return (
    <InstructionTextSpan>
      Use the {setting} setting on the Food Processor. {action.notes}
    </InstructionTextSpan>
  );
}

function pressureCookerAction(recipe: Recipe, action: PressureCookerAction) {
  const setting = <SettingSpan>{action.setting}</SettingSpan>;
  const time = <TimeSpan>{action.time}</TimeSpan>;
  return (
    <InstructionTextSpan>
      Set Pressure Cooker to {setting} setting and cook for {time}. {action.notes}
    </InstructionTextSpan>
  );
}
