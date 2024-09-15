"use client";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { PipeProps } from "../../../_types";
import useWaterPuzzle from "./useWaterPuzzle";
import { Button } from "@/components/ui/button";

export default function WaterPuzzle({ sessionId }: { sessionId: string }) {
  const { findSolution, resetPipes, rotatePipe, pipesState } =
    useWaterPuzzle({sessionId});

  useEffect(() => {
    //debuggs findSolution button
    resetPipes(pipesState);
  }, []);

  return (
    <div className="mt-10 flex flex-col items-center">
      <div className="flex space-x-5">
        <Button
          className="w-32 bg-blue-400 hover:bg-blue-600"
          onClick={() => findSolution(pipesState)}
        >
          Confirm Solution
        </Button>
        <Button
          className="w-32 bg-blue-400 hover:bg-blue-600"
          onClick={() => resetPipes(pipesState)}
        >
          Reset
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-4 p-6">
        {pipesState.map((pipe, index) => (
          <div
            key={index}
            className={cn(
              "pipe-section realative flex h-20 w-20 cursor-pointer items-center justify-center border-4 border-blue-500 bg-blue-300 transition-transform duration-500",
              pipe.isValid === false && "bg-blue-400",
              pipe.isValid === true && "animate-pulse",
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
