"use client";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import useWaterPuzzle from "./useWaterPuzzle";
import { Button } from "@/components/ui/button";
import { PipeProps } from "../../../_types";

export default function WaterPuzzle({ sessionId }: { sessionId: string }) {
  const { findSolution, resetPipes, rotatePipe, pipesState } = useWaterPuzzle({
    sessionId,
  });

  useEffect(() => {
    //debuggs findSolution button
    resetPipes(pipesState);
  }, []);

  return (
    <div className="mt-1 flex flex-col items-center">
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
      <div className="m-2 flex flex-col space-y-1">
        {pipesState.map((col, colIndex) => (
          <div key={colIndex} className="flex space-x-1">
            {col.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className={cn(
                  "pipe-section realative flex h-16 w-16 cursor-pointer items-center justify-center border-4 border-blue-500 bg-blue-300 transition-transform duration-500",
                  row.isValid === false && "bg-blue-400",
                  row.isValid === true && "animate-pulse",
                )}
              >
                <Pipe
                  pipe={row}
                  rowIndex={rowIndex}
                  colIndex={colIndex}
                  rotatePipe={rotatePipe}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Pipe({ pipe, rowIndex, colIndex, rotatePipe }: PipeProps) {
  return (
    <div
      onClick={() => rotatePipe(pipe, rowIndex, colIndex)}
      className="relative h-full w-full"
    >
      {pipe.isConnectedTo.down && (
        <div className="absolute bottom-0 right-1/2 h-1/2 w-1 bg-blue-700 text-blue-700" />
      )}
      {pipe.isConnectedTo.left && (
        <div className="absolute right-1/2 top-1/2 h-1 w-1/2 bg-blue-700 text-blue-700" />
      )}
      {pipe.isConnectedTo.up && (
        <div className="absolute right-1/2 h-1/2 w-1 bg-blue-700 text-blue-700" />
      )}
      {pipe.isConnectedTo.right && (
        <div className="absolute right-0 top-1/2 h-1 w-1/2 bg-blue-700 text-blue-700" />
      )}
    </div>
  );
}
