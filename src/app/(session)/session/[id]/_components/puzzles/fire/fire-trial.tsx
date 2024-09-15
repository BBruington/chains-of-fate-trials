"use client";
import { useDroppable } from "@dnd-kit/core";
import { PuzzleEnums } from "../../../_types/index";
import useFirePuzzle from "./useFirePuzzle";
import PuzzleVerse from "./puzzle-verse";
import Rune from "./rune";

export default function FirePuzzle({sessionId}: {sessionId: string}) {
  const { runeState, activateRune } = useFirePuzzle({sessionId});

  const { setNodeRef } = useDroppable({
    id: PuzzleEnums.FIRE,
  });
  return (
    <div
      ref={setNodeRef}
      className={`flex h-full w-full flex-col items-center justify-center 2xl:flex-row 2xl:justify-around`}
    >
      <div className="grid grid-cols-3 space-x-10 2xl:w-1/2">
        {runeState.map((rune) => (
          <Rune key={rune.label} activateRune={activateRune} rune={rune} />
        ))}
      </div>
      <PuzzleVerse />
    </div>
  );
}
