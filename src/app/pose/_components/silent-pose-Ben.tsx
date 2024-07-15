"use client";
import {
  DndContext,
  DragOverlay,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import head from "next/head";
import { useState } from "react";
import Draggable from "./draggable";

interface Coordinate {
  x: number;
  y: number;
}

interface BodyCoordinates {
  head: Coordinate;
  torso: Coordinate;
  waist: Coordinate;
  leftForearm: Coordinate;
  leftHand: Coordinate;
  rightForearm: Coordinate;
  rightHand: Coordinate;
  leftKnee: Coordinate;
  leftFoot: Coordinate;
  rightKnee: Coordinate;
  rightFoot: Coordinate;
}

const defaultCoordinates: BodyCoordinates = {
  // Right side: 776
  head: { x: 388, y: 100 },
  torso: { x: 388, y: 225 },
  waist: { x: 388, y: 350 },

  leftForearm: { x: 240, y: 150 },
  leftHand: { x: 220, y: 75 },

  rightForearm: { x: 536, y: 150 },
  rightHand: { x: 556, y: 75 },

  leftKnee: { x: 300, y: 450 },
  leftFoot: { x: 220, y: 550 },

  rightKnee: { x: 476, y: 450 },
  rightFoot: { x: 556, y: 550 },
};

export default function SilentPose() {
  const [coordinates, setCoordinates] =
    useState<BodyCoordinates>(defaultCoordinates);

  const [lineCoordinates, setLineCoordinates] = useState({
    x1: 388 + 10,
    y1: 100 + 10,
    x2: 388 + 10,
    y2: 225 + 10,
  });

  const [activeBodyPart, setActiveBodyPart] = useState(null);

  const handleDragStart = (event: DragStartEvent, currentBodyPart: string) => {
    const { active } = event;

    setActiveBodyPart(currentBodyPart);
  };

  // const handleDragMove = (event: DragMoveEvent, id: keyof BodyCoordinates) => {
  //   const { delta } = event;

  //   setCoordinates((prevCoordinates) => {
  //     const updatedCoordinates: BodyCoordinates = { ...prevCoordinates };
  //     updatedCoordinates[id] = {
  //       x: prevCoordinates[id].x + delta.x,
  //       y: prevCoordinates[id].y + delta.y,
  //     };
  //     return updatedCoordinates;
  //   });
  // };

  const handleDragEnd = (event: DragEndEvent, id: keyof BodyCoordinates) => {
    const { delta } = event;

    setCoordinates((prevCoordinates) => {
      const updatedCoordinates: BodyCoordinates = { ...prevCoordinates };
      console.log(id);
      updatedCoordinates[id] = {
        x: prevCoordinates[id].x + delta.x,
        y: prevCoordinates[id].y + delta.y,
      };
      console.log(updatedCoordinates);
      return updatedCoordinates;
    });

    setActiveBodyPart(null);
  };

  return (
    <div className="flex justify-evenly items-center mt-8">
      <div className="h-[27rem] w-[30rem] border-2 border-black grid grid-cols-4 gap-2 p-5 grid-rows-3 place-items-center">
        <div className="h-full w-11/12 border-2 border-black"></div>
        <div className="h-full w-11/12 border-2 border-black"></div>
        <div className="h-full w-11/12 border-2 border-black"></div>
        <div className="h-full w-11/12 border-2 border-black"></div>
        <div className="h-full w-11/12 border-2 border-black"></div>
        <div className="h-full w-11/12 border-2 border-black"></div>
        <div className="h-full w-11/12 border-2 border-black"></div>
        <div className="h-full w-11/12 border-2 border-black"></div>
        <div className="h-full w-11/12 border-2 border-black"></div>
        <div className="h-full w-11/12 border-2 border-black"></div>
        <div className="h-full w-11/12 border-2 border-black"></div>
        <div className="h-full w-11/12 border-2 border-black"></div>
      </div>

      <div className="border-black relative border-2 w-1/2 h-[40rem] flex flex-col">
        <svg className="h-full w-full">
          <line
            x1={coordinates.head.x + 48}
            y1={coordinates.head.y + 48}
            x2={coordinates.torso.x + 20}
            y2={coordinates.torso.y + 20}
            style={{ stroke: "black", strokeWidth: 2 }}
          />
          <line
            x1={coordinates.torso.x + 20}
            y1={coordinates.torso.y + 20}
            x2={coordinates.waist.x + 40}
            y2={coordinates.waist.y + 40}
            style={{ stroke: "black", strokeWidth: 2 }}
          />
          <line
            x1={coordinates.torso.x + 20}
            y1={coordinates.torso.y + 20}
            x2={coordinates.leftForearm.x + 20}
            y2={coordinates.leftForearm.y + 20}
            style={{ stroke: "black", strokeWidth: 2 }}
          />
          <line
            x1={coordinates.leftForearm.x + 20}
            y1={coordinates.leftForearm.y + 20}
            x2={coordinates.leftHand.x + 10}
            y2={coordinates.leftHand.y + 10}
            style={{ stroke: "black", strokeWidth: 2 }}
          />
          <line
            x1={coordinates.torso.x + 20}
            y1={coordinates.torso.y + 20}
            x2={coordinates.rightForearm.x + 20}
            y2={coordinates.rightForearm.y + 20}
            style={{ stroke: "black", strokeWidth: 2 }}
          />
          <line
            x1={coordinates.rightForearm.x + 20}
            y1={coordinates.rightForearm.y + 20}
            x2={coordinates.rightHand.x + 10}
            y2={coordinates.rightHand.y + 10}
            style={{ stroke: "black", strokeWidth: 2 }}
          />
          <line
            x1={coordinates.waist.x + 55}
            y1={coordinates.waist.y + 20}
            x2={coordinates.leftKnee.x + 20}
            y2={coordinates.leftKnee.y + 20}
            style={{ stroke: "black", strokeWidth: 2 }}
          />
          <line
            x1={coordinates.leftKnee.x + 20}
            y1={coordinates.leftKnee.y + 20}
            x2={coordinates.leftFoot.x + 10}
            y2={coordinates.leftFoot.y + 10}
            style={{ stroke: "black", strokeWidth: 2 }}
          />
          <line
            x1={coordinates.waist.x + 55}
            y1={coordinates.waist.y + 40}
            x2={coordinates.rightKnee.x + 20}
            y2={coordinates.rightKnee.y + 20}
            style={{ stroke: "black", strokeWidth: 2 }}
          />
          <line
            x1={coordinates.rightKnee.x + 20}
            y1={coordinates.rightKnee.y + 20}
            x2={coordinates.rightFoot.x + 10}
            y2={coordinates.rightFoot.y + 10}
            style={{ stroke: "black", strokeWidth: 2 }}
          />
        </svg>
        <DndContext
          onDragStart={(event) =>
            handleDragStart({ ...event }, defaultCoordinates[head])
          }
          onDragEnd={(event) => handleDragEnd({ ...event }, activeBodyPart)}
        >
          <DragOverlay></DragOverlay>

          {Object.entries(coordinates).map(([bodyPart, { x, y }], index) => {
            return bodyPart === "torso" ? (
              <div key={bodyPart}>
                <Draggable
                  top={y}
                  left={x}
                  active={false}
                  bodyPart={bodyPart}
                  id={index}
                />
              </div>
            ) : (
              <Draggable
                key={bodyPart}
                top={y}
                left={x}
                active={true}
                bodyPart={bodyPart}
                id={index}
              />
            );
          })}
        </DndContext>
      </div>

      {/* <DndContext onDragEnd={handleDragEnd}>
        {coordinates.map(([bodyPart, { x, y }]) => {
          return <Draggable key={bodyPart} top={y} left={x} />;
        })} */}

      {/* <SortableContext items={userData}>
          {userData.map((user) => (
            <UserItem user={user} key={user.id} />
          ))}
        </SortableContext> */}
      {/* </DndContext> */}
    </div>
  );
}
