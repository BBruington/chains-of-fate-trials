"use client";
import {
  ACTIVE_SIDEBAR_ENUM,
  Maze,
} from "@/app/(puzzlecraft)/puzzlecraft/types";
import { useState } from "react";
import { formatPuzzle } from "@/components/puzzles/maze-puzzle/utils";
import useMazePuzzle from "@/components/puzzles/maze-puzzle/useMazePuzzle";
import MazeGrid from "@/components/puzzles/maze-puzzle/grid";
import PlaySideBar from "@/app/(puzzlecraft)/puzzlecraft/_components/play-side-bar";
import LostDialog from "@/app/(puzzlecraft)/puzzlecraft/_components/lost-dialog";
import WonDialog from "@/app/(puzzlecraft)/puzzlecraft/_components/won-dialog";
type MazeSessionProps = {
  session: {
    Mazes: Maze[];
  } & {
    id: string;
    userId: string;
    title: string;
  };
};

export default function MazeSession({ session }: MazeSessionProps) {
  const [isFailed, setIsFailed] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [currentMaze, setCurrentMaze] = useState(
    formatPuzzle(session.Mazes[0]),
  );
  const { playMaze, mazeState, reset } = useMazePuzzle({
    selectedMazeId: currentMaze.id,
    gameGridDetails: {
      setIsWon,
      setIsFailed,
      mode: ACTIVE_SIDEBAR_ENUM.PLAYMODE,
      mapLayout: currentMaze.matrix,
      playerStartingPosition: currentMaze.playerStartingPosition,
      allEnemies: currentMaze.enemies,
    },
  });
  const handleMoveToNextLevel = () => {
    const newIndex = session.Mazes.findIndex(
      (maze) => currentMaze.id === maze.id,
    );
    setCurrentMaze(formatPuzzle(session.Mazes[newIndex + 1]));
    setIsWon(false);
  };
  const { enemies, playerPosition, grid } = mazeState;
  return (
    <div className="flex h-full flex-1 flex-col">
      <WonDialog
        isWon={isWon}
        levelsAmount={session.Mazes.length}
        mazeIndex={session.Mazes.findIndex(
          (maze) => currentMaze.id === maze.id,
        )}
        handleMoveToNextLevel={handleMoveToNextLevel}
      />
      <LostDialog reset={reset} isFailed={isFailed} setIsFailed={setIsFailed} />

      <div className="flex h-full justify-between">
        <div className="m-5 flex w-full flex-col items-center">
          {grid.map((row, rowIndex) => (
            <MazeGrid
              key={rowIndex}
              row={row}
              rowIndex={rowIndex}
              allEnemies={enemies}
              playerPosition={playerPosition}
            />
          ))}
        </div>

        <div className="flex h-full min-w-96 flex-col items-center space-y-3 bg-secondary p-2">
          <PlaySideBar
            playMaze={playMaze}
            playerPosition={playerPosition}
            player={mazeState.player}
            reset={reset}
          />
        </div>
      </div>
    </div>
  );
}
