"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const MOOD_COLORS = {
  Feliz: "#10B981",
  Triste: "#6B7280",
  Ansioso: "#FBBF24",
  Relaxado: "#60A5FA",
  Irritado: "#EF4444",
  Energético: "#8B5CF6",
  Cansado: "#9CA3AF",
  Inspirado: "#EC4899",
};

type MoodEntry = {
  mood: keyof typeof MOOD_COLORS;
};

export function MoodStats({ entries }: { entries: MoodEntry[] }) {
  const moodCounts = entries.reduce((acc: { [key: string]: number }, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(moodCounts).map(([mood, count]) => ({
    mood,
    count,
  }));

  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader>
        <CardTitle>Estatísticas de Humor</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row items-center justify-around">
        <div className="w-64 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="count"
                nameKey="mood"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ mood, percent }) =>
                  `${mood} ${(percent * 100).toFixed(0)}%`
                }
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={MOOD_COLORS[entry.mood as keyof typeof MOOD_COLORS]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4 md:mt-0">
          {data.map((item) => (
            <div
              key={item.mood}
              className="flex items-center gap-2 p-2 rounded-md"
              style={{
                backgroundColor: `${
                  MOOD_COLORS[item.mood as keyof typeof MOOD_COLORS]
                }20`,
              }}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor:
                    MOOD_COLORS[item.mood as keyof typeof MOOD_COLORS],
                }}
              />
              <span className="font-medium">{item.mood}</span>
              <span className="text-muted-foreground">({item.count}x)</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
