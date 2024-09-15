"use client";
import { useAtom } from "jotai";
import { puzzleDescription } from "../../jotaiAtoms";
import { cn } from "@/lib/utils";
import {  Cinzel } from "next/font/google";

const fontHeader = Cinzel({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});
export default function Description() {
  const [description, setDesc] = useAtom(puzzleDescription);

  return (
    <div className={cn(fontHeader.className, "h-full overflow-y-auto")}>
      {description.map((message, index) => (
        <div
          className={cn(
            "m-3 rounded-sm border px-4 py-2",
            message.isHighlighted && "font-bold text-purple-500",
          )}
          key={index}
        >
          {message.message}
        </div>
      ))}
    </div>
  );
}
