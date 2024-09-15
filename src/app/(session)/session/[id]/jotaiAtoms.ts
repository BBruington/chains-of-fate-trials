import { atom } from "jotai";
import { DescriptionOpject, InventoryItemProps, PuzzleEnums } from "./_types";
import {
  inventoryItemsRecords,
  pedastals,
  pipesExample,
  allPipes,
  RARE_METALS,
  puzzleTransitions,
} from "./_constants";
const defaultDescription = puzzleTransitions.find(
  (item) => item.name === PuzzleEnums.PEDESTALS,
);
const puzzleDescription = atom<DescriptionOpject[]>(
  defaultDescription?.description
    ? defaultDescription.description
    : [{ message: "Select a puzzle", isHighlighted: false }],
);

const sessioinId = atom<string>("")
const inventoryItems = atom<InventoryItemProps[]>(inventoryItemsRecords);
const pedestals = atom(pedastals);
const pipesForState = pipesExample.map((pipe) => allPipes[pipe]);
const waterPipes = atom(pipesForState);
const rareMetals = atom(RARE_METALS);

export { puzzleDescription, inventoryItems, pedestals, waterPipes, rareMetals,sessioinId };
