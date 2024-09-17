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

  const isInvalidEdge = (pipe: PipeType, directions: ConnectKeys[]) => {
    for (let direction of directions) {
      if (pipe.connects[direction] === true) return true;
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
    const sideChecker = {
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
      const comparedIndex = sideChecker[side];
      const comparedSide: ConnectKeys = oppositeSide[side];
      if (pipesState[comparedIndex].connects[comparedSide] !== true)
        return true;
    }
    return false;
  };

  const findSidesAndEdges = (i: number): FindSidesAndEdgesReturn => {
    const sidesRef: ConnectKeys[] = ["up", "left", "right", "down"];
    const edges: ConnectKeys[] = [];
    const sides: ConnectKeys[] = [];
    if (i < mapLength) edges.push("up");
    if (i % mapLength === 0) edges.push("left");
    if (i % mapLength === mapLength - 1) edges.push("right");
    if (pipesState.length - i <= mapLength) edges.push("down");
    for (let side of sidesRef) {
      if (
        pipesState[i].connects[side] === true &&
        !edges.find((item) => item === side)
      )
        sides.push(side);
    }
    return { edges, sides };
  };

  const findSolution = useCallback(
    (pipes: PipeType[]) => {
      let isSolved = true;
      let pipesRef = pipes;
      for (let i = 0; i < pipes.length; i++) {
        const { sides, edges } = findSidesAndEdges(i);
        if (
          isInvalidEdge(pipes[i], edges) ||
          isInvalidSide({ index: i, sides })
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
      pipe.connects.up,
      pipe.connects.right,
      pipe.connects.down,
      pipe.connects.left,
    ];
    pipeRef = {
      ...pipeRef,
      connects: {
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
