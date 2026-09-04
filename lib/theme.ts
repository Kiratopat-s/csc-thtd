"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
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
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: "var(--font-noto-thai), var(--font-geist-sans), Arial, sans-serif",
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 12,
            backgroundColor: "#1a1a1a",
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

export default theme;
