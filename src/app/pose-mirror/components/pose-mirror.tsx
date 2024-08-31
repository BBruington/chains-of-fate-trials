import {
  coloredBoxesAtom,
  colorOrderAtom,
  containersAtom,
} from "@/app/atoms/globalState";
import { DndContext } from "@dnd-kit/core";
import { useAtom } from "jotai";
import { useContext, useEffect, useRef } from "react";
import MirrorPoseHooks from "../_hooks/pose-list-hooks";
import { PageContext } from "../page-context";
import ColorSelectScreen from "./color-select-screen";
import MatchingContainer from "./matching-container";
import StartScreen from "./start";
import Stickman from "./stickman";

export default function PoseMirror() {
  const { showColorSelect, showStart } = useContext(PageContext);
  const [containers, setContainers] = useAtom(containersAtom);
  const [coloredBoxes, setColoredBoxes] = useAtom(coloredBoxesAtom);
  const [colorOrder, setColorOrder] = useAtom(colorOrderAtom);

  const { handleDragEnd, gameStart, solutionOrder } = MirrorPoseHooks();

  const isFirstRender = useRef(true);
  const hasStarted = useRef(false);

  useEffect(() => {
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

  return (
    <div
      className={`flex h-[calc(100%-48px)] w-full flex-col items-center justify-around xl:flex-row`}
    >
      {showStart ? <StartScreen /> : null}

      {showColorSelect ? (
        <ColorSelectScreen />
      ) : (
        <DndContext onDragEnd={handleDragEnd}>
          <button onClick={() => console.log(solutionOrder)}>
            solutionOrder
          </button>
          <MatchingContainer containers={containers} colorOrder={colorOrder} />
          <Stickman />
        </DndContext>
      )}
    </div>
  );
}
