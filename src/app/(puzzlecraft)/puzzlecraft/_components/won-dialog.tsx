"use-client";

import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function WonDialog({
  isWon,
  mazeIndex,
  levelsAmount,
  handleMoveToNextLevel,
}: {
  isWon: boolean;
  mazeIndex: number;
  levelsAmount: number;
  handleMoveToNextLevel: () => void;
}) {
  const router = useRouter();
  return (
    <Dialog
      open={isWon}
      onOpenChange={() => {
        if (mazeIndex < levelsAmount - 1) {
          handleMoveToNextLevel();
        } else {
          router.push(`/session/play`);
        }
      }}
    >
      <DialogContent className="flex flex-col items-center sm:max-w-[425px]">
        <DialogHeader className="w-full">
          <DialogTitle className="text-center">You Won!</DialogTitle>
          <DialogDescription className="p-3 text-center">
            Good Job Champ
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            className="w-32"
            type="submit"
            onClick={() => {
              if (mazeIndex < levelsAmount - 1) {
                handleMoveToNextLevel();
              } else {
                router.push(`/session/play`);
              }
            }}
          >
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
