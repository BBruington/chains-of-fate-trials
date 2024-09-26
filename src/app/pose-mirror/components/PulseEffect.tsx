import { nameArrayAtom } from "@/app/atoms/globalState";
import { PulseEffectProps } from "@/app/pose-mirror/types";
import { useAtom } from "jotai";

export default function PulseEffect({
  showColor,
  index,
}: PulseEffectProps) {
  const [nameArray, setNameArray] = useAtom(nameArrayAtom);

  return (
    <div
      className={`${showColor ? `bg-[${nameArray[index % 2].color}]` : null} absolute left-1/2 top-1/2 h-3/4 w-1/2 translate-x-[-50%] translate-y-[-50%] animate-posePulse blur-2xl`}
    ></div>
  );
}
