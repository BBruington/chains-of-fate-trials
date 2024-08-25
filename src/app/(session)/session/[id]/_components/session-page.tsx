"use client";
import Inventory from "./sidebar/inventory";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useState } from "react";
import {
  MessageSquare,
  Backpack,
  LucideMessageCircleQuestion,
} from "lucide-react";
import Messages from "./sidebar/messages";
import { Button } from "@/components/ui/button";
import {
  SessionPageProps,
  SideBarEnums,
  PuzzleEnums,
  PuzzleSideBarItem,
  InventoryItemEnums,
} from "../_types";
import SidebarNavItem from "./sidebar/sidebar-nav-item";
import Description from "./sidebar/description";
import { useAtom } from "jotai";
import { puzzleDescription, inventoryItems } from "../jotaiAtoms";
import MemoryGame from "./puzzles/memory-game";
import DoorPuzzle from "./puzzles/door-puzzle";

export default function SessionPage({
  sessionId,
  chatMessages,
  username,
}: SessionPageProps) {
  const sidebarNavItems: PuzzleSideBarItem[] = [
    { sideBarEnum: SideBarEnums.CHAT, Icon: MessageSquare },
    {
      sideBarEnum: SideBarEnums.INVENTORY,
      Icon: Backpack,
      className: "border-x",
    },
    {
      sideBarEnum: SideBarEnums.DESCRIPTION,
      Icon: LucideMessageCircleQuestion,
    },
  ];
  const [desc, setDesc] = useAtom(puzzleDescription);
  const [invItems, setInvItems] = useAtom(inventoryItems);
  const [sideBar, setSidebar] = useState<SideBarEnums>(SideBarEnums.CHAT);
  const [puzzle, setPuzzle] = useState<PuzzleEnums>(PuzzleEnums.DOOR);
  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    console.log(active, over);
    switch (over?.id) {
      case PuzzleEnums.DOOR:
        if (active.id === "DOORKEY") {
          setPuzzle(PuzzleEnums.SOUNDSTONES);
          console.log("you make it through the door");
        } else {
          console.log("that doesnt do anything");
        }
        break;
      case PuzzleEnums.SOUNDSTONES:
        if (active.id === "SCROLL") {
          console.log("the scroll shines revealing a secret note");
          setInvItems({
            ...invItems,
            SCROLL: {
              name: InventoryItemEnums.MAGICSCROLL,
              image: invItems.SCROLL.image,
            },
          });
        }
        console.log("you make it to the stones");
        break;
      default:
        console.log("nothing happens");
        break;
    }
  };

  const handlePuzzleTransition = (name: PuzzleEnums, description: string) => {
    setPuzzle(name);
    setDesc(description);
  };

  return (
    <div className="flex w-full justify-between">
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex w-[calc(100vw-256px)] flex-col items-center">
          <div className="flex space-x-7">
            <Button
              onClick={() =>
                handlePuzzleTransition(
                  PuzzleEnums.SOUNDSTONES,
                  "STONE DESCRIPTION",
                )
              }
            >
              The Stones
            </Button>
            <Button
              onClick={() =>
                handlePuzzleTransition(PuzzleEnums.DOOR, "DOOR DESCRIPTION")
              }
            >
              The Door
            </Button>
            <Button
              onClick={() =>
                handlePuzzleTransition(
                  PuzzleEnums.SOUNDSTONES,
                  "HAVENT DONE THIS ONE",
                )
              }
            >
              Example Area to Solve
            </Button>
          </div>
          {puzzle === PuzzleEnums.DOOR && <DoorPuzzle />}
          {puzzle === PuzzleEnums.SOUNDSTONES && <MemoryGame />}
        </div>
        <div className="flex h-full w-96 flex-col border-l bg-secondary">
          <div className="flex h-12 w-full justify-between border-b">
            {sidebarNavItems.map((navItem) => (
              <SidebarNavItem
                key={navItem.sideBarEnum}
                Icon={navItem.Icon}
                sideBarEnum={navItem.sideBarEnum}
                setSidebar={setSidebar}
                className={navItem.className}
              />
            ))}
          </div>
          {sideBar === SideBarEnums.CHAT && (
            <Messages
              id={sessionId}
              chatMessages={chatMessages}
              username={username || ""}
            />
          )}
          {sideBar === SideBarEnums.DESCRIPTION && <Description />}
          {sideBar === SideBarEnums.INVENTORY && <Inventory />}
        </div>
      </DndContext>
    </div>
  );
}
