"use client";
import GridRow from "@/app/(session)/session/[id]/_components/puzzles/air/grid";
import useAirPuzzle from "@/app/(session)/session/[id]/_components/puzzles/air/useAirPuzzle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function Page() {
  const {
    grid,
    movePlayer,
    updateAxis,
    reset,
    updateMapTile,
    playerPosition,
    MAP_TILE,
  } = useAirPuzzle({
    mapLayout: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    playerStartingPosition: {x:0, y: 3}
  });
  const [updateTile, setUpdateTile] = useState(0);
  const editMapProperties = { updateTile, updateMapTile };
  return (
    <div className="flex justify-between">
      <div className="flex flex-col">
        {grid.map((row, rowIndex) => (
          <GridRow
            key={rowIndex}
            row={row}
            rowIndex={rowIndex}
            MAP_TILE={MAP_TILE}
            playerPosition={playerPosition}
            editMapProperties={editMapProperties}
          />
        ))}
      </div>
      <div className="flex flex-col">
        <Button onClick={reset}>Reset</Button>
        <div className="flex justify-between">
          <div className="flex flex-col items-center">
            <h2>Columns</h2>
            <div className="flex">
              <Button
                onClick={() =>
                  updateAxis({ dx: grid[0].length - 1, dy: grid.length })
                }
              >
                -
              </Button>
              <Button
                onClick={() =>
                  updateAxis({ dx: grid[0].length + 1, dy: grid.length })
                }
              >
                +
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center">
            {" "}
            <h2>Rows</h2>
            <div className="flex">
              <Button
                onClick={() =>
                  updateAxis({ dx: grid[0].length, dy: grid.length - 1 })
                }
              >
                -
              </Button>
              <Button
                onClick={() =>
                  updateAxis({ dx: grid[0].length, dy: grid.length + 1 })
                }
              >
                +
              </Button>
            </div>
          </div>
        </div>
        <ToggleGroup
          type="single"
          value={updateTile.toString()}
          onValueChange={(value) => {
            if (value) setUpdateTile(Number(value));
          }}
        >
          {Object.keys(MAP_TILE).map((tile) => (
            <ToggleGroupItem key={tile} value={tile}>
              <p>{MAP_TILE[Number(tile)].name}</p>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <div className="flex">
          <h2>set player position</h2>
          <Input placeholder="X" type="number"  className="w-20"/>
          <Input placeholder="Y" type="number" className="w-20"/>
        </div>
      </div>
    </div>
  );
}
