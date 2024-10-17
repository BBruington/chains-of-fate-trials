"use client";
import { pusherClient } from "@/lib/pusher";
import { useUser } from "@clerk/nextjs";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { coordinatesAtom, solutionOrderAtom } from "../../atoms/globalState";
// import { changeHeadCoordiantes } from "../actions";
import { initalImageArray } from "../const";
import BodyPartConnectors from "./body-part-connectors";
import BodyPartDisplay from "./body-parts-display";
import PoseOrder from "./pose-order";

export default function SilentPose() {
  const isFirstRender = useRef(true);
  const [imageArray, setImageArray] = useState(initalImageArray);
  const [solutionOrder, setSolutionOrder] = useAtom(solutionOrderAtom);
  const [solutionMap, setSolutionMap] = useState();
  const [coordinates, setCoordinates] = useAtom(coordinatesAtom);
  const poseContainerRef = useRef(null);
  const test = useUser();
  // const handleChangeHeadCoordinates = async (testCoordinates) => {
  //   await changeHeadCoordiantes(testCoordinates);
  // };

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

  function gameStart(solutionOrder) {
    console.log("gameStart:", solutionOrder);
    setSolutionMap(() => {
      const newSolutionMap = solutionOrder.reduce((acc, letter, index) => {
        acc[letter] = index;
        return acc;
      }, {});

      setImageArray((prevImageArray) => {
        const sortedImageArray = [...prevImageArray].sort((a, b) => {
          return newSolutionMap[a.letter] - newSolutionMap[b.letter];
        });

        return sortedImageArray.map((pose, i) => {
          return i !== 0
            ? { ...pose, active: false, completed: false }
            : { ...pose, active: true, completed: false };
        });
      });
      return newSolutionMap;
    });

    console.log(solutionMap);
  }

  function advanceGame() {
    console.log("advanceGame running");
    setImageArray((order) => {
      let activeLocation = order.findIndex((obj) => obj.active);
      return order.map((pose, i) => {
        if (i === activeLocation) {
          return { ...pose, active: false, completed: true };
        } else if (i === activeLocation + 1) {
          return { ...pose, active: true };
        } else {
          return { ...pose };
        }
      });
    });
  }

  useEffect(() => {
    pusherClient.subscribe("pose-mirror");

    const handleCorrectPose = () => {
      console.log("handleCorrectPose RUNNING");
      advanceGame();
    };

    const handleGameStart = (solutionOrder) => {
      console.log("newSolutionOrder", solutionOrder.solutionOrder);
      gameStart(solutionOrder.solutionOrder);
    };

    pusherClient.bind("correct-pose", handleCorrectPose);
    pusherClient.bind("game-start", handleGameStart);

    return () => {
      pusherClient.unbind("correct-pose", handleCorrectPose);
      pusherClient.unbind("game-start", handleGameStart);
      pusherClient.unsubscribe("pose-mirror");
    };
  }, []);

  return (
    <div className="flex h-[95%] flex-col items-center justify-evenly lg:flex-row">
      <PoseOrder imageArray={imageArray} />
      <button onClick={() => console.log(imageArray)}>imageArray</button>
      <div className="flex h-full w-[48%] items-center justify-center lg:h-[calc(100vh-60px)]">
        <div
          ref={poseContainerRef}
          className="relative mb-5 flex h-[calc(156px*4)] w-[95%] flex-col border-2 border-neutral-800 lg:mb-0 lg:w-[calc(108px*4)]"
        >
          <BodyPartConnectors />
          <BodyPartDisplay />
        </div>
      </div>
    </div>
  );
}
