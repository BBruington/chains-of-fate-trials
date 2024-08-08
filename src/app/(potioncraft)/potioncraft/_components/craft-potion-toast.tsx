"use client";
import Lottie from "lottie-react";
import hoveringPotion from "@/animations/hoveringPotion.json";
import fire from "@/animations/fire.json";
import { Potion } from "@prisma/client";
import { cn } from "@/lib/utils";

type CraftPotionToastProps = {
  isSuccessful: boolean;
  potion?: Potion | null;
  className?: string;
};

export default function CraftPotionToast({
  isSuccessful,
  potion,
  className,
}: CraftPotionToastProps) {
  return (
    <div className="flex h-[30px] items-center justify-between">
      {isSuccessful ? (
        <>
          <span className="">
            {potion?.name ? `Potion of ${potion.name}` : "Potion"} was
            successfully created!
          </span>
          <Lottie className={cn("h-[60px]", className)} loop animationData={hoveringPotion} />
        </>
      ) : (
        <>
          <span className="">Craft failed!</span>
          <Lottie
            className={cn("mb-3 h-[50px] ml-3", className)}
            loop
            animationData={fire}
          />
        </>
      )}
    </div>
  );
}
