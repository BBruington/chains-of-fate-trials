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
  x: number;
  y: number;
  moving: "left" | "right" | "up" | "down";
};
