"use client";
import { createContext, useRef, useState } from "react";
import type { pageContextType, pageProviderProps } from "./types";

export const PageContext = createContext<pageContextType | null>(null);

export const PageProvider = ({ children }: pageProviderProps) => {
  const [showColorSelect, setShowColorSelect] = useState(true);
  const [showStart, setShowStart] = useState(true);

  const buttonAudioRef = useRef(new Audio("/sounds/button.wav"));
  const button2AudioRef = useRef(new Audio("/sounds/button2.wav"));
  const colorSelectMusicRef = useRef(
    new Audio("/music/Baldur'sGate3MainTheme.mp3"),
  );
  const poseMusicRef = useRef(new Audio("/music/QuiversOfDusk.mp3"));

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
