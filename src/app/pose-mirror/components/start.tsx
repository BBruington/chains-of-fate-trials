import { PageContext } from "@/app/pose-mirror/page-context";
import { useContext } from "react";

export default function StartScreen() {
  const { colorSelectMusicRef, setShowStart } = useContext(PageContext);

  // const fontList = Luxurious_Roman({
  //   // use cn when implementing it
  //   subsets: ["latin"],
  //   weight: ["400"],
  //   display: "swap",
  // });

  // const fontHeader = Cinzel({
  //   // use cn when implementing it
  //   subsets: ["latin"],
  //   weight: ["400"],
  //   display: "swap",
  // });

  function handleStartButton() {
    setShowStart(false);
    colorSelectMusicRef.current.play();
    colorSelectMusicRef.current.loop = true;
  }

  return (
    <div className="absolute z-40 flex h-[calc(100%-49px)] w-full items-center justify-center bg-neutral-200">
      <button
        onClick={() => handleStartButton()}
        className="h-1/3 w-1/2 rounded-3xl bg-neutral-800 text-6xl text-neutral-200 duration-150 ease-in-out hover:scale-110 focus:scale-110 active:scale-95"
      >
        START
      </button>
    </div>
  );
}
