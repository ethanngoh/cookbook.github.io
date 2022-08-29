import styled from "@emotion/styled";
import React from "react";
import { breakpoint } from "../../breakpoints";
import { COLORS } from "../../colors";
import { RawRecipeType } from "../../recipeData/recipeData";
import { NavBrand } from "./navbrand";
import { Search } from "./search";

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

const NavCenter = styled.nav`
  display: flex;
`;

const NavRight = styled.nav`
  display: flex;
`;

const Nav = ({ left, center, right }: { left: React.ReactNode; center?: React.ReactNode; right: React.ReactNode }) => {
  return (
    <NavFixedPosition>
      <NavContainer>
        <NavLeft>{left}</NavLeft>
        {center ? <NavCenter>{center}</NavCenter> : null}
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
  color: ${COLORS.NAVIGATION_TEXT};
  font-size: 16px;
  font-weight: 400;
  border-radius: 0;
  margin-left: 1.5em;
  text-decoration: none;
`;

export const Navigation = ({ setRecipe }: { setRecipe: React.Dispatch<React.SetStateAction<RawRecipeType>> }) => {
  return (
    <Nav
      left={<NavBrand />}
      center={<Search setRecipe={setRecipe} />}
      right={
        <NavLinks>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#services">Services</NavLink>
        </NavLinks>
      }
    />
  );
};
