"use client";
import { SetStateAction, useCallback, useState } from "react";
import { handleSolvePuzzle } from "../actions";
import {
  InventoryItemEnums,
  InventoryItemProps,
  PuzzleEnums,
  SetAtom,
  SideBarEnums,
  UseDragEndProps,
} from "../_types";
import { DragEndEvent } from "@dnd-kit/core";

export const revealInventoryItem = async (
  sessionId: string,
  itemName: "firegem" | "earthgem" | "watergem" | "airgem",
  inventory: InventoryItemProps[],
  setInventory: SetAtom<[SetStateAction<InventoryItemProps[]>], void>,
) => {
  setInventory(
    inventory.map((item) => {
      if (item.name.toUpperCase() === itemName.toUpperCase()) {
        return {
          ...item,
          hidden: false,
        };
      }
      return item;
    }),
  );
  await handleSolvePuzzle({ id: sessionId, gem: itemName });
};

export const useSidebar = () => {
  const [sideBar, setSidebar] = useState<SideBarEnums>(
    SideBarEnums.DESCRIPTION,
  );
  return { sideBar, setSidebar };
};
export const usePuzzle = () => {
  const [puzzle, setPuzzle] = useState<PuzzleEnums>(PuzzleEnums.PEDESTALS);
  return { puzzle, setPuzzle };
};

export const useDragEnd = ({
  pedestalState,
  inventoryItemsState,
  setPedestalState,
  setInventoryItems,
  setVictoryDialogue,
}: UseDragEndProps) => {
  return useCallback(
    ({ active, over }: DragEndEvent) => {
      if (!over) return;
      const actions = {
        [PuzzleEnums.PEDESTALS]: () => {
          const correctItems = ["FIREGEM", "WATERGEM", "EARTHGEM", "AIRGEM"];
          if (correctItems.find((item) => item === active.id)) {
            const updatedPedastals = pedestalState.map((pedestal) => {
              if (pedestal.id === active.id) {
                return {
                  ...pedestal,
                  isActivated: true,
                };
              }
              return pedestal;
            });
            const missingPedastals = updatedPedastals.filter(
              (pedastal) => pedastal.isActivated === false,
            );
            if (missingPedastals.length === 0) {
              setVictoryDialogue(true);
            }
            setPedestalState(updatedPedastals);
            setInventoryItems(
              inventoryItemsState.filter((item) => item.name !== active.id),
            );
          }
        },
        [PuzzleEnums.FIRE]: () => {},
        [PuzzleEnums.AIR]: () => {},
        [PuzzleEnums.WATER]: () => {},
        [PuzzleEnums.EARTH]: () => {},
      };

      actions[over.id as PuzzleEnums]();
    },
    [setInventoryItems, setPedestalState, inventoryItemsState, pedestalState],
  );
};
