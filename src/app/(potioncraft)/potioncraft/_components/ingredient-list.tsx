"use client";
import Draggable from "@/components/dndkit/draggable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  IngredientListProps,
  IngredientItemProps,
  RarityStyleProps,
  IngredientIconProps,
} from "../_types";
import { EMPTY_INGREDIENT } from "@/constants";
import { cn } from "@/lib/utils";
import skull from "@/../public/icons/skull.svg";
import wizardHat from "@/../public/icons/wizard-hat.svg";
import scroll from "@/../public/icons/scroll.svg";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Image from "next/image";
import { useState } from "react";

export default function IngredientList({
  ingredients,
  activeIngredient,
  handleFilterIngredients,
  handleOrderFilteredIngredients,
  handleChangeIngredientQuantity,
}: IngredientListProps) {
  return (
    <>
      <h2 className="py-2 text-2xl">Ingredients</h2>
      <Input
        className="m-2"
        onChange={(event) => handleFilterIngredients({ event })}
        aria-label="Filter ingredients"
        placeholder="Search"
      />
      <Select onValueChange={(e) => handleOrderFilteredIngredients(e)}>
        <SelectTrigger className="mb-4 w-[180px]">
          <SelectValue placeholder="All Ingredients" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Order By</SelectLabel>
            <SelectItem value="alphabet">Alphabetical</SelectItem>
            <SelectItem value="rarity">Rarity</SelectItem>
            <SelectItem value="type">Type</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="flex w-full flex-col items-center space-y-1">
        {ingredients.length === 0 ? (
          <Draggable id={"empty"} item={EMPTY_INGREDIENT} disabled={true} />
        ) : (
          ingredients.map((ingredient) => (
            <IngredientItem
              key={ingredient.id}
              ingredient={ingredient}
              activeIngredient={activeIngredient}
              onQuantityChange={handleChangeIngredientQuantity}
            />
          ))
        )}
      </div>
    </>
  );
}

function IngredientItem({
  ingredient,
  activeIngredient,
  onQuantityChange,
}: IngredientItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenHoverCard = (event: boolean) => {
    if (activeIngredient === null && event === true ) {
      setIsOpen(true);
    } else {
      setIsOpen(false)
    }
  };
  const rarityStyles: RarityStyleProps = {
    COMMON: "text-slate-500",
    UNCOMMON: "text-green-600",
    RARE: "text-blue-500",
    VERYRARE: "text-purple-600",
    LEGENDARY: "text-orange-600",
  };

  const ingredientIcon: IngredientIconProps = {
    ARCANE: wizardHat,
    DIVINE: wizardHat,
    OCCULT: skull,
    PRIMAL: scroll,
  };

  return (
    <HoverCard open={isOpen} onOpenChange={(event) => handleOpenHoverCard(event)}>
      <div
        className={cn(
          "flex items-center rounded-md border-b px-2",
          rarityStyles[ingredient.rarity as keyof RarityStyleProps],
        )}
      >
        <HoverCardTrigger onClick={() => setIsOpen(false)} className="flex">
          <Image
            className="w-4"
            src={ingredientIcon[ingredient.type as keyof IngredientIconProps]}
            alt="Ingredient Type Icon"
          />
          <Draggable
            showQuantity={true}
            id={ingredient.id}
            item={ingredient}
            className={`text-white ${rarityStyles[ingredient.rarity as keyof RarityStyleProps]}`}
          />
        </HoverCardTrigger>
        <HoverCardContent>
          <div className="flex flex-col space-y-2 text-sm">
            <h2 className="mb-2 flex justify-center border-b text-lg">
              {ingredient.name}
            </h2>
            <ul>
              <li>
                Rarity:{" "}
                <span
                  className={
                    rarityStyles[ingredient.rarity as keyof RarityStyleProps]
                  }
                >
                  {ingredient.rarity}
                </span>
              </li>
              <li>Type: {ingredient.type}</li>
              <li>Primary Attribute: {ingredient.primaryAttribute}</li>
            </ul>
            <p className="text-xs">{ingredient.description}</p>
          </div>
        </HoverCardContent>
        <Button
          onClick={() => onQuantityChange({ ingredient, quantity: -1 })}
          className="hover:primary-60 h-5 w-8 rounded-lg border border-black bg-white text-xs text-black"
          aria-label={`Decrease ${ingredient.name}`}
        >
          -
        </Button>
        <Button
          onClick={() => onQuantityChange({ ingredient, quantity: 1 })}
          className="hover:primary-60 ml-1 h-5 w-8 border border-black bg-white text-xs text-black"
          aria-label={`Add ${ingredient.name}`}
        >
          +
        </Button>
      </div>
    </HoverCard>
  );
}
