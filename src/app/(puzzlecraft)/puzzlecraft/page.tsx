"use client";
import GridRow from "@/app/(session)/session/[id]/_components/puzzles/air/grid";
import useAirPuzzle from "@/app/(session)/session/[id]/_components/puzzles/air/useAirPuzzle";

export default function Page() {
  const { grid, movePlayer, reset, playerPosition, MAP_TILE } = useAirPuzzle({
  });
  return (
    <div>
      <div className="flex flex-col">
        {grid.map((row, rowIndex) => (
          <GridRow
            key={rowIndex}
            row={row}
            rowIndex={rowIndex}
            MAP_TILE={MAP_TILE}
            playerPosition={playerPosition}
          />
        ))}
      </div>
    </div>
  );
}
