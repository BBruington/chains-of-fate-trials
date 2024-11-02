import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import { DEFAULT_MAP } from "../../../app/(session)/session/[id]/_constants";
import { useAtom } from "jotai";
import { inventoryItems } from "../../../app/(session)/session/[id]/jotaiAtoms";
import { revealInventoryItem } from "@/app/(session)/session/[id]/_hooks/hooks";
import { GRID_TILE, TILE_TYPES } from "./constants";
import { coordinates, Enemy, GridPiece } from "./types";
import { Direction } from "@prisma/client";
import uuid from "react-uuid";
import {
  ACTIVE_SIDEBAR_ENUM,
  SIDEBAR_TOGGLE_ENUM,
} from "@/app/(puzzlecraft)/puzzlecraft/types";

export default function useMazePuzzle({
  elementalSessionId,
  selectedMazeId,
  gameGridDetails,
}: {
  elementalSessionId?: string;
  selectedMazeId?: string;
  gameGridDetails: {
    mode?: ACTIVE_SIDEBAR_ENUM;
    setIsWon?: Dispatch<SetStateAction<boolean>>;
    setIsFailed?: Dispatch<SetStateAction<boolean>>;
    mapLayout: number[][];
    allEnemies?: Enemy[];
    playerStartingPosition?: { x: number; y: number };
  };
}) {
  const {
    mapLayout,
    allEnemies,
    playerStartingPosition,
    mode,
    setIsWon,
    setIsFailed,
  } = gameGridDetails;
  const [player, setPlayer] = useState<{
    hasBomb: boolean;
    lastDirectionMoved: null | Direction;
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

  useEffect(() => {
    (mapRef.current = mapLayout
      ? mapLayout.map((row) => row.map((tile) => GRID_TILE[tile]))
      : null),
      (enemies.current = allEnemies || []);
    setGrid(
      mapRef.current
        ? mapRef.current.map((row) => row.map((tile) => tile))
        : DEFAULT_MAP.map((row) => row.map((tile) => GRID_TILE[tile])),
    );
    setPlayer({
      hasBomb: false,
      lastDirectionMoved: null,
    });
    setPlayerPosition(
      playerStartingPosition
        ? playerStartingPosition
        : {
            x: 0,
            y: 0,
          },
    );
  }, [selectedMazeId]);

  const handleKeyPress = (e: KeyboardEvent) => {
    switch (e.key) {
      case "w":
        movePlayer(-1, 0, Direction.UP);
        break;
      case "s":
        movePlayer(1, 0, Direction.DOWN);
        break;
      case "a":
        movePlayer(0, -1, Direction.LEFT);
        break;
      case "d":
        movePlayer(0, 1, Direction.RIGHT);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [playerPosition]);

  function reset() {
    deployedBombs.current = [];
    enemies.current = allEnemies ? allEnemies : [];
    setGrid(
      mapRef.current
        ? mapRef.current.map((row) => row.map((tile) => tile))
        : DEFAULT_MAP.map((row, index) => [GRID_TILE[row[index]]]),
    );
    setPlayerPosition(
      playerStartingPosition
        ? playerStartingPosition
        : {
            x: 0,
            y: 0,
          },
    );
  }

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
    activeTileType,
    enemyDirection,
  }: {
    x: number;
    y: number;
    newTile: number;
    activeTileType: SIDEBAR_TOGGLE_ENUM;
    enemyDirection?: Direction;
  }) => {
    mapRef.current = grid;
    if (
      (playerPosition.x === x && playerPosition.y === y) ||
      selectedMazeId === undefined
    )
      return;
    if (
      activeTileType === SIDEBAR_TOGGLE_ENUM.PLACE_ENEMY &&
      enemyDirection !== undefined
    ) {
      enemies.current.push({
        x,
        y,
        puzzleId: selectedMazeId,
        direction: enemyDirection,
        id: uuid(),
      });
    }
    if (activeTileType === SIDEBAR_TOGGLE_ENUM.REMOVE_ENEMY)
      removeEnemy({ x, y });
    if (activeTileType === SIDEBAR_TOGGLE_ENUM.PLAYER_POSITION)
      setPlayerPosition({ x, y });
    mapRef.current[x][y] = GRID_TILE[newTile];
    setGrid(mapRef.current.map((row) => row.map((tile) => tile)));
  };

  const isEdgeOfGrid = (x: number, y: number) => {
    return x < 0 || y < 0 || x >= grid.length || y >= grid[0].length;
  };

  const addMovingEnemy = ({
    x,
    y,
    direction,
    puzzleId,
  }: {
    x: number;
    y: number;
    direction: Direction;
    puzzleId: string;
  }) => {
    if (
      (playerPosition.x === x && playerPosition.y === y) ||
      enemies.current.find((enemy) => enemy.x === x && enemy.y === y) ||
      grid[x][y].name !== "empty"
    )
      return;

    enemies.current.push({
      x,
      y,
      direction: direction,
      id: uuid(),
      puzzleId,
    });
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

  const removeEnemy = ({ x, y }: { x: number; y: number }) => {
    if (enemies.current !== undefined) {
      const newEnemies = enemies.current?.filter(
        (enemy) => enemy.x !== x || enemy.y !== y,
      );
      enemies.current = newEnemies;
    }
  };

  const moveEnemies = (enemy: Enemy): Enemy => {
    function checkIsPushableObject(checkDirection: Direction) {
      const tileMovedTo =
        grid[movement[checkDirection].x + enemy.x][
          movement[checkDirection].y + enemy.y
        ];
      if (tileMovedTo === GRID_TILE[TILE_TYPES.PUSHABLE]) {
        const isValidPush = movePushableObject({
          pushedFromDx: movement[checkDirection].x + enemy.x,
          pushedFromDy: movement[checkDirection].y + enemy.y,
          pushedToDx:
            movement[checkDirection].x + movement[checkDirection].x + enemy.x,
          pushedToDy:
            movement[checkDirection].y + movement[checkDirection].y + enemy.y,
        });
        return isValidPush;
      }
    }
    const direction = enemy.direction;
    const opposite = {
      LEFT: Direction.RIGHT,
      RIGHT: Direction.LEFT,
      UP: Direction.DOWN,
      DOWN: Direction.UP,
    };
    const movement = {
      LEFT: { x: 0, y: -1 },
      RIGHT: { x: 0, y: 1 },
      UP: { x: -1, y: 0 },
      DOWN: { x: 1, y: 0 },
    };
    const otherDirection = opposite[direction as keyof typeof opposite];

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
      const isValidPush = checkIsPushableObject(otherDirection);
      if (isValidPush === false) return enemy;
      return {
        ...enemy,
        direction: opposite[direction],
        x: movement[otherDirection].x + enemy.x,
        y: movement[otherDirection].y + enemy.y,
      };
    }
    const isValidPush = checkIsPushableObject(direction);
    if (
      isValidPush === false &&
      isValidMove({
        x: movement[otherDirection].x + enemy.x,
        y: movement[otherDirection].y + enemy.y,
      })
    ) {
      return {
        ...enemy,
        direction: opposite[direction],
        x: movement[otherDirection].x + enemy.x,
        y: movement[otherDirection].y + enemy.y,
      };
    }

    return {
      ...enemy,
      direction: direction,
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
    direction: Direction;
  }) => {
    const opposite = {
      LEFT: Direction.RIGHT,
      RIGHT: Direction.LEFT,
      UP: Direction.DOWN,
      DOWN: Direction.UP,
    };
    return enemies.current.find(
      (enemy) =>
        (enemy.x === movedToX && enemy.y === movedToY) ||
        (enemy.x === movedFromX &&
          enemy.y === movedFromY &&
          enemy.direction === opposite[direction]),
    );
  };

  const movePlayer = (x: number, y: number, direction: Direction) => {
    if (mode !== ACTIVE_SIDEBAR_ENUM.PLAYMODE || mode === undefined) return;
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
    ) {
      if (setIsFailed !== undefined) setIsFailed(true);
    }
    setPlayerPosition({ x: newX, y: newY });
    if (tileMovedTo === GRID_TILE[TILE_TYPES.BOMB] && !player.hasBomb) {
      let gridRef = grid;
      gridRef[newX][newY] = GRID_TILE[TILE_TYPES.EMPTY];
      setGrid(gridRef);
      playerRef = { ...playerRef, hasBomb: true };
    }
    if (tileMovedTo === GRID_TILE[TILE_TYPES.GOAL]) {
      winMaze();
      if (elementalSessionId) {
        revealInventoryItem(
          elementalSessionId,
          "airgem",
          inventory,
          setInventory,
        );
      }
    }
    setPlayer(playerRef);
  };

  function winMaze() {
    if (setIsWon) {
      setIsWon(true);
    }
  }

  const plantBomb = ({ x, y }: { x: number; y: number }) => {
    if (!player.hasBomb) return;
    let gridRef = grid;
    gridRef[x][y] = GRID_TILE[TILE_TYPES.DEPLOYED_BOMB];
    deployedBombs.current.push({ x: x, y: y });
    setPlayer({ ...player, hasBomb: false });
  };

  const detonateBomb = () => {
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

  const mazeState = {
    grid,
    setGrid,
    mapRef,
    player,
    enemies,
    playerPosition,
    setPlayerPosition,
  };
  const buildMaze = { updateMapTile, updateAxis, addMovingEnemy };
  const playMaze = { movePlayer, detonateBomb, plantBomb, deployedBombs };

  return {
    mazeState,
    buildMaze,
    playMaze,
    reset,
  };
}
