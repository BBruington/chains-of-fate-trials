"use client";
import Draggable from "@/components/dndkit/draggable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  IngredientListProps,
  IngredientItemProps,
  RarityStyleProps,
  IngredientIconProps,
  IngredientDetailsProps,
  AddToMixtureButtonProps,
} from "../_types";
import { EMPTY_INGREDIENT, INGREDIENT_ICONS } from "@/constants";
import { cn } from "@/lib/utils";
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
import { Cinzel } from "next/font/google";

const fontHeader = Cinzel({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const RARITY_STYLES_TEXT: RarityStyleProps = {
  COMMON: "text-slate-500",
  UNCOMMON: "text-green-600",
  RARE: "text-blue-500",
  VERYRARE: "text-purple-600",
  LEGENDARY: "text-orange-600",
};

export default function IngredientList({
  mixture,
  ingredients,
  activeIngredient,
  handleFilterIngredients,
  addIngredientToMixture,
  handleOrderFilteredIngredients,
}: IngredientListProps) {
  return (
    <div className="flex h-full w-full flex-col items-center">
      <h2 className={cn(fontHeader.className, "py-2 text-2xl")}>
        My Ingredients
      </h2>
      <Input
        className="m-2"
        onChange={(event) => handleFilterIngredients({ event })}
        aria-label="Filter ingredients input"
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
              mixture={mixture}
              ingredient={ingredient}
              activeIngredient={activeIngredient}
              addIngredientToMixture={addIngredientToMixture}
            />
          ))
        )}
      </div>
    </div>
  );
}

function IngredientItem({
  mixture,
  ingredient,
  activeIngredient,
  addIngredientToMixture,
}: IngredientItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenHoverCard = (event: boolean) => {
    setIsOpen(activeIngredient === null && event);
  };

  return (
    <HoverCard open={isOpen} onOpenChange={handleOpenHoverCard}>
      <div
        className={cn(
          "flex items-center rounded-md border-b px-2",
          RARITY_STYLES_TEXT[ingredient.rarity as keyof RarityStyleProps],
        )}
      >
        <HoverCardTrigger onClick={() => setIsOpen(false)} className="flex">
          <Image
            className="w-5 shrink-0 lg:ml-1"
            src={INGREDIENT_ICONS[ingredient.type as keyof IngredientIconProps]}
            alt="Ingredient Type Icon"
          />
          <Draggable
            showQuantity={true}
            id={ingredient.id}
            item={ingredient}
            className={`${RARITY_STYLES_TEXT[ingredient.rarity as keyof RarityStyleProps]}`}
          />
        </HoverCardTrigger>

        <HoverCardContent>
          <IngredientDetails ingredient={ingredient} />
        </HoverCardContent>
        <AddToMixtureButton
          ingredient={ingredient}
          addIngredientToMixture={addIngredientToMixture}
          mixture={mixture}
        />
      </div>
    </HoverCard>
  );
}

function IngredientDetails({ ingredient }: IngredientDetailsProps) {
  return (
    <div className="flex flex-col space-y-2">
      <h2 className="mb-2 flex justify-center border-b">{ingredient.name}</h2>

      <ul>
        <li>
          Rarity:{" "}
          <span
            className={
              RARITY_STYLES_TEXT[ingredient.rarity as keyof RarityStyleProps]
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
  );
}

function AddToMixtureButton({
  mixture,
  ingredient,
  addIngredientToMixture,
}: AddToMixtureButtonProps) {
  const buttonClass =
    "hover:bg-slate-300 h-6 w-16 lg:mr-1 border border-black bg-white text-xs text-black rounded-lg";
  return (
    <div className="flex space-x-1">
      <Button
        className={buttonClass}
        onClick={() => addIngredientToMixture({ ingredient, mixture })}
        aria-label={`Add ${ingredient.name} to mixture`}
      >
        add
      </Button>
    </div>
  );
}
