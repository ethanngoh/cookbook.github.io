import { getIcon } from "../icons/icons";
import { Recipe } from "../model/recipe";
import { CombineAction, RecipeAction } from "../model/recipeAction";
import { edgeId } from "./graphCommon";

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

export class RecipeGraph {
  nodes: RecipeNodesSet;
  edges: RecipeEdgesSet;

  constructor(nodes: RecipeNodesSet, edges: RecipeEdgesSet) {
    this.nodes = nodes;
    this.edges = edges;
  }
}
