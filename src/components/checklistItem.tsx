import styled from "@emotion/styled";
import React from "react";

const Item = styled.li`
  padding: 0.5em;
  font-size: 1rem;
`;

export const ChecklistItem = ({ children }: { children: React.ReactNode }) => {
  return <Item>{children}</Item>;
};
