"use client";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import IngredientList from "./ingredient-list";
import Droppable from "@/components/dndkit/dropable";
import Draggable from "@/components/dndkit/draggable";
import { Button } from "@/components/ui/button";
import { Potion, Ingredient, Formula } from "@prisma/client";
import { User } from "@prisma/client";
import { usePotionCraft } from "../_hooks/usePotionCraft";
import { RarityStyleProps } from "../_types";
import { cn } from "@/lib/utils";
import { EMPTY_MIXTURE } from "@/constants";

type PotionCraftComponentProps = {
  ingredients: Ingredient[];
  userId: User["clerkId"];
  potions: Potion[];
  formulas: Formula[];
};

export default function PotionCraftComponent({
  ingredients,
  userId,
  potions,
  formulas,
}: PotionCraftComponentProps) {
  const {
    mixture,
    userIngredients,
    filteredUserIngredients,
    activeIngredient,
    mixtureProperties,
    findPotion,
    findMixtureProperties,
    addFormula,
    handleResetIngredients,
    handleFilterIngredients,
    handleOrderFilteredIngredients,
    handleAddIngredients,
    handleCraftPotion,
    handleChangeIngredientQuantity,
    handleIngredientDragStart,
    handleIngredientDragEnd,
  } = usePotionCraft({ ingredients, userId });

  const rarityStyles: RarityStyleProps = {
    COMMON: "text-slate-500",
    UNCOMMON: "text-green-600",
    RARE: "text-blue-500",
    VERYRARE: "text-purple-600",
    LEGENDARY: "text-orange-600",
  };

  return (
    <div className="flex w-screen justify-between">
      <div />
      <DndContext
        onDragStart={handleIngredientDragStart}
        onDragEnd={handleIngredientDragEnd}
        autoScroll={false}
      >
        <DragOverlay>
          {activeIngredient ? (
            <Draggable
              className={cn(
                "rounded-lg bg-secondary",
                rarityStyles[activeIngredient.rarity as keyof RarityStyleProps],
              )}
              id={activeIngredient.id}
              item={activeIngredient}
              showQuantity={false}
            />
          ) : null}
        </DragOverlay>
        <div className="mt-10 flex min-w-fit flex-col">
          <h1 className={cn("mb-7 text-3xl", mixture === EMPTY_MIXTURE && "animate-pulse")}>Drag Ingredients to Make a Potion</h1>
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
          <div className="mt-8 flex justify-center space-x-3">
            <Button className="w-36" onClick={handleCraftPotion}>
              Craft Potion
            </Button>
            <Button className="w-36" onClick={handleResetIngredients}>
              Reset Mixture
            </Button>
            <Button
              className="w-36"
              onClick={() => addFormula({ mixture, userId })}
            >
              Add to Formulas
            </Button>
          </div>
          {/* <MixturePropertiesChart /> */}
        </div>
        <div className="flex h-screen w-96 flex-col items-center overflow-y-auto border-l border-primary/40 p-2">
          <IngredientList
            ingredients={filteredUserIngredients}
            activeIngredient={activeIngredient}
            handleFilterIngredients={handleFilterIngredients}
            handleOrderFilteredIngredients={handleOrderFilteredIngredients}
            handleChangeIngredientQuantity={handleChangeIngredientQuantity}
          />
        </div>
      </DndContext>
    </div>
  );
}
