import { PulseEffectProps } from "@/app/pose-mirror/types";

export default function PulseEffect({
  showColor,
  index,
  colorOrder,
}: PulseEffectProps) {
  return (
    <div
      className={`${showColor ? `${colorOrder[index % 4].bg}` : null} absolute left-1/2 top-1/2 h-3/4 w-1/2 translate-x-[-50%] translate-y-[-50%] animate-posePulse blur-2xl`}
    ></div>
  );
}
