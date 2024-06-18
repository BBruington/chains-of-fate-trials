import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";

type DroppableProps = {
  id: string;
  children: string | React.JSX.Element;
  className?: string | undefined;
};

export default function Droppable({ id, children, className }: DroppableProps) {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium",
        className
      )}
      ref={setNodeRef}
    >
      {children}
    </div>
  );
}
