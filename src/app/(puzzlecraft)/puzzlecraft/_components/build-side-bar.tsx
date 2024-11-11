import { GRID_TILE } from "@/components/puzzles/maze-puzzle/constants";
import { cn } from "@/lib/utils";
import { Direction } from "@prisma/client";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { BuildSideBarProps, SIDEBAR_TOGGLE_ENUM } from "../types";
import { deleteMazePuzzle } from "../actions";
import { DEFAULT_MAP } from "@/app/(session)/session/[id]/_constants";

export default function BuildSideBar({
  grid,
  clerkId,
  MazePuzzle,
  updatedTile,
  selectedMazeId,
  activeTileType,
  reset,
  updateAxis,
  setUpdateTile,
  handleSelectMaze,
  setActiveTileType,
  handleSaveChanges,
  setSelectedEnemyDirection,
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
    await deleteMazePuzzle({ id: selectedMazeId });
    handleSelectMaze(MazePuzzle[0] ? MazePuzzle[0] : defaultCreatedMaze);
  };
  return (
    <>
      <h2 className="text-xl">Add Tiles to the Map</h2>
      <div className="flex w-full flex-col bg-primary-foreground p-2">
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
                "data-[state=on]:bg-secondary text-xs",
                GRID_TILE[Number(tile)].name === "deployed" && "hidden",
              )}
              disabled={activeTileType !== SIDEBAR_TOGGLE_ENUM.TILE_TYPE}
              key={tile}
              value={tile}
            >
              {GRID_TILE[Number(tile)].name}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      <div className="flex w-full flex-col items-center bg-primary-foreground">
        <div className="flex">
          <Toggle
          className="w-32"
            pressed={activeTileType === SIDEBAR_TOGGLE_ENUM.PLACE_ENEMY}
            onPressedChange={(e) => {
              if (e) {
                setUpdateTile(0);
                setActiveTileType(SIDEBAR_TOGGLE_ENUM.PLACE_ENEMY);
              } else {
                setActiveTileType(SIDEBAR_TOGGLE_ENUM.TILE_TYPE);
              }
            }}
          >
            Place Enemy
          </Toggle>
          <Toggle
          className="w-32"
            pressed={activeTileType === SIDEBAR_TOGGLE_ENUM.REMOVE_ENEMY}
            onPressedChange={(e) => {
              if (e) {
                setUpdateTile(0);
                setActiveTileType(SIDEBAR_TOGGLE_ENUM.REMOVE_ENEMY);
              } else {
                setActiveTileType(SIDEBAR_TOGGLE_ENUM.TILE_TYPE);
              }
            }}
          >
            Remove Enemy
          </Toggle>
        </div>
        <ToggleGroup
          className="flex w-full justify-around"
          type="single"
          onValueChange={(value) => {
            if (value) setSelectedEnemyDirection(value as Direction);
          }}
        >
          <ToggleGroupItem
            disabled={activeTileType !== SIDEBAR_TOGGLE_ENUM.PLACE_ENEMY}
            value={Direction.UP}
          >
            Up
          </ToggleGroupItem>
          <ToggleGroupItem
            disabled={activeTileType !== SIDEBAR_TOGGLE_ENUM.PLACE_ENEMY}
            value={Direction.DOWN}
          >
            Down
          </ToggleGroupItem>
          <ToggleGroupItem
            disabled={activeTileType !== SIDEBAR_TOGGLE_ENUM.PLACE_ENEMY}
            value={Direction.LEFT}
          >
            Left
          </ToggleGroupItem>
          <ToggleGroupItem
            disabled={activeTileType !== SIDEBAR_TOGGLE_ENUM.PLACE_ENEMY}
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
