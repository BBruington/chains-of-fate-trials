"use client";

import {
  coloredBoxesAtom,
  containersAtom,
  nameArrayAtom,
  solutionOrderAtom,
  userIdAtom,
} from "@/app/atoms/globalState";
import { DndContext } from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { useAtom } from "jotai";
import Image from "next/image";
import Pusher from "pusher-js";
import { useContext, useEffect, useRef, useState } from "react";
import MirrorPoseHooks from "../_hooks/pose-list-hooks";
import { getSolutionOrder, randomizeSolutionOrder } from "../actions";
import { PageContext } from "../page-context";
import ColorSelectScreen from "./color-select-screen";
import MatchingContainer from "./matching-container";
import StartScreen from "./start";
import Stickman from "./stickman";

export default function PoseMirror({ currentUser, userData }) {
  // UI States
  const { showColorSelect, showStart } = useContext(PageContext);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Game Logic States
  const [containers, setContainers] = useAtom(containersAtom);
  const [coloredBoxes, setColoredBoxes] = useAtom(coloredBoxesAtom);
  const [solutionOrder, setSolutionOrder] = useAtom(solutionOrderAtom);
  const [nameArray, setNameArray] = useAtom(nameArrayAtom);

  // Player States
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
    xPercent: 0,
    yPercent: 0,
  });
  const [otherPlayersMouses, setOtherPlayersMouses] = useState({});
  const [userId, setUserId] = useAtom(userIdAtom);

  // Refs
  const isFirstRender = useRef(true);
  const hasStarted = useRef(false);

  // Hooks
  const { handleDragEnd, gameStart, handleResetGame } = MirrorPoseHooks();

  useEffect(() => {
    setUserId(userData);
    console.log(userData);
    if (!hasStarted.current) {
      gameStart();
      hasStarted.current = true;
    }
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setContainers((prevContainers) => {
      return prevContainers.map((container, index) => {
        let newContainer = { ...container };
        if (index === coloredBoxes[1]) {
          newContainer = { ...newContainer, isDroppableDisabled: false };
        }

        if (index >= coloredBoxes[0] && index <= coloredBoxes[1]) {
          newContainer = { ...newContainer, showColor: true };
        } else {
          newContainer = { ...newContainer, showColor: false };
        }
        return newContainer;
      });
    });
  }, [coloredBoxes]);

  const handleGetSolutionOrder = async () => {
    try {
      const prismaSolutionOrder = await getSolutionOrder();
      if (prismaSolutionOrder) {
        console.log(prismaSolutionOrder.order);
        setSolutionOrder(prismaSolutionOrder.order[0]); // Update state only if data is fetched
      }
    } catch (error) {
      console.error("Error fetching solution order:", error);
    }
  };

  const handleRandomizeSolutionOrder = async () => {
    try {
      await randomizeSolutionOrder();
    } catch (error) {
      console.error("Error randomizing solution order:", error);
    }
  };

  function handleWindowResize() {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  function handleMouseMove(event) {
    setMousePosition({
      x: event.clientX,
      y: event.clientY,
      xPercent: event.clientX / windowSize.width,
      yPercent: event.clientY / windowSize.height,
    });
  }

  useEffect(() => {
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

  function presentOtherPlayersMouses(mousePosition, currentUser) {
    let x = mousePosition.xPercent * windowSize.width;
    let y = mousePosition.yPercent * windowSize.height;

    setOtherPlayersMouses((prevMouses) => {
      let newMouses = { ...prevMouses };
      newMouses[currentUser] = { x, y, userId: currentUser };

      return newMouses;
    });
  }

  async function poseMirrorHandleMouseMoveEvent(mousePosition, currentUserId) {
    await fetch("/api/pose-mirror-mouse-tracker", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        channel: "pose-mirror",
        event: "mouse-tracker",
        data: { mousePosition: mousePosition, currentUserId: currentUserId },
      }),
    });
  }

  useEffect(() => { // Listens to when user moves mouse and/or changes window size
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [handleMouseMove]);

  useEffect(() => {
    const pusher = new Pusher("13e9bf6d55ba50bff774", {
      cluster: "us3",
    });

    const channel = pusher.subscribe("pose-mirror");

    const handleMouseTracker = (data) => {
      presentOtherPlayersMouses(data.mousePosition, data.currentUserId);
    };

    channel.bind("mouse-tracker", handleMouseTracker);

    return () => {
      channel.unbind("mouse-tracker", handleMouseTracker);
      pusher.unsubscribe("pose-mirror");
    };
  }, []);

  return (
    <div
      className={`relative m-auto flex h-full w-full flex-col items-center justify-around xl:flex-row xl:justify-center`}
    >
      <div className={`${showStart ? "" : "hidden"} h-full w-full`}>
        <StartScreen />
      </div>

      {showColorSelect ? (
        <ColorSelectScreen />
      ) : (
        <DndContext
          onDragEnd={handleDragEnd}
          modifiers={[restrictToWindowEdges]}
        >
          {Object.keys(otherPlayersMouses).map((playerData) => {
            const mouseColorIndex = nameArray.findIndex((player) => {
              return player.userId === playerData;
            });

            return (
              <Image
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
      )}
    </div>
  );
}
