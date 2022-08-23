export function edgeId(node1: string, node2: string) {
  return `${node1}-${node2}`.replace(" ", "_");
}

export function nodeId(node: string) {
  return `${node}`.replace(" ", "_");
}

export function parseIngredientRef(ingredientId: string): [string, string | undefined] {
  const x = ingredientId.indexOf(".");
  if (ingredientId.indexOf(".") < 0) {
    return [ingredientId, undefined];
  }

  const [ingredient, cutStyle] = ingredientId.split(".");
  return [ingredient, cutStyle];
}

export interface GraphNode {
  id: string;
  iconName: string;
  style?: { [key: string]: string | undefined };
}

export interface GraphEdge {
  id: string;
  order: number;
  source: string;
  target: string;
  data: any;
  action: string;
  style?: { [key: string]: string };
}

export type NodesSet = { [key: string]: GraphNode };
export type EdgesSet = { [key: string]: GraphEdge };
