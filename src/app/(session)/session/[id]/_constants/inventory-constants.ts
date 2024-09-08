import { InventoryItemEnums } from "../_types";
import parchment from "@/../public/background/parchment.png";
import key from "@/../public/icons/key.svg";

export const inventoryItemsRecords = {
  DOORKEY: {
    name: InventoryItemEnums.DOORKEY,
    image: key,
  },
  SCROLL: {
    name: InventoryItemEnums.SCROLL,
    image: parchment,
  },
  FIREGEM: {
    name: InventoryItemEnums.FIREGEM,
  },
  AIRGEM: {
    name: InventoryItemEnums.AIRGEM,
  },
  EARTHGEM: {
    name: InventoryItemEnums.EARTHGEM,
  },
  WATERGEM: {
    name: InventoryItemEnums.WATERGEM,
  },
};
