import { Recipe } from "../model/recipe";
import { CombineAction, KnifeAction, RecipeAction } from "../model/recipeAction";
import { edgeId, EdgesSet, nodeId, NodesSet } from "./graphCommon";
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

export function getIngredientName(recipe: Recipe, id: string): string {
  const x = recipe.ingredients.filter((e) => e.id === id)[0];
  if (x) {
    return x.name;
  }

  console.error(`getIngredientName ${recipe} ${id}`);
  return "error";
}

export function getContainerName(recipe: Recipe, id: string): string {
  const x = recipe.containers.filter((e) => e.id === id)[0];
  if (x) {
    return x.name;
  }

  console.error(`getIngredientName ${recipe} ${id}`);
  return "error";
}

export function convertToGraph(recipe: Recipe): RecipeGraph {
  var nodes: NodesSet = {};
  var edges: EdgesSet = {};

  for (let stepIndex = 0; stepIndex < recipe.steps.length; stepIndex++) {
    const step = recipe.steps[stepIndex];
    const [node1, node2] = parseGraphString(step.graph);

    if (node1 === "*" && step.action === "combine") {
      addToGraphForCombineAction(recipe, step, stepIndex, nodes, node2, edges);
    } else if (node1 === "*" && step.action === "knife") {
      addToGraphForKnifeAction(recipe, step, stepIndex, nodes, node2, edges);
    } else {
      addToGraph(recipe, step, stepIndex, nodes, node1, node2, edges);
    }
  }

  return new RecipeGraph(nodes, edges, recipe);
}

export function getIngredientIconName(ingredientId: string, recipe: Recipe) {
  const container = recipe.ingredients.filter((e) => e.id === ingredientId)[0];
  return container.iconName;
}

export function getContainerIconName(containerId: string, recipe: Recipe) {
  const dotIndex = containerId.indexOf(".");
  const containerRef = dotIndex === -1 ? containerId : containerId.substring(0, containerId.indexOf("."));

  // Special case start and end terminal nodes.
  if (containerRef === "prep" || containerRef === "cook" || containerRef === "serve") {
    return containerRef;
  }

  const container = recipe.containers.filter((e) => e.id === containerRef)[0];

  if (!container) {
    const msg = `graphToContainerIconName ${containerId}`;
    console.error(msg);
    throw msg;
  }

  return container.iconName;
}

function addToGraph(
  recipe: Recipe,
  step: RecipeAction,
  stepIndex: number,
  nodes: NodesSet,
  node1: string,
  node2: string,
  edges: EdgesSet
) {
  const n1Key = nodeId(node1);
  const n1ContainerIconName = getContainerIconName(n1Key, recipe);
  nodes[n1Key] = {
    id: n1Key,
    iconName: n1ContainerIconName
  };
  if (node2) {
    const n2Key = nodeId(node2);
    const n2ContainerIconName = getContainerIconName(n2Key, recipe);
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

function addToGraphForCombineAction(
  recipe: Recipe,
  step: RecipeAction,
  stepIndex: number,
  nodes: NodesSet,
  node2: string,
  edges: EdgesSet
) {
  var combinedStep = step as CombineAction;
  for (var ingredient of combinedStep.ingredientIds) {
    const n1Key = nodeId(ingredient);
    const n1IconName = getIngredientIconName(ingredient, recipe);
    nodes[n1Key] = {
      id: n1Key,
      iconName: n1IconName
    };

    const eKey = edgeId(ingredient, node2);
    edges[eKey] = {
      id: eKey,
      source: n1Key,
      target: nodeId(node2),
      data: step,
      order: stepIndex,
      action: step.action
    };
  }
  const n2Key = nodeId(node2);
  const n2IconName = getContainerIconName(n2Key, recipe);
  if (!(n2Key in nodes)) {
    nodes[n2Key] = {
      id: n2Key,
      iconName: n2IconName
    };
  }
}

function addToGraphForKnifeAction(
  recipe: Recipe,
  step: RecipeAction,
  stepIndex: number,
  nodes: NodesSet,
  node2: string,
  edges: EdgesSet
) {
  var knifeAction = step as KnifeAction;
  for (var ingredient of knifeAction.ingredientIds) {
    const n1Key = nodeId(ingredient);
    const n1IconName = getIngredientIconName(ingredient, recipe);
    nodes[n1Key] = {
      id: n1Key,
      iconName: n1IconName
    };

    const eKey = edgeId(ingredient, node2);
    edges[eKey] = {
      id: eKey,
      source: n1Key,
      target: nodeId(node2),
      data: step,
      order: stepIndex,
      action: step.action
    };
  }
  const n2Key = nodeId(node2);
  const n2IconName = getContainerIconName(n2Key, recipe);
  if (!(n2Key in nodes)) {
    nodes[n2Key] = {
      id: n2Key,
      iconName: n2IconName
    };
  }
}
