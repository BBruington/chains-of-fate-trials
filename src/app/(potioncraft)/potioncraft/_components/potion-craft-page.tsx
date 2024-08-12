"use client";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import IngredientList from "./ingredient-list";
import Draggable from "@/components/dndkit/draggable";
import { usePotionCraft } from "../_hooks/usePotionCraft";
import { PotionCraftComponentProps, RarityStyleProps } from "../_types";
import { cn } from "@/lib/utils";
import { RARITY_STYLES_TEXT } from "@/constants";
import { commonPotions } from "./testData";
import CraftPotionStation from "./craft-potion-station";

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
    isFormulaSaved,
    addFormula,
    handleResetIngredients,
    handleFilterIngredients,
    addIngredientToMixture,
    handleOrderFilteredIngredients,
    handleAddIngredients,
    handleCraftPotion,
    updateServerIngredientQuantity,
    handleIngredientDragStart,
    handleIngredientDragEnd,
  } = usePotionCraft({ ingredients, userId });

  return (
    <>
      <div className="relative flex h-full w-full justify-between">
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
          <div className="flex h-screen w-full flex-col items-center">
            {/* <Image
            alt="alchemist's lab background"
            src={alchemistLab}
            className="absolute h-full w-full"
            style={{ zIndex: -1 }}
          /> */}
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
          <div className="flex h-screen min-w-96 flex-col items-center overflow-y-auto border-l border-primary/40 p-2">
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
