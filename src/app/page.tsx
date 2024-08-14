"use client";
import Draggable from "@/components/dndkit/draggable";
import Droppable from "@/components/dndkit/dropable";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Reflect } from "@rocicorp/reflect/client";
import { useSubscribe } from "@rocicorp/reflect/react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { mutators } from "./utils/reflect/mutators";
import Draggable from "@/components/dndkit/draggable";
import Droppable from "@/components/dndkit/dropable";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Reflect } from "@rocicorp/reflect/client";
import { useSubscribe } from "@rocicorp/reflect/react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { mutators } from "./utils/reflect/mutators";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    </main>
  );
}
