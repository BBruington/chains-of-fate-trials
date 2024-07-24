import { $Enums, Ingredient, User } from "@prisma/client";
import { Dispatch, SetStateAction, ChangeEvent } from "react";
import { z } from "zod";
import { IngredientSchema } from "../../../../../prisma/generated/zod";

export type PotionHooksProps = {
  mixtureProperties: {
    magicTypes: string[];
    rarity: string;
    primaryAttribute: string;
    abjuration: number;
    conjuration: number;
    divination: number;
    enchantment: number;
    evocation: number;
    illusion: number;
    necromancy: number;
    transmutation: number;
  };
  mixture: z.infer<typeof IngredientSchema>[];
  setMixture: Dispatch<SetStateAction<z.infer<typeof IngredientSchema>[]>>;
  findMixtureProperties: (
    ingredients: z.infer<typeof IngredientSchema>[],
  ) => z.infer<typeof mixturePropertiesSchema>;
  userId: User["clerkId"];
};

export type IngredientState = {
  id: string;
  rarity: $Enums.Rarity;
  type: $Enums.MagicType;
  primaryAttribute: $Enums.PrimaryAttribute;
  name: string;
  description: string;
  quantity: number;
  abjuration: number;
  conjuration: number;
  divination: number;
  enchantment: number;
  evocation: number;
  illusion: number;
  necromancy: number;
  transmutation: number;
  userId: string;
};

export type IngredientHooksProps = {
  userIngredients: IngredientState[];
  filteredUserIngredients: IngredientState[];
  userId: User["clerkId"];
  mixture: IngredientState[];
  filteredIngredientsInput: string;
  findMixtureProperties: (ingredients: z.infer<typeof IngredientSchema>[]) => {
    rarity: string;
    primaryAttribute: string;
    abjuration: number;
    conjuration: number;
    divination: number;
    enchantment: number;
    evocation: number;
    illusion: number;
    necromancy: number;
    transmutation: number;
    magicTypes: string[];
  };
  setMixture: Dispatch<SetStateAction<IngredientState[]>>;
  setUserIngredients: Dispatch<SetStateAction<IngredientState[]>>;
  setActiveIngredient: Dispatch<SetStateAction<IngredientState | null>>;
  setFilteredUserIngredients: Dispatch<SetStateAction<IngredientState[]>>;
  setFilteredIngredientsInput: Dispatch<SetStateAction<string>>;
};

export type HandleFilterIngredientsProps = {
  event?: ChangeEvent<HTMLInputElement> | undefined;
  ingredients?: Ingredient[] | undefined;
};

export type AddIngredientsProps = {
  userId: User["clerkId"];
  ingredients: Ingredient[];
};

export type HandleIngredientQuantityChangeProps = {
  ingredient: Ingredient;
  quantity: number;
};

export type UsePotionCraftProps = {
  ingredients: z.infer<typeof IngredientSchema>[];
  userId: User["clerkId"];
};

export type MagicProperties = {
  abjuration: number;
  conjuration: number;
  divination: number;
  enchantment: number;
  evocation: number;
  illusion: number;
  necromancy: number;
  transmutation: number;
};

export type AddFormulaProps = {
  mixture: z.infer<typeof IngredientSchema>[];
  userId: User["clerkId"];
};

export const mixturePropertiesSchema = z.object({
  magicTypes: z.array(z.string()),
  rarity: z.string(),
  primaryAttribute: z.string(),
  abjuration: z.number(),
  conjuration: z.number(),
  divination: z.number(),
  enchantment: z.number(),
  evocation: z.number(),
  illusion: z.number(),
  necromancy: z.number(),
  transmutation: z.number(),
});

export const findPotionSchema = z.object({
  mixture: mixturePropertiesSchema,
});
