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

const fontList = Luxurious_Roman({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

interface PotionListItemProps {
  potion: Potion;
}
export default function PotionListItem({ potion }: PotionListItemProps) {
  const [selectedPotion, setSelectedPotion] = useAtom<Potion>(displayPotion);

  const handleSelectPotion = () => {
    setSelectedPotion(potion);
  };

  const handleChangePotionQuantity = async (quantity: number) => {
    await changePotionQuantity({ potion, quantity });
  };

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
          {potion.name} <span>({potion.quantity})</span>
        </h1>
      </Button>
      <div className="flex w-full items-center justify-start">
        <div className="flex h-full w-full">
          <Button
            aria-label={`decrement ${potion.name} button`}
            onClick={() => handleChangePotionQuantity(-1)}
            className="h-full w-1/2 text-lg rounded-none rounded-bl-lg border-r border-t"
          >
            -
          </Button>
          <Button
            aria-label={`increment ${potion.name} button`}
            onClick={() => handleChangePotionQuantity(1)}
            className="h-full w-1/2 text-lg rounded-none rounded-br-lg border-t"
          >
            +
          </Button>
        </div>
      </div>
    </div>
  );
}
