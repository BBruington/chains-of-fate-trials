"use client";
import SideNavLink from "./potioncraft/_components/side-nav-link";
import { useState } from "react";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { ChevronsRight } from "lucide-react";
import { NAV_LINKS } from "@/constants/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpenNav, setIsOpenNav] = useState(false);

  return (
    <Collapsible open={isOpenNav} onOpenChange={setIsOpenNav} className="flex">
      <div
        className={
          "flex h-screen min-w-[50px] flex-col items-center space-y-2 overflow-y-auto border-r border-primary/40 p-3"
        }
      >
        <CollapsibleTrigger
          className={cn(
            "flex w-full justify-center px-2",
            isOpenNav && "justify-end",
          )}
        >
          <ChevronsRight
            className={cn("rotate-0 duration-300 shrink-0", isOpenNav && "rotate-180")}
          />
        </CollapsibleTrigger>
        {NAV_LINKS.map(({ label, ...props }) => (
          <SideNavLink
            {...props}
            isOpenNav={isOpenNav}
            key={label}
            label={label}
          />
        ))}
      </div>
      {children}
    </Collapsible>
  );
}
