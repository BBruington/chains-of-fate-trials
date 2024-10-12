import {
  GridPiece,
  InventoryItemEnums,
  PuzzleEnums,
  PuzzleSideBarItem,
  SideBarEnums,
} from "../_types";
import firegem from "@/../public/icons/firegem.svg";
import earthgem from "@/../public/icons/earthgem.svg";
import airgem from "@/../public/icons/airgem.svg";
import watergem from "@/../public/icons/watergem.svg";
import {
  MessageSquare,
  Backpack,
  LucideMessageCircleQuestion,
} from "lucide-react";
import { PipeType } from "../_types/index";
// prettier-ignore

export const INITIAL_MAP = [
  [0, 1, 1, 1, 0, 2, 0, 0, 1, 1, 1, 1],
  [0, 1, 0, 0, 0, 2, 0, 2, 0, 2, 4, 1],
  [0, 1, 0, 1, 1, 0, 2, 0, 0, 1, 0, 1],
  [0, 2, 0, 0, 0, 1, 2, 0, 1, 0, 0, 1],
  [1, 1, 0, 1, 0, 0, 0, 1, 4, 2, 2, 1],
  [3, 0, 4, 1, 2, 0, 1, 4, 2, 4, 2, 4],
  [1, 1, 1, 0, 4, 0, 1, 0, 2, 2, 2, 2],
  [0, 0, 0, 0, 4, 1, 1, 4, 4, 2, 4, 4],
  [0, 2, 1, 1, 4, 0, 0, 1, 4, 4, 4, 1],
  [0, 4, 0, 0, 0, 2, 0, 0, 1, 4, 1, 1],
  [0, 0, 1, 1, 2, 1, 1, 0, 0, 4, 1, 1],
  [4, 2, 4, 2, 4, 0, 4, 2, 0, 1, 1, 1],
  [1, 2, 0, 0, 1, 4, 2, 0, 0, 1, 1, 1],
  [1, 0, 0, 0, 0, 2, 4, 2, 0, 1, 1, 1],
];
export const DEFAULT_MAP = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

export enum TILE_TYPES {
  EMPTY = 0,
  BLOCKED = 1,
  PUSHABLE = 2,
  GOAL = 3,
  HOLE = 4,
}

export const MAP_TILE: Record<number, GridPiece> = {
  [TILE_TYPES.EMPTY]: {
    id: 0,
    name: "empty",
    isValidMove: true,
  },
  [TILE_TYPES.BLOCKED]: {
    id: 1,
    name: "blocked",
    isValidMove: false,
  },
  [TILE_TYPES.PUSHABLE]: {
    id: 2,
    name: "push",
    isValidMove: true,
  },
  [TILE_TYPES.GOAL]: {
    id: 3,
    name: "goal",
    isValidMove: true,
  },
  [TILE_TYPES.HOLE]: {
    id: 4,
    name: "hole",
    isValidMove: false,
  },
};

