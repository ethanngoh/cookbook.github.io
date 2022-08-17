import React from "react";
import styled from "@emotion/styled";
import { NavBrand } from "./navbrand";

import { breakpoint } from "../../breakpoints";

const NavFixedPosition = styled.div`
  width: 100%;
  top: 0;
`;
const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  margin: 1em 2em;
  padding-bottom: 1em;
  border-bottom: 1px solid black;
`;

const NavLeft = styled.nav`
  display: flex;
`;

const NavRight = styled.nav`
  display: flex;
`;

const Nav = ({ left, right }: { left: React.ReactNode; right: React.ReactNode }) => {
  return (
    <NavFixedPosition>
      <NavContainer>
        <NavLeft>{left}</NavLeft>
        <NavRight>{right}</NavRight>
      </NavContainer>
    </NavFixedPosition>
  );
};

const NavLinks = styled.div`
  display: flex;
  @media ${breakpoint.xs} {
    display: none;
  }
`;

const NavLink = styled.a`
  display: flex;
  align-items: center;
  color: #000;
  font-size: 16px;
  font-weight: 400;
  border-radius: 0;
  margin-left: 1.5em;
  text-decoration: none;
`;

export const Navigation = () => {
  return (
    <Nav
      left={<NavBrand />}
      right={
        <NavLinks>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#services">Services</NavLink>
        </NavLinks>
      }
    />
  );
};
