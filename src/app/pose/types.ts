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
