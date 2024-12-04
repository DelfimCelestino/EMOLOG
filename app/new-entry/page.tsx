"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "lucide-react";

import { Editor } from "./components/Editor";
import { RecentEntries } from "./components/RecentEntries";
import { WritingTips } from "./components/WrittingTips";
import { moodEmojis } from "./constants";
import { useSearchParams } from "next/navigation";
import type { JournalEntry } from "./types";

export default function NewEntry() {
  const [mounted, setMounted] = useState(false);
  const [title, setTitle] = useState("");
  const [mood, setMood] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();
  const [recentEntries, setRecentEntries] = useState<JournalEntry[]>([]);
  const getParams = useSearchParams();

  const isEditing = Boolean(getParams.get("id"));

  useEffect(() => {
    setMounted(true);
    const storedEntries = JSON.parse(
      localStorage.getItem("journalEntries") || "[]"
    );
    setRecentEntries(storedEntries.slice(0, 3));

    if (isEditing && getParams.get("id")) {
      const entry = storedEntries.find(
        (e: JournalEntry) => e.id === Number(getParams.get("id"))
      );
      if (entry) {
        setTitle(entry.title);
        setMood(entry.mood);
        setContent(entry.content);
      }
    }
  }, [isEditing, getParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mood || !content.trim() || !title.trim()) {
      return;
    }

    const existingEntries = JSON.parse(
      localStorage.getItem("journalEntries") || "[]"
    );

    if (isEditing && getParams.get("id")) {
      const updatedEntries = existingEntries.map((entry: JournalEntry) =>
        entry.id === Number(getParams.get("id"))
          ? {
              ...entry,
              title,
              mood,
              content,
              updatedAt: new Date().toISOString(),
            }
          : entry
      );
      localStorage.setItem("journalEntries", JSON.stringify(updatedEntries));
    } else {
      const newEntry = {
        id: Date.now(),
        title,
        date: new Date().toISOString(),
        mood,
        content,
      };
      localStorage.setItem(
        "journalEntries",
        JSON.stringify([newEntry, ...existingEntries])
      );
    }
    router.push("/");
  };

  const handleDelete = () => {
    if (!getParams.get("id")) return;
    if (window.confirm("Tem certeza que deseja excluir esta entrada?")) {
      const existingEntries = JSON.parse(
        localStorage.getItem("journalEntries") || "[]"
      );
      const filteredEntries = existingEntries.filter(
        (entry: JournalEntry) => entry.id !== Number(getParams.get("id"))
      );
      localStorage.setItem("journalEntries", JSON.stringify(filteredEntries));
      router.push("/");
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="bg-card rounded-lg shadow-sm border">
                <div className="p-8 space-y-8">
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full text-xl font-medium tracking-tight bg-transparent border-none focus:outline-none focus:ring-0 p-0 placeholder:text-muted-foreground/50"
                      placeholder="Título da sua história..."
                      required
                    />
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                      <time className="text-xs text-muted-foreground">
                        {new Intl.DateTimeFormat("pt-BR", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }).format(new Date())}
                      </time>
                    </div>
                  </div>

                  <Select
                    onValueChange={setMood}
                    value={mood}
                    defaultValue={mood}
                  >
                    <SelectTrigger className="w-[240px] h-8 text-xs">
                      <SelectValue placeholder="Como você está se sentindo?" />
                    </SelectTrigger>
                    <SelectContent>
                      <div className="grid grid-cols-2 gap-2 p-2">
                        {Object.entries(moodEmojis).map(([moodKey, emoji]) => (
                          <SelectItem
                            key={moodKey}
                            value={moodKey}
                            className="flex items-center gap-2 p-2 cursor-pointer hover:bg-accent rounded-md text-xs"
                          >
                            <span className="text-lg">{emoji}</span>
                            <span>{moodKey}</span>
                          </SelectItem>
                        ))}
                      </div>
                    </SelectContent>
                  </Select>

                  <Editor content={content} onChange={setContent} />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                {isEditing && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={handleDelete}
                    className="h-8 text-xs px-4"
                  >
                    Excluir
                  </Button>
                )}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/")}
                  className="h-8 text-xs px-4"
                >
                  Cancelar
                </Button>
                <Button type="submit" className="h-8 text-xs px-4">
                  {isEditing ? "Atualizar" : "Salvar Entrada"}
                </Button>
              </div>
            </form>
          </div>

          <aside className="space-y-6">
            <RecentEntries entries={recentEntries} />
            <WritingTips />
          </aside>
        </div>
      </div>
    </div>
  );
}
