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
import { revalidateSession, endSession } from "../actions";
import { PuzzleElementalTrials } from "@prisma/client";
import { useState, useEffect } from "react";
import { Cinzel } from "next/font/google";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type VictoryDialogueProps = {
  victoryDialogue: boolean;
  puzzleSession: PuzzleElementalTrials;
};

const font = Cinzel({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export default function VictoryDialogue({
  victoryDialogue,
  puzzleSession,
}: VictoryDialogueProps) {
  const router = useRouter();
  useEffect(() => {
    const calculateTime = () => {
      revalidateSession({ sessionId: puzzleSession.id });
      const difference =
        puzzleSession.createdAt.getTime() - puzzleSession.updatedAt.getTime();
      const time = {
        minutes: Math.abs(Math.floor(difference / (1000 * 60))),
        seconds: Math.abs(Math.floor((difference / 1000) % 60)),
      };
      setTime(time);
      return time;
    };
    calculateTime();
  }, [victoryDialogue]);
  const [time, setTime] = useState({ minutes: 0, seconds: 0 });

  const handleEndSession = async () => {
    await endSession({ sessionId: puzzleSession.id });
    router.push("/session/play");
  };

  return (
    <Dialog open={victoryDialogue}>
      <DialogContent>
        <DialogTitle>You&apos;ve completed the Trials!</DialogTitle>
        <div className={`${font.className} flex flex-col space-y-5 text-sm`}>
          <p>
            As the players place the final Tear of the Elements—Terran, Aquan,
            Ignan, and Auran—onto their corresponding pedestals, the air around
            them hums with ancient energy. The ground beneath their feet
            trembles as the elemental forces begin to stir. The Tears, once
            dull, start to glow with an inner light, each one pulsing in time
            with the others, forming a harmony that resonates deep within the
            earth.
          </p>
          <p>
            A warm wind swirls through the chamber, carrying the scent of
            verdant forests and blooming flowers, the unmistakable fragrance of
            the Feywild. The shimmering light from the Tears coalesces into a
            brilliant, multi-colored beam that shoots skyward, splitting the air
            with a crackling energy. The walls of the chamber seem to bend and
            warp, as though reality itself is being pulled apart.
          </p>
          <p>
            Suddenly, with a rush of wind and a flash of dazzling light, a
            portal bursts open at the center of the room, its edges flickering
            with vibrant green and gold hues. Through the portal, the players
            can glimpse a world of wonder: towering trees with leaves of silver
            and gold, creatures of myth and legend flitting between the shadows,
            and a sky that shifts between twilight and dawn.
          </p>
          <div className="mt-5 text-purple-400">
            You were able to finish the trials in {time.minutes} minutes and{" "}
            {time.seconds} seconds
          </div>
          <Button onClick={handleEndSession}>End Session</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
