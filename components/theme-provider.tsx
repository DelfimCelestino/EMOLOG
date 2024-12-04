"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { themes } from "@/hooks/useTheme";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (mounted) {
      const savedThemeColor = localStorage.getItem("themeColor") || "nord";
      const savedTheme = localStorage.getItem("theme") || "dark";

      const root = document.documentElement;
      const isDark = savedTheme === "dark";
      const currentTheme = themes[savedThemeColor as keyof typeof themes];

      Object.entries(currentTheme[isDark ? "dark" : "light"]).forEach(
        ([key, value]) => {
          root.style.setProperty(`--${key}`, value);
        }
      );
    }
  }, [mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <NextThemesProvider {...props} enableSystem={false} defaultTheme="dark">
      {children}
    </NextThemesProvider>
  );
}
