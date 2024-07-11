"use server";

import { prisma } from "@/app/utils/context";
import { RaritySchema } from "../../../../../prisma/generated/zod";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const FormulaSchema = z.object({
  id: z.string(),
  rarity: RaritySchema,
  name: z.string(),
  userId: z.string(),
  description: z.string(),
  ingredient1: z.string().nullable(),
  ingredient2: z.string().nullable(),
  ingredient3: z.string().nullable(),
  ingredient4: z.string().nullable(),
});

const AddNewFormulaSchema = z.object({
  formula: FormulaSchema,
  userId: z.string(),
});

const SaveFormulaSchema = z.object({
  formula: FormulaSchema,
});

export const addNewFormula = async (
  props: z.infer<typeof AddNewFormulaSchema>,
): Promise<void> => {
  try {
    const { formula, userId } = AddNewFormulaSchema.parse(props);

    await prisma.formula.create({
      data: {
        ...formula,
        id: undefined,
        userId,
      },
    });

    revalidatePath(`${process.env.BASE_URL}/potioncraft/formulas`);
  } catch (error) {
    console.error("Error adding formula: ", error);
    if (error instanceof z.ZodError) {
      throw new Error("Invalid input for adding formula");
    }
    throw new Error("Failed to add formula");
  }
};

export const saveFormula = async (
  props: z.infer<typeof SaveFormulaSchema>,
): Promise<void> => {
  try {
    const { formula } = SaveFormulaSchema.parse(props);
    await prisma.formula.upsert({
      where: {
        id: formula.id,
      },
      create: {
        ...formula,
      },
      update: {
        ...formula,
      },
    });
  } catch (error) {
    console.error("Error saving formula: ", error);
    if (error instanceof z.ZodError) {
      throw new Error("Invalid input for saving formula");
    }
    throw new Error("Failed to save formula");
  }
};
