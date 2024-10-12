import { UniqueIdentifier } from "@dnd-kit/core";
import { PuzzleChatMessage, PuzzleElementalTrials } from "@prisma/client";
import { LucideProps } from "lucide-react";
import { StaticImageData } from "next/image";
import {
  Dispatch,
  ForwardRefExoticComponent,
  RefAttributes,
  SetStateAction,
} from "react";

export type DescriptionOpject = {
  message: string;
  isHighlighted: boolean;
};

export type SessionPageProps = {
  puzzleSession: PuzzleElementalTrials;
  sessionId: string;
  chatMessages: PuzzleChatMessage[];
  username: string;
};
export enum SideBarEnums {
  CHAT = "CHAT",
  INVENTORY = "INVENTORY",
  DESCRIPTION = "DESCRIPTION",
}
export enum PuzzleEnums {
  PEDESTALS = "PEDESTALS",
  FIRE = "FIRE",
  WATER = "WATER",
  EARTH = "EARTH",
  AIR = "AIR",
}

export interface PuzzleSideBarItem {
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  sideBarEnum: SideBarEnums;
  className?: string;
}

export interface SidebarNavItemProps extends PuzzleSideBarItem {
  setSidebar: (value: SetStateAction<SideBarEnums>) => void;
  className?: string;
}

export enum InventoryItemEnums {
  FIREGEM = "FIREGEM",
  EARTHGEM = "EARTHGEM",
  AIRGEM = "AIRGEM",
  WATERGEM = "WATERGEM",
}
export type ItemNames =
  | "DOORKEY"
  | "SCROLL"
  | "FIREGEM"
  | "EARTHGEM"
  | "AIRGEM"
  | "WATERGEM";
export type InventoryItemProps = {
  name: InventoryItemEnums;
  label?: string;
  description?: string;
  hidden: boolean
  image?: StaticImageData;
};



export type DraggableProps = {
  id: UniqueIdentifier;
  children?: string | React.JSX.Element;
  item: InventoryItemProps;
  className?: string | undefined;
  disabled?: boolean;
};

export interface MessagesProps {
  chatMessages: PuzzleChatMessage[];
  id: string;
  username: string;
}

export type SetAtom<Args extends any[], Result> = (...args: Args) => Result;
export type UseDragEndProps = {
  setVictoryDialogue: Dispatch<SetStateAction<boolean>>
  inventoryItemsState: InventoryItemProps[];
  setInventoryItems: SetAtom<[SetStateAction<InventoryItemProps[]>], void>;
  pedestalState: {
    id: string;
    isActivated: boolean;
  }[];
  setPedestalState: SetAtom<
    [
      SetStateAction<
        {
          id: string;
          isActivated: boolean;
        }[]
      >,
    ],
    void
  >;
};

export type ConnectKeys = "up" | "right" | "down" | "left";

export type PipeType = {
  name: string;
  isValid: boolean | null;
  isConnectedTo: { up: boolean; right: boolean; down: boolean; left: boolean };
};

export type CheckSideprops = {
  index: number;
  sides: ConnectKeys[];
};

export type FindSidesAndEdgesReturn = {
  edgesOfBoard: ConnectKeys[];
  sidesConnectedTo: ConnectKeys[];
};

export type PipeProps = {
  pipe: PipeType;
  index: number;
  rotatePipe: (pipe: PipeType, index: number) => PipeType | undefined;
};

export type OppositeSideType = {
  left: "right";
  right: "left";
  up: "down";
  down: "up";
};

export type MetalType = {
  name: string;
  rarity: string;
  hiddenValue: string | undefined;
  hardness: number;
  magicAffinity: number;
  purity: number;
};

export type GridPiece = {
  id: number;
  name: string;
  isValidMove: boolean;
};

type Rune = {
  label: string;
  isActivated: boolean;
  symbol: string;
};
export type RuneProps = {
  activateRune: (label: string) => void;
  rune: Rune;
};