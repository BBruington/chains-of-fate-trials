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
      Testing PR
    </main>
  );
}
