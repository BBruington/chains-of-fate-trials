import { BLANK_FORMULA } from "@/constants";
import { Formula } from "@prisma/client";
import { atom } from "jotai";

const displayFormaula = atom<Formula>(BLANK_FORMULA);

export { displayFormaula };
