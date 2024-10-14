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
  return (
    <button
      className="shine w-54 m-5 h-14 my-1 text-xs"
      key={label}
      onClick={() => handlePuzzleTransition(name, description)}
    >
      {label}
    </button>
  );
}
