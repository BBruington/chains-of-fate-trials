import { atom } from "jotai";
import { DescriptionOpject, InventoryItemProps } from "./_types";
import { inventoryItemsRecords } from "./_constants/inventory-constants";
import { pedastals } from "./_constants/puzzle-constants";
import { pipesExample, allPipes } from "./_constants/water-constants";

const puzzleDescription = atom<DescriptionOpject[]>([
  { message: "BLANK_FORMULA", isHighlighted: false },
]);
const inventoryItems = atom<InventoryItemProps[]>(inventoryItemsRecords);
const pedestals = atom(pedastals);
const pipesForState = pipesExample.map((pipe) => allPipes[pipe]);
const waterPipes = atom(pipesForState);

export { puzzleDescription, inventoryItems, pedestals, waterPipes };
