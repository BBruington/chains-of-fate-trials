"use client";
import { playerIngredients } from "../../../_components/testData";
import { IngredientSchema } from "@/types";
import { addIngredientsToUser } from "../../../actions";
import { z } from "zod";
import { User } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { startTransition } from "react";

type IngredientShopProps = {
  userId: User["clerkId"];
  updateIngredients: (action: z.infer<typeof IngredientSchema>) => void;
};

export default function IngredientShop({
  userId,
  updateIngredients,
}: IngredientShopProps) {
  playerIngredients.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
  return (
    <div className="ml-1 flex w-full flex-col">
      <div className="mb-1 flex w-full items-center border-b-2 border-red-800">
        <span className="w-32 text-xl">Name</span>
        <span className="mx-2 w-28 text-xl">Type</span>
        <span className="w-28 text-xl">Rarity</span>
        <span className="ml-3 w-24 text-xl">Buy</span>
      </div>
      {playerIngredients.map((ingredient) => (
        <IngredientShopItem
          updateIngredients={updateIngredients}
          key={ingredient.name}
          userId={userId}
          ingredient={ingredient}
        />
      ))}
    </div>
  );
}

type IngredientShopItemProps = {
  ingredient: z.infer<typeof IngredientSchema>;
  userId: User["clerkId"];
  updateIngredients: (action: z.infer<typeof IngredientSchema>) => void;
};

function IngredientShopItem({
  ingredient,
  userId,
  updateIngredients,
}: IngredientShopItemProps) {
  const handleAddIngredientToUser = async () => {
    startTransition(async () => {
      updateIngredients(ingredient);
      await addIngredientsToUser({ userId, ingredients: [ingredient] });
    });
  };

  return (
    <div className="flex min-h-8 w-full items-center border-b text-sm">
      <span className="w-32">{ingredient.name}</span>
      <span className="mx-2 w-28">{ingredient.type}</span>
      <span className="w-28">{ingredient.rarity}</span>
      <div className="w-24">
        <Button onClick={handleAddIngredientToUser} className="ml-3 h-6">
          Add
        </Button>
      </div>
    </div>
  );
}
