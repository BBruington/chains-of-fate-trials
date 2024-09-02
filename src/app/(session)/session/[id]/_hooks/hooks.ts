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
  setInvItems,
}: UseDragEndProps) => {
  return useCallback(
    ({ active, over }: DragEndEvent) => {
      if (!over) return;

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
            setInvItems((prev) => ({
              ...prev,
              SCROLL: {
                name: InventoryItemEnums.MAGICSCROLL,
                image: prev.SCROLL.image,
              },
            }));
          }
          console.log("you make it to the stones");
        },
      };
    },
    [setPuzzle, setInvItems],
  );
};
