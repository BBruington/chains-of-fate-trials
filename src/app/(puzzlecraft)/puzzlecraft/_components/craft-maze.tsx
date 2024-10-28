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
import { ACTIVE_SIDEBAR, Maze, SIDEBAR_TOGGLE_ENUM } from "../types";
import BuildSideBar from "./build-side-bar";
import PlaySideBar from "./play-side-bar";

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
  const selectedEnemyDirection = useRef<Direction>(Direction.DOWN);

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
  const [currentSidebar, setCurrentSidebar] = useState(ACTIVE_SIDEBAR.EDITMODE);
  const editMapProperties = {
    updatedTile,
    updateMapTile,
    activeTileType,
    selectedPuzzle,
    enemyDirection: selectedEnemyDirection.current,
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
        <div className="flex h-full flex-col items-center space-y-3 bg-secondary p-2 min-w-96">
          <ToggleGroup
          className="flex justify-around w-full mb-5"
            onValueChange={(value) => {
              if (value) setCurrentSidebar(value as ACTIVE_SIDEBAR);
            }}
            type="single"
          >
            <ToggleGroupItem className="min-w-32 border" value={ACTIVE_SIDEBAR.PLAYMODE}>
              Play
            </ToggleGroupItem>
            <ToggleGroupItem className="min-w-32 border" value={ACTIVE_SIDEBAR.EDITMODE}>
              Edit
            </ToggleGroupItem>
          </ToggleGroup>
          {currentSidebar === ACTIVE_SIDEBAR.PLAYMODE && (
            <PlaySideBar
              playMaze={playMaze}
              playerPosition={playerPosition}
              player={mazeState.player}
              reset={reset}
            />
          )}
          {currentSidebar === ACTIVE_SIDEBAR.EDITMODE && (
            <BuildSideBar
              grid={grid}
              clerkId={clerkId}
              MazePuzzle={MazePuzzle}
              updatedTile={updatedTile}
              activeTileType={activeTileType}
              selectedPuzzle={selectedPuzzle.current}
              selectedEnemyDirection={selectedEnemyDirection.current}
              reset={reset}
              updateAxis={updateAxis}
              setUpdateTile={setUpdateTile}
              handleSelectMaze={handleSelectMaze}
              handleSaveChanges={handleSaveChanges}
              setActiveTileType={setActiveTileType}
            />
          )}
        </div>
      </div>
    </div>
  );
}
