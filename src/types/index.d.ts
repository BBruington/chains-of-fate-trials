import { UniqueIdentifier } from "@dnd-kit/core";

export type Ingredient = {
  id: UniqueIdentifier;
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
};
