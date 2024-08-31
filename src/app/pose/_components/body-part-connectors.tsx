import { coordinatesAtom } from "@/app/atoms/globalState";
import { useAtom } from "jotai";

export default function BodyPartConnectors() {
  const [coordinates, setCoordinates] = useAtom(coordinatesAtom);

  return (
    <svg className="absolute h-full w-full">
      <line
        x1={coordinates.head.x}
        y1={coordinates.head.y}
        x2={coordinates.torso.x}
        y2={coordinates.torso.y}
        style={{ stroke: "black", strokeWidth: 2 }}
      />

      <line
        x1={coordinates.torso.x}
        y1={coordinates.torso.y}
        x2={coordinates.waist.x}
        y2={coordinates.waist.y}
        style={{ stroke: "black", strokeWidth: 2 }}
      />

      <line
        x1={coordinates.torso.x}
        y1={coordinates.torso.y}
        x2={coordinates.leftForearm.x}
        y2={coordinates.leftForearm.y}
        style={{ stroke: "black", strokeWidth: 2 }}
      />

      <line
        x1={coordinates.leftForearm.x}
        y1={coordinates.leftForearm.y}
        x2={coordinates.leftHand.x}
        y2={coordinates.leftHand.y}
        style={{ stroke: "black", strokeWidth: 2 }}
      />

      <line
        x1={coordinates.torso.x}
        y1={coordinates.torso.y}
        x2={coordinates.rightForearm.x}
        y2={coordinates.rightForearm.y}
        style={{ stroke: "black", strokeWidth: 2 }}
      />

      <line
        x1={coordinates.rightForearm.x}
        y1={coordinates.rightForearm.y}
        x2={coordinates.rightHand.x}
        y2={coordinates.rightHand.y}
        style={{ stroke: "black", strokeWidth: 2 }}
      />

      <line
        x1={coordinates.waist.x}
        y1={coordinates.waist.y}
        x2={coordinates.leftKnee.x}
        y2={coordinates.leftKnee.y}
        style={{ stroke: "black", strokeWidth: 2 }}
      />

      <line
        x1={coordinates.leftKnee.x}
        y1={coordinates.leftKnee.y}
        x2={coordinates.leftFoot.x}
        y2={coordinates.leftFoot.y}
        style={{ stroke: "black", strokeWidth: 2 }}
      />

      <line
        x1={coordinates.waist.x}
        y1={coordinates.waist.y}
        x2={coordinates.rightKnee.x}
        y2={coordinates.rightKnee.y}
        style={{ stroke: "black", strokeWidth: 2 }}
      />

      <line
        x1={coordinates.rightKnee.x}
        y1={coordinates.rightKnee.y}
        x2={coordinates.rightFoot.x}
        y2={coordinates.rightFoot.y}
        style={{ stroke: "black", strokeWidth: 2 }}
      />
    </svg>
  );
}
