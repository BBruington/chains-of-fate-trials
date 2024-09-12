import { InventoryItemEnums } from "../_types";
import parchment from "@/../public/background/parchment.png";
import key from "@/../public/icons/key.svg";

export const inventoryItemsRecords = [
  {
    name: InventoryItemEnums.DOORKEY,
    hidden: false,
    image: key,
  },
  {
    name: InventoryItemEnums.SCROLL,
    hidden: false,
    image: parchment,
  },
  {
    name: InventoryItemEnums.FIREGEM,
    hidden: true,
  },
  {
    name: InventoryItemEnums.AIRGEM,
    hidden: true,
  },
  {
    name: InventoryItemEnums.EARTHGEM,
    hidden: true,
  },
  {
    name: InventoryItemEnums.WATERGEM,
    hidden: true,
  },
  { name: InventoryItemEnums.ADAMANT, hidden: true },
  { name: InventoryItemEnums.COLDIRON, hidden: true },
  { name: InventoryItemEnums.MITHRIL, hidden: true },
];
