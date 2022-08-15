import React from "react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import styled from "@emotion/styled";

const CytoNav = styled.div`
  background-color: #eee;
  border-radius: 4px;
  padding: 0;
`;

export const CytoscapeNavLeft = ({
  currentStep,
  setStep,
  minStep
}: {
  currentStep: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  minStep: number;
}) => {
  return (
    <CytoNav
      onClick={() => {
        var nextStep = currentStep - 1;
        if (nextStep < minStep) {
          nextStep = currentStep;
        }
        setStep(nextStep);
      }}
    >
      <MdNavigateBefore size={80} />
    </CytoNav>
  );
};

export const CytoscapeNavRight = ({
  currentStep,
  setStep,
  maxStep
}: {
  currentStep: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  maxStep: number;
}) => {
  return (
    <CytoNav
      onClick={() => {
        var nextStep = currentStep + 1;
        if (nextStep > maxStep) {
          nextStep = currentStep;
        }
        setStep(nextStep);
      }}
    >
      <MdNavigateNext size={80} />
    </CytoNav>
  );
};
