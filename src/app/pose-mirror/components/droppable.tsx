import { useDroppable } from "@dnd-kit/core";
import type { DroppableProps } from "../types";

export default function Droppable(props: DroppableProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.name, // Needs to have a unique id
    disabled: props.disabled,
  });

  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}
