"use client";
import MazeGrid from "@/components/puzzles/maze-puzzle/grid";
import useMazePuzzle from "@/components/puzzles/maze-puzzle/useMazePuzzle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { saveMazePuzzle } from "../actions";
import { Direction } from "@prisma/client";
import { GRID_TILE } from "@/components/puzzles/maze-puzzle/constants";
import { ACTIVE_SIDEBAR_ENUM, Maze, SIDEBAR_TOGGLE_ENUM } from "../types";
import LostDialog from "./lost-dialog";
import BuildSideBar from "./build-side-bar";
import PlaySideBar from "./play-side-bar";
import SessionSideBar from "./session-side-bar";
import { defaultCreatedMaze } from "../constants";
import { useAtom } from "jotai";
import { craftMode, maze } from "../../jotaiAtoms";
import { formatPuzzle } from "@/components/puzzles/maze-puzzle/utils";

type CraftMazeProperties = {
  clerkId: string;
  MazeSessions: ({
    Mazes: Maze[];
  } & {
    id: string;
    userId: string;
    title: string;
  })[];
  MazePuzzle: Maze[];
};

export default function CraftMaze({
  MazePuzzle,
  MazeSessions,
  clerkId,
}: CraftMazeProperties) {
  const [selectedMaze, setSelectedMaze] = useAtom(maze);
  const [isCraftMode, setIsCraftMode] = useAtom(craftMode);
  const [selectedEnemyDirection, setSelectedEnemyDirection] =
    useState<Direction>(Direction.DOWN);
  const [isFailed, setIsFailed] = useState(false);
  const [updatedTile, setUpdateTile] = useState(0);
  const [activeTileType, setActiveTileType] = useState(
    SIDEBAR_TOGGLE_ENUM.TILE_TYPE,
  );

  const formattedPuzzle = formatPuzzle(selectedMaze);
  const { playMaze, mazeState, buildMaze, reset } = useMazePuzzle({
    selectedMazeId: selectedMaze.id !== "created" ? selectedMaze.id : undefined,
    gameGridDetails: {
      mode: isCraftMode,
      setIsFailed,
      mapLayout: formattedPuzzle.matrix,
      playerStartingPosition: formattedPuzzle.playerStartingPosition,
      allEnemies: formattedPuzzle.enemies ? formattedPuzzle.enemies : [],
    },
  });
  const { grid, setGrid, enemies, playerPosition, mapRef, setPlayerPosition } =
    mazeState;
  const { updateMapTile, updateAxis } = buildMaze;
  const editMapProperties = {
    updatedTile,
    updateMapTile,
    activeTileType,
    enemyDirection: selectedEnemyDirection,
  };

  const handleSelectMaze = (maze: Maze) => {
    const formatted = formatPuzzle(maze);
    const { matrix, playerStartingPosition } = formatted;
    mapRef.current = formatted.matrix.map((row) =>
      row.map((tile) => GRID_TILE[tile]),
    );
    const updatedGrid = matrix.map((row) => row.map((tile) => GRID_TILE[tile]));
    setSelectedMaze(maze);
    setGrid(updatedGrid);
    setPlayerPosition({
      x: playerStartingPosition.x,
      y: playerStartingPosition.y,
    });
    enemies.current = maze.enemies;
  };

  const handleSaveChanges = async () => {
    const mazeProperties =
      selectedMaze.id === "created"
        ? { ...defaultCreatedMaze, userId: clerkId }
        : {
            grid: grid.flat().map((tile) => tile.id),
            columns: grid[0].length,
            rows: grid.length,
            playerX: playerPosition.x,
            playerY: playerPosition.y,
            userId: clerkId,
            id: selectedMaze.id,
          };
    await saveMazePuzzle({
      maze: mazeProperties,
      isCreated: selectedMaze.id === "created",
      allEnemies: enemies.current || undefined,
    });
  };

  return (
    <div className="flex h-full flex-1 flex-col">
      <LostDialog reset={reset} isFailed={isFailed} setIsFailed={setIsFailed} />
      <div className="flex h-full justify-between">
        {/* grid */}
        <div className="m-5 flex w-full flex-col items-center">
          {grid.map((row, rowIndex) => (
            <MazeGrid
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
                handleSelectMaze({ ...defaultCreatedMaze, userId: clerkId });
                handleSaveChanges();
              }}
            >
              +
            </Button>
          </div>
        </div>
        {/* side bar */}
        <div className="flex h-full min-w-96 flex-col items-center space-y-3 bg-secondary p-2">
          <ToggleGroup
            className="mb-5 flex w-full justify-around"
            onValueChange={(value) => {
              reset();
              setIsCraftMode(value as ACTIVE_SIDEBAR_ENUM);
            }}
            type="single"
          >
            <ToggleGroupItem
              className="min-w-32 border"
              value={ACTIVE_SIDEBAR_ENUM.PLAYMODE}
            >
              Play
            </ToggleGroupItem>
            <ToggleGroupItem
              className="min-w-32 border"
              value={ACTIVE_SIDEBAR_ENUM.EDITMODE}
            >
              Edit
            </ToggleGroupItem>
            <ToggleGroupItem
              className="min-w-32 border"
              value={ACTIVE_SIDEBAR_ENUM.CREATE_SESSION}
            >
              Create a Session
            </ToggleGroupItem>
          </ToggleGroup>
          {isCraftMode === ACTIVE_SIDEBAR_ENUM.CREATE_SESSION && (
            <SessionSideBar
              handleSelectMaze={handleSelectMaze}
              selectedMazeId={selectedMaze.id}
              MazeSessions={MazeSessions}
              clerkId={clerkId}
            />
          )}
          {isCraftMode === ACTIVE_SIDEBAR_ENUM.PLAYMODE && (
            <PlaySideBar
              playMaze={playMaze}
              playerPosition={playerPosition}
              player={mazeState.player}
              reset={reset}
            />
          )}
          {isCraftMode === ACTIVE_SIDEBAR_ENUM.EDITMODE && (
            <BuildSideBar
              grid={grid}
              clerkId={clerkId}
              MazePuzzle={MazePuzzle}
              updatedTile={updatedTile}
              activeTileType={activeTileType}
              selectedMazeId={selectedMaze.id}
              setSelectedEnemyDirection={setSelectedEnemyDirection}
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
