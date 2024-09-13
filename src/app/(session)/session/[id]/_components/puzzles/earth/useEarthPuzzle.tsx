"use client";
import {
  allMetals,
  EMPTY_METAL_MIXTURE,
} from "@/app/(session)/session/[id]/_constants/earth-constants";
import { InventoryItemEnums, MetalType } from "../../../_types";
import { Dispatch, SetStateAction, useCallback } from "react";
import { useAtom } from "jotai";
import { inventoryItems, rareMetals } from "../../../jotaiAtoms";

type UseEarthPuzzleProps = {
  mixture: MetalType[];
  setMixture: Dispatch<SetStateAction<MetalType[]>>;
  setLastCrafted?: Dispatch<SetStateAction<string | undefined>>;
};

export default function useEarthPuzzle({
  mixture,
  setMixture,
  setLastCrafted,
}: UseEarthPuzzleProps) {
  const [inventory, setInventory] = useAtom(inventoryItems);
  const [rareMetalsState, setRareMetalsState] = useAtom(rareMetals);

  const addMetal = useCallback(
    (newMetal: keyof typeof allMetals) => {
      const emptyMixtureIndex = mixture.findIndex(
        (metal) => metal.name === "Empty",
      );
      if (emptyMixtureIndex === -1) return;
      const updatedMixture = mixture.map((otherMetals, index) => {
        if (index === emptyMixtureIndex) {
          console.log(allMetals[newMetal]);
          return allMetals[newMetal];
        }
        return otherMetals;
      });
      setMixture(updatedMixture);
    },
    [mixture, setMixture],
  );
  const craftMetal = useCallback(() => {
    if (!setLastCrafted) return;
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
    const foundMetal = Object.values(allMetals).find(
      (metal) =>
        metal.hardness === metalAttributes.hardness &&
        metal.magicAffinity === metalAttributes.magicAffinity &&
        metal.purity === metalAttributes.purity,
    );
    const neededMetals = [
      InventoryItemEnums.ADAMANT,
      InventoryItemEnums.COLDIRON,
      InventoryItemEnums.MITHRIL,
    ];
    if (foundMetal) {
      setLastCrafted(`You Crafted ${foundMetal.name}!`);
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
      setInventory(
        inventory.map((item) => {
          if (item.name.toUpperCase() === foundMetal.name.toUpperCase()) {
            return {
              ...item,
              hidden: false,
            };
          }
          return item;
        }),
      );
    }
    setMixture(EMPTY_METAL_MIXTURE);
  }, [setLastCrafted, mixture, setMixture]);

  return { craftMetal, addMetal };
}
