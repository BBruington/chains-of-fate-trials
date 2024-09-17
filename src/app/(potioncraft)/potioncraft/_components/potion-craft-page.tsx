"use client";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import IngredientList from "./ingredient-list";
import Draggable from "@/components/dndkit/draggable";
import { usePotionCraft } from "../_hooks/usePotionCraft";
import { PotionCraftComponentProps, RarityStyleProps } from "../_types";
import { cn } from "@/lib/utils";
import { RARITY_STYLES_TEXT } from "@/constants";
import CraftPotionStation from "./craft-potion-station";

export default function PotionCraftComponent({
  ingredients,
  userId,
  potions,
  formulas,
}: PotionCraftComponentProps) {
  const {
    mixture,
    filteredUserIngredients,
    activeIngredient,
    isFormulaSaved,
    addFormula,
    handleResetIngredients,
    handleFilterIngredients,
    addIngredientToMixture,
    handleOrderFilteredIngredients,
    handleCraftPotion,
    handleIngredientDragStart,
    handleIngredientDragEnd,
  } = usePotionCraft({ ingredients, userId });

  return (
    <>
      <div className="relative flex h-[calc(100vh-48px)] w-full justify-between">
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
                  RARITY_STYLES_TEXT[
                    activeIngredient.rarity as keyof RarityStyleProps
                  ],
                )}
                id={activeIngredient.id}
                item={activeIngredient}
                showQuantity={false}
              />
            ) : null}
          </DragOverlay>
          <div className="flex h-full w-full flex-col items-center">
            <CraftPotionStation
              addFormula={addFormula}
              isFormulaSaved={isFormulaSaved}
              handleCraftPotion={handleCraftPotion}
              handleResetIngredients={handleResetIngredients}
              userId={userId}
              mixture={mixture}
              formulas={formulas}
              ingredients={ingredients}
            />
          </div>
          <div className="flex h-full lg:min-w-96 min-w-80 flex-col items-center overflow-y-auto border-l border-primary/40 p-2">
            <IngredientList
              ingredients={filteredUserIngredients}
              activeIngredient={activeIngredient}
              mixture={mixture}
              handleFilterIngredients={handleFilterIngredients}
              addIngredientToMixture={addIngredientToMixture}
              handleOrderFilteredIngredients={handleOrderFilteredIngredients}
            />
          </div>
        </DndContext>
      </div>
    </>
  );
}
