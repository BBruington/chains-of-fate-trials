import { atom } from "jotai";
import { ItemNames, InventoryItemProps, InventoryItemEnums } from "./_types";
import { inventoryItemsRecords } from "./_constants/inventory";

const puzzleDescription = atom<string>("BLANK_FORMULA");
const inventoryItems = atom<Record<ItemNames, InventoryItemProps>>(inventoryItemsRecords);

export { puzzleDescription, inventoryItems };
