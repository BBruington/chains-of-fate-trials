import { GridPiece } from "../../../_types";

export default function GridRow({
  row,
  rowIndex,
  playerPosition,
  MAP_TILE,
}: {
  row: number[];
  rowIndex: number;
  playerPosition: { x: number; y: number };
  MAP_TILE: Record<number, GridPiece>;
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
}: {
  grid: GridPiece;
  rowIndex: number;
  colIndex: number;
  playerPosition: { x: number; y: number };
}) {
  return (
    <div className="flex h-12 w-12 items-center justify-center border border-black bg-slate-400">
      {grid.name === "blocked" && (
        <div className="h-full w-full bg-slate-900" />
      )}
      {rowIndex === playerPosition.x && colIndex === playerPosition.y && (
        <div className="h-8 w-8 rounded-full bg-blue-500" />
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
