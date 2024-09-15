import { useAtom } from "jotai";
import React, { useCallback, useRef, useState } from "react";
import { runes } from "../../../_constants";
import { inventoryItems } from "../../../jotaiAtoms";
import { revealInventoryItem } from "../../../_hooks/hooks";
import { InventoryItemEnums } from "../../../_types";

export default function useFirePuzzle() {
  const [runeState, setRuneState] = useState(runes);
  const [inventory, setInventory] = useAtom(inventoryItems);
  const correct = [
    "birth",
    "flight",
    "hope",
    "decay",
    "perseverance",
    "rebirth",
  ];
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
        revealInventoryItem(
          InventoryItemEnums.FIREGEM,
          inventory,
          setInventory,
        );
        return "yippeeeee";
      }
    },
    [runeState, solutionRef],
  );

  return { runeState, activateRune };
}