export const ALL_METALS = {
  copper: {
    name: "copper",
    rarity: "uncommon",
    hiddenValue: "purity",
    hardness: 3,
    magicAffinity: 1,
    purity: 1,
  },
  tin: {
    name: "tin",
    rarity: "uncommon",
    hiddenValue: "magicAffinity",
    hardness: 4,
    magicAffinity: 4,
    purity: 1,
  },
  lead: {
    name: "lead",
    rarity: "uncommon",
    hiddenValue: "purity",
    hardness: 7,
    magicAffinity: 2,
    purity: 2,
  },
  brass: {
    name: "brass",
    rarity: "uncommon",
    hiddenValue: undefined,
    hardness: 2,
    magicAffinity: 3,
    purity: 11,
  },
  gold: {
    name: "gold",
    rarity: "uncommon",
    hiddenValue: undefined,
    hardness: 1,
    magicAffinity: 6,
    purity: 6,
  },
  platinum: {
    name: "platinum",
    rarity: "uncommon",
    hiddenValue: undefined,
    hardness: 6,
    magicAffinity: 7,
    purity: 12,
  },
  iron: {
    name: "iron",
    rarity: "uncommon",
    hiddenValue: undefined,
    hardness: 3,
    magicAffinity: 2,
    purity: 2,
  },
  bronze: {
    name: "bronze",
    rarity: "uncommon",
    hiddenValue: "hardness",
    hardness: 7,
    magicAffinity: 5,
    purity: 2,
  },
  steel: {
    name: "steel",
    rarity: "uncommon",
    hiddenValue: "magicAffinity",
    hardness: 10,
    magicAffinity: 4,
    purity: 4,
  },
  silver: {
    name: "silver",
    rarity: "uncommon",
    hiddenValue: undefined,
    hardness: 2,
    magicAffinity: 9,
    purity: 2,
  },
  adamant: {
    name: "adamant",
    rarity: "rare",
    hiddenValue: undefined,
    hardness: 20,
    magicAffinity: 11,
    purity: 8,
  },
  coldiron: {
    name: "coldiron",
    rarity: "rare",
    hiddenValue: undefined,
    hardness: 10,
    magicAffinity: 15,
    purity: 20,
  },
  mithril: {
    name: "mithril",
    rarity: "rare",
    hiddenValue: undefined,
    hardness: 10,
    magicAffinity: 20,
    purity: 10,
  },
  earthgem: {
    name: "earthgem",
    rarity: "rare",
    hiddenValue: undefined,
    hardness: 40,
    magicAffinity: 46,
    purity: 38,
  },
};
export const RARE_METALS = [
  {
    name: "adamant",
    rarity: "rare",
    hidden: true,
    hiddenValue: undefined,
    hardness: 20,
    magicAffinity: 11,
    purity: 8,
  },
  {
    name: "coldiron",
    rarity: "rare",
    hidden: true,
    hiddenValue: undefined,
    hardness: 10,
    magicAffinity: 15,
    purity: 20,
  },
  {
    name: "mithril",
    rarity: "rare",
    hidden: true,
    hiddenValue: undefined,
    hardness: 10,
    magicAffinity: 20,
    purity: 10,
  },
];

const EMPTY_METAL = {
  name: "Empty",
  rarity: "empty",
  hiddenValue: undefined,
  hardness: 0,
  magicAffinity: 0,
  purity: 0,
};
export const EMPTY_METAL_MIXTURE = [EMPTY_METAL, EMPTY_METAL, EMPTY_METAL];

