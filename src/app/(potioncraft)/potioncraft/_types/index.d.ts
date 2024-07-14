export interface HandleFilterIngredientsProps {
  event?: ChangeEvent<HTMLInputElement> | undefined;
  ingredients?: Ingredient[] | undefined;
}

export interface IngredientListProps {
  ingredients: Ingredient[];
  handleFilterIngredients: ({
    event,
    ingredients,
  }: HandleFilterIngredientsProps) => void;
  handleOrderFilteredIngredients: (e: string) => void;
  handleIncrementIngredient: ({
    ingredient,
  }: {
    ingredient: z.infer<typeof IngredientSchema>;
  }) => Promise<void>;
}

export interface IngredientItemProps {
  ingredient: Ingredient;
  onIncrement: ({
    ingredient,
  }: {
    ingredient: z.infer<typeof IngredientSchema>;
  }) => Promise<void>;
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