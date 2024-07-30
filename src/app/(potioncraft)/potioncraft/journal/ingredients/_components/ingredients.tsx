"use client";

import { Ingredient, User } from "@prisma/client";
import IngredientListItem from "./ingredient-list-item";
import IngredientShop from "./ingredient-shop";
import { useState } from "react";
import DisplayIngredient from "./display-ingredient";
import { usePotionCraft } from "../../../_hooks/usePotionCraft";

type IngredientsPageProps = {
  ingredients: Ingredient[];
  userId: User["clerkId"];
};

export default function IngredientsPage({
  ingredients,
  userId,
}: IngredientsPageProps) {
  const { handleChangeIngredientQuantity } = usePotionCraft({ ingredients, userId });
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
        {displayUi.shop === true && <IngredientShop userId={userId} />}
      </div>
      <div className="flex h-full w-96 flex-col items-center space-y-3 overflow-y-auto border border-r-0 border-primary/40 bg-secondary p-3">
        <h2>My Ingredients</h2>
        {ingredients?.map((ingredient) => (
          <IngredientListItem
          handleChangeIngredientQuantity={handleChangeIngredientQuantity}
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
