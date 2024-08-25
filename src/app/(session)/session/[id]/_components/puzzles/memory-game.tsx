"use client";

import { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { PuzzleEnums } from "../../_types";

export default function MemoryGame() {
  const { setNodeRef } = useDroppable({
    id: PuzzleEnums.SOUNDSTONES,
  });
  const solution = ["A4", "A4", "C2", "C2", "A4"];
  const checkOrderWithSolution = (stone: string) => {
    const checking = [...stoneOrder, stone];
    if (solution[checking.length - 1] === checking[checking.length - 1]) {
      console.log(checking);
      if (solution.length === checking.length) {
        setStoneOrder([]);
        console.log("YOU WIN YIPPEE");
      }
      return;
    } else {
      console.log([]);
      setStoneOrder([]);
    }
  };
  type TouchStoneProps = {
    stone: string;
  };
  const [stoneOrder, setStoneOrder] = useState<string[]>([]);
  const touchStone = ({ stone }: TouchStoneProps) => {
    setStoneOrder([...stoneOrder, stone]);
    const audio = new Audio(`/audio/GrandPiano-${stone}-mf.wav`);
    audio.play();
    setTimeout(() => {
      audio.pause();
    }, 2000);
    checkOrderWithSolution(stone);
  };

  return (
    <div
      className="relative mx-auto flex h-64 w-64 justify-center"
      ref={setNodeRef}
    >
      <div className="absolute left-1/2 top-0 -translate-x-1/2 transform">
        <button
          onClick={() => touchStone({ stone: "A4" })}
          className="mushroom h-12 w-12 rounded-full bg-green-500"
        ></button>
      </div>
      <div className="absolute left-full top-1/4 -translate-x-1/2 transform">
        <button
          onClick={() => touchStone({ stone: "C2" })}
          className="mushroom h-12 w-12 rounded-full bg-green-500"
        ></button>
      </div>
      <div className="absolute left-full top-1/2 -translate-x-1/2 transform">
        <button className="mushroom h-12 w-12 rounded-full bg-green-500"></button>
      </div>
      <div className="absolute left-full top-3/4 -translate-x-1/2 transform">
        <button className="mushroom h-12 w-12 rounded-full bg-green-500"></button>
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 transform">
        <button className="mushroom h-12 w-12 rounded-full bg-green-500"></button>
      </div>
      <div className="absolute right-full top-3/4 translate-x-1/2 transform">
        <button className="mushroom h-12 w-12 rounded-full bg-green-500"></button>
      </div>
      <div className="absolute right-full top-1/2 translate-x-1/2 transform">
        <button className="mushroom h-12 w-12 rounded-full bg-green-500"></button>
      </div>
      <div className="absolute right-full top-1/4 translate-x-1/2 transform">
        <button className="mushroom h-12 w-12 rounded-full bg-green-500"></button>
      </div>
    </div>
  );
}
