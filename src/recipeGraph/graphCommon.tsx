export function edgeId(node1: string, node2: string) {
  return `${node1.toLocaleLowerCase()}-${node2.toLocaleLowerCase()}`.replace(" ", "_");
}

export function nodeId(node: string) {
  return `${node.toLocaleLowerCase()}`.replace(" ", "_");
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
  data: any;
  style: { [key: string]: string };
}

export type NodesSet = { [key: string]: GraphNode };
export type EdgesSet = { [key: string]: GraphEdge };
