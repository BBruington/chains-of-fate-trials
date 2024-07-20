import { useDroppable } from "@dnd-kit/core";

export default function Droppable(props) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id, // Needs to have a unique id
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
