"use client";
import { InventoryItemEnums, MetalType } from "../../../_types";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { useAtom } from "jotai";
import { inventoryItems, rareMetals } from "../../../jotaiAtoms";
import { ALL_METALS, EMPTY_METAL_MIXTURE } from "../../../_constants";
import { revealInventoryItem } from "../../../_hooks/hooks";

type UseEarthPuzzleProps = {
  sessionId: string
};

export default function useEarthPuzzle({sessionId
}: UseEarthPuzzleProps) {
  const [inventory, setInventory] = useAtom(inventoryItems);
  const [rareMetalsState, setRareMetalsState] = useAtom(rareMetals);
  const [mixture, setMixture] = useState<MetalType[]>(EMPTY_METAL_MIXTURE);
  const [lastCrafted, setLastCrafted] = useState<string | undefined>();


  const addMetal = useCallback(
    (newMetal: keyof typeof ALL_METALS) => {
      const emptyMixtureIndex = mixture.findIndex(
        (metal) => metal.name === "Empty",
      );
      if (emptyMixtureIndex === -1) return;
      const updatedMixture = mixture.map((otherMetals, index) => {
        if (index === emptyMixtureIndex) {
          return ALL_METALS[newMetal];
        }
        return otherMetals;
      });
      setMixture(updatedMixture);
    },
    [mixture, setMixture],
  );
  const craftMetal = useCallback(() => {
    const metalAttributes = mixture.reduce((metalSum, currentMetal) => {
      return {
        name: "",
        rarity: "",
        hiddenValue: undefined,
        hardness: metalSum.hardness + currentMetal.hardness,
        magicAffinity: metalSum.magicAffinity + currentMetal.magicAffinity,
        purity: metalSum.purity + currentMetal.purity,
      };
    });
    const foundMetal = Object.values(ALL_METALS).find(
      (metal) =>
        metal.hardness === metalAttributes.hardness &&
        metal.magicAffinity === metalAttributes.magicAffinity &&
        metal.purity === metalAttributes.purity,
    );
    const neededMetals = [
      'ADAMANT',
      'COLDIRON',
      'MITHRIL',
    ];
    if (foundMetal) {
      setLastCrafted(`${foundMetal.name} Crafted!`);
    } else {
      setLastCrafted("Your Craft Failed!");
    }
    if (
      neededMetals.find((metal) => metal === foundMetal?.name.toUpperCase())
    ) {
      setRareMetalsState(
        rareMetalsState.map((metal) => {
          if (metal.name.toUpperCase() === foundMetal?.name.toUpperCase()) {
            return {
              ...metal,
              hidden: false,
            };
          }
          return metal;
        }),
      );
    }

    if (foundMetal?.name === "earthgem") {
      revealInventoryItem(sessionId, 'earthgem', inventory, setInventory);
    }
    setMixture(EMPTY_METAL_MIXTURE);
  }, [setLastCrafted, mixture, setMixture]);

  return { craftMetal, addMetal, lastCrafted, mixture, rareMetalsState  };
}
