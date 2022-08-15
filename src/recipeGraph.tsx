import { FaCarrot } from "react-icons/fa";
import { Recipe } from "./model/recipe";
import { CombineAction, RecipeAction } from "./model/recipeAction";
import { svgForCssBackgroundImage } from "./icons/svgIcon";
import { getIcon } from "./icons/icons";

export interface RecipeGraphNode {
  id: string;
  step: number;
  style: { [key: string]: string };
}

export interface RecipeGraphEdge {
  id: string;
  source: string;
  target: string;
  style: { [key: string]: string };
}

type RecipeNodesSet = { [key: string]: RecipeGraphNode };
type RecipeEdgesSet = { [key: string]: RecipeGraphEdge };

function edgeId(node1: string, node2: string) {
  return `${node1}-${node2}`.replace(" ", "_");
}

function nodeId(node: string) {
  return `${node}`.replace(" ", "_");
}

export function convertToGraph(recipe: Recipe): [RecipeNodesSet, RecipeEdgesSet] {
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

  //   debugger;
  return [nodes, edges];
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

export function toCytoscapeOptions(nodes: RecipeNodesSet, edges: RecipeEdgesSet) {
  return {
    nodes: Object.values(nodes).map((node) => {
      return {
        data: {
          id: node.id
        }
      };
    }),
    edges: Object.values(edges).map((edgeTuple) => {
      return {
        data: {
          id: edgeId(edgeTuple.source, edgeTuple.target),
          source: edgeTuple.source,
          target: edgeTuple.target
        }
      };
    }),
    style: [
      ...globalGraphStyles(),
      ...Object.values(nodes).map((node) => {
        return {
          selector: `#${node.id}`,
          style: node.style
        };
      }),
      ...Object.values(edges).map((edge) => {
        return {
          selector: `#${edge.id}`,
          style: edge.style
        };
      })
    ],
    layout: {
      name: "dagre"
    }
  };
}

function globalGraphStyles() {
  return [
    {
      selector: "node",
      style: {
        "background-fit": "cover",
        height: "4em",
        width: "4em",
        "border-color": "#000",
        "border-width": 5,
        "border-opacity": 0.5
      }
    },
    {
      selector: "edge",
      style: {
        "curve-style": "bezier",
        width: "0.25em",
        "target-arrow-shape": "triangle",
        "line-color": "#ffaaaa",
        "target-arrow-color": "#ffaaaa"
      }
    }
  ];
}

// elements: {
//     nodes: [
//       { data: { id: 'cat' } },
//       { data: { id: 'bird' } },
//       { data: { id: 'ladybug' } },
//       { data: { id: 'aphid' } },
//       { data: { id: 'rose' } },
//       { data: { id: 'grasshopper' } },
//       { data: { id: 'plant' } },
//       { data: { id: 'wheat' } }
//     ],
//     edges: [
//       { data: { source: 'cat', target: 'bird' } },
//       { data: { source: 'bird', target: 'ladybug' } },
//       { data: { source: 'bird', target: 'grasshopper' } },
//       { data: { source: 'grasshopper', target: 'plant' } },
//       { data: { source: 'grasshopper', target: 'wheat' } },
//       { data: { source: 'ladybug', target: 'aphid' } },
//       { data: { source: 'aphid', target: 'rose' } }
//     ]
//   },

//   layout: {
//     name: 'preset'
//   },

//   // so we can see the ids
//   style: [
//     {
//       selector: 'node',
//       style: {
//         'label': 'data(id)'
//       }
//     }
//   ]
// }); // cy init
