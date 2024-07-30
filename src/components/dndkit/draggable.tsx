import React from "react";
import { UniqueIdentifier, useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import { Ingredient } from "@prisma/client";

type DraggableProps = {
  id: UniqueIdentifier;
  children?: string | React.JSX.Element;
  item: Ingredient;
  className?: string | undefined;
  disabled?: boolean;
  showQuantity?: boolean;
};

export default function Draggable({
  id,
  item,
  className,
  disabled,
  showQuantity,
}: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: id,
    data: {
      type: item.id,
    },
    disabled: disabled ? disabled : false,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <button
      className={cn(
        "inline-flex w-64 items-center justify-center whitespace-nowrap rounded-sm p-3 text-xs font-medium",
        className,
      )}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      {item.name} {showQuantity ? `(${item.quantity})` : ""}
    </button>
  );
}
