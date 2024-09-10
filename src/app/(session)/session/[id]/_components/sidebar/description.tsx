"use client";
import { useAtom } from "jotai";
import { puzzleDescription } from "../../jotaiAtoms";
import { cn } from "@/lib/utils";
export default function Description() {
  const [description, setDesc] = useAtom(puzzleDescription);
  return (
    <div>
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
