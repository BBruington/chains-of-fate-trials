"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  PipeProps,
} from "../../../_types";
import {
  allPipes,
  pipesExample,
} from "../../../_constants/water-constants";
import useWaterPuzzle from "./useWaterPuzzle";
import { useAtom } from "jotai";
import { waterPipes } from "../../../jotaiAtoms";



export default function WaterPuzzle() {
  const [pipesState, setPipesState] = useAtom(waterPipes);

  const {findSolution, resetPipes, rotatePipe} = useWaterPuzzle({ pipesState, setPipesState });

  return (
    <div>
      <button onClick={() => findSolution(pipesState)}>check</button>
      <button onClick={() => resetPipes(pipesState)}>reset</button>
      <div className="grid grid-cols-7 gap-4 p-6">
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
