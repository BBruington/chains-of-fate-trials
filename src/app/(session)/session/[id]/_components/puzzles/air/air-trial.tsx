"use client";

import { KeyboardEvent, useEffect, useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { PuzzleEnums } from "../../../_types";
import { Button } from "@/components/ui/button";

const initialGrid = [
  [0, 1, 0, 0, 0, 0],
  [0, 1, 0, 1, 1, 0],
  [0, 0, 0, 0, 1, 0],
  [1, 1, 1, 0, 1, 0],
  [3, 0, 0, 2, 2, 0],
  [1, 1, 1, 0, 1, 1],
];

type GridPiece = {
  name: string;
  validMove: boolean;
};
const empty: GridPiece = {
  name: "empty",
  validMove: true,
};
const blocked: GridPiece = {
  name: "blocked",
  validMove: false,
};
const push: GridPiece = {
  name: "push",
  validMove: true,
};
const goal: GridPiece = {
  name: "goal",
  validMove: true,
};
const entireMap: Record<number, GridPiece> = {
  0: empty,
  1: blocked,
  2: push,
  3: goal,
};

export default function AirPuzzle() {
  const { setNodeRef } = useDroppable({
    id: PuzzleEnums.AIR,
  });

  const [playerPosition, setPlayerPosition] = useState({ x: 4, y: 5 });
  const [grid, setGrid] = useState(initialGrid);
  const columns = grid[0].length;
  const rows = grid.length;
  const isInvalidMove = (dx: number, dy: number) => {
    if (dx < 0 || dx === rows || dy === columns || dy < 0) {
      return true;
    }
    if (isRock(dx, dy)) {
      return true;
    }

    return false;
  };
  const isRock = (dx: number, dy: number) => {
    if (initialGrid[dx][dy] === 1) {
      return true;
    }
    return false;
  };
  const movePlayer = (dx: number, dy: number) => {
    const newX = playerPosition.x + dx;
    const newY = playerPosition.y + dy;
    if (isInvalidMove(newX, newY)) {
      return;
    }
    if (initialGrid[newX][newY] === 2) {
      if (
        isInvalidMove(newX + dx, newY + dy) ||
        grid[newX + dx][newY + dy] !== 0
      ) {
        return;
      }
      const gridRef = grid;
      gridRef[newX][newY] = 0;
      gridRef[newX + dx][newY + dy] = 2;
      setGrid(gridRef);
    }
    setPlayerPosition({ x: newX, y: newY });
    // Check if player reaches the goal
    if (initialGrid[newX][newY] === 3) {
      alert("You reached the goal!");
    }
    // }
  };

  return (
    <div
      className="relative mx-auto flex h-64 w-64 flex-col items-center justify-center"
      ref={setNodeRef}
    >
      <div className="my-10 mt-32 flex space-x-3">
        <Button onClick={() => movePlayer(-1, 0)}>up</Button>
        <Button onClick={() => movePlayer(0, 1)}>right</Button>
        <Button onClick={() => movePlayer(1, 0)}>down</Button>
        <Button onClick={() => movePlayer(0, -1)}>left</Button>
      </div>
      <div className="flex flex-col">
        {grid.map((row, rowIndex) => (
          <GridRow
            key={rowIndex}
            row={row}
            rowIndex={rowIndex}
            playerPosition={playerPosition}
          />
        ))}
      </div>
    </div>
  );
}

function GridRow({
  row,
  rowIndex,
  playerPosition,
}: {
  row: number[];
  rowIndex: number;
  playerPosition: { x: number; y: number };
}) {
  return (
    <div className="grid grid-cols-6 gap-1">
      {row.map((grid, colIndex) => (
        <Grid
          key={colIndex}
          grid={entireMap[grid]}
          rowIndex={rowIndex}
          colIndex={colIndex}
          playerPosition={playerPosition}
        />
      ))}
    </div>
  );
}

function Grid({
  grid,
  rowIndex,
  colIndex,
  playerPosition,
}: {
  grid: GridPiece;
  rowIndex: number;
  colIndex: number;
  playerPosition: { x: number; y: number };
}) {
  return (
    <div className="flex h-12 w-12 items-center justify-center border border-black bg-slate-400">
      {!grid.validMove && <div className="h-full w-full bg-slate-900"></div>}
      {rowIndex === playerPosition.x && colIndex === playerPosition.y && (
        <div className="h-8 w-8 rounded-full bg-blue-500"></div>
      )}
      {grid.name === "push" && <div className="z-10 h-8 w-8 bg-green-300" />}
      {grid.name === "goal" && (
        <div className="h-8 w-8 rounded-full text-center text-2xl text-black">
          G
        </div>
      )}
    </div>
  );
}
