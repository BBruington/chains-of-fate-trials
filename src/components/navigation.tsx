"use client";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import Link from "next/link";

export default function Navigation() {
  const pathName = usePathname();
  const { setTheme } = useTheme();

  return (
    <nav className="flex items-center justify-end space-x-3 border-b-2 border-secondary px-2">
      <Link
        href={"/"}
        className={pathName === "/" ? "cursor-default text-secondary" : ""}
      >
        Home
      </Link>
      <Link
        href={"/potioncraft"}
        className={
          pathName === "/potioncraft" ? "cursor-default text-secondary" : ""
        }
      >
        Potion Craft
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger className="w-32" asChild>
          <Button variant="outline" size="icon">
            <span className="">Puzzle Session</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="flex justify-center">
            <Link
              href={`/session/create`}
              className={
                pathName === "/session/create"
                  ? "cursor-default text-secondary"
                  : ""
              }
            >
              Create
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex justify-center">
            <Link
              href={"/session/join"}
              className={
                pathName === "/" ? "cursor-default text-secondary" : ""
              }
            >
              Join
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="my-1 flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
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
    </nav>
  );
}
