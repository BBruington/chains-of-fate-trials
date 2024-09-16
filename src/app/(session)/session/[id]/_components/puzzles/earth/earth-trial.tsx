import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { MetalType, PuzzleEnums } from "@/app/(session)/session/[id]/_types";
import useEarthPuzzle from "./useEarthPuzzle";
import MetalListItem from "./metal-list-item";
import Cheatsheet from "./cheat-sheet";
import { useAtom } from "jotai";
import { rareMetals } from "../../../jotaiAtoms";
import { EMPTY_METAL_MIXTURE, ALL_METALS } from "../../../_constants";

export default function EarthPuzzle({sessionId}: {sessionId: string}) {
  
  const { addMetal, craftMetal, lastCrafted, mixture, rareMetalsState } = useEarthPuzzle({
    sessionId
  });

  const { setNodeRef } = useDroppable({
    id: PuzzleEnums.EARTH,
  });

  return (
    <div ref={setNodeRef} className="flex flex-col items-center">
      <div className="h-38 m-5 flex w-[550px] flex-col items-center border">
        <Cheatsheet />
      </div>
      <div className="grid grid-cols-5">
        {Object.values(ALL_METALS).map((metal, index) => (
          <div
            key={index}
            className={cn("h-32 w-44", metal.rarity === "rare" && "hidden")}
          >
            <MetalListItem addMetal={addMetal} metal={metal} />
          </div>
        ))}
      </div>

      <div className="m-5 flex justify-center space-x-5">
        {mixture.map((metal, index) => (
          <div
            key={index}
            className="flex h-32 w-32 items-center justify-center border"
          >
            {metal.name}{" "}
          </div>
        ))}
      </div>
      <div className="flex items-center">
        <div className="flex flex-col items-center space-y-3 p-5">
          <Button onClick={craftMetal} className="w-48">
            Mix
          </Button>
          <div>{lastCrafted}</div>
        </div>
        <div className="space-y-2">
          <h2>Required Metals: </h2>
          {rareMetalsState.map((metal, index) => (
            <div className={cn("w-42 flex justify-between")} key={index}>
              {metal.name}
              <Button
                disabled={metal.hidden === true}
                className="ml-4 h-6"
                onClick={() => addMetal(metal.name as keyof typeof ALL_METALS)}
              >
                Add
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}