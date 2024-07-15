"use client";
import { DndContext } from "@dnd-kit/core";
import { useState } from "react";

import Draggable from "./components/draggable";
import Droppable from "./components/droppable";
import PoseList from "./components/pose-list";

export default function Page() {
  return (
    <div className="h-[calc(100vh-50px)] w-screen">
      <PoseList />
    </div>
  );
}
