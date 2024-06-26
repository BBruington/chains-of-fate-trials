import { UniqueIdentifier } from "@dnd-kit/core";

export type Ingredient = {
  id: UniqueIdentifier;
  name: string;
  description: string;
  abjuration: number;
  conjuration: number;
  divination: number;
  enchantment: number;
  evocation: number;
  illusion: number;
  necromancy: number;
  transmutation: number;
};
