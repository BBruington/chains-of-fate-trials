"use client";

import { Ingredient } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import { displayIngredient } from "../jotaiAtoms";
import { IngredientListItemProps } from "../../../_types";

export default function IngredientListItem({
  ingredient,
  displayUi,
  setDisplayUi,
  handleChangeIngredientQuantity,
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
        aria-label={`Display ${ingredient.name} properties`}
        onClick={handleSelectIngredient}
        className="flex h-full min-h-28 w-full flex-col rounded-none"
      >
        <h1 className="line-clamp-3 w-full whitespace-normal border-b border-secondary text-center text-2xl">
          {ingredient.name} ({ingredient.quantity})
        </h1>
        <p className="whitespace-normal">{ingredient.description}</p>
      </Button>
      <div className="flex h-full w-full">
        <Button
          aria-label={`decrement ${ingredient.name} button`}
          onClick={() =>
            handleChangeIngredientQuantity({ ingredient, quantity: -1 })
          }
          className="h-full w-1/2 rounded-none border-r border-t"
        >
          -
        </Button>
        <Button
          aria-label={`increment ${ingredient.name} button`}
          onClick={() =>
            handleChangeIngredientQuantity({ ingredient, quantity: 1 })
          }
          className="h-full w-1/2 rounded-none border-t"
        >
          +
        </Button>
      </div>
    </div>
  );
}
