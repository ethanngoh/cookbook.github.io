import { getIcon } from "../icons/icons";
import { Recipe } from "../model/recipe";
import { CombineAction, RecipeAction } from "../model/recipeAction";
import { edgeId, nodeId, EdgesSet, NodesSet } from "./graphCommon";
import { RecipeGraph } from "./recipeGraph";

export function convertToGraph(recipe: Recipe): RecipeGraph {
  var nodes: NodesSet = {};
  var edges: EdgesSet = {};

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

function addToGraph(stepIndex: number, nodes: NodesSet, node1: string, node2: string, edges: EdgesSet) {
  const icon = getIcon("carrot");
  const n1Key = nodeId(node1);
  nodes[n1Key] = {
    id: n1Key,
    style: {
      "background-image": getIcon("carrot").svgCss,
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
  nodes: NodesSet,
  node2: string,
  edges: EdgesSet
) {
  var combinedStep = step as CombineAction;
  for (var ingredient of combinedStep.ingredients) {
    const n1Key = nodeId(ingredient);
    nodes[n1Key] = {
      id: n1Key,
      style: { "background-image": "https://live.staticflickr.com/7272/7633179468_3e19e45a0c_b.jpg" }
    };

    const eKey = edgeId(ingredient, node2);
    const n2Key = nodeId(node2);
    edges[eKey] = { id: eKey, source: n1Key, target: n2Key, order: stepIndex, style: {} };
  }
}
