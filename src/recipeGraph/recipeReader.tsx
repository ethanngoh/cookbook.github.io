import { getIconStyle } from "../icons/icons";
import { Recipe } from "../model/recipe";
import { CombineAction, RecipeAction } from "../model/recipeAction";
import { getEdgeStyle } from "./cytoscapeOptions";
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
    } else {
      addToGraph(recipe, step, stepIndex, nodes, node1, node2, edges);
    }
  }

  return new RecipeGraph(nodes, edges, recipe);
}

function ingredientIconName(ingredientId: string, recipe: Recipe) {
  const container = recipe.ingredients.filter((e) => e.id === ingredientId)[0];
  if (!container) {
    debugger;
  }
  return container.iconName;
}

function graphToContainerIconName(graphName: string, recipe: Recipe) {
  const dotIndex = graphName.indexOf(".");
  const containerId = dotIndex === -1 ? graphName : graphName.substring(0, graphName.indexOf("."));

  // Special case start and end terminal nodes.
  if (containerId === "start" || containerId === "end") {
    return containerId;
  }

  const container = recipe.containers.filter((e) => e.id === containerId)[0];

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
  const n1ContainerIconName = graphToContainerIconName(n1Key, recipe);
  nodes[n1Key] = {
    id: n1Key,
    style: getIconStyle(n1ContainerIconName)
  };
  if (node2) {
    const n2Key = nodeId(node2);
    const n2ContainerIconName = graphToContainerIconName(n2Key, recipe);
    nodes[n2Key] = {
      id: n2Key,
      style: getIconStyle(n2ContainerIconName)
    };

    const eKey = edgeId(node1, node2);
    edges[eKey] = {
      order: stepIndex,
      id: eKey,
      source: n1Key,
      target: n2Key,
      data: step,
      style: getEdgeStyle(step.action)
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
    const n1IconName = ingredientIconName(ingredient, recipe);
    nodes[n1Key] = {
      id: n1Key,
      style: getIconStyle(n1IconName)
    };

    const eKey = edgeId(ingredient, node2);
    edges[eKey] = {
      id: eKey,
      source: n1Key,
      target: nodeId(node2),
      data: step,
      order: stepIndex,
      style: getEdgeStyle(step.action)
    };
  }
}
