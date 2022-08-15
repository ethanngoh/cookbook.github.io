import { getIcon } from "../icons/icons";
import { Recipe } from "../model/recipe";
import { CombineAction, RecipeAction } from "../model/recipeAction";
import { getEdgeStyle } from "./cytoscapeOptions";
import { edgeId, nodeId, EdgesSet, NodesSet } from "./graphCommon";
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
  return recipe.ingredients.filter((e) => e.id == id)[0].name;
}

export function getContainerName(recipe: Recipe, id: string): string {
  return recipe.containers.filter((e) => e.id == id)[0].name;
}

export function convertToGraph(recipe: Recipe): RecipeGraph {
  var nodes: NodesSet = {};
  var edges: EdgesSet = {};

  for (let stepIndex = 0; stepIndex < recipe.steps.length; stepIndex++) {
    const step = recipe.steps[stepIndex];
    const [node1, node2] = parseGraphString(step.graph);

    if (node1 === "*" && step.action === "combine") {
      addToGraphForCombineAction(step, stepIndex, nodes, node2, edges);
    } else {
      addToGraph(step, stepIndex, nodes, node1, node2, edges);
    }
  }

  return new RecipeGraph(nodes, edges, recipe);
}

function addToGraph(
  step: RecipeAction,
  stepIndex: number,
  nodes: NodesSet,
  node1: string,
  node2: string,
  edges: EdgesSet
) {
  const icon = getIcon("start");
  const n1Key = nodeId(node1);
  nodes[n1Key] = {
    id: n1Key,
    style: {
      "background-image": icon.svgCss,
      "border-color": icon.borderColor
    }
  };
  if (node2) {
    const n2Key = nodeId(node2);
    nodes[n2Key] = {
      id: n2Key,
      style: { "background-image": "https://live.staticflickr.com/1261/1413379559_412a540d29_b.jpg" }
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
  step: RecipeAction,
  stepIndex: number,
  nodes: NodesSet,
  node2: string,
  edges: EdgesSet
) {
  var combinedStep = step as CombineAction;
  for (var ingredient of combinedStep.ingredientIds) {
    const n1Key = nodeId(ingredient);
    nodes[n1Key] = {
      id: n1Key,
      style: { "background-image": "https://live.staticflickr.com/7272/7633179468_3e19e45a0c_b.jpg" }
    };

    const eKey = edgeId(ingredient, node2);
    const n2Key = nodeId(node2);
    edges[eKey] = {
      id: eKey,
      source: n1Key,
      target: n2Key,
      data: step,
      order: stepIndex,
      style: {
        "line-color": "#0000ff",
        "target-arrow-color": "#0000ff"
      }
    };
  }
}
