import { $Enums } from "@prisma/client";

export type GridPiece = {
  id: number;
  name: string;
  isDestructable: boolean;
  isValidMove: boolean;
  isPickupable?: boolean;
};

export type coordinates = {
  x: number;
  y: number;
};

export type Enemy = {
  id: string;
  puzzleId: string;
  x: number;
  y: number;
  direction: $Enums.Direction
};
