export interface IngredientAmount {
  unit: string;
  value: number;
}

export interface Ingredient {
  id: string;
  name: string;
  description?: string;
  amount: IngredientAmount;
}
