import { symbol } from "zod";
import { PuzzleEnums } from "../_types";

export const puzzleTransitions = [
  {
    name: PuzzleEnums.SOUNDSTONES,
    description: [{ message: "STONE DESCRIPTION", isHighlighted: false }],
    label: "The Stones",
  },
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
        message: `"From ashes cold, the spark is born, `,
        isHighlighted: true,
      },
      {
        message: "A flicker weak, yet fate is sworn. ",
        isHighlighted: true,
      },
      {
        message: `The flame then grows, with fierce desire,`,
        isHighlighted: true,
      },
      {
        message: `To blaze anew, a bird of fire.`,
        isHighlighted: true,
      },
      {
        message: `But all must wane, as embers glow,`,
        isHighlighted: true,
      },
      {
        message: `And rise again, from ashes low."`,
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
    label: "spark",
    isActivated: false,
  },
  {
    symbol: "𑢾",
    label: "flicker",
    isActivated: false,
  },
  {
    symbol: "𑣓",
    label: "flame",
    isActivated: false,
  },
  {
    symbol: "𑣜",
    label: "blaze",
    isActivated: false,
  },
  {
    symbol: "𑣢",
    label: "embers",
    isActivated: false,
  },
  {
    symbol: "𑣚",
    label: "ashes",
    isActivated: false,
  },
];
