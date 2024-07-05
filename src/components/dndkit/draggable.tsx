import React from "react";
import { UniqueIdentifier, useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import { Ingredient } from "@/types";

type DraggableProps = {
  id: UniqueIdentifier;
  children?: string | React.JSX.Element;
  item: Ingredient;
  className?: string | undefined;
  disabled?: boolean
};

export default function Draggable({
  id,
  item,
  children,
  className,
  disabled
}: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data: {
      type: item.id
    },
    disabled: disabled ? disabled : false,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <button
      className={cn(
        "p-3 bg-accent inline-flex items-center justify-center whitespace-nowrap rounded-md text-xs font-medium",
        className
      )}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      {item.name} {item.quantity}
    </button>
  );
}
