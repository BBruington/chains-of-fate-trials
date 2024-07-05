"use server";

import { Ingredient, Potion } from "@/types";
import { prisma } from "@/app/utils/context";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface SpendIngredientsProps {
  ingredients: Ingredient[];
}

export const spendIngredients = async ({
  ingredients,
}: SpendIngredientsProps) => {
  for (let ingredient of ingredients) {
    if (ingredient.quantity === 1) {
      await prisma.ingredient.delete({
        where: {
          id: ingredient.id as string,
        },
      });
      return;
    }
    await prisma.ingredient.update({
      where: {
        id: ingredient.id as string,
      },
      data: {
        ...ingredient,
        id: ingredient.id as string,
        quantity: ingredient.quantity - 1,
      },
    });
  }
};
export const increaseIngredient = async ({
  ingredient,
  amount,
}: {
  ingredient: Ingredient;
  amount: number;
}) => {
  const increasedIngredient = await prisma.ingredient.update({
    where: {
      id: ingredient.id as string,
    },
    data: {
      quantity: ingredient.quantity + amount,
    },
  });
  revalidatePath(`${process.env.BASE_URL}/potioncraft`);
  return increasedIngredient;
};

interface AddPotionToUserProps {
  userId: User["clerkId"];
  potion: Potion;
}

export const addPotionToUser = async ({
  userId,
  potion,
}: AddPotionToUserProps) => {
  const potionResponse = await prisma.potion.findFirst({
    where: { userId, name: potion.name },
  });
  if (potionResponse === null) {
    await prisma.potion.create({
      data: {
        ...potion,
        id: undefined,
        userId,
      },
    });
  } else
    [
      await prisma.potion.update({
        where: {
          id: potionResponse.id,
          name: potion.name,
        },
        data: {
          quantity: potionResponse.quantity + 1,
        },
      }),
    ];

  revalidatePath(`${process.env.BASE_URL}/potioncraft`);
};

interface AddIngredientToUserProps {
  userId: User["clerkId"];
  ingredient: Ingredient;
}

export const addIngredientToUser = async ({
  userId,
  ingredient,
}: AddIngredientToUserProps) => {};
