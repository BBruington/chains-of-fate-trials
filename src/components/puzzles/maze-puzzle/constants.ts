import { GridPiece } from "./types";

export enum TILE_TYPES {
  EMPTY = 0,
  BLOCKED = 1,
  PUSHABLE = 2,
  GOAL = 3,
  HOLE = 4,
  BOMB = 5,
  DEPLOYED_BOMB = 6
}
const defaultTileProperties = {
  isValidMove: false,
  isDestructable: true,
};

export const GRID_TILE: Record<number, GridPiece> = {
  [TILE_TYPES.EMPTY]: {
    id: 0,
    ...defaultTileProperties,
    name: "empty",
    isValidMove: true,
    isDestructable: false,
  },
  [TILE_TYPES.BLOCKED]: {
    id: 1,
    ...defaultTileProperties,
    name: "blocked",
  },
  [TILE_TYPES.PUSHABLE]: {
    id: 2,
    ...defaultTileProperties,
    name: "push",
    isValidMove: true,
  },
  [TILE_TYPES.GOAL]: {
    id: 3,
    ...defaultTileProperties,
    name: "goal",
    isValidMove: true,
  },
  [TILE_TYPES.HOLE]: {
    id: 4,
    ...defaultTileProperties,
    name: "hole",
    isDestructable: false,
  },
  [TILE_TYPES.BOMB]: {
    id: 5,
    ...defaultTileProperties,
    name: "bomb",
    isValidMove: true,
  },
  [TILE_TYPES.DEPLOYED_BOMB]: {
    id: 6,
    ...defaultTileProperties,
    name: "deployed"
  }
};
