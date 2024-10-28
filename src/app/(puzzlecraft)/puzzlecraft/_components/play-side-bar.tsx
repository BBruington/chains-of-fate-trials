import React from "react";
import { Button } from "@/components/ui/button";
import { PlaySideBarProps } from "../types";
import { Direction } from "@prisma/client";

export default function PlaySideBar({
  playMaze,
  playerPosition,
  player,
  reset,
}: PlaySideBarProps) {
  const { plantBomb, detonateBomb, movePlayer, deployedBombs } = playMaze;
  const handlePlantBomb = () => {
    plantBomb({ x: playerPosition.x, y: playerPosition.y });
  };

  const handleDetonate = () => {
    detonateBomb();
  };
  return (
    <div className="flex w-full flex-col space-y-5">
      <div className="flex w-full justify-around space-x-5">
        <Button
          className="w-32"
          disabled={deployedBombs.current.length === 0}
          onClick={handleDetonate}
        >
          Detonate Bomb
        </Button>
        <Button
          className="w-32"
          disabled={!player.hasBomb}
          onClick={handlePlantBomb}
        >
          Plant Bomb
        </Button>
      </div>
      <div className="flex justify-around">
        <Button onClick={() => movePlayer(-1, 0, Direction.UP)}>W</Button>
        <Button onClick={() => movePlayer(1, 0, Direction.DOWN)}>S</Button>
        <Button onClick={() => movePlayer(0, 1, Direction.RIGHT)}>D</Button>
        <Button onClick={() => movePlayer(0, -1, Direction.LEFT)}>A</Button>
      </div>
      <Button onClick={reset}>Restart</Button>
    </div>
  );
}
