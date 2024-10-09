import { useState, useEffect, useRef } from "react";
import {
  INITIAL_MAP,
  DEFAULT_MAP,
  MAP_TILE,
  TILE_TYPES,
} from "../../../_constants";
import { useAtom } from "jotai";
import { inventoryItems } from "../../../jotaiAtoms";
import { revealInventoryItem } from "@/app/(session)/session/[id]/_hooks/hooks";

export default function useAirPuzzle({
  sessionId,
  mapLayout,
}: {
  sessionId?: string;
  mapLayout?: number[][];
}) {
  const [playerPosition, setPlayerPosition] = useState({
    x: 0,
    y: 0,
  });
  const mapRef = useRef<number[][] | null>(mapLayout ? mapLayout : null);
  const [grid, setGrid] = useState(
    mapRef.current
      ? mapRef.current.map((row) => [...row])
      : DEFAULT_MAP.map((row) => [...row]),
  );
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

  const updateMap = ({
    dx,
    dy,
    newTile,
  }: {
    dx: number;
    dy: number;
    newTile: number;
  }) => {
    if (mapRef.current) {
      mapRef.current[dx][dy] = newTile;
      setGrid(mapRef.current)
    }
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
    if (!isValidMove({ dx: pushedToDx, dy: pushedToDy, isPushedObject: true }))
      return false;
    let gridRef = grid;
    const gridTile = grid[pushedToDx][pushedToDy];
    const pushObjectInto = {
      [TILE_TYPES.EMPTY]: () =>
        (gridRef[pushedToDx][pushedToDy] = TILE_TYPES.PUSHABLE),
      [TILE_TYPES.HOLE]: () =>
        (gridRef[pushedToDx][pushedToDy] = TILE_TYPES.EMPTY),
    };
    //player moving into the tile is represented by coordinates being tracked and is not a tile on the board
    //therefore you can set the tile player is moving into as empty
    gridRef[pushedFromDx][pushedFromDy] = TILE_TYPES.EMPTY;
    if (gridTile === TILE_TYPES.EMPTY || gridTile === TILE_TYPES.HOLE) {
      pushObjectInto[gridTile as keyof typeof pushObjectInto]();
    }
    setGrid(gridRef);
    return true;
  };

  const movePlayer = (dx: number, dy: number) => {
    const newX = playerPosition.x + dx;
    const newY = playerPosition.y + dy;
    if (!isValidMove({ dx: newX, dy: newY })) return;
    const tileMovedTo = grid[newX][newY];
    if (tileMovedTo === TILE_TYPES.PUSHABLE) {
      const isValidPush = movePushableObject({
        pushedFromDx: newX,
        pushedFromDy: newY,
        pushedToDx: newX + dx,
        pushedToDy: newY + dy,
      });
      if (!isValidPush) return;
    }
    setPlayerPosition({ x: newX, y: newY });
    if (tileMovedTo === TILE_TYPES.GOAL) {
      alert("You reached the goal!");
      if (sessionId) {
        revealInventoryItem(sessionId, "airgem", inventory, setInventory);
      }
    }
  };

  return { grid, movePlayer, reset, playerPosition, MAP_TILE };
}
