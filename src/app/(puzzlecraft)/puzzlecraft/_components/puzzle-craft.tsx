"use client";
import CraftMaze from "./craft-maze";
import { PuzzleCraftEnums } from "../types";
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import { puzzle } from "../../jotaiAtoms";
import type { $Enums } from "@prisma/client";

type CraftPuzzleProperties = {
  userPuzzles: {
    clerkId: string;
    MazePuzzle: ({
      enemies: {
        id: string;
        puzzleId: string;
        x: number;
        y: number;
        direction: $Enums.Direction;
      }[];
    } & {
      id: string;
      playerX: number;
      playerY: number;
      rows: number;
      columns: number;
      grid: number[];
      createdAt: Date;
      userId: string;
    })[];
  };
};

export default function PuzzleCraft({ userPuzzles }: CraftPuzzleProperties) {
  const PuzzleComponents = {
    [PuzzleCraftEnums.EMPTY]: <></>,
    [PuzzleCraftEnums.MAZE]: (
      <CraftMaze
        MazePuzzle={userPuzzles.MazePuzzle}
        clerkId={userPuzzles.clerkId}
      />
    ),
  };

  const [puzzleAtom, setPuzzle] = useAtom(puzzle);

  return (
    <div className="flex h-[calc(100vh-48px)] min-h-[calc(100vh-48px)] flex-col">
      <div className="flex w-full flex-col bg-secondary">
        <h1 className="self-center">Select a Puzzle to Build</h1>
        {Object.keys(PuzzleComponents).map((puzzleName) => (
          <div
            key={puzzleName}
            className="flex w-full justify-center space-x-3"
          >
            {puzzleName !== "EMPTY" && (
              <Button
                className="w-32"
                key={puzzleName}
                onClick={() => setPuzzle(puzzleName)}
              >
                {puzzleName}
              </Button>
            )}
          </div>
        ))}
      </div>
      {PuzzleComponents[puzzleAtom as keyof typeof PuzzleComponents]}
    </div>
  );
}
