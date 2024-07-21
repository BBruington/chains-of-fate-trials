"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface SideNavLinkProps {
  href: string;
  label: string;
}

export default function SideNavLink({ href, label }: SideNavLinkProps) {
  const pathName = usePathname();

  return (
    <Link
      className={cn(
        "flex h-10 w-full items-center rounded-lg border-b pl-2 hover:bg-secondary hover:text-primary/80",
        pathName === href && "pointer-events-none font-semibold text-primary/60",
      )}
      key={label}
      href={href}
    >
      {label}
    </Link>
  );
}
