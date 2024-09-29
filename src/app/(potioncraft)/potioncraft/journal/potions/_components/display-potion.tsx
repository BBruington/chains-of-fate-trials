"use client";
import { Potion } from "@prisma/client";
import Link from "next/link";
import { useAtom } from "jotai";
import { displayPotion } from "../jotaiAtoms";
import { ExternalLinkIcon } from "lucide-react";

export default function DisplayPotion() {
  const [selectedPotion] = useAtom<Potion>(displayPotion);
  return (
    <>
      {selectedPotion.id === "empty" ? (
        <div className="cursor-normal flex h-60 w-96 flex-col justify-center rounded-lg bg-primary/80 text-center text-secondary">
          <h1 className="p-2 text-2xl">
            Select a Potion to view its properties
          </h1>
        </div>
      ) : (
        <div className="cursor-normal p-2 flex h-60 w-96 flex-col justify-center rounded-lg bg-primary/80 text-center text-secondary">
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
          <Link
            className="flex h-8 items-center justify-center hover:text-primary-foreground/70"
            target="_blank"
            prefetch={false}
            href={`http://dnd5e.wikidot.com/spell:${selectedPotion.name.toLowerCase().replace(" ", "-")}`}
          >
            Effect <ExternalLinkIcon className="ml-2 h-5" />
          </Link>
        </div>
      )}
    </>
  );
}
