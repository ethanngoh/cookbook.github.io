import { useLayoutEffect, useRef } from "react";
import cytoscape from "cytoscape";
import dagre from "cytoscape-dagre";

cytoscape.use(dagre);

export const CytoscapeBridge = ({
  id,
  nodes,
  edges,
  style,
  layout
}: {
  id: string;
  nodes: any;
  edges: any;
  style: any;
  layout: any;
}) => {
  const ref = useRef(null);

  useLayoutEffect(() => {
    var cy = cytoscape({
      container: ref.current, // container to render in
      boxSelectionEnabled: false,
      zoomingEnabled: false,
      elements: {
        nodes: nodes,
        edges: edges
      },
      style: style,
      layout: layout
    });

    cy.center();
    window.addEventListener("resize", function handleResize() {
      cy.resize();
      cy.fit();
      cy.center();
    });
  });

  return <div style={{ height: "100vh", width: "66vw" }} ref={ref} id={id}></div>;
};
