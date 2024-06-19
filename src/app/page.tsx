"use client";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import Droppable from "@/components/dndkit/dropable";
import Draggable from "@/components/dndkit/draggable";
import { Reflect } from "@rocicorp/reflect/client";
import { mutators } from "./utils/reflect/mutators";
import { useSubscribe } from "@rocicorp/reflect/react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
<<<<<<< HEAD
      Testing PR
=======
      <button className="bg-secondary h-12 w-32" onClick={handleCount}>
        {count}
      </button>
      <DndContext onDragEnd={handleDragEnd}>
        {dragEvent === null ? draggableMarkup : null}

        {containers.map((id) => (
          <Droppable key={id} id={id}>
            {dragEvent === id ? draggableMarkup : "Drop here"}
          </Droppable>
        ))}
      </DndContext>
      Test PR
>>>>>>> 3900b64 (Test PR)
    </main>
  );
}
