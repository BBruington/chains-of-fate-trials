"use client";
import { useDroppable } from "@dnd-kit/core";
import { Toggle } from "@/components/ui/toggle";
import { PuzzleEnums } from "../../../_types/index";
import { useState, useRef, useCallback } from "react";
import { runes } from "../../../_constants/puzzle-constants";
import { useAtom } from "jotai";
import { inventoryItems } from "../../../jotaiAtoms";

const correct = ["birth", "flight", "hope", "decay", "perseverance", "rebirth"];
export default function FirePuzzle() {
  const [runeState, setRuneState] = useState(runes);
  const [inventory, setInventory] = useAtom(inventoryItems);
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
        setInventory(
          inventory.map((item) => {
            if (item.name.toUpperCase() === "FIREGEM") {
              return {
                ...item,
                hidden: false,
              };
            }
            return item;
          }),
        );
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
      className={`flex flex-col justify-center 2xl:flex-row h-full w-full items-center 2xl:justify-around`}
    >
      <div className="grid 2xl:w-1/2 space-x-10 grid-cols-3">
        {runeState.map((rune) => (
          <Rune key={rune.label} activateRune={activateRune} rune={rune} />
        ))}
      </div>
      <div className="mr-5 flex flex-col space-y-3 rounded-md border p-3 text-lg">
        <p>
          Determined and fulfilled, a mother takes{" "}
          <span className="text-orange-300">𑢾</span>.
        </p>
        <p>
          Tireless <span className="text-orange-300">𑣢</span> courses from wing
          to talon.{" "}
        </p>
        <p>
          Future chicks, soon to be <span className="text-orange-300">𑢶</span>,
          longing for their mother.
        </p>
        <p>
          She carries the <span className="text-orange-300">𑣓</span> of a
          generation.
        </p>
        <p>
          For when the day she is to wither and{" "}
          <span className="text-orange-300">𑣜</span>,{" "}
        </p>
        <p>
          Her children may continue the cycle of{" "}
          <span className="text-orange-300">𑣚</span> again.{" "}
        </p>
      </div>
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
        "m-10 mt-0 flex h-48 w-48 cursor-pointer items-center justify-center rounded-full bg-slate-500 p-6 text-2xl font-semibold text-blue-400 shadow-lg shadow-blue-400 transition-transform duration-500 ease-in-out hover:scale-110 hover:animate-pulse hover:text-orange-300 hover:shadow-orange-300 data-[state=on]:bg-red-700 data-[state=on]:text-orange-500 data-[state=on]:shadow-orange-500"
      }
    >
      <span style={{ fontSize: 120 }}>{rune.symbol}</span>
    </Toggle>
  );
}
