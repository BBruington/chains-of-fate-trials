import { atom } from "jotai";
import { DescriptionOpject, InventoryItemProps } from "./_types";
import {
  inventoryItemsRecords,
  pedastals,
  pipesExample,
  allPipes,
  RARE_METALS,
} from "./_constants";

const puzzleDescription = atom<DescriptionOpject[]>([
  { message: "BLANK_FORMULA", isHighlighted: false },
]);
const inventoryItems = atom<InventoryItemProps[]>(inventoryItemsRecords);
const pedestals = atom(pedastals);
const pipesForState = pipesExample.map((pipe) => allPipes[pipe]);
const waterPipes = atom(pipesForState);
const rareMetals = atom(RARE_METALS);

export { puzzleDescription, inventoryItems, pedestals, waterPipes, rareMetals };
