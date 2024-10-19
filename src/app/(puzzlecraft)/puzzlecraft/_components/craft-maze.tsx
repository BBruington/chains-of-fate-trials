"use client";
import GridRow from "@/components/puzzles/maze-puzzle/grid";
import useMazePuzzle from "@/components/puzzles/maze-puzzle/useMazePuzzle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { saveMazePuzzle, deleteMazePuzzle } from "../actions";
import { DEFAULT_MAP } from "@/app/(session)/session/[id]/_constants";
import { MazePuzzle } from "../../../../../prisma/generated/zod";
import { cn } from "@/lib/utils";

type CraftMazeProperties = {
  clerkId: string;
  MazePuzzle: MazePuzzle[];
};

type Maze = {
  id: string;
  playerX: number;
  playerY: number;
  rows: number;
  columns: number;
  grid: number[];
  userId: string;
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

  return { playerStartingPosition: playerPosition, matrix };
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
  };

  const formattedPuzzle = formatPuzzle(
    MazePuzzle[0] ? MazePuzzle[0] : defaultCreatedMaze,
  );
  const {
    grid,
    GRID_TILE,
    player,
    deployedBombs,
    playerPosition,
    setGrid,
    setPlayerPosition,
    plantBomb,
    updateAxis,
    detonate,
    reset,
    updateMapTile,
  } = useMazePuzzle({
    mapLayout: formattedPuzzle.matrix,
    playerStartingPosition: formattedPuzzle.playerStartingPosition,
  });
  const [updatedTile, setUpdateTile] = useState(0);
  const selectedPuzzle = useRef(MazePuzzle[0] ? MazePuzzle[0].id : "created");
  const [isSettingPlayer, setIsSettingPlayer] = useState(false);
  const editMapProperties = {
    updatedTile,
    updateMapTile,
    isSettingPlayer,
  };

  const handleSetPlayerPosition = (event: boolean) => {
    if (event) setUpdateTile(0);
    setIsSettingPlayer(event);
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
      maze: {
        ...mazeProperties,
      },
      isCreated: selectedPuzzle.current === "created",
    });
  };

  const handlePlantBomb = () => {
    plantBomb({ dx: playerPosition.x, dy: playerPosition.y });
  };

  const handleDetonate = () => {
    detonate();
  };

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
              GRID_TILE={GRID_TILE}
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
          <Button className="w-1/2" onClick={reset}>
            Reset Grid to Default
          </Button>

          <Button disabled={deployedBombs.current.length === 0} onClick={handleDetonate}>Detonate</Button>
          <Button disabled={!player.hasBomb} onClick={handlePlantBomb}>Plant Bomb</Button>

          <div className="flex w-full justify-around">
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
            value={updatedTile.toString()}
            onValueChange={(value) => {
              if (value) setUpdateTile(Number(value));
            }}
          >
            {Object.keys(GRID_TILE).map((tile) => (
              <ToggleGroupItem
                className={cn("data-[state=on]:bg-black", GRID_TILE[Number(tile)].name === "deployed" && "hidden")}
                disabled={isSettingPlayer}
                key={tile}
                value={tile}
              >
                <p>{GRID_TILE[Number(tile)].name}</p>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          <div className="flex items-center justify-around">
            <h2>set player position</h2>
            <Toggle
              className="mx-2 data-[state=on]:bg-black"
              onPressedChange={(e) => handleSetPlayerPosition(e)}
            >
              Set Position
            </Toggle>
          </div>
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
