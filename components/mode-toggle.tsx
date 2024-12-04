"use client";

import * as React from "react";
import { useTheme } from "@/hooks/useTheme";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const handleChange = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="theme-mode"
        checked={theme === "dark"}
        onCheckedChange={handleChange}
      />
      <Label htmlFor="theme-mode" className="text-sm">
        Modo Escuro
      </Label>
    </div>
  );
}
