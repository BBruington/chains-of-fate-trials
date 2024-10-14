import { useAtom } from "jotai";
import { useCallback, useRef, useState } from "react";
import { runes } from "../../../_constants";
import { inventoryItems } from "../../../jotaiAtoms";
import { revealInventoryItem } from "../../../_hooks/hooks";

export default function useFirePuzzle({ sessionId }: { sessionId: string }) {
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
      if (solutionRef.current.length === 6) {
        for (let i = 0; i < solutionRef.current.length; i++) {
          if (solutionRef.current[i] !== correct[i]) {
            resetRunes();
          }
        }
        if (solutionRef.current.length === 6)
          revealInventoryItem(sessionId, "firegem", inventory, setInventory);
      }
    },
    [runeState, solutionRef],
  );

  return { runeState, activateRune };
}
