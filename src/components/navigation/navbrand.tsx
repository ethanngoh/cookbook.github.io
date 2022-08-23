import styled from "@emotion/styled";
import { GiChefToque } from "react-icons/gi";
import { COLORS_1 } from "../../colors";
import { FontKey, getFont } from "../../fonts";

const NavBrandLink = styled.a`
  text-decoration: none;
`;

const NavBrandTextContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const NavBrandText = styled.div`
  font-size: 24px;
  font-weight: 600;
  font-family: ${getFont(FontKey.HEADING)};
  color: ${COLORS_1.BRAND};
`;

const NavBrandContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const NavBrand = () => {
  return (
    <NavBrandContainer>
      <NavBrandLink href="#page-top">
        <NavBrandTextContainer>
          <GiChefToque size={25} color={COLORS_1.LOGO} />
          <NavBrandText>Cookbook</NavBrandText>
        </NavBrandTextContainer>
      </NavBrandLink>
    </NavBrandContainer>
  );
};
