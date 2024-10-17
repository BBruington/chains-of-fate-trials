import { atom } from "jotai";
import { initalContainers } from "../pose-mirror/const";

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

export const nameArrayAtom = atom([]);
export const buttonAudioAtom = atom(new Audio("/sounds/button.wav"));
export const button2AudioAtom = atom(new Audio("/sounds/button2.wav"));
export const currentPoseContainerAtom = atom(0);
export const playerNameAtom = atom("");
export const playerIconAtom = atom(null);
export const numOfPlayersAtom = atom(0);
export const selectAudioAtom = atom(new Audio("/sounds/select.wav"));
export const containersAtom = atom(initalContainers);
export const coloredBoxesAtom = atom([0, 0]);
export const colorOrderAtom = atom([
  { number: 0, border: "#25b3f5", bg: "bg-[#25b3f5]" },
  { number: 1, border: "#ff6961", bg: "bg-[#ff6961]" },
]);
export const playerStatesAtom = atom([]);
export const solutionOrderAtom = atom([
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
