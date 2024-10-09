import { GridPiece } from "../../../_types";
import elendiel from "@/../public/playericons/elendiel.png";
import aelarion from "@/../public/playericons/aelarion.png";
import dinner from "@/../public/playericons/dinner.png";
import artemis from "@/../public/playericons/artemis.png";
import Image from "next/image";

export default function GridRow({
  row,
  rowIndex,
  playerPosition,
  MAP_TILE,
  character,
}: {
  row: number[];
  rowIndex: number;
  playerPosition: { x: number; y: number };
  MAP_TILE: Record<number, GridPiece>;
  character?: "dinner" | "artemis" | "aelarion" | "elendiel" | undefined;
}) {
  return (
    <div className="flex gap-1">
      {row.map((grid, colIndex) => (
        <GridTile
          key={colIndex}
          grid={MAP_TILE[grid]}
          rowIndex={rowIndex}
          colIndex={colIndex}
          playerPosition={playerPosition}
          character={character}
        />
      ))}
    </div>
  );
}

function GridTile({
  grid,
  rowIndex,
  colIndex,
  playerPosition,
  character
}: {
  grid: GridPiece;
  rowIndex: number;
  colIndex: number;
  playerPosition: { x: number; y: number };
  character: "dinner" | "artemis" | "aelarion" | "elendiel" | undefined;
}) {
  const characters = {
    dinner,
    artemis,
    aelarion,
    elendiel
  }
  return (
    <div className="flex h-10 w-10 items-center justify-center border border-black bg-slate-400">
      {grid.name === "blocked" && (
        <div className="h-full w-full bg-slate-900" />
      )}
      {rowIndex === playerPosition.x && colIndex === playerPosition.y && character && (
        <Image src={characters[character] } height={45} width={45} alt="player" />
      )}
      {rowIndex === playerPosition.x && colIndex === playerPosition.y && character === undefined && (
        <div className="z-10 flex h-8 w-8 items-center justify-center rounded-full bg-blue-700"/>
      )}
      {grid.name === "push" && <div className="z-10 h-8 w-8 bg-green-300" />}
      {grid.name === "hole" && (
        <div className="z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black" />
      )}
      {grid.name === "goal" && (
        <div className="h-8 w-8 rounded-full text-center text-2xl text-black">
          G
        </div>
      )}
    </div>
  );
}
