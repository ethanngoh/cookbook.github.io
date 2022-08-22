import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
export const AnimatedItem = ({
  shouldTransition1,
  shouldTransition2,
  shouldTransition3
}: {
  shouldTransition1: boolean;
  shouldTransition2: boolean;
  shouldTransition3: boolean;
}) => {
  return (
    <CSSTransition in={shouldTransition3} timeout={1000} classNames="list-animation-step-3">
      <CSSTransition in={shouldTransition2} timeout={1000} classNames="list-animation-step-2">
        <CSSTransition in={shouldTransition1} timeout={1000} classNames="list-animation-step-1">
          <p>This alert message is being transitioned in and out of the DOM.</p>
        </CSSTransition>
      </CSSTransition>
    </CSSTransition>
  );
};
