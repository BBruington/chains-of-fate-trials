import type { JsonValue } from "@prisma/client/runtime/library";
import { atom } from "jotai";
import { initalContainers } from "../pose-mirror/const";
import type {
  containerElement,
  nameArrayElement,
  playerStatesElement,
} from "../pose-mirror/types";

export const coordinatesAtom = atom({
  head: { x: 0, y: 0 },
  torso: { x: 0, y: 0 },
  waist: { x: 0, y: 0 },

  leftForearm: { x: 0, y: 0 },
  leftHand: { x: 0, y: 0 },

  rightForearm: { x: 0, y: 0 },
  rightHand: { x: 0, y: 0 },

  leftKnee: { x: 0, y: 0 },
  leftFoot: { x: 0, y: 0 },

  rightKnee: { x: 0, y: 0 },
  rightFoot: { x: 0, y: 0 },
});

export const nameArrayAtom = atom<nameArrayElement[]>([]);
export const buttonAudioAtom = atom(new Audio("/sounds/button.wav"));
export const button2AudioAtom = atom(new Audio("/sounds/button2.wav"));
export const currentPoseContainerAtom = atom<number>(0);
export const playerNameAtom = atom("");
export const playerIconAtom = atom<string | null>(null);
export const playerStatesAtom = atom<playerStatesElement[]>([]);
export const numOfPlayersAtom = atom(0);
export const selectAudioAtom = atom(new Audio("/sounds/select.wav"));
export const containersAtom = atom<containerElement[]>(initalContainers);
export const coloredBoxesAtom = atom<number[]>([0, 0]);
export const colorOrderAtom = atom([
  { number: 0, border: "#25b3f5", bg: "bg-[#25b3f5]" },
  { number: 1, border: "#ff6961", bg: "bg-[#ff6961]" },
  { number: 1, border: "#b9f734", bg: "bg-[#b9f734]" },
]);
export const solutionOrderAtom = atom<string[] | JsonValue | undefined>([
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
]);
export const showConfettiAtom = atom(false);
export const userIdAtom = atom("");
