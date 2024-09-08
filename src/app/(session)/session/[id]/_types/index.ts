import { UniqueIdentifier } from "@dnd-kit/core";
import { PuzzleChatMessage } from "@prisma/client";
import { PrimitiveAtom } from "jotai";
import { LucideProps } from "lucide-react";
import { StaticImageData } from "next/image";
import {
  Dispatch,
  ForwardRefExoticComponent,
  RefAttributes,
  SetStateAction,
} from "react";

export type SessionPageProps = {
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
  DOOR = "DOOR",
  PEDESTALS = "PEDESTALS",
  SOUNDSTONES = "SOUNDSTONES",
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
  DOORKEY = "DOORKEY",
  SCROLL = "SCROLL",
  MAGICSCROLL = "MAGICSCROLL",
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
  image?: StaticImageData;
};

type ItemProps = {
  name: InventoryItemEnums;
  image?: StaticImageData;
};

export type DraggableProps = {
  id: UniqueIdentifier;
  children?: string | React.JSX.Element;
  item: ItemProps;
  className?: string | undefined;
  disabled?: boolean;
};

export interface MessagesProps {
  chatMessages: PuzzleChatMessage[];
  id: string;
  username: string;
}

type SetAtom<Args extends any[], Result> = (...args: Args) => Result;
export type UseDragEndProps = {
  setPuzzle: Dispatch<SetStateAction<PuzzleEnums>>;
  inventoryItemsState: InventoryItemProps[];
  setInventoryItems: SetAtom<[SetStateAction<InventoryItemProps[]>], void>
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
