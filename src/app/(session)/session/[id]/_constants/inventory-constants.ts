import { InventoryItemEnums } from "../_types";
import parchment from "@/../public/background/parchment.png";
import key from "@/../public/icons/key.svg";

export const inventoryItemsRecords = [
  {
    name: InventoryItemEnums.DOORKEY,
    image: key,
  },
  {
    name: InventoryItemEnums.SCROLL,
    image: parchment,
  },
  {
    name: InventoryItemEnums.FIREGEM,
  },
  {
    name: InventoryItemEnums.AIRGEM,
  },
  {
    name: InventoryItemEnums.EARTHGEM,
  },
  {
    name: InventoryItemEnums.WATERGEM,
  },
];
