"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

type GridSquareProps = {
  isSelected: boolean;
};

export default function GridSquare({ isSelected }: GridSquareProps) {
  const [selected, setSelected] = useState(isSelected);
  return <button onClick={() => setSelected(!selected)} className={cn("h-12 w-12 bg-blue-600", selected && "bg-blue-900")}></button>;
}
