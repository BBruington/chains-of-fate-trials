export type GridPiece = {
  id: number;
  name: string;
  isDestructable: boolean;
  isValidMove: boolean;
  isPickupable?: boolean;
};