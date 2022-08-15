import { edgeId, EdgesSet, NodesSet } from "./graphCommon";

export function toCytoscapeOptions(nodes: NodesSet, edges: EdgesSet) {
  return {
    nodes: Object.values(nodes).map((node) => {
      return {
        data: {
          id: node.id
        }
      };
    }),
    edges: Object.values(edges).map((edgeTuple) => {
      return {
        data: {
          id: edgeId(edgeTuple.source, edgeTuple.target),
          source: edgeTuple.source,
          target: edgeTuple.target
        }
      };
    }),
    style: [
      ...globalGraphStyles(),
      ...Object.values(nodes).map((node) => {
        return {
          selector: `#${node.id}`,
          style: node.style
        };
      }),
      ...Object.values(edges).map((edge) => {
        return {
          selector: `#${edge.id}`,
          style: edge.style
        };
      })
    ],
    layout: {
      name: "dagre",
      padding: 5,
      nodeSep: 30,
      spacingFactor: 1.5
    }
  };
}

function globalGraphStyles() {
  return [
    {
      selector: "node",
      style: {
        "background-fit": "cover",
        height: "3em",
        width: "3em",
        "border-color": "#555",
        "border-width": 5
      }
    },
    {
      selector: "edge",
      style: {
        "curve-style": "bezier",
        width: "5",
        "target-arrow-shape": "triangle",
        "line-color": "#ffaaaa",
        "target-arrow-color": "#ffaaaa"
      }
    }
  ];
}

const EDGE_STYLE: { [key: string]: { [key: string]: string } } = {
  combine: {
    "line-color": "#0000ff",
    "target-arrow-color": "#0000ff"
  },
  saute: {
    "line-color": "#ffaaaa",
    "target-arrow-color": "#ffaaaa"
  }
};

export function getEdgeStyle(edgeType: string) {
  return EDGE_STYLE[edgeType];
}
