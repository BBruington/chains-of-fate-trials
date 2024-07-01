"use client";
import React, { useState } from "react";
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
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  rectSwappingStrategy,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { SortableItem } from "@/dndkit/sortableItem";

export default function Home() {
  const empty = {
    id: 1,
    name: "Empty",
    description: "It's empty",
    abjuration: 0,
    conjuration: 0,
    divination: 0,
    enchantment: 0,
    evocation: 0,
    illusion: 0,
    necromancy: 0,
    transmutation: 0,
  };
  const potions = [
    {
      id: 1,
      name: "Potion of False Life",
      description: "it gives temporary hp",
      abjuration: 6,
      conjuration: 0,
      divination: 0,
      enchantment: 0,
      evocation: 5,
      illusion: 0,
      necromancy: 0,
      transmutation: 0,
    },
    {
      id: 2,
      name: "Potion of Minor Healing",
      description: "heal 1d4 + 2 hp",
      abjuration: 3,
      conjuration: 0,
      divination: 0,
      enchantment: 0,
      evocation: 10,
      illusion: 4,
      necromancy: 0,
      transmutation: 0,
    },
  ];
  const playerIngredients = [
    {
      id: 1,
      name: "Evergreen Herb",
      description: "It's good for healing",
      abjuration: 3,
      conjuration: 0,
      divination: 0,
      enchantment: 0,
      evocation: 5,
      illusion: 0,
      necromancy: -7,
      transmutation: 0,
    },
    {
      id: 2,
      name: "Evergreen Mushroom",
      description: "It's good for healing",
      abjuration: 0,
      conjuration: 0,
      divination: 0,
      enchantment: 0,
      evocation: 5,
      illusion: 4,
      necromancy: -3,
      transmutation: 0,
    },
    {
      id: 3,
      name: "Ghoulsprout",
      description: "It's good for necromancy",
      abjuration: 3,
      conjuration: 0,
      divination: 0,
      enchantment: -6,
      evocation: 0,
      illusion: 0,
      necromancy: 7,
      transmutation: 0,
    },
  ];

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
  const [items2, setItems2] = useState<Ingredient[]>([...playerIngredients]);
  const [item, setItem] = useState(initialPotionProperties);
  const [activeIngredient, setActiveIngredient] = useState<Ingredient | null>(
    null,
  );
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const potion = findPotion();

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
      <DndContext
        sensors={sensors}
        // onDragStart={handleIngredientDragStart}
        onDragOver={handleIngredientDragOver}
        // onDragEnd={handleIngredientDragEnd}
      >
        <div className="flex">
          <SortableContext
            id="1"
            items={[0, 1, 2, 3, 4, 5, 6, 7, 69]}
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
        </div>
        <div className="flex h-screen w-full justify-end">
          <SortableContext
            id="2"
            items={[0, 1, 2, 3, 4, 5, 6, 69]}
            // strategy={verticalListSortingStrategy}
          >
            <div className="flex flex-col bg-green-800 p-12">
              <div>ingredients</div>
              {items2.length === 0 ? (
                <SortableItem id={69} item={empty} disabled={true} />
              ) : (
                items2.map((item) => (
                  <SortableItem key={item.id} id={item.id} item={item} />
                ))
              )}
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
    return potions.find((potion) => {
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

  // function handleIngredientDragStart(event: DragStartEvent) {
  //   setActiveIngredient(event.active.data.current?.item);
  //   return;
  // }

  // function handleIngredientDragOver(event: DragOverEvent) {
  //   const { active, over } = event;
  //   if (!over) return;

  //   const activeId = active.id;
  //   const overId = over.id;

  //   if (activeId === overId) return;
  //   const overContainerId = over?.data.current?.sortable.containerId
  //   const activeContainerId = active?.data.current?.sortable.containerId

  //   if (overContainerId === activeContainerId && overContainerId === "1") {
  //     setItems1((ingredients) => {
  //       const activeIndex = ingredients.findIndex(t => t.id === activeId)
  //       const overIndex = ingredients.findIndex(t => t.id === overId)
  //       ingredients[activeIndex].id = ingredients[overIndex].id;
  //       return arrayMove(ingredients, activeIndex, overIndex - 1);
  //     })
  //   }
  //   if (overContainerId === activeContainerId && overContainerId === "2") {

  //   }
  // }

  function handleIngredientDragOver(event: DragOverEvent) {
    const { active, over } = event;
    const overContainerId = over?.data.current?.sortable.containerId;
    const activeContainerId = active?.data.current?.sortable.containerId;
    if (active.id === over?.id) return;
    if (overContainerId === "1") {
      if (activeContainerId === "2") {
        const activeItem = items2.find((item) => item.id === active.id);
        if (activeItem !== undefined) {
          setItems1([...items1, activeItem]);
          findPotionValue([...items1, activeItem]);
          setItems2(items2.filter((item) => item !== activeItem));
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
          setItems2([...items2, activeItem]);
          setItems1(filteredItems1);
          findPotionValue([...filteredItems1]);
        }
      }
      if (activeContainerId === "2") {
        const activeItem = items2.find((item) => item.id === active.id);
        const overItem = items2.find((item) => item.id === over?.id);
        if (activeItem !== undefined && overItem !== undefined) {
          setItems2((items) => {
            const oldIndex = items.indexOf(activeItem);
            const newIndex = items.indexOf(overItem);
            return arrayMove(items, oldIndex, newIndex);
          });
        }
      }
    }
  }
}
