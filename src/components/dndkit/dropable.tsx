import React from "react";
import { UniqueIdentifier, useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { Ingredient } from "@/types";

type DroppableProps = {
  id: UniqueIdentifier;
  children?: string | React.JSX.Element;
  item: Ingredient;
  className?: string | undefined;
  accepts: string[];
};

export default function Droppable({
  id,
  children,
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
        `inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium`,
        className,
      )}
    >
      {children} {item.name}
    </div>
  );
}
