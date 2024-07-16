"use client"

import { Potion } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import { displayPotion } from "../potions/jotaiAtoms";

interface PotionListItemProps {
  potion: Potion;
}
export default function PotionListItem({ potion }: PotionListItemProps) {

  const [selectedPotion, setSelectedPotion] = useAtom<Potion>(displayPotion);

  const handleSelectPotion = () => {
    setSelectedPotion(potion)
  }

  return (
    <Button
      onClick={handleSelectPotion}
      className="flex h-fit min-h-32 w-72 flex-col items-center rounded-sm border border-secondary bg-secondary-foreground/70 text-secondary hover:cursor-pointer hover:bg-secondary-foreground/60"
    >
      <h1 className="w-full border-b border-secondary text-center text-2xl">
        Potion of {potion.name}
      </h1>
      <h2>Effect: {potion.description}</h2>
    </Button>
  );
}
