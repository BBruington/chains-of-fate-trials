"use client";
import GridRow from "@/app/(session)/session/[id]/_components/puzzles/air/grid";
import useAirPuzzle from "@/app/(session)/session/[id]/_components/puzzles/air/useAirPuzzle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { saveMazePuzzle } from "../actions";

type CraftMazeProperties = {
  userPuzzles: {
    MazePuzzle: {
      id: string;
      playerX: number;
      playerY: number;
      rows: number;
      columns: number;
      grid: number[];
      userId: string;
    }[];
  };
};
const formatPuzzle = (mazePuzzle: {
  id: string;
  playerX: number;
  playerY: number;
  rows: number;
  columns: number;
  grid: number[];
  userId: string;
}) => {
  const playerPosition = { x: mazePuzzle.playerX, y: mazePuzzle.playerY };
  const matrix = [];

  for (let i = 0; i < mazePuzzle.grid.length; i += mazePuzzle.columns) {
    matrix.push(mazePuzzle.grid.slice(i, i + mazePuzzle.columns));
  }

  return { playerStartingPosition: playerPosition, matrix };
};

export default function CraftMaze({ userPuzzles }: CraftMazeProperties) {
  const formattedPuzzle = formatPuzzle(userPuzzles?.MazePuzzle[0]);
  const {
    grid,
    updateAxis,
    reset,
    updateMapTile,
    playerPosition,
    MAP_TILE,
  } = useAirPuzzle({
    mapLayout: formattedPuzzle.matrix,
    playerStartingPosition: formattedPuzzle.playerStartingPosition,
  });
  const [updateTile, setUpdateTile] = useState(0);
  const [isSettingPlayer, setIsSettingPlayer] = useState(false);
  const editMapProperties = { updateTile, updateMapTile, isSettingPlayer };

  const handleSetPlayerPosition = (event: boolean) => {
    if (event) setUpdateTile(0);
    setIsSettingPlayer(event);
  };

  const handleSaveChanges = async () => {
    await saveMazePuzzle({
      id: userPuzzles.MazePuzzle[0].id,
      userId: userPuzzles.MazePuzzle[0].userId,
      playerX: playerPosition.x,
      playerY: playerPosition.y,
      rows: grid.length,
      columns: grid[0].length,
      grid: grid.flat()
    })
  }

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
        <Button onClick={handleSaveChanges}>Save Changes</Button>
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
            <ToggleGroupItem disabled={isSettingPlayer} key={tile} value={tile}>
              <p>{MAP_TILE[Number(tile)].name}</p>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <div className="flex">
          <h2>set player position</h2>
          <Toggle onPressedChange={(e) => handleSetPlayerPosition(e)}>
            Set Position
          </Toggle>
        </div>
      </div>
    </div>
  );
}
