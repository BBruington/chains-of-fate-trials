import { useDroppable } from "@dnd-kit/core";
import { PuzzleEnums } from "../../_types/index";

export default function FirePuzzle() {
  const { setNodeRef } = useDroppable({
    id: PuzzleEnums.FIRE,
  });
  return (
    <div ref={setNodeRef} className="h-full w-full">
      <p>
        You see Six Runes
      </p>
    </div>
  );
}
