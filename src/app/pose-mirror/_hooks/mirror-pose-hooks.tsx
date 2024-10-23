import {
  button2AudioAtom,
  coloredBoxesAtom,
  colorOrderAtom,
  containersAtom,
  currentPoseContainerAtom,
  nameArrayAtom,
  numOfPlayersAtom,
  playerStatesAtom,
  solutionOrderAtom,
  userIdAtom,
} from "@/app/atoms/globalState";
import { initalContainers } from "@/app/pose-mirror/const";
import { pusherClient } from "@/lib/pusher";
import type { DragEndEvent } from "@dnd-kit/core";
import type { JsonValue } from "@prisma/client/runtime/library";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { randomizeSolutionOrder } from "../actions";
import type {
  containerElement,
  handleShuffleNameArrayData,
  mousePosition,
  nameArrayElement,
  playerStatesElement,
} from "../types";

export default function MirrorPoseHooks() {
  // Audio States
  const [button2Audio] = useAtom(button2AudioAtom);

  // Color States
  const [coloredBoxes, setColoredBoxes] = useAtom(coloredBoxesAtom);
  const [colorOrder, setColorOrder] = useAtom(colorOrderAtom);

  // Container States
  const [containers, setContainers] = useAtom(containersAtom);
  const [currentPoseContainer, setCurrentPoseContainer] = useAtom(
    currentPoseContainerAtom,
  );

  // Player State States
  const [playerStates, setPlayerStates] = useAtom(playerStatesAtom);
  const [numOfPlayers, setNumOfPlayers] = useAtom(numOfPlayersAtom);

  // Name and Solution States
  const [nameArray, setNameArray] = useAtom(nameArrayAtom);
  const [solutionOrder, setSolutionOrder] = useAtom(solutionOrderAtom);

  // User ID States
  const [userId, setUserId] = useAtom(userIdAtom);

  // Pusher Functions
  async function poseMirrorConfettiSync() {
    await fetch("/api/pose-mirror-confetti-sync", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        channel: "pose-mirror",
        event: "confetti-sync",
        data: {},
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

  async function poseMirrorCorrectPoseSyncEvent(
    newContainers: containerElement[],
    newPlayerStates: playerStatesElement[],
    newCurrentPoseContainer: number,
    newColoredBoxes: number[],
  ) {
    await fetch("/api/pose-mirror-correct-pose-sync", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        channel: "pose-mirror",
        event: "correct-pose-sync",
        data: {
          containers: newContainers,
          playerStates: newPlayerStates,
          currentPoseContainer: newCurrentPoseContainer,
          coloredBoxes: newColoredBoxes,
        },
      }),
    });
  }

  async function poseMirrorGameStartEvent(
    shuffledOrder: string[] | JsonValue | undefined,
  ) {
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

  async function poseMirrorHandleMouseMoveEvent(
    mousePosition: mousePosition,
    currentUserId: string,
  ) {
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

  async function poseMirrorResetSync() {
    await fetch("/api/pose-mirror-reset-sync", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        channel: "pose-mirror",
        event: "reset-sync",
        data: {},
      }),
    });
  }

  async function poseMirrorShuffleNameArray(
    nameArrayShuffled: nameArrayElement[],
  ) {
    await fetch("/api/pose-mirror-shuffle-name-array", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        channel: "pose-mirror",
        event: "shuffle-name-array",
        data: { newNameArray: nameArrayShuffled },
      }),
    });
  }

  useEffect(() => {
    pusherClient.subscribe("pose-mirror");

    const handleShuffleNameArray = (data: handleShuffleNameArrayData) => {
      console.log(data);
      setNameArray(data.newNameArray);
      setPlayerStates(data.newNameArray);
    };

    pusherClient.bind("shuffle-name-array", handleShuffleNameArray);

    return () => {
      pusherClient.unbind("shuffle-name-array", handleShuffleNameArray);
      pusherClient.unsubscribe("pose-mirror");
    };
  }, []);

  // Regular Functions

  function gameStart() {
    setNameArray((order) => {
      const newOrder = [...order]
        .sort(() => Math.random() - 0.5)
        .map((playerData) => {
          return { ...playerData, state: false };
        });

      poseMirrorShuffleNameArray(newOrder);

      return newOrder;
    });
    shuffleSolutionOrder();
  }

  async function shuffleSolutionOrder() {
    const newOrder = await randomizeSolutionOrder();
    console.log(newOrder?.order);
    setSolutionOrder(newOrder?.order);
    poseMirrorGameStartEvent(newOrder?.order);
  }

  function handleDragEnd(event: DragEndEvent, userId: string) {
    const { active, over } = event;

    if (over) {
      if (
        // If user places the wrong pose in the wrong order reset game or if the wrong user tries solving out of order
        (Array.isArray(solutionOrder) &&
          active.id !== solutionOrder[currentPoseContainer] &&
          over.id.toString().charCodeAt(0) < 77) ||
        userId !== playerStates[0].userId
      ) {
        poseMirrorResetSync();
      } else {
        // If user places correct pose in correct order then swap the empty container to the given pose
        button2Audio.play();

        const firstLocation = containers.findIndex(
          (container) => container.name === active.id,
        );
        const secondLocation = containers.findIndex(
          (container) => container.name === over.id,
        );

        const updatedContainers = [...containers];

        [updatedContainers[firstLocation], updatedContainers[secondLocation]] =
          [updatedContainers[secondLocation], updatedContainers[firstLocation]];

        setContainers(updatedContainers);

        // Rearrange nameArray to swap who places the next pose

        if (over.id.toString().charCodeAt(0) < 77) {
          // If box is drag on to the first 12 empty locations
          let newContainers = [];

          setContainers((prevContainers) => {
            // Moves the game forward
            newContainers = [...prevContainers];

            let disableDroppableContainerIndex = prevContainers.findIndex(
              // Makes the now empty box on the bottom half not droppable
              (container) => {
                return container.name === over.id;
              },
            );

            newContainers[disableDroppableContainerIndex] = {
              ...newContainers[disableDroppableContainerIndex],
              isDroppableDisabled: true,
              showColor: false,
            };

            newContainers[currentPoseContainer + 1] = {
              ...prevContainers[currentPoseContainer + 1],
              showColor: true,
              isDraggableDisabled: true,
            };

            return newContainers;
          });

          poseMirrorCorrectPoseEvent();
          updateColoredBoxes();
        }
      }
    }

    function updateColoredBoxes() {
      setColoredBoxes((prevBoxes) => {
        let newBoxes = [];
        if (prevBoxes[1] === numOfPlayers) {
          // After first set, reveal start of next set & remove first box of prev set

          newBoxes = [prevBoxes[0] + 1, prevBoxes[1] + 1];
        } else if (prevBoxes[1] < numOfPlayers - 1) {
          // Until the first set is finished reveal each different colored box

          newBoxes = [prevBoxes[0], prevBoxes[1] + 1];
        } else if (prevBoxes[0] === 12 - numOfPlayers && prevBoxes[1] === 11) {
          // At the end prevents bottom row from being colored and show Confetti
          poseMirrorConfettiSync();
          newBoxes = [...prevBoxes];
        } else {
          // Move the set of boxes one to the right
          newBoxes = [prevBoxes[0] + 1, prevBoxes[1] + 1];
        }

        handleSyncAfterColoredBoxesUpdate(newBoxes);

        return newBoxes;
      });
    }
  }

  function handleSyncAfterColoredBoxesUpdate(updatedColoredBoxes: number[]) {
    setContainers((prevContainers) => {
      const newContainers = prevContainers.map((containers, index) => {
        let newContainer = { ...containers };
        if (index === updatedColoredBoxes[1]) {
          newContainer = { ...newContainer, isDroppableDisabled: false };
        }

        if (
          index >= updatedColoredBoxes[0] &&
          index <= updatedColoredBoxes[1]
        ) {
          newContainer = { ...newContainer, showColor: true };
        } else {
          newContainer = { ...newContainer, showColor: false };
        }
        return newContainer;
      });

      setPlayerStates((prevPlayerStates) => {
        let newPlayerStates = [];
        let firstNewPlayerState = { ...prevPlayerStates[0], state: true };
        let trueStateCount = prevPlayerStates.filter(
          (playerState) => playerState.state === true,
        ).length;

        if (trueStateCount === 1) {
          // if there is only one person with a state of true then we unlock the player who is next in line
          newPlayerStates = prevPlayerStates
            .slice(1)
            .concat(firstNewPlayerState);
          newPlayerStates[0] = { ...newPlayerStates[0], state: false };
        } else {
          newPlayerStates = prevPlayerStates
            .slice(1)
            .concat(firstNewPlayerState);
        }

        console.log("THIS IS NEWPLAYERSTATES");
        console.log(newPlayerStates);

        setCurrentPoseContainer((prevCurrentPoseContianer) => {
          const newCurrentPoseContainer = prevCurrentPoseContianer + 1;
          poseMirrorCorrectPoseSyncEvent(
            newContainers,
            newPlayerStates,
            newCurrentPoseContainer,
            updatedColoredBoxes,
          );
          return newCurrentPoseContainer;
        });

        return newPlayerStates;
      });

      return newContainers;
    });
  }

  function handleResetGame() {
    setContainers(initalContainers);
    setColoredBoxes([0, 0]);
    setCurrentPoseContainer(0);
    gameStart();
  }

  function handleMouseLeave(playerId: string) {
    // If player does not "hold" pose until it's their turn then the game will reset
    const result = playerStates.find((obj) => obj.userId === playerId);
    console.log(playerStates);
    console.log(playerId);
    console.log(result);
    if (result && result.state) {
      handleResetGame();
      poseMirrorResetSync();
      // window.location.reload();
    }
  }

  return {
    gameStart,
    handleDragEnd,
    handleMouseLeave,
    handleResetGame,
    solutionOrder,
    poseMirrorCorrectPoseSyncEvent,
    poseMirrorHandleMouseMoveEvent,
  };
}
