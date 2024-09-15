"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { revalidateSession } from "../actions";
import { PuzzleElementalTrials } from "@prisma/client";
import { useState, useEffect } from "react";

type VictoryDialogueProps = {
  victoryDialogue: boolean;
  puzzleSession: PuzzleElementalTrials;
};

export default function VictoryDialogue({
  victoryDialogue,
  puzzleSession,
}: VictoryDialogueProps) {
  useEffect( () => {
    const calculateTime = () => {
      revalidateSession({ sessionId: puzzleSession.id });
      const difference =
        puzzleSession.createdAt.getTime() - puzzleSession.updatedAt.getTime();
      const time = {
        minutes: Math.abs(Math.floor(difference / (1000 * 60 ))),
        seconds: Math.abs(Math.floor((difference / 1000) % 60)),
      };
      setTime(time)
      return time;
    };
    calculateTime()
  }, [victoryDialogue])
  const [time, setTime] = useState({ minutes: 0, seconds: 0 });
  
  return (
    <Dialog open={victoryDialogue}>
      <DialogContent>
        <DialogTitle>You've completed the Trials!</DialogTitle>
        <div>You were able to finish the trials in {time.minutes} minutes and {time.seconds} seconds</div>
      </DialogContent>
    </Dialog>
  );
}
