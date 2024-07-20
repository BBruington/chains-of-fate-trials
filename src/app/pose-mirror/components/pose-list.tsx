import { DndContext } from "@dnd-kit/core";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ColorSelect from "./color-select";
import Draggable from "./draggable";
import Droppable from "./droppable";

export default function PoseList() {
  const [showColorSelect, setShowColorSelect] = useState(false);

  const initalContainers = [
    {
      name: "A",
      image: null,
      showColor: true,
      isDraggableDisabled: true,
      isDroppableDisabled: false,
    },
    {
      name: "B",
      image: null,
      showColor: false,
      isDraggableDisabled: true,
      isDroppableDisabled: true,
    },
    {
      name: "C",
      image: null,
      showColor: false,
      isDraggableDisabled: true,
      isDroppableDisabled: true,
    },
    {
      name: "D",
      image: null,
      showColor: false,
      isDraggableDisabled: true,
      isDroppableDisabled: true,
    },
    {
      name: "E",
      image: null,
      showColor: false,
      isDraggableDisabled: true,
      isDroppableDisabled: true,
    },
    {
      name: "F",
      image: null,
      showColor: false,
      isDraggableDisabled: true,
      isDroppableDisabled: true,
    },
    {
      name: "G",
      image: null,
      showColor: false,
      isDraggableDisabled: true,
      isDroppableDisabled: true,
    },
    {
      name: "H",
      image: null,
      showColor: false,
      isDraggableDisabled: true,
      isDroppableDisabled: true,
    },
    {
      name: "I",
      image: null,
      showColor: false,
      isDraggableDisabled: true,
      isDroppableDisabled: true,
    },
    {
      name: "J",
      image: null,
      showColor: false,
      isDraggableDisabled: true,
      isDroppableDisabled: true,
    },
    {
      name: "K",
      image: null,
      showColor: false,
      isDraggableDisabled: true,
      isDroppableDisabled: true,
    },
    {
      name: "L",
      image: null,
      showColor: false,
      isDraggableDisabled: true,
      isDroppableDisabled: true,
    },
    {
      name: "M",
      image: "/Pose/Pose1.JPG",
      showColor: false,
      isDraggableDisabled: false,
      isDroppableDisabled: true,
    },
    {
      name: "N",
      image: "/Pose/Pose2.JPG",
      showColor: false,
      isDraggableDisabled: false,
      isDroppableDisabled: true,
    },
    {
      name: "O",
      image: "/Pose/Pose3.JPG",
      showColor: false,
      isDraggableDisabled: false,
      isDroppableDisabled: true,
    },
    {
      name: "P",
      image: "/Pose/Pose4.JPG",
      showColor: false,
      isDraggableDisabled: false,
      isDroppableDisabled: true,
    },
    {
      name: "Q",
      image: "/Pose/Pose6.JPG",
      showColor: false,
      isDraggableDisabled: false,
      isDroppableDisabled: true,
    },
    {
      name: "R",
      image: "/Pose/Pose6.JPG",
      showColor: false,
      isDraggableDisabled: false,
      isDroppableDisabled: true,
    },
    {
      name: "S",
      image: "/Pose/Pose7.JPG",
      showColor: false,
      isDraggableDisabled: false,
      isDroppableDisabled: true,
    },
    {
      name: "T",
      image: "/Pose/Pose8.JPG",
      showColor: false,
      isDraggableDisabled: false,
      isDroppableDisabled: true,
    },
    {
      name: "U",
      image: "/Pose/Pose9.JPG",
      showColor: false,
      isDraggableDisabled: false,
      isDroppableDisabled: true,
    },
    {
      name: "V",
      image: "/Pose/Pose10.JPG",
      showColor: false,
      isDraggableDisabled: false,
      isDroppableDisabled: true,
    },
    {
      name: "W",
      image: "/Pose/Pose11.JPG",
      showColor: false,
      isDraggableDisabled: false,
      isDroppableDisabled: true,
    },
    {
      name: "X",
      image: "/Pose/Pose12.JPG",
      showColor: false,
      isDraggableDisabled: false,
      isDroppableDisabled: true,
    },
  ];

  const [containers, setContainers] = useState(initalContainers);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over) {
      if (
        active.id !== solutionOrder[currentPoseContainer] &&
        over.id.charCodeAt(0) < 77
      ) {
        handleResetGame();
      } else {
        const firstLocation = containers.findIndex(
          (container) => container.name === active.id
        );
        const secondLocation = containers.findIndex(
          (container) => container.name === over.id
        );

        const updatedContainers = [...containers];

        [updatedContainers[firstLocation], updatedContainers[secondLocation]] =
          [updatedContainers[secondLocation], updatedContainers[firstLocation]];

        setContainers(updatedContainers);

        if (over.id.charCodeAt(0) < 77) {
          setCurrentPoseContainer((prev) => prev + 1);

          setContainers((prevContainers) => {
            let newContainers = [...prevContainers];

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
  };

  const [coloredBoxes, setColoredBoxes] = useState([0, 0]);
  const isFirstRender = useRef(true);

  function updateColoredBoxes() {
    setColoredBoxes((prevBoxes) => {
      if (prevBoxes[1] === 4) {
        // After  first set, reveal start of next set & remove first box of prev set
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

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setContainers((prevContainers) => {
      return prevContainers.map((container, index) => {
        let newContainer = { ...container };
        if (index === coloredBoxes[1]) {
          console.log(coloredBoxes[1]);
          console.log("test");
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

  const [colorOrder, setColorOrder] = useState([
    "border-[#ffc0eb]",
    "border-[#c0ebff]",
    "border-[#ebffc0]",
    "border-[#d4c0ff]",
  ]);

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

  const [currentPoseContainer, setCurrentPoseContainer] = useState(0);

  function gameStart() {
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
      console.log(newOrder);
      return newOrder;
    });

    setSolutionOrder((order) => {
      const newOrder = [...order].sort(() => Math.random() - 0.5);
      console.log(newOrder);
      return newOrder;
    });

    console.log(colorOrder);
    console.log(solutionOrder);
  }

  useEffect(() => {
    gameStart();
  }, []);

  function handleResetGame() {
    setContainers(initalContainers);
    gameStart();
  }

  return (
    <div className="h-full w-full flex justify-around items-center flex-col">
      {showColorSelect ? (
        <ColorSelect></ColorSelect>
      ) : (
        <DndContext onDragEnd={handleDragEnd}>
          <button onClick={() => console.log(containers)}>test</button>
          <div className="h-4/6 w-full grid grid-cols-12 content-around place-items-center	">
            {containers.map((id, index) => {
              return (
                <Droppable
                  key={id.name}
                  id={id.name}
                  disabled={id.isDroppableDisabled}
                >
                  <div
                    className={`${id.showColor ? colorOrder[index % 4] : "border-black"} h-40 w-28 border-4`}
                  >
                    <Draggable id={id.name} disabled={id.isDraggableDisabled}>
                      {id.image ? (
                        <Image
                          alt={`${id.image}`}
                          src={`${id.image}`}
                          fill
                          sizes="90.406px"
                          style={{ objectFit: "cover" }}
                          className="border-2 border-black"
                        />
                      ) : null}
                    </Draggable>
                    <h1>{id.name}</h1>
                  </div>
                </Droppable>
              );
            })}
          </div>
        </DndContext>
      )}
    </div>
  );
}
