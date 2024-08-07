"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import { CollapsibleContent } from "@/components/ui/collapsible";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import "./styles.css";

interface SideNavLinkProps {
  href: string;
  label: string;
  icon: StaticImageData;
  isOpenNav: boolean;
}

export default function SideNavLink({
  href,
  label,
  icon,
  isOpenNav,
}: SideNavLinkProps) {
  const router = useRouter();
  const pathName = usePathname();

  return (
    <HoverCard>
      <HoverCardTrigger>
        <button
          onClick={() => router.push(href)}
          className={cn(
            "flex h-12 min-w-14 justify-center items-center rounded-lg border-b hover:bg-secondary hover:text-primary/80",
            pathName === href &&
              "pointer-events-none border-b-red-900/70 bg-secondary/30 font-semibold text-red-900/70",
          )}
        >
          <Image width={40} src={icon} alt="side nav icon" />
          <CollapsibleContent
            className={cn("CollapsibleContent", isOpenNav && "w-52")}
          >
            <span className={"flex h-full items-center pl-2"}>{label}</span>
          </CollapsibleContent>
        </button>
      </HoverCardTrigger>
      <HoverCardContent
        className="mb-5 ml-[2px] flex h-7 w-fit items-center justify-center"
        side="right"
      >
        {label}
      </HoverCardContent>
    </HoverCard>
  );
}
