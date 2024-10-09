import { coordinatesAtom } from "@/app/atoms/globalState";
import { DndContext } from "@dnd-kit/core";
import { useAtom } from "jotai";
import Pusher from "pusher-js";
import { useEffect, useRef } from "react";
import BodyPartConnectors from "./body-part-connectors";
import DraggableStickmanBodyPart from "./draggable-stickman-body-part";

export default function Stickman() {
  const poseContainerRef = useRef(null);
  const [coordinates, setCoordinates] = useAtom(coordinatesAtom);

  useEffect(() => {
    const pusher = new Pusher("13e9bf6d55ba50bff774", {
      cluster: "us3",
    });

    const channel = pusher.subscribe("pose");
    channel.bind("move-body-part", (data) => {
      console.log(data);
      setCoordinates(data.coordinates);
    });

    if (poseContainerRef.current) {
      const { width, height } =
        poseContainerRef.current.getBoundingClientRect();

      setCoordinates(() => {
        const newCoordinates = {
          head: { x: width / 2, y: height / 8 },
          torso: { x: width / 2, y: height / 2.75 },
          waist: { x: width / 2, y: height / 1.75 },

          leftForearm: { x: width / 4, y: height / 4 },
          leftHand: { x: width / 6, y: height / 9 },

          rightForearm: { x: width / 1.35, y: height / 4 },
          rightHand: { x: width / 1.25, y: height / 9 },

          leftKnee: { x: width / 4, y: height / 1.35 },
          leftFoot: { x: width / 6, y: height / 1.05 },

          rightKnee: { x: width / 1.35, y: height / 1.35 },
          rightFoot: { x: width / 1.25, y: height / 1.05 },
        };
        return newCoordinates;
      });
    }
  }, []);

  return (
    <div className="flex h-3/4 w-1/2 items-center justify-center">
      <div
        ref={poseContainerRef}
        className="relative mb-5 flex h-[calc(156px*4)] w-[95%] flex-col border-2 border-neutral-800 lg:mb-0 lg:w-[calc(108px*4)]"
      >
        <BodyPartConnectors />

        <div className="absolute h-full w-full">
          {Object.entries(coordinates).map(([bodyPart, { x, y }]) => {
            return (
              <DndContext>
                <DraggableStickmanBodyPart
                  top={y}
                  left={x}
                  active={false}
                  bodyPart={bodyPart}
                />
              </DndContext>
            );
          })}
        </div>
      </div>
    </div>
  );
}