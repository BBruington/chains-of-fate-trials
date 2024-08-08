"use client";
import Lottie from "lottie-react";
import hoveringPotion from "@/animations/hoveringPotion.json";
import fire from "@/animations/fire.json";
import { Potion } from "@prisma/client";

type CraftPotionToastProps = {
  isSuccessful: boolean;
  potion?: Potion | null;
};

export default function CraftPotionToast({
  isSuccessful,
  potion,
}: CraftPotionToastProps) {
  return (
    <div className="flex h-[70px] min-w-44 items-center justify-between">
      {isSuccessful ? (
        <>
          <span>{potion?.name ? `Potion of ${potion.name}` : "Potion"} was successfully created!</span>
          <Lottie className="h-[70px]" loop animationData={hoveringPotion} />
        </>
      ) : (
        <>
          <span>Craft failed!</span>
          <Lottie className="mb-3 h-[70px]" loop animationData={fire} />
        </>
      )}
    </div>
  );
}
