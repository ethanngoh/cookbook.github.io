import styled from "@emotion/styled";
import React from "react";

const PreviousItem = styled.div`
  border: 1px solid black;
  border-radius: 4px;
  padding: 0.5em;
`;

export const ChecklistItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <PreviousItem>{children}</PreviousItem>
    </div>
  );
};
