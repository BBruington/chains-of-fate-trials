import { DEFAULT_MAP } from "@/app/(session)/session/[id]/_constants";

export const defaultCreatedMaze = {
  id: "created",
  playerX: 0,
  playerY: 0,
  rows: 10,
  columns: 10,
  grid: DEFAULT_MAP.flat(),
  enemies: [],
};
