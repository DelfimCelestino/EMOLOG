"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BookOpen, PlusCircle, BarChart2, ChevronLeft } from "lucide-react";
import { ThemeSwitcher } from "./theme/ThemeSwitcher";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [userName, setUserName] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  if (!mounted) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-4">
            {!isHome && (
              <Link href="/">
                <Button
                  variant="ghost"
                  className="h-8 text-xs text-muted-foreground hover:text-foreground"
                >
                  <ChevronLeft className="mr-1.5 h-3.5 w-3.5" />
                  Voltar
                </Button>
              </Link>
            )}
            {isHome && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2"
              >
                <BookOpen className="h-5 w-5 text-primary" />
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <h1 className="text-sm font-medium text-primary">EMOLOG</h1>
                    {userName && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[10px] text-muted-foreground"
                      >
                        •{" "}
                        <span className="font-medium text-primary">
                          {userName}
                        </span>
                      </motion.span>
                    )}
                  </div>
                  <p className="text-[10px] text-muted-foreground">
                    {userName
                      ? `Olá! Que tal registrar seu dia?`
                      : "Registre seus pensamentos"}
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <ThemeSwitcher />
            {isHome && (
              <>
                <Link href="/statistics">
                  <Button
                    variant="ghost"
                    className="h-8 text-xs flex items-center gap-1.5"
                  >
                    <BarChart2 className="h-3.5 w-3.5" />
                    Estatísticas
                  </Button>
                </Link>
                <Link href="/new-entry">
                  <Button className="h-8 text-xs flex items-center gap-1.5">
                    <PlusCircle className="h-3.5 w-3.5" />
                    Nova Entrada
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
