"use client";
import { PuzzleChatMessage } from "@prisma/client";
import Inventory from "./inventory";
import MemoryGame from "./memory-game";
import { DndContext, DragEndEvent, DragOverlay } from "@dnd-kit/core";
import { useState } from "react";
import Messages from "./messages";
import DoorPuzzle from "./door-puzzle";

type SessionPageProps = {
  sessionId: string;
  chatMessages: PuzzleChatMessage[];
  username: string;
};
export enum SideBarEnums {
  CHAT = "CHAT",
  INVENTORY = "INVENTORY",
}
export enum PuzzleEnums {
  DOOR = "DOOR",
  SOUNDSTONES = "SOUNDSTONES",
}

export default function SessionPage({
  sessionId,
  chatMessages,
  username,
}: SessionPageProps) {
  const [sideBar, setSidebar] = useState<SideBarEnums>(SideBarEnums.CHAT);
  const [puzzle, setPuzzle] = useState<PuzzleEnums>(PuzzleEnums.DOOR);
  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    console.log(active, over);
    switch (over!.id) {
      case PuzzleEnums.DOOR:
        if (active.id === "DOORKEY") {
          setPuzzle(PuzzleEnums.SOUNDSTONES);
          console.log("you make it through the door");
        } else {
          console.log("that doesnt do anything");
        }
        break;
      case PuzzleEnums.SOUNDSTONES:
        console.log("you make it to the stones");
        break;
    }
  };

  return (
    <div className="flex w-full justify-between">
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex w-[calc(100vw-256px)] justify-center">
          {puzzle === PuzzleEnums.DOOR && <DoorPuzzle />}
          {puzzle === PuzzleEnums.SOUNDSTONES && <MemoryGame />}
        </div>
        <div className="flex h-full w-96 flex-col bg-secondary">
          <div className="flex space-x-5">
            <button onClick={() => setSidebar(SideBarEnums.CHAT)}>chat</button>
            <button onClick={() => setSidebar(SideBarEnums.INVENTORY)}>
              inventory
            </button>
          </div>
          {sideBar === SideBarEnums.CHAT && (
            <Messages
              id={sessionId}
              chatMessages={chatMessages}
              username={username || ""}
            />
          )}
          {sideBar === SideBarEnums.INVENTORY && <Inventory />}
        </div>
      </DndContext>
    </div>
  );
}
