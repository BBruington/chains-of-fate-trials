"use client";
import Image from "next/image";
import { Potion } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import { displayPotion } from "../jotaiAtoms";
import serum from "@/../public/icons/serum.png";
import { changePotionQuantity } from "../../../actions";
import { cn } from "@/lib/utils";
import { Luxurious_Roman } from "next/font/google";
import { useOptimistic, startTransition } from "react";

const fontList = Luxurious_Roman({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

interface PotionListItemProps {
  potion: Potion;
}
export default function PotionListItem({ potion }: PotionListItemProps) {
  const updatePotion = (currentPotion: Potion, updatedQuantity: number) => {
    return {
      ...currentPotion,
      quantity: currentPotion.quantity + updatedQuantity,
    };
  };
  const [selectedPotion, setSelectedPotion] = useAtom<Potion>(displayPotion);
  const [optimisticPotion, addOptimistic] = useOptimistic(potion, updatePotion);

  const handleSelectPotion = () => {
    setSelectedPotion(potion);
  };

  const handleChangePotionQuantity = async (quantity: number) => {
    startTransition(async () => {
      addOptimistic(quantity);
      await changePotionQuantity({ potion, quantity });
    });
  };

  if (optimisticPotion.quantity < 1) return null;
  return (
    <div
      className={cn(
        fontList.className,
        "flex h-fit w-72 flex-col rounded-lg border border-secondary bg-secondary-foreground/70 text-secondary hover:cursor-pointer hover:bg-secondary-foreground/60",
      )}
    >
      <Button
        onClick={handleSelectPotion}
        className="min-h-20 rounded-none rounded-t-lg"
      >
        <Image width={37} src={serum} alt="potion icon" />
        <h1 className="ml-2 w-full text-xl">
          {optimisticPotion.name} <span>({optimisticPotion.quantity})</span>
        </h1>
      </Button>
      <div className="flex w-full items-center justify-start">
        <div className="flex h-full w-full">
          <Button
            aria-label={`decrement ${optimisticPotion.name} button`}
            onClick={() => handleChangePotionQuantity(-1)}
            className="h-full w-1/2 rounded-none rounded-bl-lg border-r border-t text-lg"
          >
            -
          </Button>
          <Button
            aria-label={`increment ${optimisticPotion.name} button`}
            onClick={() => handleChangePotionQuantity(1)}
            className="h-full w-1/2 rounded-none rounded-br-lg border-t text-lg"
          >
            +
          </Button>
        </div>
      </div>
    </div>
  );
}
