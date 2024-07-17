"use client";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { useEffect, useRef, useState } from "react";
import Draggable from "./draggable";
import PoseImage from "./pose-images";

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

export default function SilentPose() {
  const defaultCoordinates: BodyCoordinates = {
    head: { x: 0, y: 0 },
    torso: { x: 0, y: 0 },
    waist: { x: 0, y: 0 },

    leftForearm: { x: 0, y: 0 },
    leftHand: { x: 0, y: 0 },

    rightForearm: { x: 0, y: 0 },
    rightHand: { x: 0, y: 0 },

    leftKnee: { x: 0, y: 0 },
    leftFoot: { x: 0, y: 0 },

    rightKnee: { x: 0, y: 0 },
    rightFoot: { x: 0, y: 0 },
  };

  const imageArray = Array(12).fill(undefined);

  const [coordinates, setCoordinates] =
    useState<BodyCoordinates>(defaultCoordinates);

  const poseContainerRef = useRef(null);

  useEffect(() => {
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

  const handleDragEnd = (event: DragEndEvent, id: keyof BodyCoordinates) => {
    const { delta } = event;

    setCoordinates((prevCoordinates) => {
      const updatedCoordinates: BodyCoordinates = { ...prevCoordinates };
      updatedCoordinates[id] = {
        x: prevCoordinates[id].x + delta.x,
        y: prevCoordinates[id].y + delta.y,
      };
      console.log(updatedCoordinates);
      return updatedCoordinates;
    });
  };
  console.log(imageArray);

  return (
    <div className="flex justify-evenly items-center h-[calc(100vh-50px)]">
      <div className="h-[35rem] w-[35rem] border-2 border-black grid grid-cols-4 p-5 grid-rows-3 gap-5 place-items-center">
        {imageArray.map((_, i) => {
          return (
            <div key={i} className="border-2 border-black">
              <PoseImage i={`${i + 1}`} />
            </div>
          );
        })}
      </div>

      <div
        ref={poseContainerRef}
        className="border-black relative border-2 h-[calc(156px*4)] w-[calc(108px*4)] flex flex-col"
      >
        <svg className="h-full w-full">
          <line
            x1={coordinates.head.x}
            y1={coordinates.head.y}
            x2={coordinates.torso.x}
            y2={coordinates.torso.y}
            style={{ stroke: "black", strokeWidth: 2 }}
          />
          <line
            x1={coordinates.torso.x}
            y1={coordinates.torso.y}
            x2={coordinates.waist.x}
            y2={coordinates.waist.y}
            style={{ stroke: "black", strokeWidth: 2 }}
          />
          <line
            x1={coordinates.torso.x}
            y1={coordinates.torso.y}
            x2={coordinates.leftForearm.x}
            y2={coordinates.leftForearm.y}
            style={{ stroke: "black", strokeWidth: 2 }}
          />
          <line
            x1={coordinates.leftForearm.x}
            y1={coordinates.leftForearm.y}
            x2={coordinates.leftHand.x}
            y2={coordinates.leftHand.y}
            style={{ stroke: "black", strokeWidth: 2 }}
          />
          <line
            x1={coordinates.torso.x}
            y1={coordinates.torso.y}
            x2={coordinates.rightForearm.x}
            y2={coordinates.rightForearm.y}
            style={{ stroke: "black", strokeWidth: 2 }}
          />
          <line
            x1={coordinates.rightForearm.x}
            y1={coordinates.rightForearm.y}
            x2={coordinates.rightHand.x}
            y2={coordinates.rightHand.y}
            style={{ stroke: "black", strokeWidth: 2 }}
          />
          <line
            x1={coordinates.waist.x}
            y1={coordinates.waist.y}
            x2={coordinates.leftKnee.x}
            y2={coordinates.leftKnee.y}
            style={{ stroke: "black", strokeWidth: 2 }}
          />
          <line
            x1={coordinates.leftKnee.x}
            y1={coordinates.leftKnee.y}
            x2={coordinates.leftFoot.x}
            y2={coordinates.leftFoot.y}
            style={{ stroke: "black", strokeWidth: 2 }}
          />
          <line
            x1={coordinates.waist.x}
            y1={coordinates.waist.y}
            x2={coordinates.rightKnee.x}
            y2={coordinates.rightKnee.y}
            style={{ stroke: "black", strokeWidth: 2 }}
          />
          <line
            x1={coordinates.rightKnee.x}
            y1={coordinates.rightKnee.y}
            x2={coordinates.rightFoot.x}
            y2={coordinates.rightFoot.y}
            style={{ stroke: "black", strokeWidth: 2 }}
          />
        </svg>
        {Object.entries(coordinates).map(([bodyPart, { x, y }]) => {
          return bodyPart === "torso" ? (
            <DndContext key={bodyPart}>
              <Draggable top={y} left={x} active={false} bodyPart={bodyPart} />
            </DndContext>
          ) : (
            <DndContext
              key={bodyPart}
              onDragEnd={(event) => handleDragEnd({ ...event }, bodyPart)}
            >
              <Draggable top={y} left={x} active={true} bodyPart={bodyPart} />
            </DndContext>
          );
        })}
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
