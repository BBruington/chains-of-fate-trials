"use client";
import Droppable from "@/components/dndkit/dropable";
import { EMPTY_MIXTURE } from "@/constants";
import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "@/components/ui/button";
import { CraftPotionStationProps } from "../_types";
import SuccessToast from "./craft-potion-toast";
import toast from "react-hot-toast";
import { Cinzel } from "next/font/google";

const fontHeader = Cinzel({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export default function CraftPotionStation({
  addFormula,
  isFormulaSaved,
  handleCraftPotion,
  handleResetIngredients,
  userId,
  mixture,
  formulas,
  ingredients,
}: CraftPotionStationProps) {
  const handleCraftPotionButton = async () => {
    const createdPotion = await handleCraftPotion();
    const spentIngredients = mixture.filter((mix) => mix.id !== "empty");
    createdPotion
      ? toast.success(
          <SuccessToast isSuccessful={true} potion={createdPotion} />,
          { duration: 4000 },
        )
      : toast.error(<SuccessToast isSuccessful={false} />, { duration: 4000 });
    if (
      createdPotion !== null &&
      !isFormulaSaved({
        formulaName: createdPotion.name,
        mixtureIngredients: spentIngredients,
        userFormulas: formulas,
      })
    ) {
      await addFormula({ mixture, userId, potion: createdPotion });
    }
  };
  return (
    <>
      <h1
        className={cn(fontHeader.className,
          "mb-7 mt-10 text-3xl",
          mixture === EMPTY_MIXTURE && "animate-pulse",
        )}
      >
        Drag Ingredients to Make a Potion
      </h1>
      <div className="grid grid-cols-2 content-center gap-5">
        {mixture.map((mix, index) => (
          <Droppable
            key={index}
            className={`h-32 min-w-52 rounded-none bg-primary text-xs text-secondary ${mix.id === "empty" ? "bg-primary/80 text-secondary/80" : ""} ${index === 0 && "rounded-tl-lg"} ${index === 1 && "rounded-tr-lg"} ${index === 2 && "rounded-bl-lg"} ${index === 3 && "rounded-br-lg"}`}
            accepts={ingredients.map((ingredient) => ingredient.id)}
            id={index}
            item={mix}
          />
        ))}
      </div>
      <div className="mt-8 flex flex-col items-center justify-center">
        <Button
          className="mb-8 h-16 w-80 bg-gradient-to-tr from-purple-600 to-blue-600 text-white hover:animate-pulse hover:from-purple-700 hover:to-blue-700"
          onClick={handleCraftPotionButton}
        >
          Craft Potion
        </Button>
        <div className="flex space-x-5">
          <Button className="w-36" onClick={handleResetIngredients}>
            Reset Mixture
          </Button>
        </div>
      </div>
    </>
  );
}
