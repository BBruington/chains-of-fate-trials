import { Maze } from "@/app/(puzzlecraft)/puzzlecraft/types";
import { DEFAULT_MAP } from "@/app/(session)/session/[id]/_constants";

export function formatPuzzle(mazePuzzle?: Maze) {
  if (!mazePuzzle) {
    return { playerStartingPosition: { x: 0, y: 0 }, matrix: DEFAULT_MAP };
  }
  const playerPosition = { x: mazePuzzle.playerX, y: mazePuzzle.playerY };
  const matrix = [];

  for (let i = 0; i < mazePuzzle.grid.length; i += mazePuzzle.columns) {
    matrix.push(mazePuzzle.grid.slice(i, i + mazePuzzle.columns));
  }
  return {
    id: mazePuzzle.id,
    playerStartingPosition: playerPosition,
    matrix,
    enemies: mazePuzzle.enemies,
  };
}
