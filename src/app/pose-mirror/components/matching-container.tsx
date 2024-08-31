import Droppable from "./droppable";
import MatchingContent from "./matching-content";

import { MatchingContainerProps } from "@/app/pose-mirror/types";

export default function MatchingContainer({
  containers,
  colorOrder,
}: MatchingContainerProps) {
  return (
    <div className="mt-4 grid h-fit w-[95%] grid-cols-3 place-items-center content-center gap-5 rounded-2xl bg-neutral-800 p-5 pb-8 pt-8 md:grid-cols-4 lg:h-full lg:max-h-screen lg:grid-cols-6 lg:items-center 2xl:m-0 2xl:w-[48%] 2xl:pb-8 2xl:pt-8">
      {containers.map((id, index) => {
        return (
          <Droppable key={index} id={id.name} disabled={id.isDroppableDisabled}>
            <MatchingContent
              showColor={id.showColor}
              name={id.name}
              index={index}
              image={id.image}
              colorOrder={colorOrder}
              isDraggable={id.isDraggableDisabled}
            />
          </Droppable>
        );
      })}
    </div>
  );
}
