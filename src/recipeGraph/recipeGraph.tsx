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
    const relevantNodes: NodesSet = {};
    const relevantEdges: EdgesSet = {};
    const currentStepNodes: { [key: string]: string } = {};

    for (var [key, edge] of Object.entries(this.edges).sort(([ak, av], [bk, bv]) => av.order - bv.order)) {
      if (Math.abs(edge.order - step) > 1) {
        continue;
      }

      const isCurrentStep = edge!.order == step;
      const otherNodeStyle = { opacity: "0.2" };
      const currentEdgeStyle = { opacity: isCurrentStep ? "1" : "0.2", width: isCurrentStep ? "9" : "4" };

      const nodeId = edge!.source;
      this.addNode(nodeId, relevantNodes, otherNodeStyle);

      const nodeId2 = edge!.target;
      this.addNode(nodeId2, relevantNodes, otherNodeStyle);

      // Gate node opacity update so it doesn't get clobbered later
      if (isCurrentStep) {
        currentStepNodes[nodeId] = nodeId;
        currentStepNodes[nodeId2] = nodeId2;

        relevantNodes[nodeId].style["opacity"] = "1";
        relevantNodes[nodeId2].style["opacity"] = "1";
      }

      relevantEdges[key] = {
        id: edge.id,
        order: edge.order,
        source: edge.source,
        target: edge.target,
        style: {
          ...edge.style,
          ...currentEdgeStyle
        }
      };
    }

    return [relevantNodes, relevantEdges];
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
