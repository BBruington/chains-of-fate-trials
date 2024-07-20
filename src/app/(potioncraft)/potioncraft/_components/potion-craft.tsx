"use client";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import IngredientList from "./ingredient-list";
import Droppable from "@/components/dndkit/dropable";
import Draggable from "@/components/dndkit/draggable";
import { Button } from "@/components/ui/button";
import { Potion, Ingredient, Formula } from "@prisma/client";
import { User } from "@prisma/client";
import { usePotionCraft } from "./usePotionCraft";
import { RarityStyleProps, IngredientIconProps } from "../_types";
import skull from "@/../public/icons/skull.svg";
import wizardHat from "@/../public/icons/wizard-hat.svg";
import scroll from "@/../public/icons/scroll.svg";

interface PotionCraftComponentProps {
  ingredients: Ingredient[];
  userId: User["clerkId"];
  potions: Potion[];
  formulas: Formula[];
}

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
  } = usePotionCraft(ingredients, userId);

  const rarityStyles: RarityStyleProps = {
    COMMON: "bg-slate-600",
    UNCOMMON: "bg-green-900",
    RARE: "bg-blue-900",
    VERYRARE: "bg-purple-900",
    LEGENDARY: "bg-orange-800",
  };

  return (
    <div className="flex w-screen justify-between">
      <div></div>
      <DndContext
        onDragStart={handleIngredientDragStart}
        onDragEnd={handleIngredientDragEnd}
        autoScroll={false}
      >
        <DragOverlay>
          {activeIngredient ? (
            <Draggable
              className={rarityStyles[activeIngredient.rarity as keyof RarityStyleProps]}
              id={activeIngredient.id}
              item={activeIngredient}
              showQuantity={false}
            />
          ) : null}
        </DragOverlay>
        <div className="flex min-w-fit flex-col items-center justify-center">
          <h1 className="mb-7 text-3xl">Add Ingredients to Make a Potion</h1>
          <div className="grid grid-cols-2 content-center gap-5">
            {mixture.map((mix, index) => (
              <Droppable
                key={index}
                className={`h-32 min-w-52 rounded-none bg-secondary text-xs ${mix.id === "empty" ? "bg-secondary/60 text-primary/60" : ""} ${index === 0 && "rounded-tl-lg"} ${index === 1 && "rounded-tr-lg"} ${index === 2 && "rounded-bl-lg"} ${index === 3 && "rounded-br-lg"}`}
                accepts={ingredients.map((ingredient) => ingredient.id)}
                id={index}
                item={mix}
              />
            ))}
          </div>
          <div className="mt-8 flex space-x-3">
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
              Add to formulas
            </Button>
          </div>
        </div>
        <div className="flex h-screen w-96 justify-end">
          <div className="flex h-screen w-96 flex-col items-center overflow-y-auto bg-secondary p-3">
            <IngredientList
              ingredients={filteredUserIngredients}
              handleFilterIngredients={handleFilterIngredients}
              handleOrderFilteredIngredients={handleOrderFilteredIngredients}
              handleChangeIngredientQuantity={handleChangeIngredientQuantity}
            />
          </div>
        </div>
      </DndContext>
    </div>
  );
}
