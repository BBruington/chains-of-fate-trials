import { nameArrayAtom } from "@/app/atoms/globalState";
import { MatchingContentProps } from "@/app/pose-mirror/types";
import { useAtom } from "jotai";
import MirrorPoseHooks from "../_hooks/mirror-pose-hooks";
import Draggable from "./draggable";
import ImageDisplay from "./image-display";
import PulseEffect from "./PulseEffect";

export default function MatchingContent({
  name,
  showColor,
  index,
  image,
  isDraggable,
}: MatchingContentProps) {
  const [nameArray, setNameArray] = useAtom(nameArrayAtom);
  const { handleMouseLeave } = MirrorPoseHooks();

  return (
    <div
      className={`${showColor ? `${nameArray[index % 2].colorBorder}` : "border-stone-200"} relative h-40 w-28 rounded-lg border-[7px]`}
      onMouseLeave={() => {
        console.log(nameArray);
        console.log(index);
        console.log(index % 2);
        console.log(nameArray[index % 2].userId);
        handleMouseLeave(nameArray[index % 2].userId);
      }}
    >
      <Draggable id={name} disabled={isDraggable}>
        <ImageDisplay image={image} />
      </Draggable>
      <PulseEffect showColor={showColor} index={index} />
    </div>
  );
}
