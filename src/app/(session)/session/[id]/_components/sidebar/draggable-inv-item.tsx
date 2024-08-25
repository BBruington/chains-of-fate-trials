import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import { DraggableProps } from "../../_types";
import Image from "next/image";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export default function DraggableInvItem({
  id,
  item,
  className,
  disabled,
}: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: item.name,
      data: {
        type: item,
      },
      disabled: disabled ? disabled : false,
    });
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <HoverCard openDelay={1200}>
      <HoverCardTrigger
        className={cn(
          "relative inline-flex w-full items-center justify-center whitespace-nowrap rounded-sm p-3 text-xs font-medium",
          className,
          item.image && "bg-none",
        )}
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
      >
        {item.image && (
          <Image
            className="absolute z-10 h-full w-full"
            src={item.image}
            alt={"wooden background image"}
          />
        )}
      </HoverCardTrigger>
      <HoverCardContent className="flex h-8 w-fit items-center">
      {item.name}
      </HoverCardContent>
    </HoverCard>
  );
}
