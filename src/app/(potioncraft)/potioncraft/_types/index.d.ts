import { Ingredient } from "@prisma/client";

export interface HandleFilterIngredientsProps {
  event?: ChangeEvent<HTMLInputElement> | undefined;
  ingredients?: Ingredient[] | undefined;
}

export interface HandleIngredientQuantityChangeProps {
  ingredient: Ingredient;
  quantity: number;
}

export interface IngredientListProps {
  ingredients: Ingredient[];
  handleFilterIngredients: ({
    event,
    ingredients,
  }: HandleFilterIngredientsProps) => void;
  handleOrderFilteredIngredients: (e: string) => void;
  handleChangeIngredientQuantity: ({ ingredient, quantity }: HandleIngredientQuantityChangeProps) => Promise<void>
}

export interface IngredientItemProps {
  ingredient: Ingredient;
  onQuantityChange: ({ ingredient, quantity }: HandleIngredientQuantityChangeProps) => Promise<void>
}

export interface RarityStyleProps {
  COMMON: string;
  UNCOMMON: string;
  RARE: string;
  VERYRARE: string;
  LEGENDARY: string;
}

export interface IngredientIconProps {
  ARCANE: StaticImport;
  DIVINE: StaticImport;
  OCCULT: StaticImport;
  PRIMAL: StaticImport;
}