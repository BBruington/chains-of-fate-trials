import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface DraggableItemProps {
  style?: React.CSSProperties;
  top?: number;
  left?: number;
  active?: boolean;
  bodyPart?: string;
}

export default function Draggable({
  style,
  top,
  left,
  active,
  bodyPart,
}: DraggableItemProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "1",
  });

  const bodySizes = {
    head: {
      height: "6rem", // h-24 (24 * 0.25rem = 6rem)
      width: "6rem", // w-24 (24 * 0.25rem = 6rem)
    },
    torso: {
      height: "5rem", // h-20 (20 * 0.25rem = 5rem)
      width: "2.5rem", // w-10 (10 * 0.25rem = 2.5rem)
    },
    waist: {
      height: "4rem", // h-16 (16 * 0.25rem = 4rem)
      width: "5rem", // w-20 (20 * 0.25rem = 5rem)
    },
    leftForearm: {
      height: "2.5rem", // h-10 (10 * 0.25rem = 2.5rem)
      width: "2.5rem", // w-10 (10 * 0.25rem = 2.5rem)
    },
    leftHand: {
      height: "1.25rem", // h-5 (5 * 0.25rem = 1.25rem)
      width: "1.25rem", // w-5 (5 * 0.25rem = 1.25rem)
    },
    rightForearm: {
      height: "2.5rem", // h-10 (10 * 0.25rem = 2.5rem)
      width: "2.5rem", // w-10 (10 * 0.25rem = 2.5rem)
    },
    rightHand: {
      height: "1.25rem", // h-5 (5 * 0.25rem = 1.25rem)
      width: "1.25rem", // w-5 (5 * 0.25rem = 1.25rem)
    },
    leftKnee: {
      height: "2.5rem", // h-10 (10 * 0.25rem = 2.5rem)
      width: "2.5rem", // w-10 (10 * 0.25rem = 2.5rem)
    },
    leftFoot: {
      height: "1.25rem", // h-5 (5 * 0.25rem = 1.25rem)
      width: "1.25rem", // w-5 (5 * 0.25rem = 1.25rem)
    },
    rightKnee: {
      height: "2.5rem", // h-10 (10 * 0.25rem = 2.5rem)
      width: "2.5rem", // w-10 (10 * 0.25rem = 2.5rem)
    },
    rightFoot: {
      height: "1.25rem", // h-5 (5 * 0.25rem = 1.25rem)
      width: "1.25rem", // w-5 (5 * 0.25rem = 1.25rem)
    },
  };

  let draggableStyle = {
    position: "absolute",
    height: `${bodySizes[bodyPart].height}`,
    width: `${bodySizes[bodyPart].width}`,
    top: `calc(${top}px - (${bodySizes[bodyPart].height} /2))`,
    left: `calc(${left}px - (${bodySizes[bodyPart].width} /2))`,
    ...style,
  };

  active === true
    ? (draggableStyle = {
        ...draggableStyle,
        transform: CSS.Translate.toString(transform),
      })
    : null;

  return (
    <div
      ref={setNodeRef}
      style={draggableStyle}
      {...listeners}
      {...attributes}
      className={`${bodySizes[bodyPart].height} ${bodySizes[bodyPart].width} rounded-full bg-black`}
    ></div>
  );
}
