import { EMPTY_USER_POTION } from "@/constants";
import { Potion } from "@prisma/client";
import { atom } from "jotai";

const displayPotion = atom<Potion>(EMPTY_USER_POTION);

export { displayPotion };
