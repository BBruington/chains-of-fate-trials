"use client";
import React, { ChangeEvent, useState } from "react";
import { potionData } from "./testData";
import {
  DndContext,
  closestCenter,
  pointerWithin,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
} from "@dnd-kit/core";
import { Ingredient } from "@/types";
import { Potion } from "@prisma/client";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  rectSwappingStrategy,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { SortableItem } from "@/dndkit/sortableItem";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  addPotionToUser,
  increaseIngredient,
  spendIngredients,
} from "../actions";
import { User } from "@prisma/client";
interface PotionCraftComponentProps {
  ingredients: Ingredient[];
  userId: User["clerkId"];
  potions: Potion[];
}

export default function PotionCraftComponent({
  ingredients,
  userId,
  potions,
}: PotionCraftComponentProps) {
  const empty = {
    id: "aksdjflajd;",
    name: "Empty",
    description: "It's empty",
    quantity: 0,
    abjuration: 0,
    conjuration: 0,
    divination: 0,
    enchantment: 0,
    evocation: 0,
    illusion: 0,
    necromancy: 0,
    transmutation: 0,
  };

  const initialPotionProperties = {
    abjuration: 0,
    conjuration: 0,
    divination: 0,
    enchantment: 0,
    evocation: 0,
    illusion: 0,
    necromancy: 0,
    transmutation: 0,
  };

  const [items1, setItems1] = useState<Ingredient[]>([]);
  const [userIngredients, setUserIngredients] = useState<Ingredient[]>([
    ...ingredients,
  ]);
  const [filteredItems, setFilteredItems] = useState(userIngredients);
  const [filteredIngredientsInput, setFilteredIngredientsInput] = useState("");
  const [item, setItem] = useState(initialPotionProperties);

  interface HandleFilterIngredientsProps {
    event?: ChangeEvent<HTMLInputElement> | undefined;
    ingredients?: Ingredient[] | undefined;
  }

  const handleFilterIngredients = ({
    event,
    ingredients,
  }: HandleFilterIngredientsProps) => {
    if (event?.target.value === "") {
      setFilteredItems(userIngredients);
      return;
    }
    const ingredientInput = event?.target.value
      ? event?.target.value
      : filteredIngredientsInput;
    setFilteredIngredientsInput(ingredientInput);
    if (ingredients) {
      const filteredIngredients = ingredients.filter((filter) => {
        const name = filter.name.toLowerCase();
        return name.includes(ingredientInput.toLowerCase());
      });
      setFilteredItems(filteredIngredients);
    } else {
      const filteredIngredients = userIngredients.filter((filter) => {
        const name = filter.name.toLowerCase();
        return name.includes(ingredientInput.toLowerCase());
      });
      setFilteredItems(filteredIngredients);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const potion = findPotion();

  const handleCraftPotion = async () => {
    const potion = findPotion();
    await spendIngredients({ ingredients: items1 });
    setItems1([empty]);
    if (potion === undefined) {
      console.log("potion craft failed! D:");
    } else {
      await addPotionToUser({ potion, userId });
    }
  };
  const handleIncrementIngredient = async ({
    ingredient,
  }: {
    ingredient: Ingredient;
  }) => {
    const res = await increaseIngredient({ ingredient, amount: 1 });
    const incrementedIngredients = userIngredients.map((userIngredient) => {
      if (userIngredient.id === ingredient.id) {
        return { ...userIngredient, quantity: userIngredient.quantity + 1 };
      }
      return userIngredient;
    });
    if (res) {
      setUserIngredients(incrementedIngredients);
      handleFilterIngredients({ ingredients: incrementedIngredients });
    }
  };

  return (
    <div className="flex w-screen">
      <div className="ml-5 flex flex-col">
        <span className="m-1 border-b-2 p-3">Potion Properties</span>
        <span>abjuration: {item.abjuration}</span>
        <span>conjuration: {item.conjuration}</span>
        <span>divination: {item.divination}</span>
        <span>enchantment: {item.enchantment}</span>
        <span>evocation: {item.evocation}</span>
        <span>illusion: {item.illusion}</span>
        <span>necromancy: {item.necromancy}</span>
        <span>transmutation: {item.transmutation}</span>
      </div>
      <DndContext sensors={sensors} onDragEnd={handleIngredientDragEnd}>
        <div className="flex">
          <SortableContext
            id="1"
            items={[...ingredients.map((ingredient) => ingredient.id)]}
            // strategy={verticalListSortingStrategy}
          >
            <div className="flex h-1/2 flex-col bg-green-900 p-12">
              <div>add ingredients</div>
              {items1.length === 0 ? (
                <SortableItem id={69} item={empty} disabled={true} />
              ) : (
                items1.map((item) => (
                  <SortableItem
                    className="m-1"
                    key={item.id}
                    id={item.id}
                    item={item}
                  />
                ))
              )}
            </div>
          </SortableContext>
          <Button onClick={handleCraftPotion}>Craft Potion</Button>
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
          <SortableContext
            id="2"
            items={[...ingredients.map((ingredient) => ingredient.id)]}
            // strategy={verticalListSortingStrategy}
          >
            <div className="flex h-screen w-96 flex-col items-center overflow-y-auto bg-secondary p-3">
              <div className="py-2 text-2xl">Ingredients</div>
              <Input
                className="m-2 mr-5"
                onChange={(event) => handleFilterIngredients({ event })}
              />
              <div className="w-full overflow-y-auto">
                {filteredItems.length === 0 ? (
                  <SortableItem id={69} item={empty} disabled={true} />
                ) : (
                  filteredItems.map((item) => (
                    <div key={item.id} className="flex items-center">
                      <SortableItem id={item.id} item={item} />{" "}
                      <Button
                        onClick={() =>
                          handleIncrementIngredient({ ingredient: item })
                        }
                        className="ml-1 h-6 w-10 text-xs"
                      >
                        Add
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </SortableContext>
        </div>
      </DndContext>
      <div className="mt-5">
        Potion being made:
        {potion?.name ? potion?.name : "failed"}
      </div>
    </div>
  );

  type MagicProperties = {
    abjuration: number;
    conjuration: number;
    divination: number;
    enchantment: number;
    evocation: number;
    illusion: number;
    necromancy: number;
    transmutation: number;
  };

  function findPotion() {
    return potionData.find((potion) => {
      return Object.keys(initialPotionProperties).every((key) => {
        const potionValue = Math.max(potion[key as keyof MagicProperties], 0);
        const combinedValue = Math.max(item[key as keyof MagicProperties], 0);
        return potionValue === combinedValue;
      });
    });
  }

  function findPotionValue(ingredients: Ingredient[]) {
    if (ingredients.length === 0) {
      setItem(initialPotionProperties);
      return;
    }
    const solution = ingredients.reduce((ingredientSum, currentIngretient) => {
      return {
        id: 1,
        name: "",
        description: "",
        quantity: 0,
        abjuration: ingredientSum.abjuration + currentIngretient.abjuration,
        conjuration: ingredientSum.conjuration + currentIngretient.conjuration,
        divination: ingredientSum.divination + currentIngretient.divination,
        enchantment: ingredientSum.enchantment + currentIngretient.enchantment,
        evocation: ingredientSum.evocation + currentIngretient.evocation,
        illusion: ingredientSum.illusion + currentIngretient.illusion,
        necromancy: ingredientSum.necromancy + currentIngretient.necromancy,
        transmutation:
          ingredientSum.transmutation + currentIngretient.transmutation,
      };
    });
    setItem(solution);
    return solution;
  }

  function handleIngredientDragEnd(event: DragOverEvent) {
    const { active, over } = event;
    const overContainerId = over?.data.current?.sortable.containerId;
    const activeContainerId = active?.data.current?.sortable.containerId;
    if (active.id === over?.id) return;
    if (overContainerId === "1") {
      if (activeContainerId === "2") {
        const activeItem = userIngredients.find(
          (item) => item.id === active.id,
        );
        if (activeItem !== undefined) {
          setItems1([...items1, activeItem]);
          findPotionValue([...items1, activeItem]);
          const ingredientsWithoutActive = userIngredients.filter(
            (item) => item !== activeItem,
          );
          if (activeItem.quantity === 1) {
            setUserIngredients(ingredientsWithoutActive);
            handleFilterIngredients({ ingredients: ingredientsWithoutActive });
          } else {
            const newItems = [
              ...ingredientsWithoutActive,
              { ...activeItem, quantity: activeItem.quantity - 1 },
            ];
            setUserIngredients(newItems);
            handleFilterIngredients({ ingredients: newItems });
          }
        }
      }
      if (activeContainerId === "1") {
        const activeItem = items1.find((item) => item.id === active.id);
        const overItem = items1.find((item) => item.id === over?.id);
        if (activeItem !== undefined && overItem !== undefined) {
          setItems1((items) => {
            const oldIndex = items.indexOf(activeItem);
            const newIndex = items.indexOf(overItem);

            return arrayMove(items, oldIndex, newIndex);
          });
        }
      }
    }
    if (overContainerId === "2") {
      if (activeContainerId === "1") {
        const activeItem = items1.find((item) => item.id === active.id);
        const filteredItems1 = items1.filter((item) => item !== activeItem);
        if (activeItem !== undefined) {
          const newIngredients = [...userIngredients, activeItem];
          setUserIngredients(newIngredients);
          setItems1(filteredItems1);
          findPotionValue([...filteredItems1]);
          handleFilterIngredients({ ingredients: newIngredients });
        }
      }
      if (activeContainerId === "2") {
        const activeItem = userIngredients.find(
          (item) => item.id === active.id,
        );
        const overItem = userIngredients.find((item) => item.id === over?.id);
        if (activeItem !== undefined && overItem !== undefined) {
          setUserIngredients((items) => {
            const oldIndex = items.indexOf(activeItem);
            const newIndex = items.indexOf(overItem);
            return arrayMove(items, oldIndex, newIndex);
          });
        }
      }
    }
  }
}
