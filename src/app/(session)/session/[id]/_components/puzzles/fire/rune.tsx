"use client";
import { Toggle } from "@/components/ui/toggle";
import { RuneProps } from "../../../_types";

export default function Rune({ rune, activateRune }: RuneProps) {
  return (
    <Toggle
      onClick={() => activateRune(rune.label)}
      disabled={rune.isActivated}
      pressed={rune.isActivated}
      className={
        "m-10 mt-0 flex h-48 w-48 cursor-pointer items-center justify-center rounded-full bg-slate-500 p-6 text-2xl font-semibold text-blue-400 shadow-lg shadow-blue-400 transition-transform duration-500 ease-in-out hover:scale-110 hover:animate-pulse hover:text-orange-300 hover:shadow-orange-300 data-[state=on]:bg-red-700 data-[state=on]:text-orange-500 data-[state=on]:shadow-orange-500"
      }
    >
      <span style={{ fontSize: 120 }}>{rune.symbol}</span>
    </Toggle>
  );
}
