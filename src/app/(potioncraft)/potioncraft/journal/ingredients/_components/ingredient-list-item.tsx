"use client";

import { Ingredient } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import { displayIngredient } from "../jotaiAtoms";

interface IngredientListItemProps {
  ingredient: Ingredient;
}
export default function IngredientListItem({ ingredient }: IngredientListItemProps) {
  const [selectedIngredient, setSelectedIngredient] = useAtom<Ingredient>(displayIngredient);

  const handleSelectIngredient = () => {
    setSelectedIngredient(ingredient);
  };

  return (
    <Button
      onClick={handleSelectIngredient}
      className="flex h-fit min-h-32 w-72 flex-col items-center rounded-sm border border-secondary bg-secondary-foreground/70 text-secondary hover:cursor-pointer hover:bg-secondary-foreground/60"
    >
      <h1 className="w-full border-b border-secondary line-clamp-3 whitespace-normal text-center text-2xl">
        {ingredient.name}
      </h1>
      <p className="whitespace-normal">{ingredient.description}</p>
    </Button>
  );
}