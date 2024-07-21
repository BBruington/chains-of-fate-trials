"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";

interface SideNavLinkProps {
  href: string;
  label: string;
  icon: StaticImageData;
}

export default function SideNavLink({ href, label, icon }: SideNavLinkProps) {
  const pathName = usePathname();

  return (
    <div
      className={cn(
        "flex w-full rounded-lg border-b hover:bg-secondary hover:text-primary/80",
        pathName === href &&
          "pointer-events-none border-b-primary/60 bg-secondary/60 font-semibold text-primary/60",
      )}
    >
      <Image
        className="p-1"
        width={40}
        src={icon}
        alt="side nav icon"
      />
      <Link
        className={"flex h-10 w-full items-center pl-2"}
        key={label}
        href={href}
      >
        {label}
      </Link>
    </div>
  );
}
