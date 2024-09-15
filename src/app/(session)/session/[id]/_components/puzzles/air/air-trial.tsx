"use client";

import { useEffect, useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { GridPiece, PuzzleEnums } from "../../../_types";
import { Button } from "@/components/ui/button";
import useAirPuzzle from "./useAirPuzzle";
import GridRow from "./grid";

export default function AirPuzzle() {
  const { setNodeRef } = useDroppable({
    id: PuzzleEnums.AIR,
  });

  const { grid, movePlayer, reset, playerPosition, MAP_TILE } = useAirPuzzle();

  return (
    <div
      className="relative mx-auto flex flex-col items-center justify-center"
      ref={setNodeRef}
    >
      <div className="my-10 flex space-x-3">
        <Button onClick={() => movePlayer(-1, 0)}>W</Button>
        <Button onClick={() => movePlayer(1, 0)}>S</Button>
        <Button onClick={() => movePlayer(0, 1)}>D</Button>
        <Button onClick={() => movePlayer(0, -1)}>A</Button>
        <Button onClick={reset}>Reset</Button>
      </div>
      <div className="flex flex-col">
        {grid.map((row, rowIndex) => (
          <GridRow
            key={rowIndex}
            row={row}
            rowIndex={rowIndex}
            MAP_TILE={MAP_TILE}
            playerPosition={playerPosition}
          />
        ))}
      </div>
    </div>
  );
}
