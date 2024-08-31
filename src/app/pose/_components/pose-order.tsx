import Image from "next/image";
import type { PoseElement, PoseOrderProps } from "./types";

export default function PoseOrder({ imageArray }: PoseOrderProps) {
  return (
    <div className="mb-5 grid h-fit w-[95%] grid-cols-4 grid-rows-3 place-items-center gap-5 rounded-2xl border-2 bg-neutral-800 p-5 lg:mb-0 lg:h-[calc(100vh-60px)] lg:h-full lg:w-[48%]">
      {imageArray.map((element: PoseElement, i: number) => {
        return (
          <div
            key={i}
            className={`${element.active ? "border-green-300" : "border-stone-200"} relative h-40 w-28 rounded-lg border-4 lg:h-52 lg:w-36`}
          >
            <Image
              src={element.image}
              alt={`Pose ${i}`}
              fill
              sizes="90.406px"
              style={{ objectFit: "cover" }}
              className="rounded-md border-2 border-neutral-800"
            />
          </div>
        );
      })}
    </div>
  );
}
