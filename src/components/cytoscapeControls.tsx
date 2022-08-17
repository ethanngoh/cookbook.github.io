import styled from "@emotion/styled";
import { CytoscapeNavLeft, CytoscapeNavRight } from "./cytoscapeNavigation";

const ControlBar = styled.div`
  display: flex;
  align-items: center;
  gap: 10em;
`;

export const CytoscapeControls = ({
  currentStep,
  setStep,
  maxStep
}: {
  currentStep: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  maxStep: number;
}) => {
  return (
    <ControlBar>
      <CytoscapeNavLeft currentStep={currentStep} setStep={setStep} minStep={0} />
      <CytoscapeNavRight currentStep={currentStep} setStep={setStep} maxStep={maxStep} />
    </ControlBar>
  );
};
