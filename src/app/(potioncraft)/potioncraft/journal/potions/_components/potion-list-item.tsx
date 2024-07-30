"use client";
import Image from "next/image";
import { Potion } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import { displayPotion } from "../jotaiAtoms";
import serum from "@/../public/icons/serum.png";

interface PotionListItemProps {
  potion: Potion;
}
export default function PotionListItem({ potion }: PotionListItemProps) {
  const [selectedPotion, setSelectedPotion] = useAtom<Potion>(displayPotion);

  const handleSelectPotion = () => {
    setSelectedPotion(potion);
  };

  return (
    <Button
      onClick={handleSelectPotion}
      className="flex h-fit min-h-16 w-72 flex-col rounded-lg border border-secondary bg-secondary-foreground/70 text-secondary hover:cursor-pointer hover:bg-secondary-foreground/60"
    >
      <div className="flex w-full items-center justify-start">
        <Image width={37} src={serum} alt="potion icon" />
        <h1 className="ml-2 w-full text-xl">{potion.name}</h1>
      </div>
      {/* <h2>Effect: {potion.description}</h2> */}
    </Button>
  );
}
