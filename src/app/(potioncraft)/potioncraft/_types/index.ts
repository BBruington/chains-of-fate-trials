import { Ingredient } from "@prisma/client";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Dispatch, SetStateAction } from "react";
import { z } from "zod";
import {
  AddIngredientsToMixtureProps,
  HandleFilterIngredientsProps,
  HandleIngredientQuantityChangeProps,
} from "../_hooks/types";

export type IngredientListProps = {
  mixture: Ingredient[];
  ingredients: Ingredient[];
  activeIngredient: Ingredient | null;
  addIngredientToMixture: ({
    ingredient,
    mixture,
  }: AddIngredientsToMixtureProps) => void;
  handleFilterIngredients: ({
    event,
    ingredients,
  }: HandleFilterIngredientsProps) => void;
  handleOrderFilteredIngredients: (e: string) => void;
};

export type IngredientItemProps = {
  mixture: Ingredient[];
  ingredient: Ingredient;
  activeIngredient: Ingredient | null;
  addIngredientToMixture: ({
    ingredient,
    mixture,
  }: AddIngredientsToMixtureProps) => void;
};

export type IngredientDetailsProps = {
  ingredient: Ingredient;
};

export type AddToMixtureButtonProps = {
  mixture: Ingredient[];
  ingredient: Ingredient;
  addIngredientToMixture: ({
    ingredient,
    mixture,
  }: AddIngredientsToMixtureProps) => void;
};

export type RarityStyleProps = {
  COMMON: string;
  UNCOMMON: string;
  RARE: string;
  VERYRARE: string;
  LEGENDARY: string;
};

export type IngredientIconProps = {
  ARCANE: StaticImport;
  DIVINE: StaticImport;
  OCCULT: StaticImport;
  PRIMAL: StaticImport;
};

export type FormulaIngredient = {
  ingredientNum: "ingredient1" | "ingredient2" | "ingredient3" | "ingredient4";
  ingredientName: string | null;
};
export type FormulaIngredientsProps = FormulaIngredient[];

export const FormFormulaSchema = z.object({
  rarity: z.enum([
    "EMPTY",
    "COMMON",
    "UNCOMMON",
    "RARE",
    "VERYRARE",
    "LEGENDARY",
  ]),
  name: z.string(),
  description: z.string(),
  ingredients: z.array(z.string())
});

export type FormData = z.infer<typeof FormFormulaSchema>;

export type IngredientListItemProps = {
  ingredient: Ingredient;
  displayUi: {
    shop: boolean;
    ingredient: boolean;
  };
  setDisplayUi: Dispatch<
    SetStateAction<{
      shop: boolean;
      ingredient: boolean;
    }>
  >;
  handleChangeIngredientQuantity: ({
    ingredient,
    quantity,
  }: HandleIngredientQuantityChangeProps) => Promise<void>;
};
