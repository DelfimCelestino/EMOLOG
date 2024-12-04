"use client";
import {
  Moon,
  Sun,
  Leaf,
  Flower2,
  Palette,
  Droplet,
  Flame,
  Waves,
  Twitter,
  AtSign,
  Zap,
  Coffee,
  Banana,
  Grape,
  Cherry,
  Snowflake,
} from "lucide-react";
import { useTheme, ThemeColor } from "@/hooks/useTheme";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ThemeOption {
  name: string;
  value: ThemeColor;
  icon: React.ReactNode;
}

const themeColors: ThemeOption[] = [
  { name: "Verde", value: "green", icon: <Leaf className="h-4 w-4" /> },
  { name: "Rosa", value: "rose", icon: <Flower2 className="h-4 w-4" /> },
  { name: "Violeta", value: "violet", icon: <Palette className="h-4 w-4" /> },
  { name: "Azul", value: "blue", icon: <Droplet className="h-4 w-4" /> },
  { name: "Laranja", value: "orange", icon: <Flame className="h-4 w-4" /> },
  { name: "Turquesa", value: "teal", icon: <Waves className="h-4 w-4" /> },
  { name: "Twitter", value: "twitter", icon: <Twitter className="h-4 w-4" /> },
  { name: "Threads", value: "threads", icon: <AtSign className="h-4 w-4" /> },
  { name: "Nord", value: "nord", icon: <Zap className="h-4 w-4" /> },
  { name: "GitHub", value: "github", icon: <Coffee className="h-4 w-4" /> },
  { name: "Amarelo", value: "yellow", icon: <Banana className="h-4 w-4" /> },
  { name: "Roxo", value: "purple", icon: <Grape className="h-4 w-4" /> },
  { name: "Vermelho", value: "red", icon: <Cherry className="h-4 w-4" /> },
  { name: "Ciano", value: "cyan", icon: <Snowflake className="h-4 w-4" /> },
];

export function ThemeSwitcher() {
  const { themeColor, setThemeColor, theme, setTheme } = useTheme();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Selecionar tema">
          {theme === "dark" ? (
            <Moon className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <Sun className="h-[1.2rem] w-[1.2rem]" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Aparência</h4>
          <Tabs
            defaultValue={theme}
            onValueChange={(value) => setTheme(value as "light" | "dark")}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="light">Claro</TabsTrigger>
              <TabsTrigger value="dark">Escuro</TabsTrigger>
            </TabsList>
          </Tabs>
          <div>
            <h4 className="mb-2 text-sm font-medium">Tema de Cor</h4>
            <div className="grid grid-cols-5 gap-2">
              {themeColors.map((color) => (
                <Button
                  key={color.value}
                  variant={themeColor === color.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setThemeColor(color.value)}
                  className="h-10 w-10 p-0"
                  title={color.name}
                >
                  {color.icon}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
