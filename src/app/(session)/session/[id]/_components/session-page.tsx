"use client";
import Inventory from "./sidebar/inventory";
import { DndContext } from "@dnd-kit/core";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import "../_styles/shiney.scss";
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
import { Toggle } from "@/components/ui/toggle";
import { Music2Icon } from "lucide-react";
import TrialButton from "./trial-button";

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
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const toggleAudio = (isPressed: boolean) => {
    if (audioRef.current) {
      if (isPressed) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  };
  useEffect(() => {
    audioRef.current = new Audio("/audio/background-music.mp3");
    audioRef.current.volume = 0.3;
    audioRef.current.loop = true;
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
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
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
          <div className="grid grid-cols-3 p-2 items-center">
            {puzzleTransitions.map(({ name, description, label }) => (
              <TrialButton
                key={name}
                label={label}
                handlePuzzleTransition={handlePuzzleTransition}
                description={description}
                name={name}
              />
            ))}
            <Toggle
              className="m-5 border-2 h-14 data-[state=on]:border-red-700 data-[state=on]:bg-red-600 data-[state=on]:text-accent-foreground"
              value={audioRef.current === null ? "off" : "on"}
              onPressedChange={toggleAudio}
            >
              <Music2Icon />
            </Toggle>
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
