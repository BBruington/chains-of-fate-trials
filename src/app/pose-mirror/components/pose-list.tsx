import { coloredBoxesAtom, containersAtom } from "@/app/atoms/globalState";
import { DndContext } from "@dnd-kit/core";
import { useAtom } from "jotai";
import { useContext, useEffect, useRef } from "react";
import MirrorPoseHooks from "../_hooks/mirror-pose-hooks";
import { PageContext } from "../page-context";
import ColorSelectScreen from "./color-select-screen";
import MatchingContainer from "./matching-container";
import StartScreen from "./start";
import Stickman from "./stickman";

export default function PoseMirror() {
  const [coloredBoxes, setColoredBoxes] = useAtom(coloredBoxesAtom);
  const [containers, setContainers] = useAtom(containersAtom);
  const { handleDragEnd, gameStart } = MirrorPoseHooks();
  const isFirstRender = useRef(true);
  const { showColorSelect, showStart } = useContext(PageContext);

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
          <MatchingContainer containers={containers} />
          <Stickman />
        </DndContext>
      )}
    </div>
  );
}