export const puzzleTransitions = [
  {
    name: PuzzleEnums.PEDESTALS,
    description: [
      {
        message:
          "The chamber is a vast, circular room carved from ancient stone, its high ceilings etched with faded runes that softly glow in the dim light. In the center, four pedestals stand equidistant, each one crafted from a different material—water-smooth stone, scorched black rock, wind-worn marble, and dense, earthen metal. At the base of each pedestal, faint grooves in the floor seem to guide something toward a central point, indicating where the elements must converge.",
        isHighlighted: false,
      },
      {
        message:
          "Against one wall, an ancient tablet is embedded, its surface worn yet still legible, with intricate script inlaid with shimmering dust. The text reads:",
        isHighlighted: false,
      },
      {
        message: `"To open the gate to the Feywild, the Tears of the Elements must be gathered. Pass through the trials of Water, Fire, Air, and Earth to claim each Tear. Only when all are placed upon their rightful pedestal shall the ritual begin."`,
        isHighlighted: true,
      },
      {
        message:
          "Beyond the chamber, four distinct paths branch off into the distance, each one hinting at the elemental challenge it holds. The air around the water path is damp and cool, the fire path glows with a faint heat, the earth path is solid and unyielding, while the air path feels light, with a soft breeze beckoning forward.",
        isHighlighted: false,
      },
    ],
    label: "Pedestals",
  },
  {
    name: PuzzleEnums.FIRE,
    description: [
      {
        message: `As you step into the circular chamber, the air is heavy with the scent of charred stone and sulfur. The walls are etched with ancient carvings, and six glowing runes, flickering like embers, are evenly spaced around the perimeter of the room. Each rune hums with a fiery energy, its shape shifting slightly as if alive with a hidden force. At the center of the chamber stands a weathered stone tablet, its surface illuminated by a soft, pulsing light. Inscribed upon it is a verse, carved in flowing script, telling of a Phoenix's rebirth from flame. The words seem to dance in the flickering glow of the runes, beckoning you to solve their ancient riddle:`,
        isHighlighted: false,
      },
      {
        message: `1. From ashes born, the flames arise,`,
        isHighlighted: true,
      },
      {
        message: "2. Wings of ember, cut through the skies.",
        isHighlighted: true,
      },
      {
        message: `3. With every fall, a brighter flare,`,
        isHighlighted: true,
      },
      {
        message: `4. In death, rebirth beyond despair.`,
        isHighlighted: true,
      },
      {
        message: `5. Eternal fire, the endless blaze,`,
        isHighlighted: true,
      },
      {
        message: `6. A life renewed in dawn’s warm rays.`,
        isHighlighted: true,
      },
    ],
    label: "Trial of Fire",
  },
  {
    name: PuzzleEnums.WATER,
    label: "Trial of Water",
    description: [
      {
        isHighlighted: false,
        message:
          "As you step into the chamber, the temperature drops, and the sound of rushing water echoes faintly in the distance. The air is damp and cool, with the scent of fresh rain filling your lungs. Before you lies an elaborate network of ancient pipes and aqueducts, their bronze surfaces worn and tarnished by centuries of use. Water trickles sporadically through a few cracked seams, but it is clear that this system is long out of alignment.",
      },
      {
        isHighlighted: false,
        message:
          "On the far wall, a shimmering blue gemstone, suspended in a delicate cascade of water, catches your eye. This is the Tear of the Aquan, glowing with an ethereal light. It seems just out of reach, protected by a magical barrier that pulses in sync with the soft flow of water. To claim it, the room's intricate puzzle must be solved—by restoring the flow of water through the pipes.",
      },
      {
        isHighlighted: false,
        message:
          "Ancient runes etched into the floor and walls begin to glow softly as you approach. You realize that the pipes must be reconnected perfectly to restore the flow of water to the central reservoir, which powers the magic guarding the gem. The task is delicate; a single misstep could cause the pipes to burst or the flow to become stagnant. You must think carefully and act swiftly, for only when the water runs perfectly will the barrier dissipate, allowing you to claim the Tear of the Aquan.",
      },
    ],
  },
  {
    name: PuzzleEnums.EARTH,
    label: "Trial of Earth",
    description: [
      {
        isHighlighted: false,
        message:
          "The chamber is dimly lit, the air thick with the scent of stone and metal. As you step inside, your feet echo against the solid floor, and you can feel the weight of the earth pressing down from all sides. Before you stands a large, ancient machine, its gears and levers covered in dust, yet still humming faintly with power. Surrounding it are shelves lined with ingots of various metals—ten in total—gleaming dully in the low light.",
      },
      {
        isHighlighted: false,
        message:
          "On a stone tablet nearby, inscriptions detail the process for crafting the Tear of the Terran, a gemstone formed from the fusion of three rare and powerful metals: Adamant, Cold Iron, and Mithril. Each metal requires a precise mixture of the common metals before you, their properties carefully balanced through the machine.",
      },
      {
        isHighlighted: false,
        message:
          "However, time has taken its toll. Much of the writing on the tablet has faded, leaving crucial information lost to the ages. The combinations needed to forge Adamant, Cold Iron, and Mithril are incomplete, their exact formulas a mystery. Only fragments of the metals' properties remain legible, offering just enough clues to guide you toward the solution.",
      },
      {
        isHighlighted: false,
        message:
          "The machine stands ready, its mechanisms complex but functional. You must experiment, carefully mixing and matching the metals to recreate the lost alloys. The process is delicate—too much of one property, or too little of another, and the metal will be brittle or impure, failing to bond correctly. Patience and precision are your allies here, as you manipulate the elements of the earth to form the perfect alloys.",
      },
    ],
  },
  {
    name: PuzzleEnums.AIR,
    label: "Trial of Air",
    description: [
      {
        isHighlighted: false,
        message:
          "The air grows cool and still as you step into the chamber, where towering walls of polished stone form a vast, intricate labyrinth. The faint sound of wind echoes through the narrow passages, guiding your steps as though the very air beckons you forward. Above, a sliver of sky is visible, but the maze itself is dense, the paths twisting and turning with no clear end in sight.",
      },
      {
        isHighlighted: false,
        message:
          "Your task is clear: navigate the labyrinth, attune yourself to the subtle guidance of the air, and reach the Tear of the Auran. Only by keeping a calm mind and trusting in your sense of direction can you conquer this trial. The Tear is close, but the path is long, and the wind will not reveal its secrets easily.",
      },
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
    symbol: "𑣓",
    label: "hope",
    isActivated: false,
  },
  {
    symbol: "𑣚",
    label: "rebirth",
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
    symbol: "𑢾",
    label: "flight",
    isActivated: false,
  },
  {
    symbol: "𑢶",
    label: "birth",
    isActivated: false,
  },
];

const linePipe: PipeType = {
  name: "line",
  isValid: null,
  isConnectedTo: { up: true, right: false, down: true, left: false },
};
const endPipe: PipeType = {
  name: "end",
  isValid: null,
  isConnectedTo: { up: false, right: false, down: true, left: false },
};

const threePipe: PipeType = {
  name: "three",
  isValid: null,
  isConnectedTo: { up: false, right: true, down: true, left: true },
};

const fourPipe: PipeType = {
  name: "four",
  isValid: null,
  isConnectedTo: { up: true, right: true, down: true, left: true },
};

const turnPipe: PipeType = {
  name: "turn",
  isValid: null,
  isConnectedTo: { up: false, right: true, down: true, left: false },
};

export const mapLength = 7;

export const allPipes: Record<number, PipeType> = {
  0: linePipe,
  1: endPipe,
  2: threePipe,
  3: fourPipe,
  4: turnPipe,
};

export const pipesExample = [
  1, 4, 1, 2, 2, 1, 1, 1, 4, 0, 4, 0, 4, 4, 4, 0, 2, 2, 2, 2, 1, 4, 1, 1, 2, 4,
  4, 1, 2, 0, 0, 2, 2, 2, 4, 2, 4, 4, 2, 0, 1, 0, 1, 1, 4, 4, 4, 4, 1,
];

export const inventoryItemsRecords = [
  {
    name: InventoryItemEnums.FIREGEM,
    label: "Tear of the Ignan",
    description:
      "A vibrant orange-red gemstone that flickers with inner flames, casting a soft glow like embers in a hearth. It radiates heat, and when grasped, it fills the bearer with a sense of fierce power and passion.",
    hidden: true,
    image: firegem,
  },
  {
    name: InventoryItemEnums.AIRGEM,
    label: "Tear of the Auran",
    description:
      "A translucent, pale yellow gemstone that seems to weigh nothing, swirling with mist inside its core. It hums with a faint breeze and is cold to the touch, as though it holds the very breath of the sky within.",
    hidden: true,
    image: airgem,
  },
  {
    name: InventoryItemEnums.EARTHGEM,
    label: "Tear of the Terran",
    description:
      "A dense, dark green gem streaked with veins of gold and silver, radiating a quiet strength. It feels warm in the hand, almost like the pulse of the earth itself, heavy with the weight of ancient stone.",
    hidden: true,
    image: earthgem,
  },
  {
    name: InventoryItemEnums.WATERGEM,
    label: "Tear of the Aquan",
    description:
      "A deep blue gem that shimmers like the surface of the ocean under moonlight. It pulses with the rhythm of the tides, and when held, it cools the air around it, as though drawing on the eternal flow of water.",
    hidden: true,
    image: watergem,
  },
];

export const sidebarNavItems: PuzzleSideBarItem[] = [
  { sideBarEnum: SideBarEnums.CHAT, Icon: MessageSquare },
  {
    sideBarEnum: SideBarEnums.INVENTORY,
    Icon: Backpack,
    className: "border-x",
  },
  {
    sideBarEnum: SideBarEnums.DESCRIPTION,
    Icon: LucideMessageCircleQuestion,
  },
];
