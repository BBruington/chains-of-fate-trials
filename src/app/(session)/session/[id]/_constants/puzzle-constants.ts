import { PuzzleEnums } from "../_types";

export const puzzleTransitions = [
  {
    name: PuzzleEnums.DOOR,
    description: [{ message: "DOOR DESCRIPTION", isHighlighted: false }],
    label: "The Door",
  },
  {
    name: PuzzleEnums.PEDESTALS,
    description: [
      {
        message: "You see four pedastals waiting for their appropriat item",
        isHighlighted: false,
      },
    ],
    label: "The Pedestals",
  },
  {
    name: PuzzleEnums.FIRE,
    description: [
      {
        message: `As you step into the circular chamber, the air is heavy with the scent of charred stone and sulfur. The walls are etched with ancient carvings, and six glowing runes, flickering like embers, are evenly spaced around the perimeter of the room. Each rune hums with a fiery energy, its shape shifting slightly as if alive with a hidden force. At the center of the chamber stands a weathered stone tablet, its surface illuminated by a soft, pulsing light. Inscribed upon it is a verse, carved in flowing script, telling of a Phoenix's rebirth from flame. The words seem to dance in the flickering glow of the runes, beckoning you to solve their ancient riddle:`,
        isHighlighted: false,
      },
      {
        message: `From ashes born, the flames arise,`,
        isHighlighted: true,
      },
      {
        message: "Wings of ember, cut through the skies.",
        isHighlighted: true,
      },
      {
        message: `With every fall, a brighter flare,`,
        isHighlighted: true,
      },
      {
        message: `In death, rebirth beyond despair.`,
        isHighlighted: true,
      },
      {
        message: `Eternal fire, the endless blaze,`,
        isHighlighted: true,
      },
      {
        message: `A life renewed in dawn’s warm rays.`,
        isHighlighted: true,
      },
    ],
    label: "The Trial of Fire",
  },
  {
    name: PuzzleEnums.WATER,
    label: "The Trial of Water",
    description: [
      { isHighlighted: false, message: "this is the water description" },
    ],
  },
  {
    name: PuzzleEnums.EARTH,
    label: "The Trial of Earth",
    description: [
      { isHighlighted: false, message: "this is the earth description" },
    ],
  },
  {
    name: PuzzleEnums.AIR,
    label: "The Trial of Air",
    description: [
      { isHighlighted: false, message: "this is the air description" },
    ],
  },
];

export const pedastals = [
  { id: "FIREGEM", isActivated: false },
  { id: "WATERGEM", isActivated: false },
  { id: "EARTHGEM", isActivated: false },
  { id: "AIRGEM", isActivated: false },
];

export const runes = [
  {
    symbol: "𑢶",
    label: "birth",
    isActivated: false,
  },
  {
    symbol: "𑢾",
    label: "flight",
    isActivated: false,
  },
  {
    symbol: "𑣓",
    label: "hope",
    isActivated: false,
  },
  {
    symbol: "𑣜",
    label: "decay",
    isActivated: false,
  },
  {
    symbol: "𑣢",
    label: "perseverance",
    isActivated: false,
  },
  {
    symbol: "𑣚",
    label: "rebirth",
    isActivated: false,
  },
];
