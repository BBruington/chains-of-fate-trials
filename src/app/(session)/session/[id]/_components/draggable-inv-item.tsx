import { UniqueIdentifier, useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";

type DraggableProps = {
  id: UniqueIdentifier;
  children?: string | React.JSX.Element;
  item: string;
  className?: string | undefined;
  disabled?: boolean;
};

export default function DraggableInvItem({
  id,
  item,
  className,
  disabled,
}: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: item,
    data: {
      type: item,
    },
    disabled: disabled ? disabled : false,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <button
      className={cn(
        "inline-flex w-full items-center justify-center whitespace-nowrap rounded-sm p-3 text-xs font-medium",
        className,
      )}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      {item}
    </button>
  );
}
