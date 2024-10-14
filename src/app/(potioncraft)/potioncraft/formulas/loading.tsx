import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import woodBackground from "@/../public/background/wood_table.jpg";
import { Cinzel, Luxurious_Roman } from "next/font/google";
import { cn } from "@/lib/utils";

const fontList = Luxurious_Roman({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const fontHeader = Cinzel({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export default function Loading() {
  return (
    <div className="flex h-screen w-screen">
      <div className="relative flex h-full w-full">
        <div className="flex h-full w-full flex-col items-center border pt-10 text-3xl text-white">
          Select a Formula to Edit
        </div>
        <Image
          className="absolute h-full w-full"
          style={{ zIndex: -2 }}
          src={woodBackground}
          alt="wooden background image"
        />
      </div>
      <div
        className={cn(
          fontList.className,
          "flex h-full w-96 flex-col items-center space-y-3 overflow-y-auto bg-secondary p-3",
        )}
      >
        <h2
          className={cn(
            fontHeader.className,
            "w-full border-b text-center text-[28px]",
          )}
        >
          My Formulas
        </h2>
        <Input
          className="h-9 border border-slate-600"
          aria-label="Filter formulas input"
          placeholder="Search"
          disabled
        />
        <Button disabled>Add New Formula</Button>
        <Spinner className="h-10 w-10" />
      </div>
    </div>
  );
}
