"use client";
import { Ingredient } from "@prisma/client";
import { useAtom } from "jotai";
import { displayIngredient } from "../jotaiAtoms";

export default function DisplayIngredient() {
  const [selectedIngredient] = useAtom<Ingredient>(displayIngredient);
  return (
    <>
      {selectedIngredient.id === "empty" ? (
        <div className="cursor-normal flex h-60 w-96 flex-col justify-center rounded-lg bg-primary/80 text-center text-secondary">
          <h1 className="p-2 text-2xl">
            Select a Ingredient to view its properties
          </h1>
        </div>
      ) : (
        <div className="cursor-normal flex h-60 w-96 flex-col justify-center rounded-lg bg-primary/80 text-center text-secondary">
          <h1 className="line-clamp-2 break-normal p-2 text-2xl">
            {selectedIngredient.name}
          </h1>
          <span>{selectedIngredient.description}</span>
          <span>
            {selectedIngredient.rarity[0]}
            {selectedIngredient.rarity.slice(1).toLowerCase()}
          </span>
          <span>
            {selectedIngredient.type[0]}
            {selectedIngredient.type.slice(1).toLowerCase()}
          </span>
          <span>Quantity: {selectedIngredient.quantity}</span>
        </div>
      )}
    </>
  );
}
