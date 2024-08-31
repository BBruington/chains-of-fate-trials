import { nameArrayAtom } from "@/app/atoms/globalState";
import { colorChoices, mouseColor } from "@/app/pose-mirror/const";
import type { ColorSelectBoxesProps } from "@/app/pose-mirror/types";
import { useAtom } from "jotai";
import Image from "next/image";
import ColorSelectHooks from "../_hooks/color-select-hooks";

export default function ColorSelectBoxes({ i }: ColorSelectBoxesProps) {
  const [nameArray, setNameArray] = useAtom(nameArrayAtom);
  const { handleMouseClick } = ColorSelectHooks();

  return (
    <div
      key={i}
      onClick={() => handleMouseClick(i, "Gannandolf")}
      className={`${colorChoices[i]} ${mouseColor[i]} h-[45%] w-1/2 flex-col items-center overflow-hidden break-words rounded-lg border-8 p-5 text-center text-3xl md:h-5/6 md:w-5/12`}
    >
      <div className="mb-2 flex h-1/3 w-full items-center justify-center">
        <h1 className="md:text-4xl lg:text-5xl">{nameArray[i]}</h1>
      </div>
      {nameArray[i] !== "" ? (
        <div className="relative flex h-1/2 justify-center">
          <Image
            src={`/icons/${nameArray[i]}.png`}
            layout="fill"
            objectFit="contain"
            alt="Player Icon"
          />
        </div>
      ) : null}
    </div>
  );
}
