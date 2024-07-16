import { EMPTY_INGREDIENT } from "@/constants";
import { Ingredient } from "@prisma/client";
import { atom } from "jotai";

const displayIngredient = atom<Ingredient>(EMPTY_INGREDIENT);

export { displayIngredient };