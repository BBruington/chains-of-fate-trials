import { useAtom } from "jotai";
import { createContext, useRef, useState } from "react";
import { nameArrayAtom } from "../atoms/globalState";
import type { pageContextType, pageProviderProps } from "./types";

export const PageContext = createContext<pageContextType | null>(null);

export const PageProvider = ({ children }: pageProviderProps) => {
  const [nameArray, setNameArray] = useAtom(nameArrayAtom);
  const [showColorSelect, setShowColorSelect] = useState(false);
  const [showStart, setShowStart] = useState(false);

  const buttonAudioRef = useRef(new Audio("/sounds/button.wav"));
  const button2AudioRef = useRef(new Audio("/sounds/button2.wav"));
  const colorSelectMusicRef = useRef(
    new Audio("/music/Baldur'sGate3MainTheme.mp3"),
  );
  const poseMusicRef = useRef(new Audio("/music/QuiversOfDusk.mp3"));

  return (
    <PageContext.Provider
      value={{
        nameArray,
        setNameArray,
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
