"use client";
import { useAtom } from "jotai";
import { puzzleDescription } from "../../jotaiAtoms";
export default function Description() {
  const [desc, setDesc] = useAtom(puzzleDescription);
  return <div>{desc}</div>;
}
