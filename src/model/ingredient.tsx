export interface IngredientAmount {
  unit: string;
  value: number;
}

export interface Ingredient {
  id: string;
  iconName: string;
  name: string;
  description?: string;
  amount: IngredientAmount;
}
