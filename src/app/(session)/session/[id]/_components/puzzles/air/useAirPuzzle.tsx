import { useState, useEffect } from "react";
import { INITIAL_MAP, MAP_TILE, TILE_TYPES } from "../../../_constants";
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

  const isValidMove = ({
    dx,
    dy,
    isPushedObject,
  }: {
    dx: number;
    dy: number;
    isPushedObject?: boolean;
  }) => {
    if (dx < 0 || dx === rows || dy === columns || dy < 0) {
      return false;
    }
    const gridSpot = MAP_TILE[grid[dx][dy]];
    if (isPushedObject) {
      const validPushInto = {
        push: () => false,
        hole: () => true,
        goal: () => false,
        blocked: () => false,
        empty: () => true,
      };
      return (
        validPushInto[gridSpot.name as keyof typeof validPushInto] ||
        (() => false)
      )();
    }
    return gridSpot.isValidMove;
  };

  const movePushableObject = ({
    pushedFromDx,
    pushedFromDy,
    pushedToDx,
    pushedToDy,
  }: {
    pushedFromDx: number;
    pushedFromDy: number;
    pushedToDx: number;
    pushedToDy: number;
  }) => {
    if (!isValidMove({ dx: pushedToDx, dy: pushedToDy, isPushedObject: true })) return;
    let gridRef = grid;
    const gridTile = grid[pushedToDx][pushedToDy];
    const pushObjectInto = {
      [TILE_TYPES.EMPTY]: () => (gridRef[pushedToDx][pushedToDy] = TILE_TYPES.PUSHABLE),
      [TILE_TYPES.HOLE]: () => (gridRef[pushedToDx][pushedToDy] = TILE_TYPES.EMPTY),
    };
    //player moving into the tile is represented by coordinates being tracked and is not a tile on the board
    //therefore you can set the tile player is moving into as empty
    gridRef[pushedFromDx][pushedFromDy] = TILE_TYPES.EMPTY;
    if (gridTile === TILE_TYPES.EMPTY || gridTile === TILE_TYPES.HOLE) {
      pushObjectInto[gridTile as keyof typeof pushObjectInto]();
    }
    setGrid(gridRef);
  };

  const movePlayer = (dx: number, dy: number) => {
    const newX = playerPosition.x + dx;
    const newY = playerPosition.y + dy;
    if (!isValidMove({ dx: newX, dy: newY })) return;
    const tileMovedTo = grid[newX][newY];
    if (tileMovedTo === TILE_TYPES.PUSHABLE) {
      movePushableObject({
        pushedFromDx: dx,
        pushedFromDy: dy,
        pushedToDx: newX + dx,
        pushedToDy: newY + dy,
      });
    }
    setPlayerPosition({ x: newX, y: newY });
    if (tileMovedTo === TILE_TYPES.GOAL) {
      alert("You reached the goal!");
      revealInventoryItem(sessionId, "airgem", inventory, setInventory);
    }
  };

  return { grid, movePlayer, reset, playerPosition, MAP_TILE };
}
