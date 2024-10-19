import elendiel from "@/../public/playericons/elendiel.png";
import aelarion from "@/../public/playericons/aelarion.png";
import dinner from "@/../public/playericons/dinner.png";
import artemis from "@/../public/playericons/artemis.png";
import box from "@/../public/icons/box.png";
import flag from "@/../public/icons/flag.png";
import bomb from "@/../public/icons/bomb.svg";
import deployedBomb from "@/../public/icons/deployedBomb.svg";
import Image from "next/image";
import { cn } from "@/lib/utils";
import "./styles.css";
import { Enemy, GridPiece } from "./types";
import { MutableRefObject } from "react";

export default function GridRow({
  row,
  rowIndex,
  playerPosition,
  GRID_TILE,
  allEnemies,
  character,
  editMapProperties,
}: {
  row: GridPiece[];
  rowIndex: number;
  allEnemies?: MutableRefObject<Enemy[]>;
  playerPosition: { x: number; y: number };
  editMapProperties?: {
    updatedTile: number;
    updateMapTile: ({
      x,
      y,
      newTile,
    }: {
      x: number;
      y: number;
      newTile: number;
      isSettingPlayer: boolean;
    }) => void;
    isSettingPlayer: boolean;
  };
  GRID_TILE: Record<number, GridPiece>;
  character?: "dinner" | "artemis" | "aelarion" | "elendiel" | undefined;
}) {
  const characters = {
    dinner,
    artemis,
    aelarion,
    elendiel,
  };
  const modifyTile = (colIndex: number) => {
    if (editMapProperties === undefined) return;
    const updatedPuzzle = editMapProperties.updateMapTile({
      x: rowIndex,
      y: colIndex,
      newTile: editMapProperties.updatedTile,
      isSettingPlayer: editMapProperties.isSettingPlayer,
    });
  };
  return (
    <div className="flex gap-1">
      {row.map((grid, colIndex) => (
        <div
          key={colIndex}
          onClick={() => modifyTile(colIndex)}
          className={cn(
            "flex h-10 w-10 items-center justify-center border border-black bg-gray-400 shadow-lg",
            editMapProperties?.updatedTile !== undefined && "cursor-pointer",
          )}
        >
          {allEnemies?.current?.find(
            (enemy) => rowIndex === enemy.x && colIndex === enemy.y,
          ) && (
            <div className="absolute z-10 flex h-8 w-8 items-center justify-center rounded-full bg-red-700" />
          )}
          {grid.name === "blocked" && (
            <div className="stone-wall-tile bg-slate-900" />
          )}
          {rowIndex === playerPosition.x &&
            colIndex === playerPosition.y &&
            character && (
              <Image
                src={characters[character]}
                height={45}
                width={45}
                alt="player"
              />
            )}
          {rowIndex === playerPosition.x &&
            colIndex === playerPosition.y &&
            character === undefined && (
              <div className="absolute z-10 flex h-8 w-8 items-center justify-center rounded-full bg-blue-700" />
            )}
          {grid.name === "push" && (
            <Image src={box} alt="pushable box" className="z-10 h-8 w-8" />
          )}
          {grid.name === "hole" && (
            <div className="z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black" />
          )}
          {grid.name === "goal" && (
            <Image src={flag} alt="goal" className="h-8 w-10" />
          )}
          {grid.name === "bomb" && <Image src={bomb} alt="bomb" />}
          {grid.name === "deployed" && (
            <Image src={deployedBomb} alt="deployedBomb" />
          )}
        </div>
      ))}
    </div>
  );
}
