import { MagicType, Rarity, PrimaryAttribute } from "@prisma/client";

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

export const EMPTY_USER_POTION = {
  id: 'empty',
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
}