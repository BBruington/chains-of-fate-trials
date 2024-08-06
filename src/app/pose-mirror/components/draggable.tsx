import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import type { ReactNode } from "react";
import type { DraggableProps } from "../types";

export default function Draggable(props: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
    disabled: props.disabled,
  });

  const style = { transform: CSS.Translate.toString(transform) };

  return (
    <div
      className={`${props.disabled ? "cursor-default" : "cursor-pinkCursorPointer"} relative h-full w-full`}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      {props.children}
    </div>
  );
}
