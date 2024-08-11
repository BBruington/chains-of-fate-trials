"use client";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { coordinatesAtom } from "../../atoms/globalState";
import BodyPartConnectors from "./body-part-connectors";
import BodyPartDisplay from "./body-parts-display";
import PoseOrder from "./pose-order";

export default function SilentPose() {
  // useEffect(() => {
  //   console.log("body part moved");

  //   socket.on("received_body_part_moved", (data) => {
  //     setTestRes(data.message);
  //   });

  //   return () => {
  //     socket.off("received_body_part_moved");
  //   };
  // }, [socket]);

  const isFirstRender = useRef(true);

  const [imageArray, setImageArray] = useState([
    { image: "/Pose/Pose1.JPG", active: false },
    { image: "/Pose/Pose2.JPG", active: false },
    { image: "/Pose/Pose3.JPG", active: false },
    { image: "/Pose/Pose4.JPG", active: false },
    { image: "/Pose/Pose5.JPG", active: false },
    { image: "/Pose/Pose6.JPG", active: false },
    { image: "/Pose/Pose7.JPG", active: false },
    { image: "/Pose/Pose8.JPG", active: false },
    { image: "/Pose/Pose9.JPG", active: false },
    { image: "/Pose/Pose10.JPG", active: false },
    { image: "/Pose/Pose11.JPG", active: false },
    { image: "/Pose/Pose12.JPG", active: false },
  ]);

  const [imageArrayOrder, setImageArrayOrder] = useState(
    Array.from(Array(12).keys()),
  );

  const [coordinates, setCoordinates] = useAtom(coordinatesAtom);
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

  function gameStart() {
    setImageArrayOrder((order) => {
      let newOrder = [...order].sort(() => Math.random() - 0.5);
      console.log(newOrder);
      return newOrder;
    });

    setImageArray((order) => {
      let newOrder = [...order].sort(() => Math.random() - 0.5);
      console.log(newOrder);
      newOrder[imageArrayOrder[0]] = {
        ...newOrder[imageArrayOrder[0]],
        active: true,
      };
      return newOrder;
    });
  }

  function advanceGame() {
    setImageArrayOrder((order) => {
      return order.slice(1).concat(order[0]);
    });

    setImageArray((order) => {
      return order.map((pose, i) => {
        return i !== imageArrayOrder[0]
          ? { ...pose, active: false }
          : { ...pose, active: true };
      });
    });
  }

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    gameStart();
  }, []);

  return (
    <div className="flex h-[calc(100%-48px)] flex-col items-center justify-evenly lg:flex-row">
      <PoseOrder imageArray={imageArray} />
      <div className="flex h-full w-[48%] items-center justify-center lg:h-[calc(100vh-60px)]">
        <div
          ref={poseContainerRef}
          className="relative mb-5 flex h-[calc(156px*4)] w-[95%] flex-col border-2 border-neutral-800 lg:mb-0 lg:w-[calc(108px*4)]"
        >
          <BodyPartConnectors />
          <BodyPartDisplay />
        </div>
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
