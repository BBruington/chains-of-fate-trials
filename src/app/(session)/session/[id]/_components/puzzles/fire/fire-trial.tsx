"use client";
import { useDroppable } from "@dnd-kit/core";
import { Toggle } from "@/components/ui/toggle";
import { PuzzleEnums } from "../../../_types/index";
import { useState } from "react";

const runes = [
  {
    label: "spark",
    isActivated: false,
  },
  {
    label: "flicker",
    isActivated: false,
  },
  {
    label: "flame",
    isActivated: false,
  },
  {
    label: "blaze",
    isActivated: false,
  },
  {
    label: "embers",
    isActivated: false,
  },
  {
    label: "ashes",
    isActivated: false,
  },
];
const correct = ["spark", "flicker", "flame", "blaze", "embers", "ashes"];

export default function FirePuzzle() {
  const [runeState, setRuneState] = useState(runes);
  const [solution, setSolution] = useState<string[]>([]);
  const resetRunes = () => {
    setRuneState(
      runeState.map((rune) => {
        return { label: rune.label, isActivated: false };
      }),
    );
    setSolution([])
  }
  const activateRune = (label: string) => {
    setRuneState(
      runeState.map((rune) => {
        if (rune.label === label) {
          return {
            label,
            isActivated: true,
          };
        }
        return rune;
      }),
    );
    solution.push(label)
    console.log(solution)
    if (solution.length === 6) {
      for (let i = 0; i < 6; i++) {
        if (solution[i] !== correct[i]) {
          resetRunes()
          console.log('FAILED')
          return "YA WRONG KID";
        }
        console.log('GOOD JOB CHAMP')
        return 'yippeeeee'
      }
    }
  };
  const { setNodeRef } = useDroppable({
    id: PuzzleEnums.FIRE,
  });
  return (
    <div ref={setNodeRef} className="ml-5 mt-10 h-full w-full">
      {runeState.map((rune) => (
        <Rune key={rune.label} activateRune={activateRune} rune={rune} />
      ))}
    </div>
  );
}
type Rune = {
  label: string;
  isActivated: boolean;
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
      className="mx-10 flex h-24 w-24 cursor-pointer items-center justify-center rounded-full p-6 text-2xl font-semibold text-blue-400 shadow-lg shadow-blue-400 transition-transform duration-500 ease-in-out hover:scale-110 hover:animate-pulse hover:text-orange-300 hover:shadow-orange-300 data-[state=on]:bg-red-700 data-[state=on]:text-orange-500 data-[state=on]:shadow-orange-500"
    >
      {rune.label}
    </Toggle>
  );
}
