"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { moodEmojis } from "../constants";
import type { JournalEntry } from "../types";

interface RecentEntriesProps {
  entries: JournalEntry[];
}

export function RecentEntries({ entries }: RecentEntriesProps) {
  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">Entradas Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        {entries.length > 0 ? (
          <div className="space-y-4">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="p-3 rounded-md border hover:border-primary/50 hover:bg-accent/50 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <time className="text-xs text-muted-foreground">
                    {new Intl.DateTimeFormat("pt-BR").format(
                      new Date(entry.date)
                    )}
                  </time>
                  <span className="text-lg">
                    {moodEmojis[entry.mood as keyof typeof moodEmojis]}
                  </span>
                </div>
                <h3 className="text-sm font-medium mb-1">{entry.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {entry.content.replace(/<[^>]*>/g, "")}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-muted-foreground text-center py-3">
            Nenhuma entrada anterior
          </p>
        )}
      </CardContent>
    </Card>
  );
}
