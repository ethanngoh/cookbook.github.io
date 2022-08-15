export function edgeId(node1: string, node2: string) {
  return `${node1}-${node2}`.replace(" ", "_");
}

export function nodeId(node: string) {
  return `${node}`.replace(" ", "_");
}

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

export type RecipeNodesSet = { [key: string]: RecipeGraphNode };
export type RecipeEdgesSet = { [key: string]: RecipeGraphEdge };
