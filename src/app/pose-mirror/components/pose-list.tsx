import { DndContext } from "@dnd-kit/core";
import { useState } from "react";
import ColorSelect from "./color-select";
import Draggable from "./draggable";
import Droppable from "./droppable";

export default function PoseList() {
  const [containers, setContainers] = useState([
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
  ]);
  const [parent, setParent] = useState("A");
  const [showColorSelect, setShowColorSelect] = useState(false);

  // const draggableMarkup = <Draggable id="draggable">Drag me</Draggable>;

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over) {
      const firstLocation = containers.indexOf(active.id);
      const secondLocation = containers.indexOf(over.id);

      const updatedContainers = [...containers];

      [updatedContainers[firstLocation], updatedContainers[secondLocation]] = [
        updatedContainers[secondLocation],
        updatedContainers[firstLocation],
      ];

      setContainers(updatedContainers);
    }
    console.log(over);
  };

  return (
    <div className="h-full w-full flex justify-around items-center flex-col">
      {showColorSelect ? (
        <ColorSelect></ColorSelect>
      ) : (
        <DndContext onDragEnd={handleDragEnd}>
          {parent === null ? draggableMarkup : null}
          <div className="h-1/2 w-full items-center flex justify-around ">
            {containers.map((id, index) => {
              return index <= (containers.length - 1) / 2 ? (
                <Droppable key={id} id={id}>
                  <div className="h-40 w-28 border-2 border-black">
                    <Draggable id={id}>{`Drag ${id}`}</Draggable>
                  </div>
                </Droppable>
              ) : null;
            })}
          </div>

          <div className="h-1/2 w-full flex justify-around items-center">
            {containers.map((id, index) => {
              return index >= containers.length / 2 ? (
                <Droppable key={id} id={id}>
                  <div className="h-40 w-28 border-2 border-black">
                    <Draggable id={id}>{`Drag ${id}`}</Draggable>
                  </div>
                </Droppable>
              ) : null;
            })}
          </div>
        </DndContext>
      )}
    </div>
  );
}
