import { DescriptionOpject, PuzzleEnums } from "../_types";

type TrialButtonProps = {
  label: string;
  description: { isHighlighted: boolean; message: string }[];
  name: PuzzleEnums;
  handlePuzzleTransition: (
    name: PuzzleEnums,
    description: DescriptionOpject[],
  ) => void;
};
export default function TrialButton({
  name,
  label,
  description,
  handlePuzzleTransition,
}: TrialButtonProps) {
  PuzzleEnums.AIR
  const dynamicColor = {
    PEDESTALS: "#88abb8",
    WATER: "#2194E0",
    FIRE: "#bb1111",
    EARTH: "#ad6b4b",
    AIR: "#cfaf00"
  }
  return (
    <button
      className="shine w-54 m-5 h-14 my-1 text-xs"
      style={{"--dynamic-color": dynamicColor[name]} as React.CSSProperties}
      key={label}
      onClick={() => handlePuzzleTransition(name, description)}
    >
      {label}
    </button>
  );
}
