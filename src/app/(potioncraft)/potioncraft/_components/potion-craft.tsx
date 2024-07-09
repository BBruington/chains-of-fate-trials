"use client";
import { useState } from "react";
import { z } from "zod";
import { commonPotions, playerIngredients } from "./testData";
import {
  DndContext,
  DragStartEvent,
  DragOverEvent,
  DragOverlay,
} from "@dnd-kit/core";
import IngredientList from "./ingredient-list";
import Droppable from "@/components/dndkit/dropable";
import Draggable from "@/components/dndkit/draggable";
import { Button } from "@/components/ui/button";
import { IngredientSchema } from "../../../../../prisma/generated/zod";
import {
  Potion,
  Ingredient,
  Formula,
} from "@prisma/client";
import {
  addIngredientsToUser,
  addPotionToUser,
  increaseIngredient,
  spendIngredients,
} from "../actions";
import { User } from "@prisma/client";
import { HandleFilterIngredientsProps } from "../_types";
import { EMPTY_INGREDIENT } from "@/constants";
import { PotionSchema } from "@/types";
interface PotionCraftComponentProps {
  ingredients: Ingredient[];
  userId: User["clerkId"];
  potions: Potion[];
  formulas: Formula[];
}

export default function PotionCraftComponent({
  ingredients,
  userId,
  potions,
  formulas,
}: PotionCraftComponentProps) {
  const initialPotionProperties = {
    abjuration: 0,
    conjuration: 0,
    divination: 0,
    enchantment: 0,
    evocation: 0,
    illusion: 0,
    necromancy: 0,
    transmutation: 0,
  };

  const emptyMixture = [
    EMPTY_INGREDIENT,
    EMPTY_INGREDIENT,
    EMPTY_INGREDIENT,
    EMPTY_INGREDIENT,
  ];

  const [mixture, setMixture] = useState<Ingredient[]>(emptyMixture);
  const [userIngredients, setUserIngredients] =
    useState<Ingredient[]>(ingredients);
  const [filteredItems, setFilteredItems] = useState(userIngredients);
  const [filteredIngredientsInput, setFilteredIngredientsInput] = useState("");
  const [item, setItem] = useState(initialPotionProperties);
  const [activeIngredient, setActiveIngredient] = useState<null | Ingredient>(
    null,
  );

  const handleFilterIngredients = ({
    event,
    ingredients,
  }: HandleFilterIngredientsProps) => {
    if (event?.target.value === "") {
      setFilteredItems(userIngredients);
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
      setFilteredItems(filteredIngredients);
    } else {
      const filteredIngredients = userIngredients.filter((filter) => {
        const name = filter.name.toLowerCase();
        return name.includes(ingredientInput.toLowerCase());
      });
      setFilteredItems(filteredIngredients);
    }
  };

  const handleResetIngredients = () => {
    setUserIngredients(ingredients);
    handleFilterIngredients({ ingredients });
    setMixture(emptyMixture);
  };

  interface AddIngredientsProps {
    userId: User["clerkId"];
    ingredients: Ingredient[];
  }

  const handleAddIngredients = async ({
    ingredients,
    userId,
  }: AddIngredientsProps) => {
    if (userIngredients.length === 0) {
      await addIngredientsToUser({ userId, ingredients });
    }
  };

  const handleCraftPotion = async () => {
    const potion = findPotion();
    const spentIngredients = mixture.filter((mix) => mix.id !== "empty");
    await spendIngredients({ ingredients: spentIngredients });
    const resetMix = { ...EMPTY_INGREDIENT };
    setMixture(emptyMixture);
    if (potion === undefined) {
      console.log("potion craft failed! D:");
    } else {
      await addPotionToUser({ potion, userId });
    }
    findPotionValue([resetMix]);
  };
  const handleIncrementIngredient = async ({
    ingredient,
  }: {
    ingredient: z.infer<typeof IngredientSchema>;
  }) => {
    const res = await increaseIngredient({ ingredient, amount: 1 });
    const incrementedIngredients = userIngredients.map((userIngredient) => {
      if (userIngredient.id === ingredient.id) {
        return { ...userIngredient, quantity: userIngredient.quantity + 1 };
      }
      return userIngredient;
    });
    if (res) {
      setUserIngredients(incrementedIngredients);
      handleFilterIngredients({ ingredients: incrementedIngredients });
    }
  };

  return (
    <div className="flex w-screen">
      <DndContext
        onDragStart={handleIngredientDragStart}
        onDragEnd={handleIngredientDragEnd}
        autoScroll={false}
      >
        <DragOverlay>
          {activeIngredient ? (
            <Draggable
              id={activeIngredient.id}
              item={activeIngredient}
              showQuantity={false}
            />
          ) : null}
        </DragOverlay>
        <div className="flex flex-col">
          <div className="column col-span-2">
            {mixture.map((mix, index) => (
              <Droppable
                key={index}
                className={`h-20 w-40 rounded-none bg-secondary text-xs ${mix.id === "empty" ? "bg-secondary/60 text-primary/60" : ""}`}
                accepts={[
                  ...ingredients.map((ingredient) => ingredient.id as string),
                ]}
                id={index}
                item={mix}
              />
            ))}
          </div>
          <Button onClick={handleCraftPotion}>Craft Potion</Button>
          <Button onClick={handleResetIngredients}>Reset</Button>
          <Button
            onClick={() =>
              handleAddIngredients({ ingredients: playerIngredients, userId })
            }
          >
            Reset Ingredients
          </Button>
          {potions.map((potion) => (
            <div
              className="flex h-12 w-40 items-center bg-secondary p-1 text-justify text-xs"
              key={potion.id}
            >
              {potion.name} {potion.quantity}
            </div>
          ))}
        </div>
        <div className="flex h-screen w-full justify-end">
          <div className="flex h-screen w-96 flex-col items-center overflow-y-auto bg-secondary p-3">
            <IngredientList
              ingredients={filteredItems}
              handleFilterIngredients={handleFilterIngredients}
              handleIncrementIngredient={handleIncrementIngredient}
            />
          </div>
        </div>
      </DndContext>
    </div>
  );

  type MagicProperties = {
    abjuration: number;
    conjuration: number;
    divination: number;
    enchantment: number;
    evocation: number;
    illusion: number;
    necromancy: number;
    transmutation: number;
  };

  function findPotion(): z.infer<typeof PotionSchema> | undefined {
    return commonPotions.find((potion) => {
      return Object.keys(initialPotionProperties).every((key) => {
        const potionValue = Math.max(potion[key as keyof MagicProperties], 0);
        const combinedValue = Math.max(item[key as keyof MagicProperties], 0);
        return potionValue === combinedValue;
      });
    });
  }

  function findPotionValue(ingredients: Ingredient[]) {
    if (ingredients.length === 0) {
      setItem(initialPotionProperties);
      return;
    }
    const solution = ingredients.reduce((ingredientSum, currentIngretient) => {
      return {
        id: "1",
        name: "",
        description: "",
        quantity: 0,
        userId: "",
        rarity: "COMMON",
        type: "ARCANE",
        primaryAttribute: "ABJURATION",
        abjuration: ingredientSum.abjuration + currentIngretient.abjuration,
        conjuration: ingredientSum.conjuration + currentIngretient.conjuration,
        divination: ingredientSum.divination + currentIngretient.divination,
        enchantment: ingredientSum.enchantment + currentIngretient.enchantment,
        evocation: ingredientSum.evocation + currentIngretient.evocation,
        illusion: ingredientSum.illusion + currentIngretient.illusion,
        necromancy: ingredientSum.necromancy + currentIngretient.necromancy,
        transmutation:
          ingredientSum.transmutation + currentIngretient.transmutation,
      };
    });
    setItem(solution);
    return solution;
  }

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
    const activeItem = userIngredients.find((item) => item.id === active.id);
    if (over !== null && activeItem !== undefined) {
      if (mixture[Number(over?.id)].id !== "empty") return;
      const newMixture = mixture.map((mix, index) => {
        if (index === over.id) {
          return activeItem;
        }
        return mix;
      });
      setMixture(newMixture);
      findPotionValue(newMixture);
      if (activeItem.quantity === 1) {
        const ingredientsWithoutActive = userIngredients.filter(
          (item) => item !== activeItem,
        );
        setUserIngredients(ingredientsWithoutActive);
        handleFilterIngredients({ ingredients: ingredientsWithoutActive });
      } else {
        const newUserIngredients = userIngredients.map((ingredient) => {
          if (ingredient.id === activeItem.id) {
            return { ...ingredient, quantity: ingredient.quantity - 1 };
          }
          return ingredient;
        });
        setUserIngredients(newUserIngredients);
        handleFilterIngredients({ ingredients: newUserIngredients });
      }
    }
  }
}
