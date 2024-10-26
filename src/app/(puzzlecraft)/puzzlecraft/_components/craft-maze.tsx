"use client";
import GridRow from "@/components/puzzles/maze-puzzle/grid";
import useMazePuzzle from "@/components/puzzles/maze-puzzle/useMazePuzzle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { saveMazePuzzle, deleteMazePuzzle } from "../actions";
import { DEFAULT_MAP } from "@/app/(session)/session/[id]/_constants";
import { cn } from "@/lib/utils";
import { Direction, type $Enums } from "@prisma/client";
import { GRID_TILE } from "@/components/puzzles/maze-puzzle/constants";
import { SIDEBAR_TOGGLE_ENUM } from "../types";

type CraftMazeProperties = {
  clerkId: string;
  MazePuzzle: ({
    enemies: {
      id: string;
      puzzleId: string;
      x: number;
      y: number;
      direction: $Enums.Direction;
    }[];
  } & {
    id: string;
    playerX: number;
    playerY: number;
    rows: number;
    columns: number;
    grid: number[];
    createdAt: Date;
    userId: string;
  })[];
};

type Maze = {
  id: string;
  playerX: number;
  playerY: number;
  rows: number;
  columns: number;
  grid: number[];
  userId: string;
  enemies: {
    id: string;
    puzzleId: string;
    x: number;
    y: number;
    direction: $Enums.Direction;
  }[];
};

const formatPuzzle = (mazePuzzle?: Maze) => {
  if (!mazePuzzle) {
    return { playerStartingPosition: { x: 0, y: 0 }, matrix: DEFAULT_MAP };
  }
  const playerPosition = { x: mazePuzzle.playerX, y: mazePuzzle.playerY };
  const matrix = [];

  for (let i = 0; i < mazePuzzle.grid.length; i += mazePuzzle.columns) {
    matrix.push(mazePuzzle.grid.slice(i, i + mazePuzzle.columns));
  }

  return {
    playerStartingPosition: playerPosition,
    matrix,
    enemies: mazePuzzle.enemies,
  };
};

