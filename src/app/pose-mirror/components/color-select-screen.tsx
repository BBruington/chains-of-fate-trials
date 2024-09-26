import { nameArrayAtom, numOfPlayersAtom } from "@/app/atoms/globalState";
import { cn } from "@/lib/utils";
import { useAtom } from "jotai";
import { Cinzel, Luxurious_Roman } from "next/font/google";
import ColorSelectBoxes from "./color-select-boxes";
import ContinueModal from "./continue-modal";

const fontHeader = Cinzel({
  // use cn when implementing it
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
});

const fontList = Luxurious_Roman({
  // use cn when implementing it
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export default function ColorSelectScreen() {
  const [nameArray, setNameArray] = useAtom(nameArrayAtom);
  const [numOfPlayers, setNumOfPlayers] = useAtom(numOfPlayersAtom);

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-around overflow-hidden">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <h1 className={cn(fontHeader.className, "text-4xl md:text-5xl")}>
          Choose Your Color
        </h1>

        <div
          className={cn(
            "mb-5 grid h-full w-11/12 grid-cols-2 place-items-center md:w-5/6 xl:w-2/3 2xl:w-7/12",
            fontList.className,
          )}
        >
          {[...Array(numOfPlayers)].map((_, i) => {
            return <ColorSelectBoxes key={i} i={i} />;
          })}
        </div>
      </div>

      {nameArray.findIndex((user) => user.userId === "") === -1 ? (
        <ContinueModal />
      ) : null}

      {nameArray.findIndex((user) => user.userId === "") ? ( // Dark transparent background
        <div className="absolute h-full w-full bg-black opacity-60"></div>
      ) : null}
    </div>
  );
}
