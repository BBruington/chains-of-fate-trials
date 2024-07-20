import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
export default function Draggable(props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
    disabled: props.disabled,
  });

  const style = { transform: CSS.Translate.toString(transform) };

  return (
    <div
      className={`${props.disabled ? "cursor-default" : "cursor-pointer"} h-full w-full relative`}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      {props.children}
    </div>
  );
}
