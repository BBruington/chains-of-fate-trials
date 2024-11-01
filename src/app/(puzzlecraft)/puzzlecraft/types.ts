import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { Direction } from "@prisma/client";
import { coordinates, GridPiece } from "@/components/puzzles/maze-puzzle/types";

export type SelectedMazeType = {
  id: string;
  playerX: number;
  playerY: number;
  rows: number;
  columns: number;
  grid: number[];
  userId: string;
};

export enum PuzzleCraftEnums {
  EMPTY = "EMPTY",
  MAZE = "MAZE",
}

export enum SIDEBAR_TOGGLE_ENUM {
  PLAYER_POSITION = "PLAYER_POSITION",
  PLACE_ENEMY = "PLACE_ENEMY",
  REMOVE_ENEMY = "REMOVE_ENEMY",
  TILE_TYPE = "TILE_TYPE",
}

export enum ACTIVE_SIDEBAR_ENUM {
  PLAYMODE = "PLAYMODE",
  EDITMODE = "EDITMODE",
  CREATE_SESSION = "CREATE_SESSION",
}

export type Maze = {
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
    direction: Direction;
  }[];
};

export type PlaySideBarProps = {
  playMaze: {
    movePlayer: (x: number, y: number, direction: Direction) => void;
    detonateBomb: () => void;
    plantBomb: ({ x, y }: { x: number; y: number }) => void;
    deployedBombs: MutableRefObject<coordinates[]>;
  };
  reset: () => void;
  player: {
    hasBomb: boolean;
    lastDirectionMoved: null | Direction;
  };
  playerPosition: {
    x: number;
    y: number;
  };
};

export type BuildSideBarProps = {
  updateAxis: ({ x, y }: { x: number; y: number }) => void;
  setUpdateTile: Dispatch<SetStateAction<number>>;
  setActiveTileType: Dispatch<SetStateAction<SIDEBAR_TOGGLE_ENUM>>;
  reset: () => void;
  handleSaveChanges: () => Promise<void>;
  handleSelectMaze: (maze: Maze) => void;
  activeTileType: SIDEBAR_TOGGLE_ENUM;
  selectedPuzzle: string;
  updatedTile: number;
  setSelectedEnemyDirection: Dispatch<SetStateAction<Direction>>;
  clerkId: string;
  grid: GridPiece[][];
  MazePuzzle: Maze[];
};
