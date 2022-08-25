import { Recipe } from "../model/recipe";
import { RecipeAction } from "../model/recipeAction";
import { getEdgeStyle, getNodeStyle, GRAPH_STEP_DISTANCE } from "./cytoscapeOptions";
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

    const sortedSteps = Object.values(this.edges).sort((av, bv) => av.order - bv.order);
    const prepStepOrder = sortedSteps.filter((v) => v.action == "prep")[0].order;
    const cookStep = sortedSteps.filter((v) => v.action == "cook");
    const cookStepOrder = cookStep.length > 0 ? cookStep[0] : -1;

    // TODO: rewrite this as modified bfs
    for (var edge of sortedSteps) {
      if (Math.abs(edge.order - step) > GRAPH_STEP_DISTANCE) {
        continue;
      }

      // Outside boundaries of prep
      if (
        (edge.order < prepStepOrder && prepStepOrder < step) ||
        (step < prepStepOrder && prepStepOrder < edge.order)
      ) {
        continue;
      }

      // Outside boundaries of cook
      if (
        (edge.order < cookStepOrder && cookStepOrder <= step) ||
        (step < cookStepOrder && cookStepOrder < edge.order)
      ) {
        continue;
      }

      const isCurrentStep = edge!.order === step;

      const nodeId1 = edge.source;
      const node1 = this.nodes[nodeId1];
      this.addNodeIfDne(nodeId1, relevantNodes, getNodeStyle(node1.iconName, isCurrentStep));

      const nodeId2 = edge.target;
      const node2 = this.nodes[nodeId2];
      this.addNodeIfDne(nodeId2, relevantNodes, getNodeStyle(node2.iconName, isCurrentStep));

      // Update node style if it's part of the current step.
      // This happens because a node could be seen earlier as part of a different step.
      if (isCurrentStep) {
        currentStepNodes[nodeId1] = nodeId1;
        currentStepNodes[nodeId2] = nodeId2;

        relevantNodes[nodeId1].style = getNodeStyle(node1.iconName, isCurrentStep);
        relevantNodes[nodeId2].style = getNodeStyle(node2.iconName, isCurrentStep);
      }

      relevantEdges[edge.id] = {
        id: edge.id,
        order: edge.order,
        data: edge.data,
        source: edge.source,
        target: edge.target,
        action: edge.action,
        style: getEdgeStyle(edge.action, isCurrentStep)
      };
    }
    return new RecipeGraph(relevantNodes, relevantEdges, this.recipe);
  }

  public getRecipeActions(step: number): { prev: RecipeAction[]; current: RecipeAction; next: RecipeAction[] } {
    debugger;
    const previousActions: { [key: string]: RecipeAction } = {};
    var currentAction: RecipeAction | null = null;
    const nextActions: { [key: string]: RecipeAction } = {};
    for (var [, edge] of Object.entries(this.edges)) {
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

  private addNodeIfDne(nodeId: string, relevantNodes: NodesSet, style: { [key: string]: string }) {
    if (!(nodeId in relevantNodes)) {
      const n = this.nodes[nodeId];
      if (!n) {
        debugger;
      }
      relevantNodes[nodeId] = {
        id: n.id,
        iconName: n.iconName,
        style: style
      };
    }
  }

  public getMaxSteps() {
    return this.maxSteps;
  }
}
