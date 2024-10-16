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