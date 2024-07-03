import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { UniqueIdentifier } from "@dnd-kit/core";
import { Ingredient } from "@/types";
import { cn } from "@/lib/utils";
export function SortableItem(props: {
  id: UniqueIdentifier;
  item: Ingredient;
  disabled?: boolean;
  className?: string;
}) {
  const { item, id, className } = props;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: id,
      disabled: props.disabled ? props.disabled : false,
      data: {
        item,
      },
    });

  const style = {
    transform: props.disabled ? undefined : CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className={cn(
        `flex h-10 w-full items-center justify-center border-b border-primary/80 bg-secondary p-1 text-center text-xs hover:text-primary/80 ${
          props.id === 0 && "invisible h-0 w-0"
        }`,
        className,
      )}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {props.item.name} <span className="text-white ml-2">{" "}{props.item.quantity !== 0 ? `(${props.item.quantity})` : ""}</span>
    </div>
  );
}
