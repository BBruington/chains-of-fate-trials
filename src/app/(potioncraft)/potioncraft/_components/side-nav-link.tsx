"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import { CollapsibleContent } from "@/components/ui/collapsible";
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
  const pathName = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        "flex h-12 min-w-14 justify-center rounded-lg border-b hover:bg-secondary hover:text-primary/80",
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
    </Link>
  );
}
