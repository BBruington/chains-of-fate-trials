"use client";
import CraftMaze from "./craft-maze";
import { PuzzleCraftEnums } from "../types";
import { MazePuzzle } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import { puzzle } from "../../jotaiAtoms";

type CraftPuzzleProperties = {
  userPuzzles: {
    clerkId: string;
    MazePuzzle: MazePuzzle[];
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
    <div>
      <h1>Select a Puzzle to Build</h1>
      {Object.keys(PuzzleComponents).map((puzzleName) => (
        <>
          {puzzleName !== "EMPTY" && (
            <Button key={puzzleName} onClick={() => setPuzzle(puzzleName)}>
              {puzzleName}
            </Button>
          )}
        </>
      ))}
      {PuzzleComponents[puzzleAtom as keyof typeof PuzzleComponents]}
    </div>
  );
}
