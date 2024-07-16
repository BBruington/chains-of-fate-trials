"use client";
import { Potion } from "@prisma/client";
import { useAtom } from "jotai";
import { displayIngredient } from "../jotaiAtoms"

export default function DisplayIngredient() {
  const [selectedIngredient] = useAtom<Potion>(displayIngredient);
  return (
    <div className="flex h-60 w-96 flex-col justify-center bg-secondary text-center">
      <h1 className="p-2 text-2xl line-clamp-2 break-normal">{selectedIngredient.name}</h1>
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
  );
}