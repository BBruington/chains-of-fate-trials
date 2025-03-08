"use server";

import { Ingredient, Potion } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  IngredientSchema,
  RaritySchema,
  MagicTypeSchema,
  PrimaryAttributeSchema,
  PotionSchema,
} from "../../../../prisma/generated/zod";
import { prisma } from "@/lib/db";

const LocalPotionSchema = z.object({
  id: z.number(),
  rarity: RaritySchema,
  type: MagicTypeSchema,
  primaryAttribute: PrimaryAttributeSchema,
  name: z.string(),
  description: z.string(),
  abjuration: z.number().min(0).default(0),
  conjuration: z.number().min(0).default(0),
  divination: z.number().min(0).default(0),
  enchantment: z.number().min(0).default(0),
  evocation: z.number().min(0).default(0),
  illusion: z.number().min(0).default(0),
  necromancy: z.number().min(0).default(0),
  transmutation: z.number().min(0).default(0),
});

const SpendIngredientsSchema = z.object({
  ingredients: z.array(IngredientSchema),
});

const ChangeQuantityLocalPotionSchema = z.object({
  potion: PotionSchema,
  quantity: z.number().int(),
});

const ChangeQuantityIngredientSchema = z.object({
  ingredient: IngredientSchema,
  quantity: z.number().int(),
});

const IncreaseIngredientSchema = z.object({
  ingredient: IngredientSchema,
  amount: z.number().int().positive(),
});

const AddPotionToUserSchema = z.object({
  userId: z.string(),
  potion: LocalPotionSchema,
});

const AddIngredientsToUserSchema = z.object({
  userId: z.string(),
  ingredients: z.array(
    z.object({
      id: z.string().or(z.number()),
      rarity: RaritySchema,
      type: MagicTypeSchema,
      primaryAttribute: PrimaryAttributeSchema,
      name: z.string(),
      quantity: z.number().min(0).default(0),
      description: z.string(),
      abjuration: z.number().min(0).default(0),
      conjuration: z.number().min(0).default(0),
      divination: z.number().min(0).default(0),
      enchantment: z.number().min(0).default(0),
      evocation: z.number().min(0).default(0),
      illusion: z.number().min(0).default(0),
      necromancy: z.number().min(0).default(0),
      transmutation: z.number().min(0).default(0),
    })
  ),
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

export const changePotionQuantity = async (
  props: z.infer<typeof ChangeQuantityLocalPotionSchema>,
): Promise<Potion> => {
  try {
    const { potion, quantity } = ChangeQuantityLocalPotionSchema.parse(props);

    if (potion.quantity + quantity <= 0) {
      const removedPotion = await prisma.potion.delete({
        where: {
          id: potion.id,
        },
      });
      revalidatePath(`${process.env.BASE_URL}/potioncraft`);
      return removedPotion;
    }

    const quantityChangedPotion = await prisma.potion.update({
      where: {
        id: potion.id,
      },
      data: {
        quantity: { increment: quantity },
      },
    });
    revalidatePath(`${process.env.BASE_URL}/potioncraft`);
    return quantityChangedPotion;
  } catch (error) {
    console.error("failed to change the quantity of the Potion: ", error);
    if (error instanceof z.ZodError) {
      throw new Error("Invalid input for changing potion quantity");
    }
    throw new Error("Failed to change the potion's quantity");
  }
};

export const changeIngredientQuantity = async (
  props: z.infer<typeof ChangeQuantityIngredientSchema>,
): Promise<Ingredient> => {
  try {
    const { ingredient, quantity } =
      ChangeQuantityIngredientSchema.parse(props);
    if (ingredient.quantity + quantity <= 0) {
      const removedIngredient = await prisma.ingredient.delete({
        where: {
          id: ingredient.id,
        },
      });
      revalidatePath(`${process.env.BASE_URL}/potioncraft`);
      return removedIngredient;
    }
    const quantityChangedIngredient = await prisma.ingredient.update({
      where: {
        id: ingredient.id,
      },
      data: {
        quantity: { increment: quantity },
      },
    });
    revalidatePath(`${process.env.BASE_URL}/potioncraft`);
    return quantityChangedIngredient;
  } catch (error) {
    console.error("failed to change the quantity of the Ingredient: ", error);
    if (error instanceof z.ZodError) {
      throw new Error("Invalid input for changing ingredient quantity");
    }
    throw new Error("Failed to change the ingredient's quantity");
  }
};

export const addPotionToUser = async (
  props: z.infer<typeof AddPotionToUserSchema>,
): Promise<Potion> => {
  try {
    const { userId, potion } = AddPotionToUserSchema.parse(props);
    const createdPotion = await prisma.$transaction(async (prisma) => {
      const existingPotion = await prisma.potion.findFirst({
        where: { userId, name: potion.name },
      });
      if (existingPotion === null) {
        const createdPotion = await prisma.potion.create({
          data: {
            ...potion,
            name: potion.name,
            description: potion.description,
            primaryAttribute: potion.primaryAttribute,
            id: undefined,
            userId,
          },
        });
        revalidatePath(`${process.env.BASE_URL}/potioncraft`);
        return createdPotion;
      } else {
        const createdPotion = await prisma.potion.update({
          where: { id: existingPotion.id },
          data: { quantity: { increment: 1 } },
        });
        revalidatePath(`${process.env.BASE_URL}/potioncraft`);
        return createdPotion;
      }
    });
    return createdPotion;
  } catch (error) {
    console.error("Error adding potion to user: ", error);
    if (error instanceof z.ZodError) {
      throw new Error("Invalid input for adding potion to user");
    }
    throw new Error("Failed to add potion to user");
  }
};

export const addIngredientsToUser = async (
  props: z.infer<typeof AddIngredientsToUserSchema>,
): Promise<void> => {
  try {
    const { userId, ingredients } = AddIngredientsToUserSchema.parse(props);
    const userIngredients = await prisma.ingredient.findMany({
      where: {
        userId: userId,
      },
    });
    let existingIngredients = [];
    let notExistingIngredients = [];
    for (let ingredient of ingredients) {
      const foundItem = userIngredients.find(
        (item) => ingredient.name === item.name,
      );
      if (foundItem) {
        existingIngredients.push(foundItem);
      } else {
        notExistingIngredients.push(ingredient);
      }
    }

    if (notExistingIngredients.length > 0) {
      await prisma.ingredient.createMany({
        data: notExistingIngredients.map((ingredient) => ({
          ...ingredient,
          name: ingredient.name,
          description: ingredient.description,
          id: undefined,
          userId,
        })),
      });
    }

    if (existingIngredients.length > 0) {
      existingIngredients.forEach(
        async (ingredient) =>
          await prisma.ingredient.update({
            where: {
              id: ingredient.id,
            },
            data: {
              quantity: ingredient.quantity + 1,
            },
          }),
      );
    }
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

    const ingredientNames = ingredients.map((ing) => ing.name);

    await prisma.formula.create({
      data: {
        userId,
        name: potion.name,
        description: potion.description,
        rarity: potion.rarity,
        ingredients: ingredientNames,
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
