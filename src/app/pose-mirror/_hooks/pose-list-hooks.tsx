import {
  button2AudioAtom,
  coloredBoxesAtom,
  colorOrderAtom,
  containersAtom,
  nameArrayAtom,
  playerStatesAtom,
  solutionOrderAtom,
  userIdAtom,
} from "@/app/atoms/globalState";
import { initalContainers } from "@/app/pose-mirror/const";
import type { DragEndEvent } from "@dnd-kit/core";
import { useAtom } from "jotai";
import { useState } from "react";
import { randomizeSolutionOrder } from "../actions";

export default function MirrorPoseHooks() {
  // Audio States
  const [button2Audio] = useAtom(button2AudioAtom);

  // Color States
  const [coloredBoxes, setColoredBoxes] = useAtom(coloredBoxesAtom);
  const [colorOrder, setColorOrder] = useAtom(colorOrderAtom);

  // Container States
  const [containers, setContainers] = useAtom(containersAtom);
  const [currentPoseContainer, setCurrentPoseContainer] = useState(0);

  // Player State States
  const [playerStates, setPlayerStates] = useAtom(playerStatesAtom);

  // Name and Solution States
  const [nameArray, setNameArray] = useAtom(nameArrayAtom);
  const [solutionOrder, setSolutionOrder] = useAtom(solutionOrderAtom);

  // User ID States
  const [userId, setUserId] = useAtom(userIdAtom);

  function gameStart() {
    console.log("gameStart running");
    console.log(nameArray);
    setNameArray((order) => {
      const newOrder = [...order].sort(() => Math.random() - 0.5);
      console.log("newOrder", newOrder);
      return newOrder.map((playerData) => {
        return { ...playerData, state: false };
      });
    });

    shuffleSolutionOrder();
  }

  async function shuffleSolutionOrder() {
    console.log("shuffleSolutionOrder running");
    const newOrder = await randomizeSolutionOrder();
    console.log(newOrder);
    setSolutionOrder(newOrder?.order);
    poseMirrorGameStartEvent(newOrder?.order);
  }

  async function poseMirrorGameStartEvent(shuffledOrder: string[]) {
    console.log("poseMirrorGameStartEvent");
    console.log("shuffledOrder");
    console.log(shuffledOrder);

    await fetch("/api/pose-mirror-game-start", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        channel: "pose-mirror",
        event: "game-start",
        data: { solutionOrder: shuffledOrder },
      }),
    });
  }

  async function poseMirrorCorrectPoseEvent() {
    await fetch("/api/pose-mirror-correct-pose", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        channel: "pose-mirror",
        event: "correct-pose",
        data: { correct: true },
      }),
    });
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    console.log(event);
    console.log(coloredBoxes);

    if (over) {
      console.log(solutionOrder);
      console.log("current Solution", solutionOrder[currentPoseContainer]);
      console.log("next solution", solutionOrder[currentPoseContainer + 1]);
      if (
        // If user places the wrong pose in the wrong order reset game
        active.id !== solutionOrder[currentPoseContainer] &&
        over.id.toString().charCodeAt(0) < 77
      ) {
        console.log("game reset");
        handleResetGame();
      } else {
        // If user places correct pose in correct order then swap the empty container to the given pose
        button2Audio.play();

        poseMirrorCorrectPoseEvent();

        const firstLocation = containers.findIndex(
          (container) => container.name === active.id,
        );
        const secondLocation = containers.findIndex(
          (container) => container.name === over.id,
        );

        const updatedContainers = [...containers];

        [updatedContainers[firstLocation], updatedContainers[secondLocation]] =
          [updatedContainers[secondLocation], updatedContainers[firstLocation]];

        console.log(updatedContainers);
        setContainers(updatedContainers);

        if (over.id.toString().charCodeAt(0) < 77) {
          // If box is drag on to the first 12 empty locations
          setCurrentPoseContainer((prev) => prev + 1);

          setContainers((prevContainers) => {
            // Moves the game forward
            let newContainers = [...prevContainers];

            let disableDroppableContainerIndex = prevContainers.findIndex(
              // Makes the now empty box on the bottom half not droppable
              (container) => container.name === over.id,
            );
            newContainers[disableDroppableContainerIndex] = {
              ...newContainers[disableDroppableContainerIndex],
              isDroppableDisabled: true,
            };

            setPlayerStates((prevStates) => {
              // if all states are true then make the first one false
              let newLastElement = { ...prevStates[0], state: true };
              return prevStates.slice(1).concat(newLastElement);
            });

            newContainers[currentPoseContainer] = {
              ...prevContainers[currentPoseContainer],
              showColor: true,
              isDraggableDisabled: true,
            };

            return newContainers;
          });

          updateColoredBoxes();
        }
      }
    }

    function updateColoredBoxes() {
      setColoredBoxes((prevBoxes) => {
        if (prevBoxes[1] === 4) {
          // After first set, reveal start of next set & remove first box of prev set
          return [prevBoxes[0] + 1, prevBoxes[1] + 1];
        } else if (prevBoxes[1] < 3) {
          // Until the first set is finished reveal each different colored box
          return [prevBoxes[0], prevBoxes[1] + 1];
        } else if (prevBoxes[0] === 8 && prevBoxes[1] === 11) {
          // At the end prevents bottom row from being colored
          return [...prevBoxes];
        } else {
          // Move the set of four boxes one to the right
          return [prevBoxes[0] + 1, prevBoxes[1] + 1];
        }
      });
    }
  }

  function handleResetGame() {
    setContainers(initalContainers);
    setColoredBoxes([0, 0]);
    setCurrentPoseContainer(0);
    gameStart();
  }

  function handleMouseLeave(playerId) {
    // If player does not "hold" pose until it's their turn then the game will reset
    console.log(playerId);
    console.log(playerStates);
    const result = nameArray.find((obj) => obj.userId === playerId);
    console.log(result);
    if (result.state) {
      console.log("reset game");
      handleResetGame();
      window.location.reload();
    }
  }

  return {
    handleDragEnd,
    handleMouseLeave,
    gameStart,
    solutionOrder,
    handleResetGame,
  };
}
