import { UniqueIdentifier } from "@dnd-kit/core";
import { Rarity, PrimaryAttribute, } from "@prisma/client";
import { RaritySchema, MagicTypeSchema, PrimaryAttr, MagicTypeSchemaibuteSchema, PrimaryAttributeSchema } from "../../prisma/generated/zod";
import { z } from "zod";

export const IngredientSchema = z.object({
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
});

const CommonIngredientSchema = z
  .object({
    id: z.number(),
    rarity: RaritySchema,
    type: MagicTypeSchema,
    primaryAttribute: PrimaryAttributeSchema,
    name: z.string(),
    description: z.string(),
    abjuration: z.number().min(0).max(10),
    conjuration: z.number().min(0).max(10),
    divination: z.number().min(0).max(10),
    enchantment: z.number().min(0).max(10),
    evocation: z.number().min(0).max(10),
    illusion: z.number().min(0).max(10),
    necromancy: z.number().min(0).max(10),
    transmutation: z.number().min(0).max(10),
  })

export const CommonPotionSchema = z
  .object({
    id: z.number(),
    rarity: RaritySchema,
    type: MagicTypeSchema,
    primaryAttribute: PrimaryAttributeSchema,
    name: z.string(),
    description: z.string(),
    abjuration: z.number().min(0).max(30),
    conjuration: z.number().min(0).max(30),
    divination: z.number().min(0).max(30),
    enchantment: z.number().min(0).max(30),
    evocation: z.number().min(0).max(30),
    illusion: z.number().min(0).max(30),
    necromancy: z.number().min(0).max(30),
    transmutation: z.number().min(0).max(30),
  })

  export const PotionRecord = z.record(z.string(), PotionSchema)

  export const PotionSchema = z
  .object({
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
  })
