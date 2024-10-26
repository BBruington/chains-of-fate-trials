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
  MAZE = "MAZE"
}

export enum SIDEBAR_TOGGLE_ENUM {
  PLAYER_POSITION = "PLAYER_POSITION",
  ENEMY_POSITION = "ENEMY_POSITION",
  TILE_TYPE = "TILE_TYPE",
}