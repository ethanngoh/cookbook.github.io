import { COLORS_1 } from "../colors";
import { ICONS, IconSource, PngIconInfo, ReactIconInfo, SvgIconInfo } from "../icons/icons";
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

const CURRENT_EDGE_STYLE: { [key: string]: string } = {
  opacity: "1",
  width: "6px"
};

const NONCURRENT_EDGE_STYLE: { [key: string]: string } = {
  opacity: "0.2",
  width: "3px"
};

const EDGE_STYLE: { [key: string]: { [key: string]: string } } = {
  prep: {
    "line-color": COLORS_1.GRAPH_ENDPOINT,
    "target-arrow-color": COLORS_1.GRAPH_ENDPOINT
  },
  cook: {
    "line-color": COLORS_1.GRAPH_ENDPOINT,
    "target-arrow-color": COLORS_1.GRAPH_ENDPOINT
  },
  serve: {
    "line-color": COLORS_1.GRAPH_ENDPOINT,
    "target-arrow-color": COLORS_1.GRAPH_ENDPOINT
  },
  combine: {
    "line-color": COLORS_1.GRAPH_COMBINE,
    "target-arrow-color": COLORS_1.GRAPH_COMBINE
  },
  saute: {
    "line-color": COLORS_1.GRAPH_SAUTE,
    "target-arrow-color": COLORS_1.GRAPH_SAUTE
  },
  transfer: {
    "line-color": COLORS_1.GRAPH_TRANSFER,
    "target-arrow-color": COLORS_1.GRAPH_TRANSFER
  },
  knife: {
    "line-color": COLORS_1.GRAPH_KNIFE,
    "target-arrow-color": COLORS_1.GRAPH_KNIFE
  }
};

export function getEdgeStyle(edgeType: string, current: boolean) {
  const baseStyle = current ? CURRENT_EDGE_STYLE : NONCURRENT_EDGE_STYLE;
  return { ...baseStyle, ...EDGE_STYLE[edgeType] };
}

const CURRENT_NODE_STYLE: { [key: string]: string } = {
  opacity: "1",
  width: "6em",
  height: "6em"
};

const NONCURRENT_NODE_STYLE: { [key: string]: string } = {
  opacity: "0.2",
  width: "4em",
  height: "4em"
};

export function getNodeStyle(iconName: string, current: boolean) {
  const anyIconInfo = ICONS[iconName];
  const baseNodeStyle = current ? CURRENT_NODE_STYLE : NONCURRENT_NODE_STYLE;

  if (!anyIconInfo) {
    debugger;
    return {
      ...baseNodeStyle,
      background: "red",
      "border-color": "black"
    };
  }
  switch (anyIconInfo.source) {
    case IconSource.Png:
      const pngIconInfo = anyIconInfo as PngIconInfo;
      return {
        ...baseNodeStyle,
        "background-image": pngIconInfo.url,
        "border-color": pngIconInfo.borderColor
      };
    case IconSource.ReactIcon:
      const reactIconInfo = anyIconInfo as ReactIconInfo;
      return {
        ...baseNodeStyle,
        "background-image": reactIconInfo.svgCss,
        "border-color": reactIconInfo.borderColor
      };
    case IconSource.Svg:
      const svgIconInfo = anyIconInfo as SvgIconInfo;
      return {
        ...baseNodeStyle,
        "background-image": svgIconInfo.url,
        "border-color": svgIconInfo.borderColor
      };
  }
}

export const GRAPH_STEP_DISTANCE = 2;
