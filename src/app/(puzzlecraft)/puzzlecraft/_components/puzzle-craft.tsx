"use client";
import CraftMaze from "./craft-maze";
import { Maze, PuzzleCraftEnums } from "../types";
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import { puzzle } from "../../jotaiAtoms";

type CraftPuzzleProperties = {
  userPuzzles: {
    clerkId: string;
    MazeSessions: ({
      Mazes: Maze[];
    } & {
      id: string;
      userId: string;
      title: string;
    })[];
    MazePuzzle: Maze[];
  };
};

export default function PuzzleCraft({ userPuzzles }: CraftPuzzleProperties) {
  const PuzzleComponents = {
    [PuzzleCraftEnums.EMPTY]: <></>,
    [PuzzleCraftEnums.MAZE]: (
      <CraftMaze
        MazePuzzle={userPuzzles.MazePuzzle}
        MazeSessions={userPuzzles.MazeSessions}
        clerkId={userPuzzles.clerkId}
      />
    ),
  };

  const [puzzleAtom, setPuzzleAtom] = useAtom(puzzle);

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
                onClick={() => setPuzzleAtom(puzzleName)}
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
