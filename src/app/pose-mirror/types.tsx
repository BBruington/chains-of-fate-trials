import type { SolutionOrder } from "@prisma/client";
import type { MutableRefObject, ReactNode } from "react";

export interface ImageDisplayProps {
  image: string | null;
}

export interface MatchingContainerProps {
  containers: {
    name: string;
    image: string | null;
    showColor: boolean;
    isDraggableDisabled: boolean;
    isDroppableDisabled: boolean;
  }[];
}

export interface MatchingContentProps {
  name: string;
  showColor: boolean;
  index: number;
  image: string | null;
  isDraggable: boolean;
}

export interface PulseEffectProps {
  showColor: boolean;
  index: number;
}

export interface DraggableProps {
  id: string;
  disabled: boolean;
  children: ReactNode;
}

export interface DroppableProps {
  id: string;
  disabled: boolean;
  children: ReactNode;
}

export interface colorSelectProps {
  setShowColorSelect: React.Dispatch<React.SetStateAction<boolean>>;
  colorSelectMusic: MutableRefObject<HTMLAudioElement>;
}

export interface startScreenProps {
  colorSelectMusic: HTMLAudioElement;
}

export interface pageProviderProps {
  children: ReactNode;
}

export interface pageContextType {
  buttonAudioRef: React.RefObject<HTMLAudioElement>;
  button2AudioRef: React.RefObject<HTMLAudioElement>;
  colorSelectMusicRef: React.RefObject<HTMLAudioElement>;
  poseMusicRef: React.RefObject<HTMLAudioElement>;
  showColorSelect: boolean;
  setShowColorSelect: (show: boolean) => void;
  showStart: boolean;
  setShowStart: (show: boolean) => void;
}

export interface ColorSelectBoxesProps {
  i: number;
}

export interface DisabledBodyPartProps {
  bodyPart: string;
  x: number;
  y: number;
}

export type Player = {
  number: number;
  state: boolean;
};

export interface nameArrayElement {
  color: string;
  colorBorder: string;
  colorName: string;
  icon: string | null;
  name: string;
  state: boolean;
  number: number | null;
  userId: string;
}

export interface mousePosition {
  x: number;
  y: number;
  xPercent: number;
  yPercent: number;
}

export interface playerStatesElement {
  color: string;
  colorBorder: string;
  colorName: string;
  icon: string | null;
  name: string;
  state: boolean;
  number: number | null;
  userId: string;
}

export interface containerElement {
  name: string;
  image: null | string;
  showColor: boolean;
  isDraggableDisabled: boolean;
  isDroppableDisabled: boolean;
}

export interface handleShuffleNameArrayData {
  newNameArray: nameArrayElement[];
}

export interface handleMouseClickData {
  nameArray: nameArrayElement[];
}

export interface otherPlayersMouses {
  [userId: string]: MousePosition;
}

type MousePosition = {
  x: number;
  y: number;
  userId: string;
};

export interface handleSyncContainersData {
  containers: containerElement[];
  playerStates: playerStatesElement[];
  currentPoseContainer: number;
  coloredBoxes: number[];
}

export interface handleMouseTrackerData {
  mousePosition: mousePosition;
  currentUserId: string;
}

export interface handleSyncSolutionOrderData {
  solutionOrder: SolutionOrder;
}

interface currentUser {
  id: string;
}

type userData = string;

export interface PoseMirrorProps {
  currentUser: currentUser;
  userData: userData;
}

export interface handleMoveBodyPartData {
  coordinates: BodyPartCoordinates;
}

export interface BodyPartCoordinates {
  head: Coordinate;
  torso: Coordinate;
  waist: Coordinate;
  leftForearm: Coordinate;
  leftHand: Coordinate;
  rightForearm: Coordinate;
  rightHand: Coordinate;
  leftKnee: Coordinate;
  leftFoot: Coordinate;
  rightKnee: Coordinate;
  rightFoot: Coordinate;
  id: string;
}

export interface Coordinate {
  x: number;
  y: number;
}
