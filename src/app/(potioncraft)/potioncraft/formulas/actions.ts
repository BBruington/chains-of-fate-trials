"use server"

import { prisma } from "@/app/utils/context"
import { Formula } from "../../../../../prisma/generated/zod"
import { User } from "@prisma/client"

interface SaveFormulaProps {
  formula: Formula
}

export const saveFormula = async ({formula}: SaveFormulaProps) => {
  await prisma.formula.upsert({
    where: {
      id: formula.id,
    },
    create: {
      ...formula,
    },
    update: {
      ...formula,
    }
  })
}