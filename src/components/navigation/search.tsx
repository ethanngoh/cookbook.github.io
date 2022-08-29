import styled from "@emotion/styled";
import Select, { ActionMeta, SingleValue } from "react-select";
import { COLORS } from "../../colors";
import { FontKey, getFont } from "../../fonts";
import { allRecipes, RawRecipeType } from "../../recipeData/recipeData";

const SearchContainer = styled.div`
  color: ${COLORS.NAVIGATION_TEXT};

  border: 0;
  width: 25rem;

  font-family: ${getFont(FontKey.BODY)};
  font-weight: 400;
  font-size: 18px;
`;

type SelectOption = { value: string; label: string; ref: RawRecipeType };
const options: SelectOption[] = allRecipes.map((e) => {
  return {
    value: e.name,
    label: e.name,
    ref: e
  };
});

export const Search = ({ setRecipe }: { setRecipe: React.Dispatch<React.SetStateAction<RawRecipeType>> }) => {
  return (
    <SearchContainer>
      <Select
        options={options}
        onChange={(newValue: SingleValue<SelectOption>, actionMeta: ActionMeta<SelectOption>) => {
          setRecipe(newValue?.ref);
        }}
        placeholder="Type a recipe name"
      />
    </SearchContainer>
  );
};
