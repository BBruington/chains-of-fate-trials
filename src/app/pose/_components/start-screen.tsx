import { showStartScreenAtom } from "@/app/atoms/globalState";
import { useAtom } from "jotai";
import { useRef } from "react";

export default function StartScreen() {
  const [showStartScreen, setShowStartScreen] = useAtom(showStartScreenAtom);
  const poseMusicRef = useRef<HTMLAudioElement>(
    new Audio("/music/QuiversOfDusk.mp3"),
  );

  return (
    <div className="flex h-full w-full items-center justify-center">
      <button
        onClick={() => {
          setShowStartScreen(false);
          poseMusicRef.current.play();
          poseMusicRef.current.loop = true;
        }}
        className="h-1/3 max-h-64 w-3/4 max-w-[600px] rounded-3xl bg-neutral-800 text-6xl text-neutral-200 duration-150 ease-in-out hover:scale-110 focus:scale-110 active:scale-95"
      >
        START
      </button>
    </div>
  );
}
