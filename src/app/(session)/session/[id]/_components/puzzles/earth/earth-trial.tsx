import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAtom } from "jotai";
import React, { useState } from "react";
import { inventoryItems } from "../../../jotaiAtoms";
const allMetals = {
  copper: {
    name: "copper",
    rarity: "uncommon",
    hiddenValue: "purity",
    hardness: 3,
    magicAffinity: 1,
    purity: 1,
  },
  tin: {
    name: "tin",
    rarity: "uncommon",
    hiddenValue: "magicAffinity",
    hardness: 4,
    magicAffinity: 4,
    purity: 1,
  },
  lead: {
    name: "lead",
    rarity: "uncommon",
    hiddenValue: "purity",
    hardness: 7,
    magicAffinity: 2,
    purity: 2,
  },
  brass: {
    name: "brass",
    rarity: "uncommon",
    hiddenValue: undefined,
    hardness: 2,
    magicAffinity: 3,
    purity: 11,
  },
  gold: {
    name: "gold",
    rarity: "uncommon",
    hiddenValue: undefined,
    hardness: 1,
    magicAffinity: 6,
    purity: 6,
  },
  platinum: {
    name: "platinum",
    rarity: "uncommon",
    hiddenValue: undefined,
    hardness: 6,
    magicAffinity: 7,
    purity: 12,
  },
  iron: {
    name: "iron",
    rarity: "uncommon",
    hiddenValue: undefined,
    hardness: 3,
    magicAffinity: 2,
    purity: 2,
  },
  bronze: {
    name: "bronze",
    rarity: "uncommon",
    hiddenValue: "hardness",
    hardness: 7,
    magicAffinity: 5,
    purity: 2,
  },
  steel: {
    name: "steel",
    rarity: "uncommon",
    hiddenValue: "magicAffinity",
    hardness: 10,
    magicAffinity: 4,
    purity: 4,
  },
  silver: {
    name: "silver",
    rarity: "uncommon",
    hiddenValue: undefined,
    hardness: 2,
    magicAffinity: 9,
    purity: 2,
  },
  adamant: {
    name: "adamant",
    rarity: "rare",
    hiddenValue: undefined,
    hardness: 20,
    magicAffinity: 12,
    purity: 8,
  },
  coldiron: {
    name: "coldiron",
    rarity: "rare",
    hiddenValue: undefined,
    hardness: 10,
    magicAffinity: 15,
    purity: 20,
  },
  mithril: {
    name: "mithril",
    rarity: "rare",
    hiddenValue: undefined,
    hardness: 10,
    magicAffinity: 20,
    purity: 10,
  },
};
type MetalType = {
  name: string;
  rarity: string;
  hiddenValue: string | undefined;
  hardness: number;
  magicAffinity: number;
  purity: number;
};
const EMPTY_METAL = {
  name: "Empty",
  rarity: "empty",
  hiddenValue: undefined,
  hardness: 0,
  magicAffinity: 0,
  purity: 0,
};
const EMPTY_METAL_MIXTURE = [EMPTY_METAL, EMPTY_METAL, EMPTY_METAL];
export default function EarthPuzzle() {
  const [mixture, setMixture] = useState<MetalType[]>(EMPTY_METAL_MIXTURE);
  const [lastCrafted, setLastCrafted] = useState<string | undefined>();
  const [inventory, setInventory] = useAtom(inventoryItems);
  const addMetal = (newMetal: MetalType) => {
    const emptyMixtureIndex = mixture.findIndex(
      (metal) => metal.name === "Empty",
    );
    if (emptyMixtureIndex === -1) return;
    const updatedMixture = mixture.map((otherMetals, index) => {
      if (index === emptyMixtureIndex) {
        return newMetal;
      }
      return otherMetals;
    });
    setMixture(updatedMixture);
  };
  const craftMetal = () => {
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
    if (foundMetal) {
      setLastCrafted(`You Crafted ${foundMetal.name}!`);
      if (foundMetal.rarity === "rare") {
        setInventory(
          inventory.map((item) => {
            if (
              item.name.toLowerCase() === foundMetal.name.toLocaleLowerCase()
            ) {
              return {
                ...item,
                hidden: false,
              };
            }
            return item;
          }),
        );
      }
    } else {
      setLastCrafted("Your Craft Failed!");
    }
    setMixture(EMPTY_METAL_MIXTURE);
  };
  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-5">
        {Object.values(allMetals).map((metal) => (
          <div
            key={metal.name}
            className={cn("h-32 w-44", metal.rarity === "rare" && "hidden")}
          >
            <p>{metal.name}</p>
            <p>
              Hardness:{" "}
              {metal.hiddenValue === "hardness" ? "?" : metal.hardness}
            </p>
            <p>
              Magic:{" "}
              {metal.hiddenValue === "magicAffinity"
                ? "?"
                : metal.magicAffinity}
            </p>
            <p>Purity: {metal.hiddenValue === "purity" ? "?" : metal.purity}</p>
            <Button onClick={() => addMetal(metal)} className="h-5">
              add
            </Button>
          </div>
        ))}
      </div>

      <div className="flex justify-center space-x-5">
        {mixture.map((metal) => (
          <div className="h-32 w-32 border">{metal.name}</div>
        ))}
      </div>
      <div className="flex items-center">
        <div className="h-38 flex w-[550px] flex-col items-center border">
          <h2 className="w-full border-b py-5 text-center">CheatSheet</h2>
          <div className="flex w-full text-xs">
            <div className="ml-2 w-64 border-r p-1">
              <p>Steel + _ + _ = ADAMANT</p>
              <p>Silver + _ + _ = MITHRIL</p>
              <p>_ + _ + _ = COLD IRON</p>
            </div>

            <div className="ml-2 flex w-full justify-around p-1 text-xs">
              <div>
                <p>ADAMANT </p>
                <p>hardness: 20</p>
                <p>magic: 12</p>
                <p>purity: 8</p>
              </div>
              <div>
                <p>Cold Iron </p>
                <p>hardness: 10</p>
                <p>magic: 15</p>
                <p>purity: 20</p>
              </div>
              <div>
                <p>Mithril </p>
                <p>hardness: 10</p>
                <p>magic: 20</p>
                <p>purity: 10</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center space-y-3 p-5">
          <Button onClick={craftMetal} className="mt-10 w-48">
            Mix
          </Button>
          <div>{lastCrafted}</div>
        </div>
      </div>
    </div>
  );
}
