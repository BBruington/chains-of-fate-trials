import {
  button2AudioAtom,
  coloredBoxesAtom,
  colorOrderAtom,
  containersAtom,
  playerStatesAtom,
} from "@/app/atoms/globalState";
import { initalContainers } from "@/app/pose-mirror/const";
import type { DragEndEvent } from "@dnd-kit/core";
import { useAtom } from "jotai";
import { useState } from "react";
import type { Player } from "../types";

export default function MirrorPoseHooks() {
  const [button2Audio] = useAtom(button2AudioAtom);
  const [coloredBoxes, setColoredBoxes] = useAtom(coloredBoxesAtom);
  const [colorOrder, setColorOrder] = useAtom(colorOrderAtom);
  const [containers, setContainers] = useAtom(containersAtom);
  const [currentPoseContainer, setCurrentPoseContainer] = useState(0);
  const [playerStates, setPlayerStates] = useAtom(playerStatesAtom);
  const [solutionOrder, setSolutionOrder] = useState([
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
  ]);

  function gameStart() {
    console.log("gameStart running");
    // Randomize and initalize the order of colors (players) ✔
    // Randomize and determine correct order of poses ✔
    // Indicate to players the next pose must be by "x" color (player) ✔
    // If pose is selected check if pose is dropped in the top or bottom half
    // If pose is dropped in top half check if pose has been dropped in correct order
    // Once player correctly places correct pose check if their mouse moves outside of the pose box (figure out after reflect)

    // Conditions of reset:
    // if player does not hold their pose until prompted,
    // if player chooses wrong pose,
    // if player chooses pose, when it's not their turn

    setColorOrder((order) => {
      const newOrder = [...order].sort(() => Math.random() - 0.5);
      console.log("newOrder", newOrder);

      setPlayerStates(() => {
        let tempOrder = [...newOrder];

        let newPlayerStates: Player[] = tempOrder.map((player) => ({
          number: player.number,
          state: false,
        }));

        console.log("newPlayerStates", newPlayerStates);

        return newPlayerStates;
      });

      return newOrder;
    });

    shuffleSolutionOrder();
  }

  function shuffleSolutionOrder() {
    console.log("shuffleSolutionOrder running");
    setSolutionOrder((prevOrder) => {
      console.log("setSolutionOrder running");
      const newSolutionOrder = [...prevOrder];
      let currentIndex = newSolutionOrder.length;

      while (currentIndex !== 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [newSolutionOrder[currentIndex], newSolutionOrder[randomIndex]] = [
          newSolutionOrder[randomIndex],
          newSolutionOrder[currentIndex],
        ];
      }

      console.log("newSolutionOrder", newSolutionOrder);

      poseMirrorGameStartEvent(newSolutionOrder);

      return newSolutionOrder;
    });
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
    // If player does not "hold" pose then the game will
    console.log(playerStates);
    if (playerStates[playerId].state === true) {
      console.log("reset game");
      handleResetGame();
    }
  }

  return {
    handleDragEnd,
    handleMouseLeave,
    gameStart,
    solutionOrder,
  };
}
