import {
  nameArrayAtom,
  playerIconAtom,
  playerNameAtom,
} from "@/app/atoms/globalState";
import { colorBorderChoices, mouseColor } from "@/app/pose-mirror/const";
import type { ColorSelectBoxesProps } from "@/app/pose-mirror/types";
import { cn } from "@/lib/utils";
import { useAtom } from "jotai";
import { Cinzel } from "next/font/google";
import Image from "next/image";
import ColorSelectHooks from "../_hooks/color-select-hooks";

const fontHeader = Cinzel({
  // use cn when implementing it
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

export default function ColorSelectBoxes({ i }: ColorSelectBoxesProps) {
  const [nameArray, setNameArray] = useAtom(nameArrayAtom);
  const [playerIcon, setPlayerIcon] = useAtom(playerIconAtom);
  const [playerName, setPlayerName] = useAtom(playerNameAtom);
  const { handleMouseClick } = ColorSelectHooks();

  // useEffect(() => {
  //   poseMirrorHandleMouseClick(nameArray);
  // }, [nameArray]);

  // async function poseMirrorHandleMouseClick(newNameArray) {
  //   await fetch("/api/pose-mirror-color-select", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       channel: "pose-mirror",
  //       event: "mouse-click",
  //       data: { nameArray: newNameArray },
  //     }),
  //   });
  // }

  // useEffect(() => {
  //   const pusher = new Pusher("13e9bf6d55ba50bff774", {
  //     cluster: "us3",
  //   });

  //   const channel = pusher.subscribe("pose-mirror");

  //   const handleMouseClick = (data) => {
  //     setNameArray(data.newNameArray);
  //   };

  //   channel.bind("mouse-click", handleMouseClick);

  //   return () => {
  //     channel.unbind("mouse-click", handleMouseClick);
  //     pusher.unsubscribe("pose-mirror");
  //   };
  // }, []);

  return (
    <div
      key={i}
      onClick={() => handleMouseClick(i)}
      className={`${colorBorderChoices[i]} ${mouseColor[i]} relative flex h-72 w-52 flex-1 flex-col items-center justify-center overflow-hidden break-words break-all rounded-lg border-8 p-6 text-center text-3xl md:w-72 lg:w-96`}
    >
      {nameArray[i] && (
        <h1 className={cn(fontHeader.className, "mb-3 max-w-full truncate")}>
          {nameArray[i].name}
        </h1>
      )}

      {nameArray[i] && (
        <div className="relative flex h-24 w-full justify-center md:h-40">
          {nameArray[i].icon && (
            <Image
              src={nameArray[i].icon}
              layout="fill"
              objectFit="contain"
              alt="Player Icon"
            />
          )}
        </div>
      )}
    </div>
  );
}
