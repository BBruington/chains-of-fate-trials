"use client";
import { Potion } from "@prisma/client";
import Link from "next/link";
import { useAtom } from "jotai";
import { displayPotion } from "../potions/jotaiAtoms";

export default function DisplayPotion() {
  const [selectedPotion, setSelectedPotion] = useAtom<Potion>(displayPotion);
  return (
    <div className="flex h-60 w-96 flex-col justify-center bg-secondary text-center">
      <h1 className="p-2 text-2xl">Potion of {selectedPotion.name}</h1>
      <span>{selectedPotion.description}</span>
      <span>
        {selectedPotion.rarity[0]}
        {selectedPotion.rarity.slice(1).toLowerCase()}
      </span>
      <span>
        {selectedPotion.type[0]}
        {selectedPotion.type.slice(1).toLowerCase()}
      </span>
      <span>Quantity: {selectedPotion.quantity}</span>
      {selectedPotion.id !== "empty" && (
        <Link
          target="_blank"
          prefetch={false}
          href={`http://dnd5e.wikidot.com/spell:${selectedPotion.name.toLowerCase().replace(" ", "-")}`}
        >
          Look Up Effect
        </Link>
      )}
    </div>
  );
}
