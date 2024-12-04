"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Calendar,
  ArrowRight,
  Search,
  BookOpen,
  SunMedium,
  Cloud,
  CloudRain,
  CloudSun,
} from "lucide-react";
import { parseContent } from "@/lib/utils";

type JournalEntry = {
  id: number;
  title: string;
  date: string;
  mood:
    | "Feliz"
    | "Triste"
    | "Ansioso"
    | "Relaxado"
    | "Irritado"
    | "Energético"
    | "Cansado"
    | "Inspirado";
  content: string;
};

const MOOD_COLORS = {
  Feliz: {
    light:
      "bg-yellow-50/50 hover:bg-yellow-50 border-yellow-200 text-yellow-600",
    dark: "dark:bg-yellow-950/50 dark:hover:bg-yellow-900 dark:border-yellow-800 dark:text-yellow-400",
  },
  Triste: {
    light:
      "bg-indigo-50/50 hover:bg-indigo-50 border-indigo-200 text-indigo-600",
    dark: "dark:bg-indigo-950/50 dark:hover:bg-indigo-900 dark:border-indigo-800 dark:text-indigo-400",
  },
  Ansioso: {
    light:
      "bg-orange-50/50 hover:bg-orange-50 border-orange-200 text-orange-600",
    dark: "dark:bg-orange-950/50 dark:hover:bg-orange-900 dark:border-orange-800 dark:text-orange-400",
  },
  Relaxado: {
    light: "bg-teal-50/50 hover:bg-teal-50 border-teal-200 text-teal-600",
    dark: "dark:bg-teal-950/50 dark:hover:bg-teal-900 dark:border-teal-800 dark:text-teal-400",
  },
  Irritado: {
    light: "bg-rose-50/50 hover:bg-rose-50 border-rose-200 text-rose-600",
    dark: "dark:bg-rose-950/50 dark:hover:bg-rose-900 dark:border-rose-800 dark:text-rose-400",
  },
  Energético: {
    light:
      "bg-fuchsia-50/50 hover:bg-fuchsia-50 border-fuchsia-200 text-fuchsia-600",
    dark: "dark:bg-fuchsia-950/50 dark:hover:bg-fuchsia-900 dark:border-fuchsia-800 dark:text-fuchsia-400",
  },
  Cansado: {
    light: "bg-slate-50/50 hover:bg-slate-50 border-slate-200 text-slate-600",
    dark: "dark:bg-slate-950/50 dark:hover:bg-slate-900 dark:border-slate-800 dark:text-slate-400",
  },
  Inspirado: {
    light: "bg-cyan-50/50 hover:bg-cyan-50 border-cyan-200 text-cyan-600",
    dark: "dark:bg-cyan-950/50 dark:hover:bg-cyan-900 dark:border-cyan-800 dark:text-cyan-400",
  },
};

const MOOD_ICONS = {
  Feliz: SunMedium,
  Triste: CloudRain,
  Ansioso: Cloud,
  Relaxado: CloudSun,
  Irritado: CloudRain,
  Energético: SunMedium,
  Cansado: Cloud,
  Inspirado: SunMedium,
};

export default function Home() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "mood">("date");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedEntries = localStorage.getItem("journalEntries");
    if (storedEntries) {
      setEntries(JSON.parse(storedEntries));
    }
    setIsLoading(false);
  }, []);

  const filteredEntries = entries
    .filter(
      (entry) =>
        entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      sortBy === "date"
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : a.mood.localeCompare(b.mood)
    );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse space-y-4">
          <div className="h-12 w-48 bg-muted rounded"></div>
          <div className="h-4 w-64 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-3.5rem)]">
      <div className="container mx-auto p-4 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4"
        >
          {entries.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 bg-background rounded-lg border border-dashed"
            >
              <BookOpen className="h-8 w-8 mx-auto text-muted-foreground mb-3" />
              <div className="mb-3 text-xs text-muted-foreground">
                Seu diário está esperando pela primeira história
              </div>
              <Link href="/new-entry">
                <Button variant="secondary" className="h-8 text-xs">
                  Comece seu primeiro registro
                </Button>
              </Link>
            </motion.div>
          ) : (
            <>
              <div className="flex flex-row gap-2 items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-3.5 w-3.5" />
                  <Input
                    placeholder="Pesquisar entradas..."
                    className="pl-8 h-8 text-xs"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select
                  value={sortBy}
                  onValueChange={(value) => setSortBy(value as "date" | "mood")}
                >
                  <SelectTrigger className="w-[120px] h-8 text-xs">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date" className="text-xs">
                      Data
                    </SelectItem>
                    <SelectItem value="mood" className="text-xs">
                      Humor
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
              >
                {filteredEntries.map((entry) => {
                  const MoodIcon =
                    MOOD_ICONS[entry.mood as keyof typeof MOOD_ICONS];
                  const moodColor =
                    MOOD_COLORS[entry.mood as keyof typeof MOOD_COLORS];

                  return (
                    <motion.div key={entry.id} variants={item}>
                      <Card
                        className={`group h-full flex flex-col transition-all duration-300 border backdrop-blur-sm cursor-pointer 
                          ${moodColor.light} ${moodColor.dark}`}
                      >
                        <CardHeader className="p-3 space-y-2">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            <span className="text-[10px] text-muted-foreground">
                              {new Date(entry.date).toLocaleDateString(
                                "pt-BR",
                                {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </span>
                          </div>
                          <CardTitle className="line-clamp-1 text-sm font-medium">
                            {entry.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 p-3 space-y-2">
                          <Badge
                            variant="secondary"
                            className={`flex items-center gap-1 w-fit text-[10px] px-2 py-0.5 
                              bg-background/50 dark:bg-background/50 backdrop-blur-sm
                              border border-border/50`}
                          >
                            <MoodIcon className="h-3 w-3" />
                            {entry.mood}
                          </Badge>
                          <p className="text-muted-foreground line-clamp-3 text-xs">
                            {parseContent(entry.content)}
                          </p>
                        </CardContent>
                        <CardFooter className="p-3">
                          <Link href={`/entry/${entry.id}`} className="w-full">
                            <Button
                              variant="secondary"
                              className="w-full h-7 text-[10px] flex items-center justify-between
                                bg-background/50 dark:bg-background/50 backdrop-blur-sm"
                            >
                              Ler mais
                              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                            </Button>
                          </Link>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  );
                })}
              </motion.div>
            </>
          )}
        </motion.div>
      </div>
    </ScrollArea>
  );
}
