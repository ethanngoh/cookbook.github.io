import { COLORS, COLORS_1 } from "../colors";
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
      align: "DL",
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
        width: "1em",
        "target-arrow-shape": "triangle",
        "line-color": "red",
        "target-arrow-color": "red"
      }
    }
  ];
}

const EDGE_STYLE: { [key: string]: { [key: string]: string } } = {
  combine: {
    "line-color": COLORS.COMBINE,
    "target-arrow-color": COLORS.COMBINE
  },
  saute: {
    "line-color": COLORS.SAUTE,
    "target-arrow-color": COLORS.SAUTE
  },
  start: {
    "line-color": COLORS.ENDPOINT,
    "target-arrow-color": COLORS.ENDPOINT
  },
  serve: {
    "line-color": COLORS.ENDPOINT,
    "target-arrow-color": COLORS.ENDPOINT
  },
  transfer: {
    "line-color": COLORS.TRANSFER,
    "target-arrow-color": COLORS.TRANSFER
  }
};

export function getEdgeStyle(edgeType: string) {
  return EDGE_STYLE[edgeType];
}
