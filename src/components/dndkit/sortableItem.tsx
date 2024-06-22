import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { UniqueIdentifier } from "@dnd-kit/core";
import { Ingredient } from "@prisma/client";

export function SortableItem(props: {
  id: UniqueIdentifier;
  item: Ingredient;
  disabled?: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props.id,
      disabled: props.disabled ? props.disabled : false,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className={`bg-secondary p-3 w-32 text-xs text-center ${
        props.id === 0 && "invisible h-0 w-0"
      }`}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {props.item.name}
    </div>
  );
}
