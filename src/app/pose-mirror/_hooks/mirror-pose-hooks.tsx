import {
  button2AudioAtom,
  coloredBoxesAtom,
  colorOrderAtom,
  containersAtom,
  currentPoseContainerAtom,
  nameArrayAtom,
  numOfPlayersAtom,
  playerStatesAtom,
  showConfettiAtom,
  solutionOrderAtom,
  userIdAtom,
} from "@/app/atoms/globalState";
import { initalContainers } from "@/app/pose-mirror/const";
import { pusherClient } from "@/lib/pusher";
import type { DragEndEvent } from "@dnd-kit/core";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { randomizeSolutionOrder } from "../actions";

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
  const [showConfetti, setShowConfetti] = useAtom(showConfettiAtom);

  // Player State States
  const [playerStates, setPlayerStates] = useAtom(playerStatesAtom);
  const [numOfPlayers, setNumOfPlayers] = useAtom(numOfPlayersAtom);

  // Name and Solution States
  const [nameArray, setNameArray] = useAtom(nameArrayAtom);
  const [solutionOrder, setSolutionOrder] = useAtom(solutionOrderAtom);

  // User ID States
  const [userId, setUserId] = useAtom(userIdAtom);

  function gameStart() {
    console.log("gameStart running");
    console.log(nameArray);
    setNameArray((order) => {
      const newOrder = [...order]
        .sort(() => Math.random() - 0.5)
        .map((playerData) => {
          return { ...playerData, state: false };
        });
      console.log("newOrder", newOrder);

      poseMirrorShuffleNameArray(newOrder);

      return newOrder;
    });
    shuffleSolutionOrder();
  }

  async function poseMirrorShuffleNameArray(nameArrayShuffled) {
    console.log("shuffleNameArray running");

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

    const handleShuffleNameArray = (data) => {
      setNameArray(data.newNameArray);
      setPlayerStates(data.newNameArray);
    };

    pusherClient.bind("shuffle-name-array", handleShuffleNameArray);

    return () => {
      pusherClient.unbind("shuffle-name-array", handleShuffleNameArray);
      pusherClient.unsubscribe("pose-mirror");
    };
  }, []);

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

  async function poseMirrorCorrectPoseSyncEvent(
    newContainers,
    newPlayerStates,
    newCurrentPoseContainer,
    newColoredBoxes,
  ) {
    console.log(newContainers);
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

  function handleDragEnd(event: DragEndEvent, userId: string) {
    const { active, over } = event;
    console.log(event);
    console.log(coloredBoxes);

    if (over) {
      console.log(solutionOrder);
      console.log("current Solution", solutionOrder[currentPoseContainer]);
      console.log("next solution", solutionOrder[currentPoseContainer + 1]);
      if (
        // If user places the wrong pose in the wrong order reset game or if the wrong user tries solving out of order
        (active.id !== solutionOrder[currentPoseContainer] &&
          over.id.toString().charCodeAt(0) < 77) ||
        userId !== playerStates[0].userId
      ) {
        console.log(
          "REASON 1:",
          active.id !== solutionOrder[currentPoseContainer] &&
            over.id.toString().charCodeAt(0) < 77,
        );
        console.log("active.id:", active.id);
        console.log("currentPoseContainer", currentPoseContainer);
        console.log(
          "solutionOrder[currentPoseContainer]:",
          solutionOrder[currentPoseContainer],
        );
        console.log("REASON 2:", userId !== playerStates[0].userId);
        console.log("userId:", userId);
        console.log("playerStates[0].userId:", playerStates[0].userId);
        handleResetGame();
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

        console.log(updatedContainers);
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

            console.log(disableDroppableContainerIndex);
            newContainers[disableDroppableContainerIndex] = {
              ...newContainers[disableDroppableContainerIndex],
              isDroppableDisabled: true,
              showColor: false,
            };

            // find index of userId in nameArray
            // Set that nameArray into state true
            // Check if all playerStates is true then make the next user state false
            // setCurrentPoseContainer((prev) => prev + 1);

            // setPlayerStates((prevPlayerStates) => {
            //   // if all states are true then make the first one false
            //   const newPlayerStates = prevPlayerStates
            //     .slice(1)
            //     .concat(prevPlayerStates[0]);
            //   console.log("NEW PLAYER STATES", newPlayerStates);
            //   return newPlayerStates;
            // });

            console.log("currentPoseContainer", currentPoseContainer);

            console.log(
              "newContainers[currentPoseContainer]",
              newContainers[currentPoseContainer],
            );

            newContainers[currentPoseContainer + 1] = {
              ...prevContainers[currentPoseContainer + 1],
              showColor: true,
              isDraggableDisabled: true,
            };

            // newContainers[currentPoseContainer + 1] = {
            //   ...prevContainers[currentPoseContainer + 1],
            //   showColor: true,
            //   isDroppableDisabled: false,
            // };

            console.log("Updated Containers:", newContainers);

            return newContainers;
          });

          poseMirrorCorrectPoseEvent();
          updateColoredBoxes();
        }
      }
    }

    function updateColoredBoxes() {
      console.log("UPDATECOLOREDBOXES RUNNING");
      setColoredBoxes((prevBoxes) => {
        let newBoxes = [];
        if (prevBoxes[1] === numOfPlayers) {
          // After first set, reveal start of next set & remove first box of prev set
          console.log("test colored boxes moved 1");

          newBoxes = [prevBoxes[0] + 1, prevBoxes[1] + 1];
        } else if (prevBoxes[1] < numOfPlayers - 1) {
          // Until the first set is finished reveal each different colored box
          console.log("test colored boxes moved 2");

          newBoxes = [prevBoxes[0], prevBoxes[1] + 1];
        } else if (prevBoxes[0] === 12 - numOfPlayers && prevBoxes[1] === 11) {
          // At the end prevents bottom row from being colored and show Confetti
          console.log("test colored boxes moved 3");

          setShowConfetti(true);
          newBoxes = [...prevBoxes];
        } else {
          // Move the set of boxes one to the right
          console.log("test colored boxes moved 4");
          newBoxes = [prevBoxes[0] + 1, prevBoxes[1] + 1];
        }

        handleSyncAfterColoredBoxesUpdate(newBoxes);

        return newBoxes;
      });
    }
  }

  function handleSyncAfterColoredBoxesUpdate(updatedColoredBoxes) {
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
        // if all states are true then make the first one false
        const newPlayerStates = prevPlayerStates
          .slice(1)
          .concat(prevPlayerStates[0]);

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

  function handleMouseLeave(playerId) {
    // If player does not "hold" pose until it's their turn then the game will reset
    // console.log(playerId);
    // console.log(playerStates);
    const result = nameArray.find((obj) => obj.userId === playerId);
    // console.log(result);
    if (result.state) {
      console.log("reset game");
      handleResetGame();
      window.location.reload();
    }
  }

  return {
    gameStart,
    handleDragEnd,
    handleMouseLeave,
    handleResetGame,
    solutionOrder,
    poseMirrorCorrectPoseSyncEvent,
  };
}
