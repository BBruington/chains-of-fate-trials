import { useDroppable } from "@dnd-kit/core";
import { PuzzleEnums } from "../../_types";
import { useAtom } from "jotai";
import { pedestals } from "../../jotaiAtoms";
import { cn } from "@/lib/utils";

export default function PedestalPuzzle() {
  const { setNodeRef } = useDroppable({
    id: PuzzleEnums.PEDESTALS,
  });
  const [pedastals, setPedestal] = useAtom(pedestals);
  const thing = {FIREGEM: {
    id: "FIREGEM",
    type: "fire",
    active: false,
  },
  WATERGEM: {
    id: "WATERGEM",
    type: "water",
    active: false,
  },
  EARTHGEM: {
    id: "EARTHGEM",
    type: "earth",
    active: false,
  },
  AIRGEM: {
    id: "AIRGEM",
    type: "air",
    active: false,
  },}
  
  return (
    <div ref={setNodeRef} className="flex h-full w-full space-x-5">
      {Object.values(pedastals).map((pedastal) => (
        <div className={cn("h-32 w-32 border border-secondary", pedastal.active && "bg-green-500")} key={pedastal.id}>
          {pedastal.type}
        </div>
      ))}
    </div>
  );
}
