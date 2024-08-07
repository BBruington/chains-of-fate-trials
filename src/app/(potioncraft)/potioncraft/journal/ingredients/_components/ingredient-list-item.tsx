"use client";

import { Ingredient } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import { displayIngredient } from "../jotaiAtoms";
import { IngredientListItemProps } from "../../../_types";
import { Luxurious_Roman } from "next/font/google";
import { cn } from "@/lib/utils";

const fontList = Luxurious_Roman({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

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

  const handeIngredientQuantity = async (quantity: number) => {
    await handleChangeIngredientQuantity({ ingredient, quantity });
  };

  return (
    <div
      className={cn(
        fontList.className, "flex h-fit min-h-28 w-72 flex-col items-center rounded-lg border border-secondary bg-secondary-foreground/70 text-secondary hover:cursor-pointer hover:bg-secondary-foreground/60",
      )}
    >
      <Button
        aria-label={`Display ${ingredient.name} properties`}
        onClick={handleSelectIngredient}
        className="flex h-full min-h-20 w-full flex-col rounded-none rounded-t-lg"
      >
        <h1 className="line-clamp-3 w-full whitespace-normal text-center text-2xl">
          {ingredient.name} ({ingredient.quantity})
        </h1>
      </Button>
      <div className="flex h-full w-full">
        <Button
          aria-label={`decrement ${ingredient.name} button`}
          onClick={() => handeIngredientQuantity(-1)}
          className="h-full text-lg w-1/2 rounded-none rounded-bl-lg border-r border-t"
        >
          -
        </Button>
        <Button
          aria-label={`increment ${ingredient.name} button`}
          onClick={() => handeIngredientQuantity(1)}
          className="h-full text-lg w-1/2 rounded-none rounded-br-lg border-t"
        >
          +
        </Button>
      </div>
    </div>
  );
}
