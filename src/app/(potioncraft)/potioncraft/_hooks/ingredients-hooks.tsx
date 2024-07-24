import { addIngredientsToUser } from "../actions";
import { DragOverEvent, DragStartEvent } from "@dnd-kit/core";
import {
  IngredientHooksProps,
  AddIngredientsProps,
  HandleFilterIngredientsProps,
} from "./types";

export function IngredientHooks({
  filteredIngredientsInput,
  filteredUserIngredients,
  userIngredients,
  mixture,
  userId,
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
    if (userIngredients.length === 0) return;
    await addIngredientsToUser({ userId, ingredients });
  };

  const handleFilterIngredients = ({
    event,
    ingredients,
  }: HandleFilterIngredientsProps) => {
    if (event?.target.value === "") {
      setFilteredUserIngredients(userIngredients);
      setFilteredIngredientsInput("");
      return;
    }
    const ingredientInput = event?.target.value
      ? event?.target.value
      : filteredIngredientsInput;
    setFilteredIngredientsInput(ingredientInput);
    if (ingredients) {
      const filteredIngredients = ingredients.filter((filter) => {
        const name = filter.name.toLowerCase();
        return name.includes(ingredientInput.toLowerCase());
      });
      setFilteredUserIngredients(filteredIngredients);
    } else {
      const filteredIngredients = userIngredients.filter((filter) => {
        const name = filter.name.toLowerCase();
        return name.includes(ingredientInput.toLowerCase());
      });
      setFilteredUserIngredients(filteredIngredients);
    }
  };

  const handleOrderFilteredIngredients = (e: string) => {
    if (e === "alphabet") {
      const ingredientsByName = filteredUserIngredients.sort((a, b) =>
        a.name.localeCompare(b.name),
      );

      handleFilterIngredients({ ingredients: ingredientsByName });
    }
    if (e === "type") {
      const ingredientType = {
        EMPTY: 0,
        ARCANE: 1,
        DIVINE: 2,
        OCCULT: 3,
        PRIMAL: 4,
      };
      const ingredientsByType = filteredUserIngredients.sort((a, b) => {
        const typeA = a.type;
        const typeB = b.type;
        return ingredientType[typeA] - ingredientType[typeB];
      });
      handleFilterIngredients({ ingredients: ingredientsByType });
    }
    if (e === "rarity") {
      const ingredientRarity = {
        EMPTY: 0,
        COMMON: 1,
        UNCOMMON: 2,
        RARE: 3,
        VERYRARE: 4,
        LEGENDARY: 5,
      };
      const ingredientsByRarity = filteredUserIngredients.sort((a, b) => {
        const rarityA = a.rarity;
        const rarityB = b.rarity;
        return ingredientRarity[rarityA] - ingredientRarity[rarityB];
      });
      handleFilterIngredients({ ingredients: ingredientsByRarity });
    }
  };

  function handleIngredientDragStart(event: DragStartEvent) {
    const { active } = event;
    const activeIng = userIngredients.find(
      (ingredient) => ingredient.id === active.id,
    );
    if (activeIng) setActiveIngredient(activeIng);
  }

  function handleIngredientDragEnd(event: DragOverEvent) {
    setActiveIngredient(null);
    const { active, over } = event;
    const draggedIngredient = userIngredients.find(
      (item) => item.id === active.id,
    );
    const mixtureSpot = over !== null;
    if (mixtureSpot && draggedIngredient !== undefined) {
      const mixtureSpotFilled = mixture[Number(over?.id)].id !== "empty";
      if (mixtureSpotFilled) return;
      const mixtureWithDraggedIngredient = mixture.map((mix, index) => {
        if (index === over.id) {
          return draggedIngredient;
        }
        return mix;
      });
      setMixture(mixtureWithDraggedIngredient);
      findMixtureProperties(mixtureWithDraggedIngredient);
      if (draggedIngredient.quantity === 1) {
        const ingredientsWithoutDragged = userIngredients.filter(
          (item) => item !== draggedIngredient,
        );
        setUserIngredients(ingredientsWithoutDragged);
        handleFilterIngredients({ ingredients: ingredientsWithoutDragged });
      } else {
        const ingredientsUpdatedQuantity = userIngredients.map((ingredient) => {
          if (ingredient.id === draggedIngredient.id) {
            return { ...ingredient, quantity: ingredient.quantity - 1 };
          }
          return ingredient;
        });
        setUserIngredients(ingredientsUpdatedQuantity);
        handleFilterIngredients({ ingredients: ingredientsUpdatedQuantity });
      }
    }
  }

  return {
    handleAddIngredients,
    handleFilterIngredients,
    handleOrderFilteredIngredients,
    handleIngredientDragStart,
    handleIngredientDragEnd,
  };
}
