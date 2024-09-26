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
  nameArray: string[];
  setNameArray: React.Dispatch<React.SetStateAction<string[]>>;
  buttonAudioRef: MutableRefObject<HTMLAudioElement>;
  button2AudioRef: MutableRefObject<HTMLAudioElement>;
  colorSelectMusicRef: MutableRefObject<HTMLAudioElement>;
  poseMusicRef: MutableRefObject<HTMLAudioElement>;
  showColorSelect: boolean;
  setShowColorSelect: React.Dispatch<React.SetStateAction<boolean>>;
  showStart: boolean;
  setShowStart: React.Dispatch<React.SetStateAction<boolean>>;
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
