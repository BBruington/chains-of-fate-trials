"use server";

import { prisma } from "@/app/utils/context";
import { Ingredient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  IngredientSchema,
  RaritySchema,
  MagicTypeSchema,
  PrimaryAttributeSchema,
} from "../../../../prisma/generated/zod";
const PotionSchema = z.object({
  id: z.number(),
  rarity: RaritySchema,
  type: MagicTypeSchema,
  primaryAttribute: PrimaryAttributeSchema,
  name: z.string(),
  description: z.string(),
  abjuration: z.number().nonnegative(),
  conjuration: z.number().nonnegative(),
  divination: z.number().nonnegative(),
  enchantment: z.number().nonnegative(),
  evocation: z.number().nonnegative(),
  illusion: z.number().nonnegative(),
  necromancy: z.number().nonnegative(),
  transmutation: z.number().nonnegative(),
});

const SpendIngredientsSchema = z.object({
  ingredients: z.array(IngredientSchema),
});

const IncreaseIngredientSchema = z.object({
  ingredient: IngredientSchema,
  amount: z.number().int().positive(),
});

const AddPotionToUserSchema = z.object({
  userId: z.string(),
  potion: PotionSchema,
});

const AddIngredientToUserSchema = z.object({
  userId: z.string(),
  ingredients: z.array(IngredientSchema),
});

const AddFormulaToUserSchema = z.object({
  userId: z.string(),
  ingredients: z.array(IngredientSchema),
  potion: PotionSchema,
});

export const spendIngredients = async (
  props: z.infer<typeof SpendIngredientsSchema>,
): Promise<void> => {
  try {
    const { ingredients } = SpendIngredientsSchema.parse(props);

    for (let ingredient of ingredients) {
      if (ingredient.quantity === 1) {
        await prisma.ingredient.delete({
          where: {
            id: ingredient.id,
          },
        });
        return;
      }
      await prisma.ingredient.update({
        where: {
          id: ingredient.id,
        },
        data: {
          ...ingredient,
          id: ingredient.id,
          quantity: ingredient.quantity - 1,
        },
      });
    }
  } catch (error) {
    console.error("Error spending ingredients: ", error);
    if (error instanceof z.ZodError) {
      throw new Error("Invalid input for spending ingredients");
    }
    throw new Error("Failed to spend ingredients");
  }
};

export const increaseIngredient = async (
  props: z.infer<typeof IncreaseIngredientSchema>,
): Promise<Ingredient> => {
  try {
    const { ingredient, amount } = IncreaseIngredientSchema.parse(props);
    const increasedIngredient = await prisma.ingredient.update({
      where: {
        id: ingredient.id,
      },
      data: {
        quantity: { increment: amount },
      },
    });
    revalidatePath(`${process.env.BASE_URL}/potioncraft`);
    return increasedIngredient;
  } catch (error) {
    console.error("Error increasing ingredient: ", error);
    if (error instanceof z.ZodError) {
      throw new Error("Invalid input for increasing ingredient");
    }
    throw new Error("Failed to increase ingredient");
  }
};

export const addPotionToUser = async (
  props: z.infer<typeof AddPotionToUserSchema>,
): Promise<void> => {
  try {
    const { userId, potion } = AddPotionToUserSchema.parse(props);
    await prisma.$transaction(async (prisma) => {
      const existingPotion = await prisma.potion.findFirst({
        where: { userId, name: potion.name },
      });
      if (existingPotion === null) {
        await prisma.potion.create({
          data: {
            ...potion,
            name: potion.name,
            description: potion.description,
            primaryAttribute: potion.primaryAttribute,
            id: undefined,
            userId,
          },
        });
      } else {
        await prisma.potion.update({
          where: { id: existingPotion.id },
          data: { quantity: { increment: 1 } },
        });
      }
    });

    revalidatePath(`${process.env.BASE_URL}/potioncraft`);
  } catch (error) {
    console.error("Error adding potion to user: ", error);
    if (error instanceof z.ZodError) {
      throw new Error("Invalid input for adding potion to user");
    }
    throw new Error("Failed to add potion to user");
  }
};

export const addIngredientsToUser = async (
  props: z.infer<typeof AddIngredientToUserSchema>,
): Promise<void> => {
  try {
    const { userId, ingredients } = AddIngredientToUserSchema.parse(props);
    await prisma.ingredient.createMany({
      data: ingredients.map((ingredient) => ({
        ...ingredient,
        name: ingredient.name,
        description: ingredient.description,
        id: undefined,
        userId,
      })),
    });
    revalidatePath(`${process.env.BASE_URL}/potioncraft`);
  } catch (error) {
    console.error("Error adding ingredients to user: ", error);
    if (error instanceof z.ZodError) {
      throw new Error("Invalid input for adding ingredients to user");
    }
    throw new Error("Failed to add ingredients to user");
  }
};

export const addFormulaToUser = async (
  props: z.infer<typeof AddFormulaToUserSchema>,
): Promise<void> => {
  try {
    const { ingredients, potion, userId } = AddFormulaToUserSchema.parse(props);
    
    await prisma.formula.create({
      data: {
        userId,
        name: potion.name,
        description: potion.description,
        rarity: potion.rarity,
        ingredient1: ingredients[0]?.name ? ingredients[0].name : null,
        ingredient2: ingredients[1]?.name ? ingredients[1].name : null,
        ingredient3: ingredients[2]?.name ? ingredients[2].name : null,
        ingredient4: ingredients[3]?.name ? ingredients[3].name : null,
      },
    });
    revalidatePath(`${process.env.BASE_URL}/potioncraft`);
  } catch (error) {
    console.error("Error adding formula to user: ", error);
    if (error instanceof z.ZodError) {
      throw new Error("Invalid input for adding ingredients to user");
    }
    throw new Error("Failed to add formula to user");
  }
};
