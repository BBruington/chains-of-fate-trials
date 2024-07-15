"use client";
import Draggable from "@/components/dndkit/draggable";
import Droppable from "@/components/dndkit/dropable";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Reflect } from "@rocicorp/reflect/client";
import { useSubscribe } from "@rocicorp/reflect/react";
import { mutators } from "./utils/reflect/mutators";

export default function Home() {
  const reflect = new Reflect({
    server: "http://127.0.0.1:8080/",
    roomID: "myRoom",
    userID: "myUser",
    mutators,
  });

  const count = useSubscribe(reflect, (tx) => tx.get<number>("count"), 0);
  const dragEvent = useSubscribe(
    reflect,
    (tx) => tx.get<string | null>("dragevent"),
    null
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { over } = event;
    const newId = over ? over.id : null;
    await reflect.mutate.handleDragEnd(
      typeof newId === "string" ? newId : null
    );
  };

  const handleCount = async () => {
    await reflect.mutate.increment(1);
  };

  const containers = ["A", "B", "C"];
  const draggableMarkup = (
    <Draggable className="bg-primary text-secondary" id="draggable">
      Drag me
    </Draggable>
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
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
    </main>
  );
}
