import { Ingredient } from "@prisma/client";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Dispatch, SetStateAction } from "react";
import { z } from "zod";
import {
  HandleFilterIngredientsProps,
  HandleIngredientQuantityChangeProps,
} from "../_hooks/types";

export interface IngredientListProps {
  ingredients: Ingredient[];
  activeIngredient: Ingredient | null;
  handleFilterIngredients: ({
    event,
    ingredients,
  }: HandleFilterIngredientsProps) => void;
  handleOrderFilteredIngredients: (e: string) => void;
  handleChangeIngredientQuantity: ({
    ingredient,
    quantity,
  }: HandleIngredientQuantityChangeProps) => Promise<void>;
}

export interface IngredientItemProps {
  ingredient: Ingredient;
  activeIngredient: Ingredient | null;
  onQuantityChange: ({
    ingredient,
    quantity,
  }: HandleIngredientQuantityChangeProps) => Promise<void>;
}

export interface RarityStyleProps {
  COMMON: string;
  UNCOMMON: string;
  RARE: string;
  VERYRARE: string;
  LEGENDARY: string;
}

export interface IngredientIconProps {
  ARCANE: StaticImport;
  DIVINE: StaticImport;
  OCCULT: StaticImport;
  PRIMAL: StaticImport;
}

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
  ingredient1: z.string(),
  ingredient2: z.string(),
  ingredient3: z.string(),
  ingredient4: z.string(),
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
