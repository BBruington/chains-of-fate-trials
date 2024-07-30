import { addIngredientsToUser, changeIngredientQuantity } from "../actions";
import { DragOverEvent, DragStartEvent } from "@dnd-kit/core";
import {
  IngredientHooksProps,
  AddIngredientsProps,
  HandleFilterIngredientsProps,
  HandleIngredientQuantityChangeProps,
} from "./types";
import { Ingredient } from "@prisma/client";
import {
  EMPTY_MIXTURE,
  INGREDIENT_RARITY_ORDER,
  INGREDIENT_TYPE_ORDER,
} from "@/constants";

export function IngredientHooks({
  filteredIngredientsInput,
  filteredUserIngredients,
  userIngredients,
  mixture,
  ingredients,
  findMixtureProperties,
  setMixture,
  setUserIngredients,
  setActiveIngredient,
  setFilteredUserIngredients,
  setFilteredIngredientsInput,
}: IngredientHooksProps) {
  
  const handleAddIngredients = async ({
    ingredients,
    userId,
  }: AddIngredientsProps) => {
    if (userIngredients.length > 0)
      await addIngredientsToUser({ userId, ingredients });
  };

  const filterIngredients = (ingredients: Ingredient[], input: string) =>
    ingredients.filter(({ name }) =>
      name.toLowerCase().includes(input.toLowerCase()),
    );

  const handleFilterIngredients = ({
    event,
    ingredients = userIngredients,
  }: HandleFilterIngredientsProps) => {
    const input = event?.target.value ?? filteredIngredientsInput;

    setFilteredIngredientsInput(input);
    setFilteredUserIngredients(
      input ? filterIngredients(ingredients, input) : ingredients,
    );
  };

  const handleOrderFilteredIngredients = (orderBy: string) => {
    const sortedIngredients = [...filteredUserIngredients].sort((a, b) => {
      if (orderBy === "alphabet") return a.name.localeCompare(b.name);
      if (orderBy === "type")
        return INGREDIENT_TYPE_ORDER[a.type] - INGREDIENT_TYPE_ORDER[b.type];
      if (orderBy === "rarity")
        return (
          INGREDIENT_RARITY_ORDER[a.rarity] - INGREDIENT_RARITY_ORDER[b.rarity]
        );
      return 0;
    });
    handleFilterIngredients({ ingredients: sortedIngredients });
  };

  function handleIngredientDragStart({ active }: DragStartEvent) {
    const activeIng = userIngredients.find(
      (ingredient) => ingredient.id === active.id,
    );
    if (activeIng) setActiveIngredient(activeIng);
  }

  function handleIngredientDragEnd({ active, over }: DragOverEvent) {
    setActiveIngredient(null);
    if (!over || mixture[Number(over.id)].id !== "empty") return;

    const draggedIngredient = userIngredients.find(
      (item) => item.id === active.id,
    );
    if (!draggedIngredient) return;

    const updatedMixture = mixture.map((mix, index) =>
      index === over.id ? draggedIngredient : mix,
    );
    setMixture(updatedMixture);
    findMixtureProperties(updatedMixture);

    const updatedUserIngredients = userIngredients
      .map((ingredient) =>
        ingredient.id === draggedIngredient.id
          ? { ...ingredient, quantity: ingredient.quantity - 1 }
          : ingredient,
      )
      .filter((ingredient) => ingredient.quantity > 0);

    setUserIngredients(updatedUserIngredients);
    handleFilterIngredients({ ingredients: updatedUserIngredients });
  }

  const handleResetIngredients = () => {
    setUserIngredients(ingredients);
    handleFilterIngredients({ ingredients });
    setMixture(EMPTY_MIXTURE);
  };

  const handleChangeIngredientQuantity = async ({
    ingredient,
    quantity,
  }: HandleIngredientQuantityChangeProps) => {
    const res = await changeIngredientQuantity({ ingredient, quantity });
    const changedIngredients = userIngredients.map((userIngredient) => {
      if (userIngredient.id === ingredient.id) {
        return {
          ...userIngredient,
          quantity: userIngredient.quantity + quantity,
        };
      }
      return userIngredient;
    });
    if (res) {
      setUserIngredients(changedIngredients);
      handleFilterIngredients({ ingredients: changedIngredients });
    }
  };

  return {
    handleAddIngredients,
    handleFilterIngredients,
    handleOrderFilteredIngredients,
    handleIngredientDragStart,
    handleIngredientDragEnd,
    handleResetIngredients,
    handleChangeIngredientQuantity,
  };
}
