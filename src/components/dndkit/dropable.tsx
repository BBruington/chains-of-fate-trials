import React from "react";
import { UniqueIdentifier, useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { Ingredient } from "@prisma/client";
import { IngredientIconProps } from "@/app/(potioncraft)/potioncraft/_types";
import skull from "@/../public/icons/skull.svg";
import wizardHat from "@/../public/icons/wizard-hat.svg";
import scroll from "@/../public/icons/scroll.svg";
import Image from "next/image";

type DroppableProps = {
  id: UniqueIdentifier;
  children?: string | React.JSX.Element;
  item: Ingredient;
  className?: string | undefined;
  accepts: string[];
};

export default function Droppable({
  id,
  className,
  accepts,
  item,
}: DroppableProps) {
  const { setNodeRef } = useDroppable({
    id,
    data: { accepts },
  });

  const ingredientIcon: IngredientIconProps = {
    ARCANE: wizardHat,
    DIVINE: wizardHat,
    OCCULT: skull,
    PRIMAL: scroll,
  };

  return (
    <div
      ref={setNodeRef}
      className={cn(
        `flex flex-col items-center justify-center space-y-5 whitespace-nowrap rounded-md text-sm font-medium`,
        className,
      )}
    >
      {item.id !== "empty" && (
        <Image
          className="w-4"
          src={ingredientIcon[item.type as keyof IngredientIconProps]}
          alt="Ingredient Type Icon"
        />
      )}
      <div>{item.name}</div>
    </div>
  );
}
