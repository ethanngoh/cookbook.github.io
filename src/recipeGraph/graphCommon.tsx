export function edgeId(node1: string, node2: string) {
  return `${node1}-${node2}`.replace(" ", "_");
}

export function nodeId(node: string) {
  return `${node}`.replace(" ", "_");
}

export interface GraphNode {
  id: string;
  style: { [key: string]: string };
}

export interface GraphEdge {
  id: string;
  order: number;
  source: string;
  target: string;
  style: { [key: string]: string };
}

export type NodesSet = { [key: string]: GraphNode };
export type EdgesSet = { [key: string]: GraphEdge };
