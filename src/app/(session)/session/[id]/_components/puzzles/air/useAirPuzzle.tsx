import { useState, useEffect } from "react";
import {
  INITIAL_MAP,
  MAP_TILE,
} from "../../../_constants";
import { useAtom } from "jotai";
import { inventoryItems } from "../../../jotaiAtoms";
import { revealInventoryItem } from "@/app/(session)/session/[id]/_hooks/hooks";

export default function useAirPuzzle({ sessionId }: { sessionId: string }) {
  const [playerPosition, setPlayerPosition] = useState({
    x: 0,
    y: 0,
  });
  const [grid, setGrid] = useState(INITIAL_MAP.map((row) => [...row]));
  const [inventory, setInventory] = useAtom(inventoryItems);

  const handleKeyPress = (e: KeyboardEvent) => {
    switch (e.key) {
      case "w":
        movePlayer(-1, 0);
        break;
      case "s":
        movePlayer(1, 0);
        break;
      case "a":
        movePlayer(0, -1);
        break;
      case "d":
        movePlayer(0, 1);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [playerPosition]);

  const columns = grid[0].length;
  const rows = grid.length;

  const reset = () => {
    setGrid(INITIAL_MAP.map((row) => [...row]));
    setPlayerPosition({ x: 0, y: 0 });
  };

  const isInvalidMove = ({
    dx,
    dy,
    isPushedObject,
  }: {
    dx: number;
    dy: number;
    isPushedObject?: boolean;
  }) => {
    if (dx < 0 || dx === rows || dy === columns || dy < 0) {
      return true;
    }
    const gridSpot = MAP_TILE[grid[dx][dy]];
    if (isPushedObject) {
      const invalidTiles = {
        push: () => true,
        hole: () => false,
        goal: () => true,
        blocked: () => true,
        empty: () => false,
      };
      return invalidTiles[gridSpot.name as keyof typeof invalidTiles]();
    }
    if (gridSpot.validMove === false) {
      return true;
    }
    return false;
  };

  const movePlayer = (dx: number, dy: number) => {
    const newX = playerPosition.x + dx;
    const newY = playerPosition.y + dy;
    if (isInvalidMove({ dx: newX, dy: newY })) {
      return;
    }
    const tileMovedTo = grid[newX][newY];
    //2 = pushable object
    if (tileMovedTo === 2) {
      if (
        isInvalidMove({ dx: newX + dx, dy: newY + dy, isPushedObject: true })
      ) {
        return;
      }
      let gridRef = grid;
      const gridTile = grid[newX + dx][newY + dy];
      const pushObjectInto = {
        //0 = empty space
        //4 = fillable hole
        0: () => (gridRef[newX + dx][newY + dy] = 2),
        4: () => (gridRef[newX + dx][newY + dy] = 0),
      };
      gridRef[newX][newY] = 0;
      if (gridTile === 0 || gridTile === 4) {
        pushObjectInto[gridTile]();
      }
      setGrid(gridRef);
    }
    setPlayerPosition({ x: newX, y: newY });
    //3 = goal
    if (tileMovedTo === 3) {
      alert("You reached the goal!");
      revealInventoryItem(sessionId, "airgem", inventory, setInventory);
    }
  };

  return { grid, movePlayer, reset, playerPosition, MAP_TILE };
}
