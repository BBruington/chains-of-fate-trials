import { GridPiece } from "../../../_types";
import elendiel from "@/../public/playericons/elendiel.png";
import aelarion from "@/../public/playericons/aelarion.png";
import dinner from "@/../public/playericons/dinner.png";
import artemis from "@/../public/playericons/artemis.png";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function GridRow({
  row,
  rowIndex,
  playerPosition,
  MAP_TILE,
  character,
  editMapProperties,
}: {
  row: number[];
  rowIndex: number;
  playerPosition: { x: number; y: number };
  editMapProperties?: {
    updatedTile: number;
    updateMapTile: ({
      dx,
      dy,
      newTile,
    }: {
      dx: number;
      dy: number;
      newTile: number;
      isSettingPlayer: boolean;
    }) => void;
    isSettingPlayer: boolean;
  };
  MAP_TILE: Record<number, GridPiece>;
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
      dx: rowIndex,
      dy: colIndex,
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
            "flex h-10 w-10 items-center justify-center border border-black bg-slate-400",
            editMapProperties?.updatedTile !== undefined && "cursor-pointer",
          )}
        >
          {MAP_TILE[grid].name === "blocked" && (
            <div className="h-full w-full bg-slate-900" />
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
              <div className="z-10 flex h-8 w-8 items-center justify-center rounded-full bg-blue-700" />
            )}
          {MAP_TILE[grid].name === "push" && (
            <div className="z-10 h-8 w-8 bg-green-300" />
          )}
          {MAP_TILE[grid].name === "hole" && (
            <div className="z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black" />
          )}
          {MAP_TILE[grid].name === "goal" && (
            <div className="h-8 w-8 rounded-full text-center text-2xl text-black">
              G
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
