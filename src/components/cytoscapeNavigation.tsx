import React from "react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

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
    <div
      onClick={() => {
        var nextStep = currentStep - 1;
        if (nextStep < minStep) {
          nextStep = currentStep;
        }
        setStep(nextStep);
      }}
    >
      <MdNavigateBefore size={100} />
    </div>
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
    <div
      onClick={() => {
        var nextStep = currentStep + 1;
        if (nextStep > maxStep) {
          nextStep = currentStep;
        }
        setStep(nextStep);
      }}
    >
      <MdNavigateNext size={100} />
    </div>
  );
};
