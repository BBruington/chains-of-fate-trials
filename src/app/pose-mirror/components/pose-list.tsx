import { DndContext } from "@dnd-kit/core";
import { useState } from "react";
import Draggable from "./draggable";
import Droppable from "./droppable";

export default function PoseList() {
  const containers = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
  ];
  const [parent, setParent] = useState("A");

  const draggableMarkup = <Draggable id="draggable">Drag me</Draggable>;
  const draggableContainers = (
    <div className="h-40 w-28 border-2 border-black">
      <Draggable>Help Me</Draggable>
    </div>
  );

  const handleDragEnd = (event) => {
    const { over } = event;

    setParent(over ? over.id : null);
  };

  return (
    <div className="h-full w-full flex justify-around items-center flex-col">
      <DndContext onDragEnd={handleDragEnd}>
        {parent === null ? draggableMarkup : null}
        <div className="h-1/2 w-full flex justify-around items-center">
          {containers.map((id, index) => {
            return index <= (containers.length - 1) / 2 ? (
              <Droppable key={id} id={id}>
                {parent === id ? draggableMarkup : draggableContainers}
              </Droppable>
            ) : null;
          })}
        </div>

        <div className="h-1/2 w-full flex justify-around items-center">
          {containers.map((id, index) => {
            return index >= containers.length / 2 ? (
              <Droppable key={id} id={id}>
                {parent === id ? draggableMarkup : draggableContainers}
              </Droppable>
            ) : null;
          })}
        </div>
      </DndContext>
    </div>
  );
}
