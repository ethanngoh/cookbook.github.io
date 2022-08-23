export function edgeId(node1: string, node2: string) {
  return `${node1}-${node2}`.replace(" ", "_");
}

export function nodeId(node: string) {
  return `${node}`.replace(" ", "_");
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
