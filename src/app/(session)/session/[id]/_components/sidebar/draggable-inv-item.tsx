import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import { DraggableProps } from "../../_types";
import Image from "next/image";
import { Inspect } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import InventoryItemDetails from "./inventory-item-dialogue";

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
    <div className="relative flex h-full w-full justify-center">
      <Dialog>
        <HoverCard openDelay={1200}>
          <HoverCardTrigger
            className={cn(
              "inline-flex w-full items-center justify-center whitespace-nowrap rounded-sm p-3 text-xs font-medium",
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
                className="absolute z-10 h-40 w-40"
                src={item.image}
                alt={`Inventory item ${item.name}`}
              />
            )}
          </HoverCardTrigger>
          <HoverCardContent className="flex h-8 w-fit items-center">
            {item.name}
          </HoverCardContent>
        </HoverCard>
        <DialogTrigger
          className={cn(
            "absolute right-3 top-1 z-30",
            isDragging && "invisible",
          )}
        >
          {<Inspect />}
        </DialogTrigger>
        <DialogContent>
          <InventoryItemDetails item={item} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
