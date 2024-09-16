"use client";
import Inventory from "./sidebar/inventory";
import { DndContext } from "@dnd-kit/core";
import { Suspense, useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  SessionPageProps,
  SideBarEnums,
  PuzzleEnums,
  DescriptionOpject,
} from "../_types";
import SidebarNavItem from "./sidebar/sidebar-nav-item";
import Description from "./sidebar/description";
import { useAtom } from "jotai";
import { puzzleDescription, inventoryItems, pedestals } from "../jotaiAtoms";
import Messages from "./sidebar/messages";
import { cn } from "@/lib/utils";
import { usePuzzle, useSidebar, useDragEnd } from "../_hooks/hooks";
import PedestalPuzzle from "./puzzles/four-pedestals";
import FirePuzzle from "./puzzles/fire/fire-trial";
import WaterPuzzle from "./puzzles/water/water-trial";
import EarthPuzzle from "./puzzles/earth/earth-trial";
import AirPuzzle from "./puzzles/air/air-trial";
import VictoryDialogue from "./victoryDialogue";
import { puzzleTransitions, sidebarNavItems } from "../_constants";

const puzzleComponents = {
  [PuzzleEnums.PEDESTALS]: PedestalPuzzle,
  [PuzzleEnums.FIRE]: FirePuzzle,
  [PuzzleEnums.WATER]: WaterPuzzle,
  [PuzzleEnums.EARTH]: EarthPuzzle,
  [PuzzleEnums.AIR]: AirPuzzle,
};

export default function SessionPage({
  sessionId,
  chatMessages,
  username,
  puzzleSession,
}: SessionPageProps) {
  const [, setDesc] = useAtom(puzzleDescription);
  const [inventoryItemsState, setInventoryItems] = useAtom(inventoryItems);
  const [pedestalState, setPedestalState] = useAtom(pedestals);
  const [victoryDialogue, setVictoryDialogue] = useState(false);
  const { sideBar, setSidebar } = useSidebar();
  const { puzzle, setPuzzle } = usePuzzle();

  useEffect(() => {
    setInventoryItems(
      inventoryItemsState.map((item) => {
        const checkGems = ["firegem", "earthgem", "watergem", "airgem"];
        if (checkGems.includes(item.name.toLowerCase())) {
          if (
            puzzleSession[
              item.name.toLocaleLowerCase() as keyof typeof puzzleSession
            ]
          ) {
            return { ...item, hidden: false };
          }
        }
        return item;
      }),
    );
    const missingGems = inventoryItemsState.map(
      (item) => item.hidden === false,
    );
    if (missingGems.length === 0) {
      setVictoryDialogue(true);
    }
  }, []);

  const onDragEnd = useDragEnd({
    pedestalState,
    inventoryItemsState,
    setPedestalState,
    setVictoryDialogue,
    setInventoryItems,
  });

  const handlePuzzleTransition = useCallback(
    (name: PuzzleEnums, description: DescriptionOpject[]) => {
      setPuzzle(name);
      setDesc(description);
    },
    [setPuzzle, setDesc],
  );

  const PuzzleComponent = puzzleComponents[puzzle];

  return (
    <div className="flex w-full justify-between overflow-hidden">
      <Suspense>
        <VictoryDialogue
          victoryDialogue={victoryDialogue}
          puzzleSession={puzzleSession}
        />
      </Suspense>
      <DndContext onDragEnd={onDragEnd}>
        <div className="flex w-full flex-col items-center">
          <div className="flex space-x-7">
            {puzzleTransitions.map(({ name, description, label }) => (
              <Button
                key={label}
                onClick={() => handlePuzzleTransition(name, description)}
              >
                {label}
              </Button>
            ))}
          </div>
          {PuzzleComponent && <PuzzleComponent sessionId={sessionId} />}
        </div>
        <div
          className={cn(
            "flex h-[calc(100vh-48px)] w-96 flex-col border-l bg-secondary",
          )}
        >
          <div className="flex h-12 w-full justify-between border-b">
            {sidebarNavItems.map((navItem) => (
              <SidebarNavItem
                key={navItem.sideBarEnum}
                {...navItem}
                setSidebar={setSidebar}
              />
            ))}
          </div>
          {sideBar === SideBarEnums.CHAT && (
            <Messages
              id={sessionId}
              chatMessages={chatMessages}
              username={username}
            />
          )}
          {sideBar === SideBarEnums.DESCRIPTION && <Description />}
          {sideBar === SideBarEnums.INVENTORY && <Inventory id={sessionId} />}
        </div>
      </DndContext>
    </div>
  );
}
