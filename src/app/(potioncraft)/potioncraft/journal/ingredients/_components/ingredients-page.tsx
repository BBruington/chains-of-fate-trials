"use client";

import { Ingredient, User } from "@prisma/client";
import IngredientListItem from "./ingredient-list-item";
import IngredientShop from "./ingredient-shop";
import { useState, useOptimistic } from "react";
import DisplayIngredient from "./display-ingredient";
import { usePotionCraft } from "../../../_hooks/usePotionCraft";
import { Cinzel } from "next/font/google";
import { cn } from "@/lib/utils";
import { IngredientSchema } from "@/types";
import { z } from "zod";
const fontHeader = Cinzel({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

type IngredientsPageProps = {
  ingredients: Ingredient[];
  userId: User["clerkId"];
};

export default function IngredientsPage({
  ingredients,
  userId,
}: IngredientsPageProps) {
  const { updateServerIngredientQuantity } = usePotionCraft({
    ingredients,
    userId,
  });

  const updateIngredientsOptimistically = (
    curIngredients: Ingredient[],
    updatedIngredient: z.infer<typeof IngredientSchema>,
  ) => {
    const foundItem = curIngredients.find(
      (ing) => ing.name === updatedIngredient.name,
    );
    if (foundItem === undefined) {
      return [
        ...curIngredients,
        { ...updatedIngredient, id: "placeholder", userId: userId },
      ];
    }
    return curIngredients.map((ingredient) => {
      if (updatedIngredient.name === ingredient.name)
        return {
          ...ingredient,
          quantity: ingredient.quantity + 1,
        };
      return ingredient;
    });
  };

  const [optimisticIngredients, addOptimisticIngredient] = useOptimistic(
    ingredients,
    updateIngredientsOptimistically,
  );

  const [displayUi, setDisplayUi] = useState({
    shop: true,
    ingredient: false,
  });

  return (
    <>
      <div className="mt-16 flex w-full justify-center">
        {displayUi.ingredient === true && (
          <DisplayIngredient
            setDisplayUi={setDisplayUi}
            displayUi={displayUi}
          />
        )}
        {displayUi.shop === true && (
          <IngredientShop
            updateIngredients={addOptimisticIngredient}
            userId={userId}
          />
        )}
      </div>
      <div className="flex h-full w-96 flex-col items-center space-y-3 overflow-y-auto border border-r-0 border-primary/40 bg-secondary p-3">
        <h2
          className={cn(
            fontHeader.className,
            "w-full border-b text-center text-[28px]",
          )}
        >
          My Ingredients
        </h2>
        {optimisticIngredients?.map((ingredient) => (
          <IngredientListItem
            handleChangeIngredientQuantity={updateServerIngredientQuantity}
            key={ingredient.id}
            ingredient={ingredient}
            setDisplayUi={setDisplayUi}
            displayUi={displayUi}
          />
        ))}
      </div>
    </>
  );
}
