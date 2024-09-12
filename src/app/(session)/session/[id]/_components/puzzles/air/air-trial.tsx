"use client";

import { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { PuzzleEnums } from "../../../_types";

const SOLUTION = ["A4", "A4", "C2", "C2", "A4"];

const STONE_POSITIONS = [
  { className: "top-0 left-1/2 -translate-x-1/2", stone: "a4" },
  { className: "top-1/4 left-full -translate-x-1/2", stone: "c4" },
  { className: "top-3/4 left-full -translate-x-1/2", stone: "d4" },
  { className: "bottom-0 left-1/2 -translate-x-1/2", stone: "e4" },
  { className: "top-3/4 right-full translate-x-1/2", stone: "f4" },
  { className: "top-1/4 right-full translate-x-1/2", stone: "g4" },
];

export default function AirPuzzle() {
  const { setNodeRef } = useDroppable({
    id: PuzzleEnums.SOUNDSTONES,
  });
  const [stoneOrder, setStoneOrder] = useState<string[]>([]);

  const checkSolution = (stone: string) => {
    const newOrder = [...stoneOrder, stone];
    if (SOLUTION[newOrder.length - 1] === newOrder[newOrder.length - 1]) {
      console.log(newOrder);
      if (SOLUTION.length === newOrder.length) {
        console.log("YOU WIN YIPPEE");
        setStoneOrder([]);
      } else {
        setStoneOrder(newOrder);
      }
    } else {
      setStoneOrder([]);
    }
  };
  const touchStone = (stone: string) => {
    const audio = new Audio(`/audio/flute-${stone}.wav`);
    audio.currentTime += 4;
    audio.volume -= 0.5;
    audio.play();
    setTimeout(() => {
      audio.pause();
    }, 1500);
    checkSolution(stone);
  };

  return (
    <div
      className="relative mx-auto flex h-64 w-64 justify-center"
      ref={setNodeRef}
    >
      {STONE_POSITIONS.map((pos, index) => (
        <div
          key={index}
          className={cn(
            "absolute",
            pos.className,
            pos.stone && "cursor-pointer hover:opacity-80",
          )}
        >
          <button
            onClick={() => pos.stone && touchStone(pos.stone)}
            className={cn(
              "mushroom h-12 w-12 rounded-full bg-green-500",
              !pos.stone && "cursor-not-allowed opacity-50",
            )}
            disabled={!pos.stone}
          />
        </div>
      ))}
    </div>
  );
}
