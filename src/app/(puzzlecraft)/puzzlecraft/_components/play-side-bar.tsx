import React from "react";
import { Button } from "react-day-picker";
import { PlaySideBarProps } from "../types";

export default function PlaySideBar({
  playMaze,
  playerPosition,
  player,
}: PlaySideBarProps) {
  const {plantBomb, detonateBomb, deployedBombs } = playMaze;
  const handlePlantBomb = () => {
    plantBomb({ x: playerPosition.x, y: playerPosition.y });
  };

  const handleDetonate = () => {
    detonateBomb();
  };
  return (
    <>
      <div className="flex justify-around space-x-5">
        <Button
          disabled={deployedBombs.current.length === 0}
          onClick={handleDetonate}
        >
          detonateBomb
        </Button>
        <Button disabled={!player.hasBomb} onClick={handlePlantBomb}>
          Plant Bomb
        </Button>
      </div>
    </>
  );
}
