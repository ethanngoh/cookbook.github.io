import { useLayoutEffect, useRef } from "react";
import cytoscape from "cytoscape";
import dagre from "cytoscape-dagre";
import { css } from "@emotion/css";
import { CytoscapeNavLeft, CytoscapeNavRight } from "./cytoscapeNavigation";

cytoscape.use(dagre);

export const CytoscapeBridge = ({
  id,
  nodes,
  edges,
  style,
  layout,
  currentStep,
  setStep,
  maxStep
}: {
  id: string;
  nodes: any;
  edges: any;
  style: any;
  layout: any;
  currentStep: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  maxStep: number;
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

  return (
    <div
      className={css`
        display: flex;
        align-items: center;
        height: 10%;
      `}
    >
      <div style={{ height: "75vh", width: "40vw" }} ref={ref} id={id}></div>
    </div>
  );
};
