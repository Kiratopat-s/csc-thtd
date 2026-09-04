"use client";

import { createTheme } from "@mui/material/styles";
import type { ThemeMode } from "./theme-context";

const darkPalette = {
  mode: "dark" as const,
  primary: { main: "#7c3aed" },
  secondary: { main: "#f97316" },
  background: {
    default: "#0a0a0a",
    paper: "#1a1a1a",
  },
  text: {
    primary: "#ededed",
    secondary: "#a1a1aa",
  },
  divider: "#262626",
};

const lightPalette = {
  mode: "light" as const,
  primary: { main: "#7c3aed" },
  secondary: { main: "#f97316" },
  background: {
    default: "#f8f8f8",
    paper: "#ffffff",
  },
  text: {
    primary: "#1a1a1a",
    secondary: "#52525b",
  },
  divider: "#e4e4e7",
};

export function getTheme(mode: ThemeMode) {
  return createTheme({
    palette: mode === "dark" ? darkPalette : lightPalette,
    shape: { borderRadius: 12 },
    typography: {
      fontFamily:
        "var(--font-noto-thai), var(--font-geist-sans), Arial, sans-serif",
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: 12,
              backgroundColor: mode === "dark" ? "#1a1a1a" : "#ffffff",
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#7c3aed",
                borderWidth: 2,
              },
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            textTransform: "none",
            fontWeight: 600,
            padding: "12px 24px",
          },
        },
      },
    },
  });
}

const theme = getTheme("dark");
export default theme;
