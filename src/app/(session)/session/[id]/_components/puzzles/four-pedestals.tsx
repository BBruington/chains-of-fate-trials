import { useDroppable } from "@dnd-kit/core";
import { PuzzleEnums } from "../../_types";
import { useAtom } from "jotai";
import { pedestals } from "../../jotaiAtoms";
import { cn } from "@/lib/utils";

export default function PedestalPuzzle() {
  const { setNodeRef } = useDroppable({
    id: PuzzleEnums.PEDESTALS,
  });
  const [pedastalsState, setPedestalsState] = useAtom(pedestals)
  
  return (
    <div ref={setNodeRef} className="flex h-full w-full space-x-5">
      {pedastalsState.map((pedastal) => (
        <div className={cn("h-32 w-32 border border-secondary", pedastal.isActivated && "bg-green-500")} key={pedastal.id}>
          {pedastal.id}
        </div>
      ))}
    </div>
  );
}
