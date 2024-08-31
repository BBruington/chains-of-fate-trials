import { PageContext } from "@/app/pose-mirror/page-context";
import { useContext, useState } from "react";
import ColorSelectBoxes from "./color-select-boxes";
import ContinueModal from "./continue-modal";

export default function ColorSelectScreen() {
  const { nameArray } = useContext(PageContext);
  const [numOfPlayers, setNumOfPlayers] = useState(4);

  return (
    <div className="relative flex h-[calc(100vh-49px)] w-full flex-col items-center justify-around overflow-hidden">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="flex h-[45%] w-5/6 max-w-[75%] flex-col items-center justify-around md:flex-row">
          {[...Array(numOfPlayers)].map((_, i) => {
            return Math.floor(numOfPlayers / 2) > i ? (
              <ColorSelectBoxes key={i} i={i} />
            ) : null;
          })}
        </div>
        <div className="flex h-[45%] w-5/6 max-w-[75%] flex-col items-center justify-around md:flex-row">
          {[...Array(numOfPlayers)].map((_, i) => {
            return Math.floor(numOfPlayers / 2) <= i ? (
              <ColorSelectBoxes key={i} i={i} />
            ) : null;
          })}
        </div>
      </div>

      {nameArray.indexOf("") === -1 ? <ContinueModal /> : null}

      {nameArray.indexOf("") === -1 ? ( // Dark transparent background
        <div className="absolute h-full w-full bg-black opacity-60"></div>
      ) : null}
    </div>
  );
}
