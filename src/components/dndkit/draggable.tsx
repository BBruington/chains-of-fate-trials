import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";

type DraggableProps = {
  id: string;
  children: string | React.JSX.Element;
  className?: string | undefined;
};

export default function Draggable({ id, children, className }: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
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
      {children}
    </button>
  );
}
