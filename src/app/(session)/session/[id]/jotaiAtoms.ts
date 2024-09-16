import { atom } from "jotai";
import { DescriptionOpject, InventoryItemProps } from "./_types";
import {
  inventoryItemsRecords,
  pedastals,
  pipesExample,
  allPipes,
  RARE_METALS,
  puzzleTransitions,
} from "./_constants";

const puzzleDescription = atom<DescriptionOpject[]>(
  puzzleTransitions[0].description,
);
const sessioinId = atom<string>("");
const inventoryItems = atom<InventoryItemProps[]>(inventoryItemsRecords);
const selectedCharacter = atom<
    "dinner" | "artemis" | "aelarion" | "elendiel"
  >("elendiel");
const pedestals = atom(pedastals);
const pipesForState = pipesExample.map((pipe) => allPipes[pipe]);
const waterPipes = atom(pipesForState);
const rareMetals = atom(RARE_METALS);

export {
  puzzleDescription,
  inventoryItems,
  pedestals,
  waterPipes,
  rareMetals,
  sessioinId,
  selectedCharacter,
};
