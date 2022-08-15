import { EdgesSet, NodesSet } from "./graphCommon";

type Entry<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T];

function filterObject<T extends object>(obj: T, fn: (entry: Entry<T>, i: number, arr: Entry<T>[]) => boolean) {
  return Object.fromEntries((Object.entries(obj) as Entry<T>[]).filter(fn)) as T;
}

export class RecipeGraph {
  nodes: NodesSet;
  edges: EdgesSet;
  maxSteps: number;

  constructor(nodes: NodesSet, edges: EdgesSet) {
    this.nodes = nodes;
    this.edges = edges;
    this.maxSteps = Math.max(...Object.values(this.edges).map((e) => e.order));
  }

  public getRecipeStep(step: number): [NodesSet, EdgesSet] {
    const relevantEdges = filterObject(this.edges, ([k, v]) => Math.abs(v.order - step) <= 1);
    const relevantNodes: NodesSet = {};
    for (var edge of Object.values(relevantEdges)) {
      const nodeId = edge!.source;
      if (!(nodeId in relevantNodes)) {
        const n = this.nodes[nodeId];
        relevantNodes[nodeId] = {
          id: n.id,
          style: {
            ...n.style
          }
        };
      }
      const nodeId2 = edge!.target;
      if (!(nodeId2 in relevantNodes)) {
        const n = this.nodes[nodeId2];
        relevantNodes[nodeId2] = {
          id: n.id,
          style: {
            ...n.style
          }
        };
      }
    }

    return [relevantNodes, relevantEdges];
  }

  public getMaxSteps() {
    return this.maxSteps;
  }
}
