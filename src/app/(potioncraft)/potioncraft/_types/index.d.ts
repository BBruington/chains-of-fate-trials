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
  handleIncrementIngredient: ({
    ingredient,
  }: {
    ingredient: z.infer<typeof IngredientSchema>;
  }) => Promise<void>;
}

export interface IngredientItemProps {
  item: Ingredient;
  onIncrement: ({
    ingredient,
  }: {
    ingredient: z.infer<typeof IngredientSchema>;
  }) => Promise<void>;
}