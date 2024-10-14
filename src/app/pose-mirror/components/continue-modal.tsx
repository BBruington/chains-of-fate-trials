import { PageContext } from "@/app/pose-mirror/page-context";
import { useContext } from "react";
import MirrorPoseHooks from "../_hooks/mirror-pose-hooks";

export default function ContinueModal() {
  const {
    buttonAudioRef,
    button2AudioRef,
    poseMusicRef,
    colorSelectMusicRef,
    setShowColorSelect,
  } = useContext(PageContext);

  const { gameStart } = MirrorPoseHooks();

  function handleMouseleave() {
    buttonAudioRef.current.pause();
    buttonAudioRef.current.currentTime = 0;
  }

  function handleContinueButton() {
    gameStart();
    setShowColorSelect(false);
    button2AudioRef.current.play();

    colorSelectMusicRef.current.pause();

    poseMusicRef.current.play();
    poseMusicRef.current.loop = true;
  }

  return (
    <div className="absolute z-10 flex h-full w-[150%] skew-x-[-30deg] transform animate-swipe items-center justify-center overflow-hidden">
      <div className="relative flex h-1/4 w-full items-center justify-center overflow-hidden">
        <div className="absolute flex h-full w-full flex-col justify-between bg-neutral-200">
          <div className="h-1/6 w-full bg-neutral-800"></div>
          <div className="h-1/6 w-full bg-neutral-800"></div>
        </div>

        <button
          onClick={() => handleContinueButton()}
          onMouseEnter={() => buttonAudioRef.current.play()}
          onMouseLeave={() => handleMouseleave()}
          className="z-10 h-10 w-1/3 skew-x-[30deg] transform rounded-2xl bg-neutral-800 text-neutral-200 duration-150 ease-in-out hover:scale-110 focus:scale-110 active:scale-95"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
