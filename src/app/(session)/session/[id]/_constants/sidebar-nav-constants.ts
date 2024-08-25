import {
  MessageSquare,
  Backpack,
  LucideMessageCircleQuestion,
} from "lucide-react";
import { PuzzleSideBarItem, SideBarEnums } from "../_types";

export const sidebarNavItems: PuzzleSideBarItem[] = [
  { sideBarEnum: SideBarEnums.CHAT, Icon: MessageSquare },
  {
    sideBarEnum: SideBarEnums.INVENTORY,
    Icon: Backpack,
    className: "border-x",
  },
  {
    sideBarEnum: SideBarEnums.DESCRIPTION,
    Icon: LucideMessageCircleQuestion,
  },
];
