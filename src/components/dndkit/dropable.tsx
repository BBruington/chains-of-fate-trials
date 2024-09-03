import React from "react";
import { UniqueIdentifier, useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { Ingredient } from "@prisma/client";
import "./styles.scss";

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

  // const ingredientIcon: IngredientIconProps = {
  //   ARCANE: wizardHat,
  //   DIVINE: wizardHat,
  //   OCCULT: skull,
  //   PRIMAL: scroll,
  // };

  return (
    <div className="flex flex-col items-center" ref={setNodeRef}>
      <div className="vial">
        <div
          className={cn(item.id !== "empty" && "liquid")}
        ></div>
      </div>
      <h2 className="mt-3 min-h-[32px] min-w-[89px] max-w-[130px] text-center text-xs">
        {item.name}
      </h2>
    </div>
  );
}
