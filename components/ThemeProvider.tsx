"use client";

import { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { getTheme } from "@/lib/theme";
import { useTheme } from "@/lib/theme-context";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { mode } = useTheme();
  const muiTheme = getTheme(mode);

  const [cache] = useState(() => {
    const c = createCache({ key: "mui", prepend: true });
    c.compat = true;
    return c;
  });

  useServerInsertedHTML(() => {
    const names = Object.keys(cache.inserted);
    if (names.length === 0) return null;

    let styles = "";
    for (const name of names) {
      styles += cache.inserted[name];
    }

    return (
      <style
        data-emotion={`${cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    );
  });

  return (
    <CacheProvider value={cache}>
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </CacheProvider>
  );
}
