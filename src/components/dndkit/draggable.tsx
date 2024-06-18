import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

type DraggableProps = {
  id: string;
  children: string | React.JSX.Element;
}

export default function Draggable({id, children}: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <button className="bg-secondary w-32 h-20" ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </button>
  );
}
