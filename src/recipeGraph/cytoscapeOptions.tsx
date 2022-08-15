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
      animate: true,
      animationDuration: 1000,
      nodeSep: 30,
      spacingFactor: 2,
      animationEasing: "ease-out-circ",
      zoom: 10
    }
  };
}

function globalGraphStyles() {
  return [
    {
      selector: "node",
      style: {
        "background-fit": "cover",
        height: "4em",
        width: "4em",
        "border-color": "#555",
        "border-width": 5
      }
    },
    {
      selector: "edge",
      style: {
        "curve-style": "bezier",
        width: "0.25em",
        "target-arrow-shape": "triangle",
        "line-color": "#ffaaaa",
        "target-arrow-color": "#ffaaaa"
      }
    }
  ];
}
