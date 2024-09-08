import { PuzzleEnums } from "../_types";

export const puzzleTransitions = [
  {
    name: PuzzleEnums.SOUNDSTONES,
    desc: "STONE DESCRIPTION",
    label: "The Stones",
  },
  { name: PuzzleEnums.DOOR, desc: "DOOR DESCRIPTION", label: "The Door" },
  {
    name: PuzzleEnums.PEDESTALS,
    desc: "You see four pedastals waiting for their appropriat item",
    label: "The Pedestals",
  },
];

export const pedastalsIsInseted = {
  FIREGEM: false,
  WATERGEM: false,
  EARTHGEM: false,
  AIRGEM: false,
};
