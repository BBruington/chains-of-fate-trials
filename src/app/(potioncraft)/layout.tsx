"use client";
import SideNavLink from "./potioncraft/_components/side-nav-link";
import serum from "@/../public/icons/serum.png";
import { useState } from "react";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { ChevronsRight } from "lucide-react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpenNav, setIsOpenNav] = useState(false);

  const NAV_LINKS = [
    { href: "/potioncraft", label: "Craft", icon: serum },
    { href: "/potioncraft/journal/potions", label: "Potions", icon: serum },
    {
      href: "/potioncraft/journal/ingredients",
      label: "Ingredients",
      icon: serum,
    },
    { href: "/potioncraft/formulas", label: "Formulas", icon: serum },
  ];

  return (
    <Collapsible open={isOpenNav} onOpenChange={setIsOpenNav} className="flex">
      <div
        className={
          "flex h-screen min-w-[70px] flex-col items-center space-y-5 overflow-y-auto border border-l-0 border-primary/40 bg-secondary/70 p-3"
        }
      >
        <CollapsibleTrigger className="flex w-full justify-end px-2">
          <ChevronsRight className={cn("rotate-0 duration-300", isOpenNav && "rotate-180 duration-300")} />
        </CollapsibleTrigger>
        {NAV_LINKS.map((link) => (
          <SideNavLink
            isOpenNav={isOpenNav}
            key={link.label}
            href={link.href}
            label={link.label}
            icon={link.icon}
          />
        ))}
      </div>

      {children}
    </Collapsible>
  );
}
