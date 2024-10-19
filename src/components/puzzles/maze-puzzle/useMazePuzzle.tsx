import { useState, useEffect, useRef } from "react";
import { DEFAULT_MAP } from "../../../app/(session)/session/[id]/_constants";
import { useAtom } from "jotai";
import { inventoryItems } from "../../../app/(session)/session/[id]/jotaiAtoms";
import { revealInventoryItem } from "@/app/(session)/session/[id]/_hooks/hooks";
import { GRID_TILE, TILE_TYPES } from "./constants";
import { coordinates, Enemy, GridPiece } from "./types";

export default function useMazePuzzle({
  sessionId,
  mapLayout,
  allEnemies,
  playerStartingPosition,
}: {
  sessionId?: string;
  mapLayout?: number[][];
  allEnemies?: Enemy[];
  playerStartingPosition?: { x: number; y: number };
}) {
  const [player, setPlayer] = useState<{
    hasBomb: boolean;
    lastDirectionMoved: null | "left" | "right" | "up" | "down";
  }>({
    hasBomb: false,
    lastDirectionMoved: null,
  });
  const [playerPosition, setPlayerPosition] = useState(
    playerStartingPosition
      ? playerStartingPosition
      : {
          x: 0,
          y: 0,
        },
  );

  const enemies = useRef<Enemy[]>(allEnemies || []);
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
        movePlayer(-1, 0, "up");
        break;
      case "s":
        movePlayer(1, 0, "down");
        break;
      case "a":
        movePlayer(0, -1, "left");
        break;
      case "d":
        movePlayer(0, 1, "right");
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
    deployedBombs.current = [];
    setGrid(
      mapRef.current
        ? mapRef.current.map((row) => row.map((tile) => tile))
        : DEFAULT_MAP.map((row, index) => [GRID_TILE[row[index]]]),
    );
    setPlayerPosition({ x: 0, y: 0 });
  };

  const updateAxis = ({ x, y }: { x: number; y: number }) => {
    mapRef.current = grid;
    let i = 0;
    while (x !== mapRef.current[0].length || i === 5) {
      if (x > mapRef.current[0].length)
        mapRef.current.forEach((row) => row.push(GRID_TILE[0]));
      if (x < mapRef.current[0].length)
        mapRef.current.forEach((row) => row.pop());

      i++;
    }
    while (y !== mapRef.current.length) {
      if (y > mapRef.current.length) {
        const createdRow = new Array(mapRef.current[0].length).fill(0);
        mapRef.current.push(createdRow);
      }

      if (y < mapRef.current.length) mapRef.current.pop();
      i++;
    }
    setGrid(mapRef.current.map((row) => row.map((tile) => tile)));
  };

  const updateMapTile = ({
    x,
    y,
    newTile,
    isSettingPlayer,
  }: {
    x: number;
    y: number;
    newTile: number;
    isSettingPlayer: boolean;
  }) => {
    mapRef.current = grid;
    if (playerPosition.x === x && playerPosition.y === y) return;
    if (isSettingPlayer) setPlayerPosition({ x: x, y: y });
    if (mapRef.current) {
      mapRef.current[x][y] = GRID_TILE[newTile];
      setGrid(mapRef.current.map((row) => row.map((tile) => tile)));
    }
  };

  const isEdgeOfGrid = (x: number, y: number) => {
    return x < 0 || y < 0 || x >= grid.length || y >= grid[0].length;
  };

  const isValidMove = ({
    x,
    y,
    isPushedObject,
  }: {
    x: number;
    y: number;
    isPushedObject?: boolean;
  }) => {
    if (isEdgeOfGrid(x, y)) {
      return false;
    }
    const gridSpot = grid[x][y];
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
    if (!isValidMove({ x: pushedToDx, y: pushedToDy, isPushedObject: true }))
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

  const moveEnemies = (enemy: Enemy): Enemy => {
    const direction = enemy.moving;
    const opposite: { left: "right"; right: "left"; up: "down"; down: "up" } = {
      left: "right",
      right: "left",
      up: "down",
      down: "up",
    };
    const movement = {
      left: { x: 0, y: -1 },
      right: { x: 0, y: 1 },
      up: { x: -1, y: 0 },
      down: { x: 1, y: 0 },
    };
    const otherDirection = opposite[direction];

    if (
      !isValidMove({
        x: movement[direction].x + enemy.x,
        y: movement[direction].y + enemy.y,
      })
    ) {
      if (
        !isValidMove({
          x: movement[otherDirection].x + enemy.x,
          y: movement[otherDirection].y + enemy.y,
        })
      ) {
        return enemy;
      }
      return {
        moving: opposite[direction],
        x: movement[otherDirection].x + enemy.x,
        y: movement[otherDirection].y + enemy.y,
      };
    }
    const tileMovedTo =
      grid[movement[direction].x + enemy.x][movement[direction].y + enemy.y];
    if (tileMovedTo === GRID_TILE[TILE_TYPES.PUSHABLE]) {
      const isValidPush = movePushableObject({
        pushedFromDx: movement[direction].x + enemy.x,
        pushedFromDy: movement[direction].y + enemy.y,
        pushedToDx: movement[direction].x + movement[direction].x + enemy.x,
        pushedToDy: movement[direction].y + movement[direction].y + enemy.y,
      });
      if (
        !isValidPush &&
        isValidMove({
          x: movement[otherDirection].x + enemy.x,
          y: movement[otherDirection].y + enemy.y,
        })
      ) {
        return {
          moving: opposite[direction],
          x: movement[otherDirection].x + enemy.x,
          y: movement[otherDirection].y + enemy.y,
        };
      }
    }
    return {
      moving: direction,
      x: movement[direction].x + enemy.x,
      y: movement[direction].y + enemy.y,
    };
  };

  const isMovedIntoEnemy = ({
    movedFromX,
    movedFromY,
    movedToX,
    movedToY,
    direction,
  }: {
    movedFromX: number;
    movedFromY: number;
    movedToX: number;
    movedToY: number;
    direction?: "left" | "right" | "up" | "down";
  }) => {
    const opposite: { left: "right"; right: "left"; up: "down"; down: "up" } = {
      left: "right",
      right: "left",
      up: "down",
      down: "up",
    };
    return enemies.current.find(
      (enemy) =>
        (enemy.x === movedToX && enemy.y === movedToY) ||
        (enemy.x === movedFromX &&
          enemy.y === movedFromY &&
          direction === opposite[enemy.moving]),
    );
  };

  const movePlayer = (
    x: number,
    y: number,
    direction: "left" | "right" | "up" | "down",
  ) => {
    const newX = playerPosition.x + x;
    const newY = playerPosition.y + y;
    let playerRef = { ...player, lastDirectionMoved: direction };
    if (!isValidMove({ x: newX, y: newY })) return;
    const tileMovedTo = grid[newX][newY];
    if (tileMovedTo === GRID_TILE[TILE_TYPES.PUSHABLE]) {
      const isValidPush = movePushableObject({
        pushedFromDx: newX,
        pushedFromDy: newY,
        pushedToDx: newX + x,
        pushedToDy: newY + y,
      });
      if (!isValidPush) return;
    }
    const allEnemyMovement = enemies.current.map((enemy) => {
      return moveEnemies(enemy);
    });
    enemies.current = allEnemyMovement;
    if (
      isMovedIntoEnemy({
        movedFromX: playerPosition.x,
        movedFromY: playerPosition.y,
        movedToX: newX,
        movedToY: newY,
        direction: playerRef.lastDirectionMoved,
      })
    )
      alert("you lose");
    setPlayerPosition({ x: newX, y: newY });
    if (tileMovedTo === GRID_TILE[TILE_TYPES.BOMB] && !player.hasBomb) {
      let gridRef = grid;
      gridRef[newX][newY] = GRID_TILE[TILE_TYPES.EMPTY];
      setGrid(gridRef);
      playerRef = { ...playerRef, hasBomb: true };
    }
    if (tileMovedTo === GRID_TILE[TILE_TYPES.GOAL]) {
      alert("You reached the goal!");
      if (sessionId) {
        revealInventoryItem(sessionId, "airgem", inventory, setInventory);
      }
    }
    setPlayer(playerRef);
  };

  const plantBomb = ({ x, y }: { x: number; y: number }) => {
    if (!player.hasBomb) return;
    let gridRef = grid;
    gridRef[x][y] = GRID_TILE[TILE_TYPES.DEPLOYED_BOMB];
    deployedBombs.current.push({ x: x, y: y });
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
    deployedBombs.current = [];
    setGrid(gridRef.map((row) => row.map((tile) => tile)));
  };

  return {
    grid,
    player,
    GRID_TILE,
    enemies,
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
