import type { MutableRefObject, ReactNode } from "react";

export type User = {
  id: number;
  name: string;
  email: string;
};

export interface pageContextType {
  poseMusicRef: MutableRefObject<HTMLAudioElement>;
}

export interface pageProviderProps {
  children: ReactNode;
}

export interface DraggableItemProps {
  style?: React.CSSProperties;
  top?: number;
  left?: number;
  active?: boolean;
  bodyPart: keyof bodySizes;
}

export interface bodySizes {
  head: bodyPart;
  torso: bodyPart;
  waist: bodyPart;
  leftForearm: bodyPart;
  leftHand: bodyPart;
  rightForearm: bodyPart;
  rightHand: bodyPart;
  leftKnee: bodyPart;
  leftFoot: bodyPart;
  rightKnee: bodyPart;
  rightFoot: bodyPart;
}

export interface bodyPart {
  height: string;
  width: string;
}

export interface handleGameStartData {
  solutionOrder: string[];
}
