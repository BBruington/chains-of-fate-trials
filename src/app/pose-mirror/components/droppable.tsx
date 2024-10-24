import { useDroppable } from "@dnd-kit/core";
import type { DroppableProps } from "../types";

export default function Droppable(props: DroppableProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id, // Needs to have a unique id
    disabled: props.disabled,
  });

  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex h-[23%] w-[15%] items-center justify-center"
    >
      {props.children}
    </div>
  );
}
