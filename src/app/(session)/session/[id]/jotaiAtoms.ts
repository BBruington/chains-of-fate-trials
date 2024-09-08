import { atom } from "jotai";
import { InventoryItemProps } from "./_types";
import { inventoryItemsRecords } from "./_constants/inventory-constants";
import { pedastals } from "./_constants/puzzle-constants";

const puzzleDescription = atom<string>("BLANK_FORMULA");
const inventoryItems = atom<InventoryItemProps[]>(
  inventoryItemsRecords,
);
const pedestals = atom(pedastals);

export { puzzleDescription, inventoryItems, pedestals };
