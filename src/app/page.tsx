"use client";
import { useState } from "react";
import { DndContext, DragEndEvent, UniqueIdentifier } from "@dnd-kit/core";
import Droppable from "@/components/dndkit/dropable";
import Draggable from "@/components/dndkit/draggable";

export default function Home() {
  const containers = ["A", "B", "C"];
  const [parent, setParent] = useState<UniqueIdentifier | null>(null);
  const draggableMarkup = <Draggable id="draggable">Drag me</Draggable>;

  const handleDragEnd = (event: DragEndEvent): void => {
    const { over } = event;

    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    setParent(over ? over.id : null);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <DndContext onDragEnd={handleDragEnd}>
        {parent === null ? draggableMarkup : null}

        {containers.map((id) => (
          // We updated the Droppable component so it would accept an `id`
          // prop and pass it to `useDroppable`
          <Droppable key={id} id={id}>
            {parent === id ? draggableMarkup : "Drop here"}
          </Droppable>
        ))}
      </DndContext>
    </main>
  );
}