export default function CraftMaze({
  MazePuzzle,
  clerkId,
}: CraftMazeProperties) {
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

  const formattedPuzzle = formatPuzzle(
    MazePuzzle[0] ? MazePuzzle[0] : defaultCreatedMaze,
  );
  const selectedPuzzle = useRef(MazePuzzle[0] ? MazePuzzle[0].id : "created");
  const selectedEnemyDirection = useRef<Direction>(Direction.DOWN)

  const { playMaze, mazeState, buildMaze, reset } = useMazePuzzle({
    selectedMazeId: selectedPuzzle.current ? selectedPuzzle.current : undefined,
    gameGridDetails: {
      mapLayout: formattedPuzzle.matrix,
      playerStartingPosition: formattedPuzzle.playerStartingPosition,
      allEnemies: formattedPuzzle.enemies ? formattedPuzzle.enemies : [],
    },
  });
  const { grid, setGrid, enemies, playerPosition, setPlayerPosition } =
    mazeState;
  const { updateMapTile, updateAxis } = buildMaze;
  const [updatedTile, setUpdateTile] = useState(0);
  const [activeTileType, setActiveTileType] = useState(
    SIDEBAR_TOGGLE_ENUM.TILE_TYPE,
  );
  const editMapProperties = {
    updatedTile,
    updateMapTile,
    activeTileType,
    selectedPuzzle,
    enemyDirection: selectedEnemyDirection.current,
  };

  const handleSetPlayerPosition = (event: boolean) => {
    if (event) {
      setUpdateTile(0);
      setActiveTileType(SIDEBAR_TOGGLE_ENUM.PLAYER_POSITION);
    }
  };

  const handleSelectMaze = (maze: Maze) => {
    const formatted = formatPuzzle(maze);
    const { matrix, playerStartingPosition } = formatted;
    selectedPuzzle.current = maze.id;
    const updatedGrid = matrix.map((row) => row.map((tile) => GRID_TILE[tile]));
    setGrid(updatedGrid);
    setPlayerPosition({
      x: playerStartingPosition.x,
      y: playerStartingPosition.y,
    });
  };

  const handleDeletePuzzle = async () => {
    await deleteMazePuzzle({ id: selectedPuzzle.current });
    handleSelectMaze(MazePuzzle[0] ? MazePuzzle[0] : defaultCreatedMaze);
  };

  const handleSaveChanges = async () => {
    const mazeProperties =
      selectedPuzzle.current === "created"
        ? { ...defaultCreatedMaze }
        : {
            grid: grid.flat().map((tile) => tile.id),
            columns: grid[0].length,
            rows: grid.length,
            playerX: playerPosition.x,
            playerY: playerPosition.y,
            userId: clerkId,
            id: selectedPuzzle.current,
          };
    await saveMazePuzzle({
      maze: mazeProperties,
      isCreated: selectedPuzzle.current === "created",
      allEnemies: enemies.current.length > 0 ? enemies.current : undefined,
    });
  };

  // const handlePlantBomb = () => {
  //   plantBomb({ x: playerPosition.x, y: playerPosition.y });
  // };

  // const handleDetonate = () => {
  //   detonateBomb();
  // };

  return (
    <div className="flex h-full flex-1 flex-col">
      <div className="flex h-full justify-between">
        {/* grid */}
        <div className="m-5 flex w-full flex-col items-center">
          {grid.map((row, rowIndex) => (
            <GridRow
              key={rowIndex}
              row={row}
              rowIndex={rowIndex}
              allEnemies={enemies}
              playerPosition={playerPosition}
              editMapProperties={editMapProperties}
            />
          ))}
          <div className="mt-5 flex justify-center space-x-3">
            {MazePuzzle.map((puzzle, index) => (
              <Button onClick={() => handleSelectMaze(puzzle)} key={puzzle.id}>
                {index + 1}
              </Button>
            ))}
            <Button
              onClick={() => {
                handleSelectMaze(defaultCreatedMaze);
                handleSaveChanges();
              }}
            >
              +
            </Button>
          </div>
        </div>
        {/* side bar */}
        <div className="flex h-full flex-col items-center space-y-3 bg-secondary p-2">
          <h2 className="text-xl">Add Tiles to the Map</h2>
          <div className="flex w-full flex-col bg-primary-foreground">
            <div className="flex w-full items-center justify-around border-b">
              <Toggle
                className="mx-2 data-[state=on]:bg-secondary"
                pressed={
                  activeTileType === SIDEBAR_TOGGLE_ENUM.PLAYER_POSITION
                }
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
                  disabled={
                    activeTileType !== SIDEBAR_TOGGLE_ENUM.TILE_TYPE
                  }
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
              pressed={
                activeTileType === SIDEBAR_TOGGLE_ENUM.ENEMY_POSITION
              }
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
                if (value) selectedEnemyDirection.current = value as Direction;
              }}
            >
              <ToggleGroupItem
                disabled={
                  activeTileType !== SIDEBAR_TOGGLE_ENUM.ENEMY_POSITION
                }
                value={Direction.UP}
              >
                Up
              </ToggleGroupItem>
              <ToggleGroupItem
                disabled={
                  activeTileType !== SIDEBAR_TOGGLE_ENUM.ENEMY_POSITION
                }
                value={Direction.DOWN}
              >
                Down
              </ToggleGroupItem>
              <ToggleGroupItem
                disabled={
                  activeTileType !== SIDEBAR_TOGGLE_ENUM.ENEMY_POSITION
                }
                value={Direction.LEFT}
              >
                Left
              </ToggleGroupItem>
              <ToggleGroupItem
                disabled={
                  activeTileType !== SIDEBAR_TOGGLE_ENUM.ENEMY_POSITION
                }
                value={Direction.RIGHT}
              >
                Right
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          {/* <div className="flex justify-around space-x-5">
            <Button
              disabled={deployedBombs.current.length === 0}
              onClick={handleDetonate}
            >
              detonateBomb
            </Button>
            <Button disabled={!player.hasBomb} onClick={handlePlantBomb}>
              Plant Bomb
            </Button>
          </div> */}

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
        </div>
      </div>
    </div>
  );
}
