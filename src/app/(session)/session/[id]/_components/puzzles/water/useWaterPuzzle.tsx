"use client";
import {  useCallback } from "react";
import {
  PipeType,
  ConnectKeys,
  CheckSideprops,
  FindSidesAndEdgesReturn,
  OppositeSideType,
} from "../../../_types";
import { inventoryItems, waterPipes } from "../../../jotaiAtoms";
import { useAtom } from "jotai";
import { mapLength } from "../../../_constants";
import { revealInventoryItem } from "../../../_hooks/hooks";

type UseWaterPuzzleProps = {
  sessionId: string
};

export default function useWaterPuzzle({
  sessionId
}: UseWaterPuzzleProps) {
  const [inventory, setInventory] = useAtom(inventoryItems);
  const [pipesState, setPipesState] = useAtom(waterPipes);

  const isPointingToEdge = (pipe: PipeType, directionsToEdge: ConnectKeys[]) => {
    for (let direction of directionsToEdge) {
      if (pipe.isConnectedTo[direction]) return true;
    }
    return false;
  };
  const resetPipes = (pipes: PipeType[]) => {
    const pipesRef = pipes.map((pipe) => {
      return {
        ...pipe,
        isValid: null,
      };
    });
    setPipesState(pipesRef);
  };

  const isInvalidSide = ({ index, sides }: CheckSideprops): boolean => {
    const sideIndexToCheck = {
      left: index - 1,
      right: index + 1,
      up: index - mapLength,
      down: index + mapLength,
    };

    const oppositeSide: OppositeSideType = {
      left: "right",
      right: "left",
      up: "down",
      down: "up",
    };
    for (let side of sides) {
      const comparedIndex = sideIndexToCheck[side];
      const comparedSide: ConnectKeys = oppositeSide[side];
      if (!pipesState[comparedIndex].isConnectedTo[comparedSide])
        return true;
    }
    return false;
  };

  const findSidesAndEdges = (i: number): FindSidesAndEdgesReturn => {
    const sidesRef: ConnectKeys[] = ["up", "left", "right", "down"];
    const edgesOfBoard: ConnectKeys[] = [];
    const sidesConnectedTo: ConnectKeys[] = [];
    if (i < mapLength) edgesOfBoard.push("up");
    if (i % mapLength === 0) edgesOfBoard.push("left");
    if (i % mapLength === mapLength - 1) edgesOfBoard.push("right");
    if (pipesState.length - i <= mapLength) edgesOfBoard.push("down");
    for (let side of sidesRef) {
      if (
        pipesState[i].isConnectedTo[side] === true &&
        !edgesOfBoard.find((item) => item === side)
      )
        sidesConnectedTo.push(side);
    }
    return { edgesOfBoard, sidesConnectedTo };
  };

  const findSolution = useCallback(
    (pipes: PipeType[]) => {
      let isSolved = true;
      let pipesRef = pipes;
      for (let i = 0; i < pipes.length; i++) {
        const { sidesConnectedTo, edgesOfBoard } = findSidesAndEdges(i);
        if (
          isPointingToEdge(pipes[i], edgesOfBoard) ||
          isInvalidSide({ index: i, sides: sidesConnectedTo })
        ) {
          isSolved = false;
          pipesRef[i].isValid = false;
          continue;
        }
        pipesRef[i].isValid = true;
      }
      setPipesState(pipesRef.map((pipe) => pipe));
      if (isSolved === true) {
        revealInventoryItem(
          sessionId,
          'watergem',
          inventory,
          setInventory,
        );
      }
    },
    [pipesState, setPipesState],
  );

  const rotatePipe = (pipe: PipeType, index: number): PipeType | undefined => {
    if (pipe.name === "four") return;
    let pipeRef = pipesState[index];
    const pipeDirections = [
      pipe.isConnectedTo.up,
      pipe.isConnectedTo.right,
      pipe.isConnectedTo.down,
      pipe.isConnectedTo.left,
    ];
    pipeRef = {
      ...pipeRef,
      isConnectedTo: {
        up: pipeDirections[3],
        right: pipeDirections[0],
        down: pipeDirections[1],
        left: pipeDirections[2],
      },
    };
    setPipesState(
      pipesState.map((pipe, i) => {
        if (i === index) return pipeRef;
        return pipe;
      }),
    );
    return pipeRef;
  };

  return { resetPipes, rotatePipe, findSolution, pipesState };
}
