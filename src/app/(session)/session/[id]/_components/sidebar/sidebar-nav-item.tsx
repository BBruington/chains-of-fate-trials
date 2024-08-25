import React from "react";
import { SidebarNavItemProps } from "../../_types";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";

export default function SidebarNavItem({
  setSidebar,
  sideBarEnum,
  Icon,
  className,
}: SidebarNavItemProps) {
  return (
    <HoverCard openDelay={1200}>
      <HoverCardTrigger
        onClick={() => setSidebar(sideBarEnum)}
        className={cn(
          "flex w-[128px] cursor-pointer items-center justify-center text-center hover:bg-slate-700",
          className,
        )}
      >
        <Icon />
      </HoverCardTrigger>
      <HoverCardContent className="flex h-8 w-fit items-center">
        {sideBarEnum}
      </HoverCardContent>
    </HoverCard>
  );
}
