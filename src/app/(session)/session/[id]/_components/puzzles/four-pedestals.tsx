import { useDroppable } from "@dnd-kit/core";
import { PuzzleEnums } from "../../_types";
import { useAtom } from "jotai";
import { pedestals } from "../../jotaiAtoms";
import { cn } from "@/lib/utils";
import firegem from "@/../public/icons/firegem.svg";
import earthgem from "@/../public/icons/earthgem.svg";
import airgem from "@/../public/icons/airgem.svg";
import watergem from "@/../public/icons/watergem.svg";
import Image from "next/image";

export default function PedestalPuzzle({sessionId}: {sessionId: string}) {
  const { setNodeRef } = useDroppable({
    id: PuzzleEnums.PEDESTALS,
  });
  const [pedastalsState, setPedestalsState] = useAtom(pedestals);
  const GEM_ICONS = {
    firegem,
    earthgem,
    airgem,
    watergem,
  };
  return (
    <div
      ref={setNodeRef}
      className="grid h-full w-full grid-cols-2 justify-items-center space-x-5 p-10"
    >
      {pedastalsState.map((pedastal) => (
        <div
          className={cn(
            "flex h-48 w-48 items-center justify-center rounded-full border border-secondary bg-slate-600",
            pedastal.isActivated && "animate-pulse",
          )}
          key={pedastal.id}
        >
          {pedastal.isActivated && (
            <Image
              src={
                GEM_ICONS[pedastal.id.toLowerCase() as keyof typeof GEM_ICONS]
              }
              alt={`${pedastal.id}`}
              height={150}
              width={150}
            />
          )}
        </div>
      ))}
    </div>
  );
}
