"use client";
import { pusherClient } from "@/lib/pusher";
import { useUser } from "@clerk/nextjs";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import {
  coordinatesAtom,
  showConfettiAtom,
  showStartScreenAtom,
  solutionOrderAtom,
} from "../../atoms/globalState";
// import { changeHeadCoordiantes } from "../actions";
import Confetti from "react-confetti";
import { initalImageArray } from "../const";
import type { handleGameStartData } from "../types";
import BodyPartConnectors from "./body-part-connectors";
import BodyPartDisplay from "./body-parts-display";
import PoseOrder from "./pose-order";
import StartScreen from "./start-screen";

export default function SilentPose() {
  const isFirstRender = useRef(true);
  const [imageArray, setImageArray] = useState(initalImageArray);
  const [showConfetti, setShowConfetti] = useAtom(showConfettiAtom);
  const [showStartScreen, setShowStartScreen] = useAtom(showStartScreenAtom);
  const [solutionOrder, setSolutionOrder] = useAtom(solutionOrderAtom);
  const [solutionMap, setSolutionMap] = useState<Record<string, number>>({});
  const [coordinates, setCoordinates] = useAtom(coordinatesAtom);
  const poseContainerRef = useRef<HTMLDivElement>(null);
  const test = useUser();

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

  function gameStart(solutionOrder: string[]) {
    console.log("gameStart:", solutionOrder);
    setSolutionMap(() => {
      const newSolutionMap: Record<string, number> = solutionOrder.reduce(
        (acc, letter, index) => {
          acc[letter] = index;
          return acc;
        },
        {} as Record<string, number>,
      );

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

    const handleGameStart = (data: handleGameStartData) => {
      console.log("newSolutionOrder", data.solutionOrder);
      gameStart(data.solutionOrder);
    };

    const handleShowConfetti = () => {
      setShowConfetti(true);
    };

    pusherClient.bind("correct-pose", handleCorrectPose);
    pusherClient.bind("game-start", handleGameStart);
    pusherClient.bind("confetti-sync", handleShowConfetti);

    return () => {
      pusherClient.unbind("correct-pose", handleCorrectPose);
      pusherClient.unbind("game-start", handleGameStart);
      pusherClient.unbind("confetti-sync", handleShowConfetti);
      pusherClient.unsubscribe("pose-mirror");
    };
  }, []);

  return (
    <div className="relative flex h-full flex-col items-center justify-evenly lg:flex-row">
      {showConfetti ? (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      ) : null}

      {showStartScreen ? (
        <div className="absolute z-10 h-full w-full bg-neutral-200">
          <StartScreen />
        </div>
      ) : null}

      <PoseOrder imageArray={imageArray} />
      <div className={`flex h-full w-[48%] items-center justify-center`}>
        <div
          ref={poseContainerRef}
          className="relative mb-5 flex h-3/4 w-[95%] flex-col border-2 border-neutral-800 lg:mb-0 lg:w-[calc(108px*4)]"
        >
          <BodyPartConnectors />
          <BodyPartDisplay />
        </div>
      </div>
    </div>
  );
}
