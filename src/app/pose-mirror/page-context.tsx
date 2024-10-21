"use client";
import { createContext, useRef, useState } from "react";
import type { pageContextType, pageProviderProps } from "./types";

const defaultValue: pageContextType = {
  buttonAudioRef: { current: null },
  button2AudioRef: { current: null },
  colorSelectMusicRef: { current: null },
  poseMusicRef: { current: null },
  showColorSelect: true, // Default value
  setShowColorSelect: () => {}, // No-op function
  showStart: true, // Default value
  setShowStart: () => {}, // No-op function
};

export const PageContext = createContext<pageContextType>(defaultValue);

export const PageProvider = ({ children }: pageProviderProps) => {
  const [showColorSelect, setShowColorSelect] = useState<boolean>(true);
  const [showStart, setShowStart] = useState<boolean>(true);

  const buttonAudioRef = useRef<HTMLAudioElement>(
    new Audio("/sounds/button.wav"),
  );
  const button2AudioRef = useRef<HTMLAudioElement>(
    new Audio("/sounds/button2.wav"),
  );
  const colorSelectMusicRef = useRef<HTMLAudioElement>(
    new Audio("/music/Baldur'sGate3MainTheme.mp3"),
  );
  const poseMusicRef = useRef<HTMLAudioElement>(
    new Audio("/music/QuiversOfDusk.mp3"),
  );

  return (
    <PageContext.Provider
      value={{
        buttonAudioRef,
        button2AudioRef,
        colorSelectMusicRef,
        poseMusicRef,
        showColorSelect,
        setShowColorSelect,
        showStart,
        setShowStart,
      }}
    >
      {children}
    </PageContext.Provider>
  );
};
