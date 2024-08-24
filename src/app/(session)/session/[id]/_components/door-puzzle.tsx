import { useDroppable } from "@dnd-kit/core";
import React from "react";
import { PuzzleEnums } from "./session-page";

export default function DoorPuzzle() {
  const { setNodeRef } = useDroppable({
    id: PuzzleEnums.DOOR,
    data: { accepts: ["1", "2", "3", "4"] },
  });
  return (
    <div ref={setNodeRef} className="h-full w-full">
      <p>
        A door stands before you. You will need to use the key to open the door.
        Drag it onto the screen to move onto the next room.
      </p>
    </div>
  );
}
