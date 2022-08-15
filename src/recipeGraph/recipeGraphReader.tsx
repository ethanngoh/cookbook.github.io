import { getIcon } from "../icons/icons";
import { Recipe } from "../model/recipe";
import { CombineAction, RecipeAction } from "../model/recipeAction";
import { edgeId, nodeId, RecipeEdgesSet, RecipeNodesSet } from "./graphCommon";
import { RecipeGraph } from "./recipeGraph";

export function convertToGraph(recipe: Recipe): RecipeGraph {
  var nodes: RecipeNodesSet = {};
  var edges: RecipeEdgesSet = {};

  for (let stepIndex = 0; stepIndex < recipe.steps.length; stepIndex++) {
    const step = recipe.steps[stepIndex];
    var graphStr = step.graph;

    const pattern: RegExp = /([\d\w?!@#$%^&*()_-]+) ?-?>? ?([\d\w?!@#$%^&*()_-]+)?/g;
    const match = pattern.exec(graphStr);
    if (!match) {
      console.log(`invalid graph string ${graphStr}`);
      continue;
    }

    const node1 = match[1];
    const node2 = match[2];

    if (node1 === "*" && step.action === "combine") {
      addToGraphForCombineAction(step, stepIndex, nodes, node2, edges);
    } else {
      addToGraph(stepIndex, nodes, node1, node2, edges);
    }
  }

  return new RecipeGraph(nodes, edges);
}

function addToGraph(stepIndex: number, nodes: RecipeNodesSet, node1: string, node2: string, edges: RecipeEdgesSet) {
  const icon = getIcon("carrot");
  nodes[node1] = {
    id: node1,
    step: stepIndex,
    style: {
      "background-image": getIcon("carrot").svgCss,
      "border-color": icon.borderColor
    }
  };
  if (node2) {
    const n1Key = nodeId(node1);
    const n2Key = nodeId(node2);
    nodes[node2] = {
      id: n2Key,
      step: stepIndex,
      style: { "background-image": "https://live.staticflickr.com/1261/1413379559_412a540d29_b.jpg" }
    };

    const eKey = edgeId(node1, node2);
    edges[eKey] = {
      id: eKey,
      source: n1Key,
      target: n2Key,
      style: {
        "line-color": "#00ffaa",
        "target-arrow-color": "#00ffaa"
      }
    };
  }
}

function addToGraphForCombineAction(
  step: RecipeAction,
  stepIndex: number,
  nodes: RecipeNodesSet,
  node2: string,
  edges: RecipeEdgesSet
) {
  var combinedStep = step as CombineAction;
  for (var ingredient of combinedStep.ingredients) {
    const n1Key = nodeId(ingredient);
    nodes[ingredient] = {
      id: n1Key,
      step: stepIndex,
      style: { "background-image": "https://live.staticflickr.com/7272/7633179468_3e19e45a0c_b.jpg" }
    };

    const eKey = edgeId(ingredient, node2);
    const n2Key = nodeId(node2);
    edges[eKey] = { id: eKey, source: n1Key, target: n2Key, style: {} };
  }
}
