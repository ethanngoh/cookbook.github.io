import { Recipe } from "../model/recipe";
import { RecipeAction } from "../model/recipeAction";
import { EdgesSet, NodesSet } from "./graphCommon";

export type RecipeActionsView = { prev: RecipeAction[]; current: RecipeAction; next: RecipeAction[] };

export class RecipeGraph {
  nodes: NodesSet;
  edges: EdgesSet;
  maxSteps: number;
  recipe: Recipe;

  constructor(nodes: NodesSet, edges: EdgesSet, recipe: Recipe) {
    this.nodes = nodes;
    this.edges = edges;
    this.maxSteps = Math.max(...Object.values(this.edges).map((e) => e.order));
    this.recipe = recipe;
  }

  public getRecipeStep(step: number): RecipeGraph {
    const relevantNodes: NodesSet = {};
    const relevantEdges: EdgesSet = {};
    const currentStepNodes: { [key: string]: string } = {};

    for (var [key, edge] of Object.entries(this.edges).sort(([ak, av], [bk, bv]) => av.order - bv.order)) {
      if (Math.abs(edge.order - step) > 2) {
        continue;
      }

      const isCurrentStep = edge!.order === step;
      const otherNodeStyle = { opacity: "0.2" };
      const currentEdgeStyle = {
        opacity: isCurrentStep ? "1" : "0.2",
        width: isCurrentStep ? "6px" : "3px"
      };

      const nodeId = edge!.source;
      this.addNode(nodeId, relevantNodes, otherNodeStyle);

      const nodeId2 = edge!.target;
      this.addNode(nodeId2, relevantNodes, otherNodeStyle);

      // Gate node opacity update so it doesn't get clobbered later
      if (isCurrentStep) {
        currentStepNodes[nodeId] = nodeId;
        currentStepNodes[nodeId2] = nodeId2;

        const currentNodeStyle = {
          opacity: "1",
          width: "6em",
          height: "6em"
        };
        relevantNodes[nodeId].style = { ...relevantNodes[nodeId].style, ...currentNodeStyle };
        relevantNodes[nodeId2].style = { ...relevantNodes[nodeId2].style, ...currentNodeStyle };
      }

      relevantEdges[key] = {
        id: edge.id,
        order: edge.order,
        data: edge.data,
        source: edge.source,
        target: edge.target,
        style: {
          ...edge.style,
          ...currentEdgeStyle
        }
      };
    }

    return new RecipeGraph(relevantNodes, relevantEdges, this.recipe);
  }

  public getRecipeActions(step: number): { prev: RecipeAction[]; current: RecipeAction; next: RecipeAction[] } {
    const previousActions: { [key: string]: RecipeAction } = {};
    var currentAction: RecipeAction | null = null;
    const nextActions: { [key: string]: RecipeAction } = {};
    for (var [key, edge] of Object.entries(this.edges)) {
      const action = edge.data as RecipeAction;
      const diff = edge.order - step;
      if (diff < 0) {
        previousActions[action.id] = action;
      } else if (diff === 0) {
        currentAction = action;
      } else if (diff > 0) {
        nextActions[action.id] = action;
      }
    }
    return { prev: Object.values(previousActions), current: currentAction!, next: Object.values(nextActions) };
  }

  private addNode(nodeId: string, relevantNodes: NodesSet, opacityStyle: { opacity: string }) {
    if (!(nodeId in relevantNodes)) {
      const n = this.nodes[nodeId];
      relevantNodes[nodeId] = {
        id: n.id,
        style: {
          ...n.style,
          ...opacityStyle
        }
      };
    }
  }

  public getMaxSteps() {
    return this.maxSteps;
  }
}
