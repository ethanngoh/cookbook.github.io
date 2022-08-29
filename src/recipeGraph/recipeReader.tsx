import { Recipe } from "../model/recipe";
import {
  CombineAction,
  KnifeAction,
  BasePrepAction,
  RecipeAction,
  WashAction,
  AssembleAction
} from "../model/recipeAction";
import {
  edgeId,
  EdgesSet,
  INGREDIENT_SEPERATOR,
  nodeId,
  NodesSet,
  parseIngredientRef,
  SPECIAL_CONTAINERS
} from "./graphCommon";
import { RecipeGraph } from "./recipeGraph";

export function parseGraphString(graphStr: string) {
  const pattern: RegExp = /([.\d\w?!@#$%^&*()_-]+) ?-?>? ?([.\d\w?!@#$%^&*()_-]+)?/g;
  const match = pattern.exec(graphStr);
  if (!match) {
    const msg = `invalid graph string ${graphStr}`;
    console.log(msg);
    throw msg;
  }

  return [match[1], match[2]];
}

export function getIngredientName(recipe: Recipe, ingredientId: string): string {
  const [ingredientName, cutStyle] = parseIngredientRef(ingredientId);
  const x = recipe.ingredients.filter((e) => e.id === ingredientName)[0];
  if (x) {
    return x.name;
  }

  console.error(`getIngredientName ${recipe} ${ingredientId}`);
  throw new Error("error");
}

export function getContainerName(recipe: Recipe, id: string): string {
  const x = recipe.containers.filter((e) => e.id === id)[0];
  if (x) {
    return x.name;
  }

  if (SPECIAL_CONTAINERS.includes(id)) {
    return id;
  }

  console.error(`getIngredientName ${recipe} ${id}`);
  throw new Error("error");
}

export function convertToGraph(recipe: Recipe): RecipeGraph {
  var nodes: NodesSet = {};
  var edges: EdgesSet = {};

  for (let stepIndex = 0; stepIndex < recipe.steps.length; stepIndex++) {
    const step = recipe.steps[stepIndex];
    const [node1, node2] = parseGraphString(step.graph);

    if (step.action === "assemble") {
      parseAssembleAction(recipe, step, stepIndex, nodes, node2, edges);
    } else if (step.action === "combine") {
      parseCombineAction(recipe, step, stepIndex, nodes, node2, edges);
    } else if (step.action === "cook") {
      parseRegularAction(recipe, step, stepIndex, nodes, node1, node2, edges);
    } else if (step.action === "foodProcessor") {
      parseRegularAction(recipe, step, stepIndex, nodes, node1, node2, edges);
    } else if (step.action === "knife") {
      parseKnifeAction(recipe, step, stepIndex, nodes, edges);
    } else if (step.action === "oven") {
      parseRegularAction(recipe, step, stepIndex, nodes, node1, node2, edges);
    } else if (step.action === "prep") {
      parsePrepAction(recipe, step, stepIndex, nodes, node1, edges);
    } else if (step.action === "reduce") {
      parseRegularAction(recipe, step, stepIndex, nodes, node1, node2, edges);
    } else if (step.action === "saute") {
      parseRegularAction(recipe, step, stepIndex, nodes, node1, node2, edges);
    } else if (step.action === "serve") {
      parseRegularAction(recipe, step, stepIndex, nodes, node1, node2, edges);
    } else if (step.action === "transfer") {
      parseRegularAction(recipe, step, stepIndex, nodes, node1, node2, edges);
    } else if (step.action === "wash") {
      parseWashAction(recipe, step, stepIndex, nodes, edges);
    } else {
      throw new Error(`Unrecognized action ${step.action}`);
    }
  }

  return new RecipeGraph(nodes, edges, recipe);
}

export function getIngredientIconName(recipe: Recipe, ingredientId: string, cutStyle?: string) {
  const ingredient = recipe.ingredients.filter((e) => e.id === ingredientId)[0];
  if (!ingredient) {
    debugger;
  }

  return cutStyle ? `${ingredient.iconName}.${cutStyle}` : ingredient.iconName;
}

export function getContainerIconName(recipe: Recipe, containerId: string) {
  const dotIndex = containerId.indexOf(".");
  const containerRef = dotIndex === -1 ? containerId : containerId.substring(0, containerId.indexOf("."));

  if (SPECIAL_CONTAINERS.includes(containerRef)) {
    return containerRef;
  }

  const container = recipe.containers.filter((e) => e.id === containerRef)[0];

  if (!container) {
    debugger;
    const msg = `graphToContainerIconName ${containerId}`;
    console.error(msg);
    throw msg;
  }

  return container.iconName;
}

function parseRegularAction(
  recipe: Recipe,
  step: RecipeAction,
  stepIndex: number,
  nodes: NodesSet,
  node1: string,
  node2: string,
  edges: EdgesSet
) {
  const n1Key = nodeId(node1);
  const n1ContainerIconName = getContainerIconName(recipe, n1Key);
  nodes[n1Key] = {
    id: n1Key,
    iconName: n1ContainerIconName
  };
  if (node2) {
    const n2Key = nodeId(node2);
    const n2ContainerIconName = getContainerIconName(recipe, n2Key);
    nodes[n2Key] = {
      id: n2Key,
      iconName: n2ContainerIconName
    };

    const eKey = edgeId(node1, node2);
    edges[eKey] = {
      order: stepIndex,
      id: eKey,
      source: n1Key,
      target: n2Key,
      data: step,
      action: step.action
    };
  }
}

function parseAssembleAction(
  recipe: Recipe,
  step: RecipeAction,
  stepIndex: number,
  nodes: NodesSet,
  node2: string,
  edges: EdgesSet
) {
  var action = step as AssembleAction;
  for (var containerId of action.containerIds) {
    const n1IconName = getContainerIconName(recipe, containerId);
    nodes[containerId] = {
      id: containerId,
      iconName: n1IconName
    };

    const eKey = edgeId(containerId, node2);
    edges[eKey] = {
      id: eKey,
      source: containerId,
      target: node2,
      data: step,
      order: stepIndex,
      action: step.action
    };
  }

  const n2IconName = getContainerIconName(recipe, node2);
  if (!(node2 in nodes)) {
    nodes[node2] = {
      id: node2,
      iconName: n2IconName
    };
  }
}

function parseCombineAction(
  recipe: Recipe,
  step: RecipeAction,
  stepIndex: number,
  nodes: NodesSet,
  node2: string,
  edges: EdgesSet
) {
  var combinedStep = step as CombineAction;
  for (var ingredientId of combinedStep.ingredientIds) {
    const [ingredientName, cutStyle] = parseIngredientRef(ingredientId);
    const n1IconName = getIngredientIconName(recipe, ingredientName, cutStyle);
    nodes[ingredientId] = {
      id: ingredientId,
      iconName: n1IconName
    };

    const eKey = edgeId(ingredientId, node2);
    edges[eKey] = {
      id: eKey,
      source: ingredientId,
      target: node2,
      data: step,
      order: stepIndex,
      action: step.action
    };
  }
  const n2Key = nodeId(node2);
  const n2IconName = getContainerIconName(recipe, n2Key);
  if (!(n2Key in nodes)) {
    nodes[n2Key] = {
      id: n2Key,
      iconName: n2IconName
    };
  }
}

function parseWashAction(recipe: Recipe, step: RecipeAction, stepIndex: number, nodes: NodesSet, edges: EdgesSet) {
  var action = step as WashAction;
  for (let i = 0; i < action.ingredientIds.length; i++) {
    const ingredientId = action.ingredientIds[i];
    const n1IconName = getIngredientIconName(recipe, ingredientId);
    nodes[ingredientId] = {
      id: ingredientId,
      iconName: n1IconName
    };

    const node2Id = `${action.containerIds[i]}`;
    const eKey = edgeId(ingredientId, node2Id);
    edges[eKey] = {
      id: eKey,
      source: ingredientId,
      target: ingredientId,
      data: step,
      order: stepIndex,
      action: step.action
    };

    const n2IconName = getContainerIconName(recipe, node2Id);
    nodes[node2Id] = {
      id: node2Id,
      iconName: n2IconName
    };
  }
}

function parseKnifeAction(recipe: Recipe, step: RecipeAction, stepIndex: number, nodes: NodesSet, edges: EdgesSet) {
  var knifeAction = step as KnifeAction;
  for (var ingredientId of knifeAction.ingredientIds) {
    const n1IconName = getIngredientIconName(recipe, ingredientId);
    nodes[ingredientId] = {
      id: ingredientId,
      iconName: n1IconName
    };

    const node2Id = `${ingredientId}${INGREDIENT_SEPERATOR}${knifeAction.cutStyle}`;
    const eKey = edgeId(ingredientId, node2Id);
    edges[eKey] = {
      id: eKey,
      source: ingredientId,
      target: node2Id,
      data: step,
      order: stepIndex,
      action: step.action
    };

    const n2IconName = getIngredientIconName(recipe, ingredientId, knifeAction.cutStyle);
    nodes[node2Id] = {
      id: node2Id,
      iconName: n2IconName
    };
  }
}

function parsePrepAction(
  recipe: Recipe,
  step: RecipeAction,
  stepIndex: number,
  nodes: NodesSet,
  node1: string,
  edges: EdgesSet
) {
  var action = step as BasePrepAction;
  for (var id of action.containerIds) {
    const n2IconName = getContainerIconName(recipe, id);
    nodes[id] = {
      id: id,
      iconName: n2IconName
    };

    const eKey = edgeId(node1, id);
    edges[eKey] = {
      id: eKey,
      source: node1,
      target: id,
      data: step,
      order: stepIndex,
      action: step.action
    };
  }
  const n1Key = nodeId(node1);
  const n1IconName = getContainerIconName(recipe, n1Key);
  if (!(n1Key in nodes)) {
    nodes[n1Key] = {
      id: n1Key,
      iconName: n1IconName
    };
  }
}
