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
