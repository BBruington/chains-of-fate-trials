import { MatchingContentProps } from "@/app/pose-mirror/types";
import MirrorPoseHooks from "../_hooks/pose-list-hooks";
import Draggable from "./draggable";
import ImageDisplay from "./image-display";
import PulseEffect from "./PulseEffect";

export default function MatchingContent({
  name,
  showColor,
  index,
  image,
  isDraggable,
  colorOrder,
}: MatchingContentProps) {
  const { handleMouseLeave } = MirrorPoseHooks();

  return (
    <div
      className={`${showColor ? `border-[${colorOrder[index % 4].border}]` : "border-stone-200"} relative h-40 w-28 rounded-lg border-[7px]`}
      onMouseLeave={() => handleMouseLeave(1)}
    >
      <Draggable id={name} disabled={isDraggable}>
        <ImageDisplay image={image} />
      </Draggable>
      <PulseEffect
        showColor={showColor}
        index={index}
        colorOrder={colorOrder}
      />
    </div>
  );
}
