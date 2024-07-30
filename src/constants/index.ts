import {
  RarityStyleProps,
  IngredientIconProps,
} from "@/app/(potioncraft)/potioncraft/_types";
import { MagicType, Rarity, PrimaryAttribute } from "@prisma/client";
import wizardHat from "@/../public/icons/wizard-hat.svg";
import skull from "@/../public/icons/skull.svg";
import herb from "@/../public/icons/herb.svg";
import { RarityType } from "../../prisma/generated/zod";

export const EMPTY_INGREDIENT = {
  id: "empty",
  name: "Empty",
  type: MagicType["EMPTY"],
  rarity: Rarity["EMPTY"],
  primaryAttribute: PrimaryAttribute["EMPTY"],
  description: "It's empty",
  userId: "empty",
  quantity: 0,
  abjuration: 0,
  conjuration: 0,
  divination: 0,
  enchantment: 0,
  evocation: 0,
  illusion: 0,
  necromancy: 0,
  transmutation: 0,
};

export const EMPTY_MIXTURE = [
  EMPTY_INGREDIENT,
  EMPTY_INGREDIENT,
  EMPTY_INGREDIENT,
  EMPTY_INGREDIENT,
];

export const EMPTY_USER_POTION = {
  id: "empty",
  userId: "empty",
  name: "Empty",
  type: MagicType["EMPTY"],
  rarity: Rarity["EMPTY"],
  primaryAttribute: PrimaryAttribute["EMPTY"],
  description: "It's empty",
  quantity: 0,
  abjuration: 0,
  conjuration: 0,
  divination: 0,
  enchantment: 0,
  evocation: 0,
  illusion: 0,
  necromancy: 0,
  transmutation: 0,
};

export const EMPTY_POTION = {
  id: 1,
  name: "Empty",
  type: MagicType["EMPTY"],
  rarity: Rarity["EMPTY"],
  primaryAttribute: PrimaryAttribute["EMPTY"],
  description: "It's empty",
  abjuration: 0,
  conjuration: 0,
  divination: 0,
  enchantment: 0,
  evocation: 0,
  illusion: 0,
  necromancy: 0,
  transmutation: 0,
};

export const BLANK_FORMULA = {
  id: "empty",
  userId: "empty",
  name: "Blank",
  description: "blank",
  rarity: Rarity["EMPTY"],
  ingredient1: null,
  ingredient2: null,
  ingredient3: null,
  ingredient4: null,
};

export const RARITY_STYLES: RarityStyleProps = {
  COMMON: "text-slate-500",
  UNCOMMON: "text-green-600",
  RARE: "text-blue-500",
  VERYRARE: "text-purple-600",
  LEGENDARY: "text-orange-600",
};

export const INGREDIENT_ICONS: IngredientIconProps = {
  ARCANE: wizardHat,
  DIVINE: wizardHat,
  OCCULT: skull,
  PRIMAL: herb,
};

export const INGREDIENT_TYPE_ORDER = {
  EMPTY: 0,
  ARCANE: 1,
  DIVINE: 2,
  OCCULT: 3,
  PRIMAL: 4,
};

export const INGREDIENT_RARITY_ORDER = {
  EMPTY: 0,
  COMMON: 1,
  UNCOMMON: 2,
  RARE: 3,
  VERYRARE: 4,
  LEGENDARY: 5,
};

export const ALL_RARITIES: RarityType[] = [
  "EMPTY",
  "COMMON",
  "UNCOMMON",
  "RARE",
  "VERYRARE",
  "LEGENDARY",
];

export const BLANK_MIXTURE_PROPERTIES = {
  magicTypes: ["EMPTY"],
  rarity: "EMPTY",
  primaryAttribute: "EMPTY",
  abjuration: 0,
  conjuration: 0,
  divination: 0,
  enchantment: 0,
  evocation: 0,
  illusion: 0,
  necromancy: 0,
  transmutation: 0,
};
