"use client";

import {
  coloredBoxesAtom,
  containersAtom,
  currentPoseContainerAtom,
  nameArrayAtom,
  playerStatesAtom,
  showConfettiAtom,
  solutionOrderAtom,
  userIdAtom,
} from "@/app/atoms/globalState";
import { pusherClient } from "@/lib/pusher";
import { DndContext } from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { useAtom } from "jotai";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";

import Confetti from "react-confetti";
import MirrorPoseHooks from "../_hooks/mirror-pose-hooks";
import { PageContext } from "../page-context";
import type {
  handleMouseTrackerData,
  handleSyncContainersData,
  handleSyncSolutionOrderData,
  mousePosition,
  otherPlayersMouses,
  PoseMirrorProps,
} from "../types";
import ColorSelectScreen from "./color-select-screen";
import MatchingContainer from "./matching-container";
import StartScreen from "./start";
import Stickman from "./stickman";

export default function PoseMirror({ currentUser, userData }: PoseMirrorProps) {
  // UI States
  const { showColorSelect, showStart } = useContext(PageContext);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Game Logic States
  const [containers, setContainers] = useAtom(containersAtom);
  const [coloredBoxes, setColoredBoxes] = useAtom(coloredBoxesAtom);
  const [currentPoseContainer, setCurrentPoseContainer] = useAtom(
    currentPoseContainerAtom,
  );
  const [solutionOrder, setSolutionOrder] = useAtom(solutionOrderAtom);
  const [nameArray, setNameArray] = useAtom(nameArrayAtom);
  const [showConfetti, setShowConfetti] = useAtom(showConfettiAtom);
  const [playerStates, setPlayerStates] = useAtom(playerStatesAtom);

  // Player States
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
    xPercent: 0,
    yPercent: 0,
  });
  const [otherPlayersMouses, setOtherPlayersMouses] =
    useState<otherPlayersMouses>({});
  const [userId, setUserId] = useAtom(userIdAtom);

  // Refs
  const isFirstRender = useRef(true);
  const hasStarted = useRef(false);

  // Hooks
  const {
    handleDragEnd,
    gameStart,
    handleResetGame,
    poseMirrorHandleMouseMoveEvent,
  } = MirrorPoseHooks();

  useEffect(() => {
    setUserId(userData);
    console.log(userData);
    if (!hasStarted.current) {
      gameStart();
      hasStarted.current = true;
    }
  }, []);

  useEffect(() => {
    // Pusher Functions
    pusherClient.subscribe("pose-mirror");

    const handleSyncSolutionOrder = (data: handleSyncSolutionOrderData) => {
      setSolutionOrder(data.solutionOrder);
    };

    const handleMouseTracker = (data: handleMouseTrackerData) => {
      console.log(data);
      presentOtherPlayersMouses(data.mousePosition, data.currentUserId);
    };

    const handleResetSync = () => {
      handleResetGame();
    };

    const handleSyncContainers = (data: handleSyncContainersData) => {
      console.log(data);
      setContainers(data.containers);
      setPlayerStates(data.playerStates);
      setCurrentPoseContainer(data.currentPoseContainer);
      setColoredBoxes(data.coloredBoxes);
    };

    const handleShowConfetti = () => {
      setShowConfetti(true);
    };

    pusherClient.bind("game-start", handleSyncSolutionOrder);
    pusherClient.bind("mouse-tracker", handleMouseTracker);
    pusherClient.bind("reset-sync", handleResetSync);
    pusherClient.bind("correct-pose-sync", handleSyncContainers);
    pusherClient.bind("confetti-sync", handleShowConfetti);

    return () => {
      pusherClient.unbind("game-start", handleSyncSolutionOrder);
      pusherClient.unbind("reset-sync", handleResetSync);
      pusherClient.unbind("confetti-sync", handleShowConfetti);
      pusherClient.unbind("correct-pose-sync", handleSyncContainers);
      pusherClient.unbind("mouse-tracker", handleMouseTracker);

      pusherClient.unsubscribe("pose-mirror");
    };
  }, []);

  useEffect(() => {
    // Only tracks mouse movement if it has stayed still for at least 100ms
    const timeoutId = setTimeout(() => {
      poseMirrorHandleMouseMoveEvent(
        {
          x: mousePosition.x,
          y: mousePosition.y,
          xPercent: mousePosition.xPercent,
          yPercent: mousePosition.yPercent,
        },
        currentUser.id,
      );
    }, 100); // Determines how long the user has to leave their mouse for it to update
    return () => clearTimeout(timeoutId);
  }, [mousePosition]);

  useEffect(() => {
    // Listens to when user moves mouse and/or changes window size
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [handleMouseMove]);

  function handleWindowResize() {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  function handleMouseMove(event: MouseEvent) {
    setMousePosition({
      x: event.clientX,
      y: event.clientY,
      xPercent: event.clientX / windowSize.width,
      yPercent: event.clientY / windowSize.height,
    });
  }

  function presentOtherPlayersMouses(
    mousePosition: mousePosition,
    currentUser: string,
  ) {
    let x = mousePosition.xPercent * windowSize.width;
    let y = mousePosition.yPercent * windowSize.height;

    setOtherPlayersMouses((prevMouses) => {
      let newMouses = { ...prevMouses };
      newMouses[currentUser] = { x, y, userId: currentUser };

      return newMouses;
    });
  }

  return (
    <div
      className={`relative m-auto flex h-full w-full flex-col items-center justify-around xl:flex-row xl:justify-center`}
    >
      {showConfetti ? (
        <Confetti width={windowSize.width} height={windowSize.height} />
      ) : null}
      <div className={`${showStart ? "" : "hidden"} h-full w-full`}>
        <StartScreen />
      </div>

      {showColorSelect ? (
        <ColorSelectScreen />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <DndContext
            onDragEnd={(event) => {
              handleDragEnd(event, currentUser.id);
            }}
            modifiers={[restrictToWindowEdges]}
          >
            {Object.keys(otherPlayersMouses).map((playerData, i) => {
              const mouseColorIndex = nameArray.findIndex((player) => {
                return player.userId === playerData;
              });

              return (
                <Image
                  key={i}
                  style={{
                    position: "absolute",
                    left: `${otherPlayersMouses[playerData].x}px`,
                    top: `${otherPlayersMouses[playerData].y}px`,
                    zIndex: "20",
                  }}
                  src={`/cursors/${nameArray[mouseColorIndex].colorName}-cursor-pointer.png`}
                  width={25}
                  height={25}
                  alt="Other player cursor"
                />
              );
            })}
            <MatchingContainer containers={containers} />
            <Stickman />
          </DndContext>
        </div>
      )}
    </div>
  );
}
