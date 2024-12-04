"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

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
  Feliz: "#4ade80",
  Triste: "#94a3b8",
  Ansioso: "#fbbf24",
  Relaxado: "#60a5fa",
  Irritado: "#ef4444",
  Energético: "#a855f7",
  Cansado: "#6b7280",
  Inspirado: "#ec4899",
};

export default function Statistics() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">(
    "month"
  );

  useEffect(() => {
    const storedEntries = localStorage.getItem("journalEntries");
    if (storedEntries) {
      setEntries(JSON.parse(storedEntries));
    }
  }, []);

  const getMoodStats = () => {
    if (entries.length === 0) return [];

    const moodCounts = entries.reduce((acc: Record<string, number>, entry) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(moodCounts).map(([mood, count]) => ({
      mood,
      count,
    }));
  };

  const getTimelineData = () => {
    const sortedEntries = [...entries].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    return sortedEntries.map((entry) => ({
      date: format(new Date(entry.date), "d 'de' MMMM 'de' yyyy", {
        locale: ptBR,
      }),
      mood: Object.keys(MOOD_COLORS).indexOf(entry.mood),
    }));
  };

  const getWritingTimeStats = () => {
    if (entries.length === 0) return 0;

    const averageWords =
      entries.reduce((acc, entry) => acc + entry.content.split(" ").length, 0) /
      entries.length;

    return Math.round(averageWords);
  };

  const getMostFrequentMood = () => {
    if (entries.length === 0) return "Nenhum";

    const moodCounts = entries.reduce((acc: Record<string, number>, entry) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(moodCounts).reduce((a, b) =>
      a[1] > b[1] ? a : b
    )[0];
  };

  return (
    <div className="min-h-screenpy-8">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <Link href="/">
              <Button
                variant="ghost"
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-3.5 w-3.5 mr-1.5" />
                Voltar
              </Button>
            </Link>
            <Select
              value={timeRange}
              onValueChange={(value) =>
                setTimeRange(value as "week" | "month" | "year")
              }
            >
              <SelectTrigger className="w-[140px] text-xs">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Última Semana</SelectItem>
                <SelectItem value="month">Último Mês</SelectItem>
                <SelectItem value="year">Último Ano</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <h1 className="text-xl font-semibold text-foreground/90">
            Análise do Diário
          </h1>
          <p className="text-xs text-muted-foreground">
            Visualização dos seus registros e padrões emocionais
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <Card className=" backdrop-blur-sm">
            <CardHeader className="p-4 pb-2 space-y-0">
              <CardTitle className="text-xs font-medium text-muted-foreground">
                Total de Entradas
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <div className="text-lg font-semibold">{entries.length}</div>
            </CardContent>
          </Card>

          <Card className=" backdrop-blur-sm">
            <CardHeader className="p-4 pb-2 space-y-0">
              <CardTitle className="text-xs font-medium text-muted-foreground">
                Humor Mais Frequente
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <div className="text-lg font-semibold">
                {getMostFrequentMood()}
              </div>
            </CardContent>
          </Card>

          <Card className=" backdrop-blur-sm">
            <CardHeader className="p-4 pb-2 space-y-0">
              <CardTitle className="text-xs font-medium text-muted-foreground">
                Média de Palavras
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <div className="text-lg font-semibold">
                {getWritingTimeStats()}
              </div>
            </CardContent>
          </Card>

          <Card className=" backdrop-blur-sm">
            <CardHeader className="p-4 pb-2 space-y-0">
              <CardTitle className="text-xs font-medium text-muted-foreground">
                Última Entrada
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <div className="text-lg font-semibold">
                {entries.length > 0
                  ? format(new Date(entries[0].date), "d 'de' MMMM 'de' yyyy", {
                      locale: ptBR,
                    })
                  : "-"}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <Card className="lg:col-span-2  backdrop-blur-sm">
            <CardHeader className="p-4 pb-3">
              <CardTitle className="text-sm font-medium">
                Evolução do Humor
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={getTimelineData()}>
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 10 }}
                    stroke="#94a3b8"
                  />
                  <YAxis tick={{ fontSize: 10 }} stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{
                      fontSize: "12px",
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      border: "none",
                      borderRadius: "6px",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="mood"
                    stroke="#6366f1"
                    strokeWidth={1.5}
                    dot={{ r: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <Card className=" backdrop-blur-sm">
              <CardHeader className="p-4 pb-3">
                <CardTitle className="text-sm font-medium">
                  Distribuição de Humor
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={getMoodStats()}
                      dataKey="count"
                      nameKey="mood"
                      cx="50%"
                      cy="50%"
                      outerRadius={70}
                      innerRadius={45}
                      label={false}
                    >
                      {getMoodStats().map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            MOOD_COLORS[entry.mood as keyof typeof MOOD_COLORS]
                          }
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        fontSize: "12px",
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        border: "none",
                        borderRadius: "6px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className=" backdrop-blur-sm">
              <CardHeader className="p-4 pb-3">
                <CardTitle className="text-sm font-medium">
                  Resumo por Humor
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-2">
                  {getMoodStats().map(({ mood, count }) => (
                    <div key={mood} className="flex items-center gap-2 text-xs">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{
                          backgroundColor:
                            MOOD_COLORS[mood as keyof typeof MOOD_COLORS],
                        }}
                      />
                      <div className="flex-1 text-muted-foreground">{mood}</div>
                      <div className="font-medium">
                        {Math.round((count / entries.length) * 100)}%
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
