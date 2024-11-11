"use client";
import { useCallback } from "react";
import {
  PipeType,
  ConnectKeys,
  CheckSideprops,
  FindSidesAndEdgesReturn,
  OppositeSideType,
} from "../../../_types";
import { inventoryItems, waterPipes } from "../../../jotaiAtoms";
import { useAtom } from "jotai";
import { revealInventoryItem } from "../../../_hooks/hooks";

type UseWaterPuzzleProps = {
  sessionId: string;
};

export default function useWaterPuzzle({ sessionId }: UseWaterPuzzleProps) {
  const [inventory, setInventory] = useAtom(inventoryItems);
  const [pipesState, setPipesState] = useAtom(waterPipes);

  const isPointingToEdge = (
    pipe: PipeType,
    directionsToEdge: ConnectKeys[],
  ) => {
    for (let direction of directionsToEdge) {
      if (pipe.isConnectedTo[direction]) return true;
    }
    return false;
  };
  const resetPipes = (pipes: PipeType[][]) => {
    const pipesRef = pipes.map((pipesRow) =>
      pipesRow.map((pipe) => {
        return {
          ...pipe,
          isValid: null,
        };
      }),
    );
    setPipesState(pipesRef);
  };

  const isInvalidSide = ({ x, y, sides }: CheckSideprops): boolean => {
 
    const sideIndexToCheck = {
      left: { x, y: y - 1 },
      right: { x, y: y + 1 },
      up: { x: x - 1, y },
      down: { x: x + 1, y },
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
      if (
        !pipesState[comparedIndex.x][comparedIndex.y].isConnectedTo[
          comparedSide
        ]
      )
        return true;
    }
    return false;
  };

  const findSidesAndEdges = (x: number, y: number): FindSidesAndEdgesReturn => {
    const sidesRef: ConnectKeys[] = ["up", "left", "right", "down"];
    const edgesOfBoard: ConnectKeys[] = [];
    const sidesConnectedTo: ConnectKeys[] = [];
    if (x === 0) edgesOfBoard.push("up");
    if (y === 0) edgesOfBoard.push("left");
    if (y === pipesState.length - 1) edgesOfBoard.push("right");
    if (x === pipesState[0].length - 1) edgesOfBoard.push("down");
    for (let side of sidesRef) {
      if (
        pipesState[x][y].isConnectedTo[side] === true &&
        !edgesOfBoard.find((item) => item === side)
      )
        sidesConnectedTo.push(side);
    }
    return { edgesOfBoard, sidesConnectedTo };
  };

  const findSolution = useCallback(
    (pipes: PipeType[][]) => {
      let isSolved = true;
      let pipesRef = pipes;
      for (let i = 0; i < pipes.length; i++) {
        for (let j = 0; j < pipes[0].length; j++) {
          const { sidesConnectedTo, edgesOfBoard } = findSidesAndEdges(j, i);
          if (
            isPointingToEdge(pipes[j][i], edgesOfBoard) ||
            isInvalidSide({ x: j, y: i, sides: sidesConnectedTo })
          ) {
            isSolved = false;
            pipesRef[j][i].isValid = false;
            continue;
          }
          pipesRef[j][i].isValid = true;
        }
        setPipesState(pipesRef.map((pipe) => pipe));
        if (isSolved === true) {
          revealInventoryItem(sessionId, "watergem", inventory, setInventory);
        }
      }
    },
    [pipesState, setPipesState],
  );

  const rotatePipe = (
    pipe: PipeType,
    rowIndex: number,
    colIndex: number,
  ): PipeType | undefined => {
    if (pipe.name === "four") return;
    let pipeRef = pipesState[rowIndex][colIndex];
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
      pipesState.map((pipeRow, colInd) =>
        pipeRow.map((pipe, rowInd) => {
          if (colInd === colIndex && rowInd === rowIndex) return pipeRef;
          return pipe;
        }),
      ),
    );
    return pipeRef;
  };

  return { resetPipes, rotatePipe, findSolution, pipesState };
}
