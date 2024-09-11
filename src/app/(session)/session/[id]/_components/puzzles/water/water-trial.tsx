"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
type PipeType = {
  name: string;
  isValid: boolean | null;
  connects: { up: boolean; right: boolean; down: boolean; left: boolean };
};
const linePipe: PipeType = {
  name: "line",
  isValid: null,
  connects: { up: true, right: false, down: true, left: false },
};
const endPipe: PipeType = {
  name: "end",
  isValid: null,
  connects: { up: false, right: false, down: true, left: false },
};

const threePipe: PipeType = {
  name: "three",
  isValid: null,
  connects: { up: false, right: true, down: true, left: true },
};

const fourPipe: PipeType = {
  name: "four",
  isValid: null,
  connects: { up: true, right: true, down: true, left: true },
};

const turnPipe: PipeType = {
  name: "turn",
  isValid: null,
  connects: { up: false, right: true, down: true, left: false },
};
type ConnectKeys = "up" | "right" | "down" | "left";

const allPipes: Record<number, PipeType> = {
  0: linePipe,
  1: endPipe,
  2: threePipe,
  3: fourPipe,
  4: turnPipe,
};

const pipesExample = [1, 2, 4, 0, 3, 1, 2, 4, 0];

const pipesForState = pipesExample.map((pipe) => allPipes[pipe]);

export default function WaterPuzzle() {
  const [pipesState, setPipesState] = useState(pipesForState);

  const isInvalidEdge = (pipe: PipeType, directions: string[]) => {
    for (let direction of directions) {
      if (pipe.connects[direction as keyof ConnectKeys] === true) return true;
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

  type CheckSideprops = {
    index: number;
    sides: ConnectKeys[];
  };
  const mapLength = 3;

  const isInvalidSides = ({ index, sides }: CheckSideprops): boolean => {
    const sideChecker = {
      left: index - 1,
      right: index + 1,
      up: index - mapLength,
      down: index + mapLength,
    };
    const oppositeSide = {
      left: "right",
      right: "left",
      up: "down",
      down: "up",
    };
    for (let side of sides) {
      const comparedIndex = sideChecker[side];
      const comparedSide = oppositeSide[side];
      if (pipesState[comparedIndex].connects[comparedSide] !== true)
        return true;
    }
    return false;
  };

  type FindSidesAndEdgesReturn = {
    edges: ConnectKeys[];
    sides: ConnectKeys[];
  };

  const findSidesAndEdges = (i: number): FindSidesAndEdgesReturn => {
    const sidesRef: ConnectKeys[] = ["up", "left", "right", "down"];
    const edges = [];
    const sides = [];
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

  const findSolution = (pipes: PipeType[]) => {
    let pipesRef = pipes;
    for (let i = 0; i < pipes.length; i++) {
      const { sides, edges } = findSidesAndEdges(i);
      // console.log(i, sides, edges)
      // console.log(i, isInvalidEdge(pipes[i], edges), isInvalidSides({index: i, sides}))
      if (
        isInvalidEdge(pipes[i], edges) ||
        isInvalidSides({ index: i, sides })
      ) {
        pipesRef[i].isValid = false;
        continue;
      }
      pipesRef[i].isValid = true;
    }
    setPipesState(pipesRef.map((pipe) => pipe));
  };

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

  return (
    <div>
      <button onClick={() => findSolution(pipesState)}>check</button>
      <button onClick={() => resetPipes(pipesState)}>reset</button>
      <button onClick={() => findSidesAndEdges(6)}>test</button>
      <div className="grid grid-cols-3 gap-4 p-6">
        {pipesState.map((pipe, index) => (
          <div
            key={index}
            className={cn(
              "pipe-section realative flex h-20 w-20 cursor-pointer items-center justify-center border-4 border-blue-500 bg-blue-300 transition-transform duration-500",
              pipe.isValid === false && "bg-red-500",
              pipe.isValid === true && "bg-green-500",
            )}
          >
            <Pipe pipe={pipe} index={index} rotatePipe={rotatePipe} />
          </div>
        ))}
      </div>
    </div>
  );
}

type PipeProps = {
  pipe: PipeType;
  index: number;
  rotatePipe: (pipe: PipeType, index: number) => PipeType | undefined;
};

function Pipe({ pipe, index, rotatePipe }: PipeProps) {
  return (
    <div
      onClick={() => rotatePipe(pipe, index)}
      className="relative h-full w-full"
    >
      {pipe.connects.down && (
        <div className="absolute bottom-0 right-1/2 h-1/2 w-1 bg-blue-700 text-blue-700" />
      )}
      {pipe.connects.left && (
        <div className="absolute right-1/2 top-1/2 h-1 w-1/2 bg-blue-700 text-blue-700" />
      )}
      {pipe.connects.up && (
        <div className="absolute right-1/2 h-1/2 w-1 bg-blue-700 text-blue-700" />
      )}
      {pipe.connects.right && (
        <div className="absolute right-0 top-1/2 h-1 w-1/2 bg-blue-700 text-blue-700" />
      )}
    </div>
  );
}
