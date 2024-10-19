import { useState, useEffect, useRef } from "react";
import { DEFAULT_MAP } from "../../../app/(session)/session/[id]/_constants";
import { useAtom } from "jotai";
import { inventoryItems } from "../../../app/(session)/session/[id]/jotaiAtoms";
import { revealInventoryItem } from "@/app/(session)/session/[id]/_hooks/hooks";
import { GRID_TILE, TILE_TYPES } from "./constants";
import { GridPiece } from "./types";

export default function useMazePuzzle({
  sessionId,
  mapLayout,
  playerStartingPosition,
}: {
  sessionId?: string;
  mapLayout?: number[][];
  playerStartingPosition?: { x: number; y: number };
}) {
  const [player, setPlayer] = useState({
    hasBomb: false,
  });
  const [playerPosition, setPlayerPosition] = useState(
    playerStartingPosition
      ? playerStartingPosition
      : {
          x: 0,
          y: 0,
        },
  );
  type coordinates = {
    x: number;
    y: number;
  };
  const deployedBombs = useRef<coordinates[]>([]);
  const mapRef = useRef<GridPiece[][] | null>(
    mapLayout
      ? mapLayout.map((row) => row.map((tile) => GRID_TILE[tile]))
      : null,
  );
  const [grid, setGrid] = useState(
    mapRef.current
      ? mapRef.current.map((row) => row.map((tile) => tile))
      : DEFAULT_MAP.map((row) => row.map((tile) => GRID_TILE[tile])),
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

  const reset = () => {
    deployedBombs.current = []
    setGrid(
      mapRef.current
        ? mapRef.current.map((row) => row.map((tile) => tile))
        : DEFAULT_MAP.map((row, index) => [GRID_TILE[row[index]]]),
    );
    setPlayerPosition({ x: 0, y: 0 });
  };

  const updateAxis = ({ dx, dy }: { dx: number; dy: number }) => {
    mapRef.current = grid;
    let i = 0;
    while (dx !== mapRef.current[0].length || i === 5) {
      if (dx > mapRef.current[0].length)
        mapRef.current.forEach((row) => row.push(GRID_TILE[0]));
      if (dx < mapRef.current[0].length)
        mapRef.current.forEach((row) => row.pop());

      i++;
    }
    while (dy !== mapRef.current.length) {
      if (dy > mapRef.current.length) {
        const createdRow = new Array(mapRef.current[0].length).fill(0);
        mapRef.current.push(createdRow);
      }

      if (dy < mapRef.current.length) mapRef.current.pop();
      i++;
    }
    setGrid(mapRef.current.map((row) => row.map((tile) => tile)));
  };

  const updateMapTile = ({
    dx,
    dy,
    newTile,
    isSettingPlayer,
  }: {
    dx: number;
    dy: number;
    newTile: number;
    isSettingPlayer: boolean;
  }) => {
    mapRef.current = grid;
    if (playerPosition.x === dx && playerPosition.y === dy) return;
    if (isSettingPlayer) setPlayerPosition({ x: dx, y: dy });
    if (mapRef.current) {
      mapRef.current[dx][dy] = GRID_TILE[newTile];
      setGrid(mapRef.current.map((row) => row.map((tile) => tile)));
    }
  };

  const isEdgeOfGrid = (dx: number, dy: number) => {
    return dx < 0 || dy < 0 || dx >= grid.length || dy >= grid[0].length;
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
    if (isEdgeOfGrid(dx, dy)) {
      return false;
    }
    const gridSpot = grid[dx][dy];
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
        (gridRef[pushedToDx][pushedToDy] = GRID_TILE[TILE_TYPES.PUSHABLE]),
      [TILE_TYPES.HOLE]: () =>
        (gridRef[pushedToDx][pushedToDy] = GRID_TILE[TILE_TYPES.EMPTY]),
    };
    gridRef[pushedFromDx][pushedFromDy] = GRID_TILE[TILE_TYPES.EMPTY];
    if (
      gridTile === GRID_TILE[TILE_TYPES.EMPTY] ||
      gridTile === GRID_TILE[TILE_TYPES.HOLE]
    ) {
      pushObjectInto[gridTile.id as keyof typeof pushObjectInto]();
    }
    setGrid(gridRef);
    return true;
  };

  const movePlayer = (dx: number, dy: number) => {
    const newX = playerPosition.x + dx;
    const newY = playerPosition.y + dy;
    if (!isValidMove({ dx: newX, dy: newY })) return;
    const tileMovedTo = grid[newX][newY];
    if (tileMovedTo === GRID_TILE[TILE_TYPES.PUSHABLE]) {
      const isValidPush = movePushableObject({
        pushedFromDx: newX,
        pushedFromDy: newY,
        pushedToDx: newX + dx,
        pushedToDy: newY + dy,
      });
      if (!isValidPush) return;
    }
    setPlayerPosition({ x: newX, y: newY });
    if (tileMovedTo === GRID_TILE[TILE_TYPES.BOMB]) {
      let gridRef = grid;
      gridRef[newX][newY] = GRID_TILE[TILE_TYPES.EMPTY];
      setGrid(gridRef);
      setPlayer({ ...player, hasBomb: true });
    }
    if (tileMovedTo === GRID_TILE[TILE_TYPES.GOAL]) {
      alert("You reached the goal!");
      if (sessionId) {
        revealInventoryItem(sessionId, "airgem", inventory, setInventory);
      }
    }
  };

  const plantBomb = ({ dx, dy }: { dx: number; dy: number }) => {
    if (!player.hasBomb) return;
    let gridRef = grid;
    gridRef[dx][dy] = GRID_TILE[TILE_TYPES.DEPLOYED_BOMB];
    deployedBombs.current.push({ x: dx, y: dy });
    setPlayer({ ...player, hasBomb: false });
  };

  const detonate = () => {
    if (deployedBombs.current.length < 1) return;
    let gridRef = grid;

    deployedBombs.current.map((bomb) => {
      for (let x = -1; x < 2; x++) {
        for (let y = -1; y < 2; y++) {
          if (isEdgeOfGrid(bomb.x + x, bomb.y + y)) continue;
          if (!gridRef[bomb.x + x][bomb.y + y].isDestructable) continue;
          gridRef[bomb.x + x][bomb.y + y] = GRID_TILE[TILE_TYPES.EMPTY];
        }
      }
    });
    deployedBombs.current = []
    setGrid(gridRef.map((row) => row.map((tile) => tile)));
  };

  return {
    grid,
    player,
    GRID_TILE,
    deployedBombs,
    playerPosition,
    reset,
    setGrid,
    detonate,
    plantBomb,
    updateAxis,
    movePlayer,
    updateMapTile,
    setPlayerPosition,
  };
}
