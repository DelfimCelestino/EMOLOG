"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChevronLeft,
  Calendar,
  Clock,
  Edit2,
  Trash2,
  SunMedium,
  Cloud,
  CloudRain,
  CloudSun,
} from "lucide-react";

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

const MOOD_COLORS = {
  Feliz: {
    light: "bg-green-50 text-green-700 border-green-200",
    dark: "dark:bg-green-950/50 dark:text-green-400 dark:border-green-800",
  },
  Triste: {
    light: "bg-slate-50 text-slate-700 border-slate-200",
    dark: "dark:bg-slate-950/50 dark:text-slate-400 dark:border-slate-800",
  },
  Ansioso: {
    light: "bg-amber-50 text-amber-700 border-amber-200",
    dark: "dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-800",
  },
  Relaxado: {
    light: "bg-blue-50 text-blue-700 border-blue-200",
    dark: "dark:bg-blue-950/50 dark:text-blue-400 dark:border-blue-800",
  },
  Irritado: {
    light: "bg-red-50 text-red-700 border-red-200",
    dark: "dark:bg-red-950/50 dark:text-red-400 dark:border-red-800",
  },
  Energético: {
    light: "bg-purple-50 text-purple-700 border-purple-200",
    dark: "dark:bg-purple-950/50 dark:text-purple-400 dark:border-purple-800",
  },
  Cansado: {
    light: "bg-zinc-50 text-zinc-700 border-zinc-200",
    dark: "dark:bg-zinc-950/50 dark:text-zinc-400 dark:border-zinc-800",
  },
  Inspirado: {
    light: "bg-pink-50 text-pink-700 border-pink-200",
    dark: "dark:bg-pink-950/50 dark:text-pink-400 dark:border-pink-800",
  },
};

export default function EntryDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [entry, setEntry] = useState<JournalEntry | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { id } = use(params);
  const decodedId = decodeURIComponent(id);

  useEffect(() => {
    const fetchEntry = () => {
      const storedEntries = JSON.parse(
        localStorage.getItem("journalEntries") || "[]"
      );
      const foundEntry = storedEntries.find(
        (e: JournalEntry) => e.id === parseInt(decodedId)
      );
      setEntry(foundEntry || null);
      setIsLoading(false);
    };

    fetchEntry();
  }, [decodedId]);

  const handleDelete = () => {
    if (window.confirm("Tem certeza que deseja excluir esta entrada?")) {
      const storedEntries = JSON.parse(
        localStorage.getItem("journalEntries") || "[]"
      );
      const updatedEntries = storedEntries.filter(
        (e: JournalEntry) => e.id !== parseInt(decodedId)
      );
      localStorage.setItem("journalEntries", JSON.stringify(updatedEntries));
      router.push("/");
    }
  };

  if (isLoading) {
    return (
      <div className="container max-w-4xl mx-auto p-6">
        <div className="space-y-6">
          <Skeleton className="h-8 w-32" />
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-64 mb-2" />
              <Skeleton className="h-4 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!entry) {
    return (
      <div className="container max-w-4xl mx-auto p-6">
        <Card className="text-center py-12">
          <CardContent>
            <h2 className="text-2xl font-semibold mb-4">
              Entrada não encontrada
            </h2>
            <p className="text-muted-foreground mb-6">
              A entrada que você está procurando não existe ou foi removida.
            </p>
            <Button onClick={() => router.push("/")} variant="secondary">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Voltar para o início
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const MoodIcon = MOOD_ICONS[entry.mood as keyof typeof MOOD_ICONS];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-background"
    >
      <div className="container max-w-2xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <header className="flex items-center justify-end">
            <div className="flex gap-2">
              <Button
                variant="ghost"
                onClick={() => router.push(`/new-entry?id=${entry.id}`)}
                className="h-8 text-xs"
              >
                <Edit2 className="mr-1.5 h-3.5 w-3.5" />
                Editar
              </Button>
              <Button
                variant="ghost"
                onClick={handleDelete}
                className="h-8 text-xs text-destructive hover:text-destructive"
              >
                <Trash2 className="mr-1.5 h-3.5 w-3.5" />
                Excluir
              </Button>
            </div>
          </header>

          <article className="bg-card rounded-lg shadow-sm border">
            <div className="px-6 py-8 space-y-6">
              <div className="space-y-4">
                <h1 className="text-xl font-medium tracking-tight">
                  {entry.title}
                </h1>
                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {format(new Date(entry.date), "PPPP", { locale: ptBR })}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {format(new Date(entry.date), "p", { locale: ptBR })}
                  </div>
                  <Badge
                    variant="secondary"
                    className={`flex items-center gap-1 ${
                      MOOD_COLORS[entry.mood as keyof typeof MOOD_COLORS].light
                    } ${
                      MOOD_COLORS[entry.mood as keyof typeof MOOD_COLORS].dark
                    }`}
                  >
                    <MoodIcon className="h-3.5 w-3.5" />
                    {entry.mood}
                  </Badge>
                </div>
              </div>

              <div className="prose prose-sm dark:prose-invert max-w-none">
                <div
                  className="text-sm leading-relaxed text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: entry.content }}
                />
              </div>
            </div>
          </article>
        </div>
      </div>
    </motion.div>
  );
}
