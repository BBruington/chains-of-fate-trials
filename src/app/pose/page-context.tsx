"use client";

import { createContext, useRef } from "react";
import type { pageContextType, pageProviderProps } from "./types";

export const PageContext = createContext<pageContextType | null>(null);

export const PageProvider = ({ children }: pageProviderProps) => {
  const poseMusicRef = useRef(new Audio("/music/QuiversOfDusk.mp3"));

  return (
    <PageContext.Provider value={{ poseMusicRef }}>
      {children}
    </PageContext.Provider>
  );
};
