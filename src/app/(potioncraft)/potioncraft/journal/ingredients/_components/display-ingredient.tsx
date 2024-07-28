"use client";
import { Ingredient } from "@prisma/client";
import { SetStateAction, useAtom } from "jotai";
import { displayIngredient } from "../jotaiAtoms";
import { Button } from "@/components/ui/button";
import { Dispatch } from "react";
import { ArrowLeft } from "lucide-react";

type DisplayIngredientProps = {
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
};

export default function DisplayIngredient({
  displayUi,
  setDisplayUi,
}: DisplayIngredientProps) {
  const handleReturntoShop = () => {
    if (displayUi.shop === false) {
      setDisplayUi({
        shop: true,
        ingredient: false,
      });
    }
  };
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
        <div className="flex h-fit min-h-52 w-96 flex-col rounded-lg bg-primary/80">
          <ArrowLeft
            className="bg-primary-10 m-1 h-5 w-6 rounded-full text-black hover:cursor-pointer hover:bg-primary/70 hover:text-black/80"
            onClick={handleReturntoShop}
          />

          <div className="cursor-normal flex h-full w-full flex-col justify-start text-center text-secondary">
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
        </div>
      )}
    </>
  );
}
