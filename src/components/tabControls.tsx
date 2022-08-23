import styled from "@emotion/styled";
import React from "react";
import { AiOutlinePicture } from "react-icons/ai";
import { FaListOl } from "react-icons/fa";
import { GiTomato } from "react-icons/gi";
import { COLORS } from "../colors";

const TabControlsContainer = styled.div`
  margin-top: 1rem;
`;

const ControlRow = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const TabButton = styled.button`
  padding: 0.75rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  font-weight: 500;
  border: 0;
  background: ${COLORS.BUTTON_INACTIVE_BG};
  opacity: 70%;

  &:disabled {
    background: ${COLORS.BUTTON_ACTIVE_BG};
    opacity: 100%;
  }
`;

export const TabControls = ({
  currentTab,
  setCurrentTab,
  children
}: {
  currentTab: number;
  setCurrentTab: React.Dispatch<React.SetStateAction<number>>;
  children: React.ReactNode;
}) => {
  return (
    <TabControlsContainer>
      <ControlRow>
        <TabButton onClick={() => setCurrentTab(0)} disabled={currentTab === 0}>
          <GiTomato
            size={25}
            style={{ color: currentTab === 0 ? COLORS.BUTTON_ACTIVE_ICON : COLORS.BUTTON_INACTIVE_ICON }}
          />
        </TabButton>
        <TabButton onClick={() => setCurrentTab(1)} disabled={currentTab === 1}>
          <FaListOl
            size={25}
            style={{ color: currentTab === 1 ? COLORS.BUTTON_ACTIVE_ICON : COLORS.BUTTON_INACTIVE_ICON }}
          />
        </TabButton>
        <TabButton onClick={() => setCurrentTab(2)} disabled={currentTab === 2}>
          <AiOutlinePicture
            size={25}
            style={{ color: currentTab === 2 ? COLORS.BUTTON_ACTIVE_ICON : COLORS.BUTTON_INACTIVE_ICON }}
          />
        </TabButton>
      </ControlRow>
      {React.Children.map(children, (e: any, i: number) => {
        return <div style={{ display: currentTab === i ? "initial" : "none" }}>{e}</div>;
      })}
    </TabControlsContainer>
  );
};
