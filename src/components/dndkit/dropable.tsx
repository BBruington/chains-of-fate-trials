import React from "react";
import { UniqueIdentifier, useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { Ingredient } from "@prisma/client";

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

  return (
    <div
      ref={setNodeRef}
      className={cn(
        `inline-flex items-center border justify-center whitespace-nowrap rounded-md text-sm font-medium`,
        className,
      )}
    >
      {item.name}
    </div>
  );
}
