"use client";
import { useDroppable } from "@dnd-kit/core";
import { Toggle } from "@/components/ui/toggle";
import { PuzzleEnums } from "../../../_types/index";
import { useState, useRef, useCallback } from "react";
import { runes } from "../../../_constants/puzzle-constants";

const correct = ["spark", "flicker", "flame", "blaze", "embers", "ashes"];
export default function FirePuzzle() {
  const [runeState, setRuneState] = useState(runes);
  const solutionRef = useRef<string[]>([]);
  const resetRunes = () => {
    setRuneState(
      runeState.map((rune) => {
        return { label: rune.label, symbol: rune.symbol, isActivated: false };
      }),
    );
    solutionRef.current = [];
  };
  const activateRune = useCallback(
    (label: string) => {
      setRuneState(
        runeState.map((rune) => {
          if (rune.label === label) {
            return {
              label,
              symbol: rune.symbol,
              isActivated: true,
            };
          }
          return rune;
        }),
      );
      solutionRef.current.push(label);
      console.log(solutionRef);
      if (solutionRef.current.length === 6) {
        for (let i = 0; i < 6; i++) {
          if (solutionRef.current[i] !== correct[i]) {
            resetRunes();
            console.log("FAILED");
            return "YA WRONG KID";
          }
        }
        console.log("GOOD JOB CHAMP");
        return "yippeeeee";
      }
    },
    [runeState, solutionRef],
  );
  const { setNodeRef } = useDroppable({
    id: PuzzleEnums.FIRE,
  });
  return (
    <div
      ref={setNodeRef}
      className={`ml-10 mt-20 grid h-full w-full grid-cols-3`}
    >
      {runeState.map((rune) => (
        <Rune key={rune.label} activateRune={activateRune} rune={rune} />
      ))}
    </div>
  );
}
type Rune = {
  label: string;
  isActivated: boolean;
  symbol: string;
};
type RuneProps = {
  activateRune: (label: string) => void;
  rune: Rune;
};
function Rune({ rune, activateRune }: RuneProps) {
  return (
    <Toggle
      onClick={() => activateRune(rune.label)}
      disabled={rune.isActivated}
      pressed={rune.isActivated}
      className={
        "mx-10 flex h-48 w-48 cursor-pointer items-center justify-center rounded-full bg-slate-500 p-6 text-2xl font-semibold text-blue-400 shadow-lg shadow-blue-400 transition-transform duration-500 ease-in-out hover:scale-110 hover:animate-pulse hover:text-orange-300 hover:shadow-orange-300 data-[state=on]:bg-red-700 data-[state=on]:text-orange-500 data-[state=on]:shadow-orange-500"
      }
    >
      <span style={{ fontSize: 120 }}>{rune.symbol}</span>
    </Toggle>
  );
}
