import { GRID_TILE } from "@/components/puzzles/maze-puzzle/constants";
import grid from "@/components/puzzles/maze-puzzle/grid";
import { cn } from "@/lib/utils";
import { Direction } from "@prisma/client";
import { Toggle } from "@radix-ui/react-toggle";
import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group";
import React from "react";
import { Button } from "@/components/ui/button";
import { BuildSideBarProps, SIDEBAR_TOGGLE_ENUM } from "../types";
import { deleteMazePuzzle } from "../actions";
import { DEFAULT_MAP } from "@/app/(session)/session/[id]/_constants";

export default function BuildSideBar({
  activeTileType,
  setUpdateTile,
  setActiveTileType,
  selectedPuzzle,
  MazePuzzle,
  updatedTile,
  clerkId,
  selectedEnemyDirection,
  handleSelectMaze,
  updateAxis,
  grid,
  reset,
  handleSaveChanges,
}: BuildSideBarProps) {
  const defaultCreatedMaze = {
    id: "created",
    playerX: 0,
    playerY: 0,
    rows: 10,
    columns: 10,
    grid: DEFAULT_MAP.flat(),
    userId: clerkId,
    enemies: [],
  };
  const handleDeletePuzzle = async () => {
    await deleteMazePuzzle({ id: selectedPuzzle });
    handleSelectMaze(MazePuzzle[0] ? MazePuzzle[0] : defaultCreatedMaze);
  };
  return (
    <>
      <h2 className="text-xl">Add Tiles to the Map</h2>
      <div className="flex w-full flex-col bg-primary-foreground">
        <div className="flex w-full items-center justify-around border-b">
          <Toggle
            className="mx-2 data-[state=on]:bg-secondary"
            pressed={activeTileType === SIDEBAR_TOGGLE_ENUM.PLAYER_POSITION}
            onPressedChange={(e) => {
              if (e) {
                setUpdateTile(0);
                setActiveTileType(SIDEBAR_TOGGLE_ENUM.PLAYER_POSITION);
              } else {
                setActiveTileType(SIDEBAR_TOGGLE_ENUM.TILE_TYPE);
              }
            }}
          >
            Player Position
          </Toggle>
        </div>
        <ToggleGroup
          type="single"
          value={updatedTile.toString()}
          onValueChange={(value) => {
            if (value) setUpdateTile(Number(value));
          }}
        >
          {Object.keys(GRID_TILE).map((tile) => (
            <ToggleGroupItem
              className={cn(
                "data-[state=on]:bg-secondary",
                GRID_TILE[Number(tile)].name === "deployed" && "hidden",
              )}
              disabled={activeTileType !== SIDEBAR_TOGGLE_ENUM.TILE_TYPE}
              key={tile}
              value={tile}
            >
              <p>{GRID_TILE[Number(tile)].name}</p>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      <div className="flex w-full flex-col items-center bg-primary-foreground">
        <Toggle
          pressed={activeTileType === SIDEBAR_TOGGLE_ENUM.ENEMY_POSITION}
          onPressedChange={(e) => {
            if (e) {
              setUpdateTile(0);
              setActiveTileType(SIDEBAR_TOGGLE_ENUM.ENEMY_POSITION);
            } else {
              setActiveTileType(SIDEBAR_TOGGLE_ENUM.TILE_TYPE);
            }
          }}
          className="flex w-full justify-center border-b py-2 text-sm"
        >
          Set Enemy
        </Toggle>
        <ToggleGroup
          type="single"
          onValueChange={(value) => {
            if (value) selectedEnemyDirection = value as Direction;
          }}
        >
          <ToggleGroupItem
            disabled={activeTileType !== SIDEBAR_TOGGLE_ENUM.ENEMY_POSITION}
            value={Direction.UP}
          >
            Up
          </ToggleGroupItem>
          <ToggleGroupItem
            disabled={activeTileType !== SIDEBAR_TOGGLE_ENUM.ENEMY_POSITION}
            value={Direction.DOWN}
          >
            Down
          </ToggleGroupItem>
          <ToggleGroupItem
            disabled={activeTileType !== SIDEBAR_TOGGLE_ENUM.ENEMY_POSITION}
            value={Direction.LEFT}
          >
            Left
          </ToggleGroupItem>
          <ToggleGroupItem
            disabled={activeTileType !== SIDEBAR_TOGGLE_ENUM.ENEMY_POSITION}
            value={Direction.RIGHT}
          >
            Right
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="flex w-full justify-around">
        <div className="flex flex-col items-center">
          <h2>Columns</h2>
          <div className="flex">
            <Button
              className="mr-2"
              onClick={() =>
                updateAxis({ x: grid[0].length - 1, y: grid.length })
              }
            >
              -
            </Button>
            <Button
              onClick={() =>
                updateAxis({ x: grid[0].length + 1, y: grid.length })
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
              className="mr-2"
              onClick={() =>
                updateAxis({ x: grid[0].length, y: grid.length - 1 })
              }
            >
              -
            </Button>
            <Button
              onClick={() =>
                updateAxis({ x: grid[0].length, y: grid.length + 1 })
              }
            >
              +
            </Button>
          </div>
        </div>
      </div>
      <Button className="w-1/2" onClick={reset}>
        Reset Grid to Default
      </Button>
      <div className="flex justify-around space-x-5">
        <Button onClick={handleSaveChanges}>Save Changes</Button>
        <Button variant={"destructive"} onClick={handleDeletePuzzle}>
          Delete Puzzle
        </Button>
      </div>
    </>
  );
}
