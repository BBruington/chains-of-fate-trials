"use client";

import { Ingredient } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { SetStateAction, useAtom } from "jotai";
import { displayIngredient } from "../jotaiAtoms";
import { Dispatch } from "react";
import { usePotionCraft } from "../../../_hooks/usePotionCraft";
import { HandleIngredientQuantityChangeProps } from "../../../_hooks/types";

type IngredientListItemProps = {
  ingredient: Ingredient;
  displayUi: {
    shop: boolean;
    ingredient: boolean;
  };
  setDisplayUi: Dispatch<
    SetStateAction<{
      shop: boolean;
      ingredient: boolean;
    }>
  >;
  handleChangeIngredientQuantity: ({
    ingredient,
    quantity,
  }: HandleIngredientQuantityChangeProps) => Promise<void>;
};
export default function IngredientListItem({
  ingredient,
  setDisplayUi,
  displayUi,
  handleChangeIngredientQuantity
}: IngredientListItemProps) {
  const [selectedIngredient, setSelectedIngredient] =
    useAtom<Ingredient>(displayIngredient);

  const handleSelectIngredient = () => {
    if (displayUi.ingredient === false) {
      setDisplayUi({
        shop: false,
        ingredient: true,
      });
    }
    setSelectedIngredient(ingredient);
  };

  return (
    <div className="flex h-fit min-h-32 w-72 flex-col items-center rounded-sm border border-secondary bg-secondary-foreground/70 text-secondary hover:cursor-pointer hover:bg-secondary-foreground/60">
      <Button
        onClick={handleSelectIngredient}
        className="flex h-full min-h-28 w-full flex-col rounded-none"
      >
        <h1 className="line-clamp-3 w-full whitespace-normal border-b border-secondary text-center text-2xl">
          {ingredient.name} ({ingredient.quantity})
        </h1>
        <p className="whitespace-normal">{ingredient.description}</p>
      </Button>
      <div className="flex h-full w-full">
        <Button onClick={() => handleChangeIngredientQuantity({ingredient, quantity: -1})} className="h-full w-1/2 rounded-none border-r border-t">
          -
        </Button>
        <Button onClick={() => handleChangeIngredientQuantity({ingredient, quantity: 1})} className="h-full w-1/2 rounded-none border-t">+</Button>
      </div>
    </div>
  );
}
