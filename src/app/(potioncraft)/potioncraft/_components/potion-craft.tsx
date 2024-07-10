"use client";
import { playerIngredients } from "./testData";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import IngredientList from "./ingredient-list";
import Droppable from "@/components/dndkit/dropable";
import Draggable from "@/components/dndkit/draggable";
import { Button } from "@/components/ui/button";
import { Potion, Ingredient, Formula } from "@prisma/client";
import { User } from "@prisma/client";
import { usePotionCraft } from "./usePotionCraft";

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
    handleResetIngredients,
    handleFilterIngredients,
    findMixtureProperties,
    handleAddIngredients,
    handleCraftPotion,
    handleIncrementIngredient,
    handleIngredientDragStart,
    handleIngredientDragEnd,
  } = usePotionCraft(ingredients, userId);

  return (
    <div className="flex w-screen">
      <DndContext
        onDragStart={handleIngredientDragStart}
        onDragEnd={handleIngredientDragEnd}
        autoScroll={false}
      >
        <DragOverlay>
          {activeIngredient ? (
            <Draggable
              id={activeIngredient.id}
              item={activeIngredient}
              showQuantity={false}
            />
          ) : null}
        </DragOverlay>
        <div className="flex flex-col">
          <div className="column col-span-2">
            {mixture.map((mix, index) => (
              <Droppable
                key={index}
                className={`h-20 w-40 rounded-none bg-secondary text-xs ${mix.id === "empty" ? "bg-secondary/60 text-primary/60" : ""}`}
                accepts={[
                  ...ingredients.map((ingredient) => ingredient.id),
                ]}
                id={index}
                item={mix}
              />
            ))}
          </div>
          <Button onClick={handleCraftPotion}>Craft Potion</Button>
          <Button onClick={handleResetIngredients}>Reset</Button>
          <Button onClick={() => findMixtureProperties(mixture)}>look at properties</Button>
          <Button onClick={() => findPotion({mixture: mixtureProperties})}>look at potions</Button>
          <Button
            onClick={() =>
              handleAddIngredients({ ingredients: playerIngredients, userId })
            }
          >
            Reset Ingredients
          </Button>
          {potions.map((potion) => (
            <div
              className="flex h-12 w-40 items-center bg-secondary p-1 text-justify text-xs"
              key={potion.id}
            >
              {potion.name} {potion.quantity}
            </div>
          ))}
        </div>
        <div className="flex h-screen w-full justify-end">
          <div className="flex h-screen w-96 flex-col items-center overflow-y-auto bg-secondary p-3">
            <IngredientList
              ingredients={filteredUserIngredients}
              handleFilterIngredients={handleFilterIngredients}
              handleIncrementIngredient={handleIncrementIngredient}
            />
          </div>
        </div>
      </DndContext>
    </div>
  );
}
