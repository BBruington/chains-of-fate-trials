"use client";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { Dice1Icon } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/potioncraft", label: "Potions" },
  { href: "/session/play", label: "Puzzles" },
];

const THEME_OPTIONS = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];

const findBaseUrl = (href: string) => {
  let baseUrl = "";
  for (let character of href) {
    if (character === "/" && baseUrl.length > 1) break;
    baseUrl = baseUrl += character;
  }
  if (baseUrl === "/") baseUrl = "Home";
  return baseUrl;
};

export default function Navigation() {
  const { theme, setTheme } = useTheme();
  const pathName = usePathname();
  const baseUrl = findBaseUrl(pathName);

  return (
    <nav className="flex h-12 w-full items-center justify-between space-x-3 border-b-2 border-secondary px-2">
      <div>
        <Link href="/" className="flex gap-2 items-center text-xl font-bold">
            <Dice1Icon className="h-6 w-6 text-primary" />
            <span>Chains of Fate</span>
        </Link>
      </div>
      <div className="flex space-x-3 items-center">

      <div className="flex items-center space-x-4">
        {NAV_LINKS.map(({ href, label }) => (
          <Link
            className={cn(
              "transition-colors hover:text-primary/80",
              (href.includes(baseUrl) || label === baseUrl) &&
                "pointer-events-none border-b border-primary/50 text-primary/50",
            )}
            href={href}
            key={href}
          >
            {label}
          </Link>
        ))}
      </div>
      <div className="my-1 flex items-center space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {THEME_OPTIONS.map(({ value, label }) => (
              <DropdownMenuItem key={value} onClick={() => setTheme(value)}>
                {label}
                {theme === value && <span className="ml-2">✓</span>}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
          <div className="my-2 flex items-center">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
    </nav>
  );
}
