"use client";
import { useCallback, useState } from "react";
import {
  InventoryItemEnums,
  PuzzleEnums,
  SideBarEnums,
  UseDragEndProps,
} from "../_types";
import { DragEndEvent } from "@dnd-kit/core";

export const useSidebar = () => {
  const [sideBar, setSidebar] = useState<SideBarEnums>(SideBarEnums.CHAT);
  return { sideBar, setSidebar };
};
export const usePuzzle = () => {
  const [puzzle, setPuzzle] = useState<PuzzleEnums>(PuzzleEnums.DOOR);
  return { puzzle, setPuzzle };
};

export const useDragEnd = ({
  setPuzzle,
  inventoryItemsState,
  setInventoryItems,
  pedestalState,
  setPedestalState,
}: UseDragEndProps) => {
  return useCallback(
    ({ active, over }: DragEndEvent) => {
      if (!over) return;
      console.log(over.id, active.id);
      const actions = {
        [PuzzleEnums.DOOR]: () => {
          if (active.id === "DOORKEY") {
            setPuzzle(PuzzleEnums.SOUNDSTONES);
            console.log("you make it through the door");
          } else {
            console.log("that doesnt do anything");
          }
        },
        [PuzzleEnums.SOUNDSTONES]: () => {
          if (active.id === "SCROLL") {
            console.log("the scroll shines revealing a secret note");
            setInventoryItems(
              inventoryItemsState.map((item) => {
                if (item.name === InventoryItemEnums.SCROLL){
                  return {
                    name: InventoryItemEnums.MAGICSCROLL,
                    image: item.image
                  }
                } 
                return item;
              }),
            );
          }
          console.log("you make it to the stones");
        },
        [PuzzleEnums.PEDESTALS]: () => {
          const correctItems = ["FIREGEM", "WATERGEM", "EARTHGEM", "AIRGEM"];
          if (correctItems.find((item) => item === active.id)) {
            setPedestalState(
              pedestalState.map((pedestal) => {
                if (pedestal.id === active.id) {
                  return {
                    ...pedestal,
                    isActivated: true,
                  };
                }
                return pedestal;
              }),
            );
            setInventoryItems(
              inventoryItemsState.filter((item) => item.name !== active.id),
            );
          }
        },
      };

      actions[over.id as PuzzleEnums]();
    },
    [setPuzzle, setInventoryItems, setPedestalState, inventoryItemsState, pedestalState],
  );
};
