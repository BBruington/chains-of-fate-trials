import { coordinatesAtom } from "@/app/atoms/globalState";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { useAtom } from "jotai";
import Pusher from "pusher-js";
import { useEffect } from "react";
import Draggable from "./draggable";
import type { BodyCoordinates } from "./types";
import type { bodySizes } from "../types";

export default function BodyPartDisplay() {
  const [coordinates, setCoordinates] = useAtom(coordinatesAtom);

  const handleDragEnd = (event: DragEndEvent, id: keyof BodyCoordinates) => {
    const { delta } = event;

    setCoordinates((prevCoordinates) => {
      const updatedCoordinates: BodyCoordinates = { ...prevCoordinates };
      updatedCoordinates[id] = {
        x: prevCoordinates[id].x + delta.x,
        y: prevCoordinates[id].y + delta.y,
      };
      console.log(updatedCoordinates);

      async function poseMoveBodyPartEvent() {
        await fetch("/api/pose-move-body-part", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            channel: "pose",
            event: "move-body-part",
            data: { coordinates: updatedCoordinates },
          }),
        });
      }

      poseMoveBodyPartEvent();

      return updatedCoordinates;
    });
  };

  return (
    <div className="absolute h-full w-full">
      {Object.entries(coordinates).map(([bodyPart, { x, y }]) => {
        return bodyPart === "torso" ? ( // If body part is torso then disable draggable
          <DndContext>
            <Draggable top={y} left={x} active={false} bodyPart={bodyPart} />
          </DndContext>
        ) : (
          <DndContext
            key={bodyPart}
            onDragEnd={(event) =>
              handleDragEnd({ ...event }, bodyPart as keyof BodyCoordinates)
            }
            modifiers={[restrictToParentElement]}
          >
            <Draggable top={y} left={x} active={true} bodyPart={bodyPart as keyof bodySizes} />
          </DndContext>
        );
      })}
    </div>
  );
}
