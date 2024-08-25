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
  DINV3: {
    name: InventoryItemEnums.DINV3,
  },
  DINV4: {
    name: InventoryItemEnums.DINV4,
  },
};
