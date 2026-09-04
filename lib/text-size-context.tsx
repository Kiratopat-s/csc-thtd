"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

export type TextSize = "m" | "l" | "xl" | "2xl";

const STORAGE_KEY = "text-size";
const VALID_SIZES: TextSize[] = ["m", "l", "xl", "2xl"];

interface TextSizeContextValue {
  size: TextSize;
  setSize: (size: TextSize) => void;
}

const TextSizeContext = createContext<TextSizeContextValue | null>(null);

export function TextSizeProvider({ children }: { children: React.ReactNode }) {
  const [size, setSizeState] = useState<TextSize>("m");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && VALID_SIZES.includes(stored as TextSize)) {
      setSizeState(stored as TextSize);
      document.documentElement.setAttribute("data-text-size", stored);
    }
  }, []);

  const setSize = useCallback((newSize: TextSize) => {
    setSizeState(newSize);
    localStorage.setItem(STORAGE_KEY, newSize);
    document.documentElement.setAttribute("data-text-size", newSize);
  }, []);

  return (
    <TextSizeContext.Provider value={{ size, setSize }}>
      {children}
    </TextSizeContext.Provider>
  );
}

export function useTextSize() {
  const ctx = useContext(TextSizeContext);
  if (!ctx) throw new Error("useTextSize must be used within TextSizeProvider");
  return ctx;
}
