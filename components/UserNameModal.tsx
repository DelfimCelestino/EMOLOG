"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BookOpen, Lock, Monitor } from "lucide-react";

export function UserNameModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedName = localStorage.getItem("userName");
    if (!storedName) {
      setIsOpen(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim()) {
      localStorage.setItem("userName", userName);
      setIsOpen(false);
    }
  };

  if (!mounted) return null;
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-md"
          >
            <Card className="border-2">
              <CardHeader className="space-y-3 text-center pb-2">
                <BookOpen className="w-12 h-12 mx-auto text-primary" />
                <CardTitle className="text-xl">Bem-vindo ao EMOLOG</CardTitle>
                <CardDescription className="text-xs text-muted-foreground space-y-4">
                  <p>
                    Para uma melhor experiência, recomendamos o uso do EMOLOG em
                    computadores. A interface foi otimizada para telas maiores,
                    permitindo uma escrita mais confortável e organizada dos
                    seus pensamentos.
                  </p>
                  <div className="flex items-center justify-center gap-2 text-primary">
                    <Monitor className="h-4 w-4" />
                    <span className="font-medium">
                      Recomendado para Desktop
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2 pt-2 text-muted-foreground">
                    <Lock className="h-3 w-3" />
                    <span className="text-[10px]">
                      Seus registros são armazenados localmente e nunca deixam
                      seu dispositivo
                    </span>
                  </div>
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Input
                      type="text"
                      placeholder="Digite seu nome..."
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="text-center"
                      required
                      autoFocus
                    />
                    <p className="text-[10px] text-muted-foreground text-center">
                      Este nome será usado para personalizar sua experiência
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                  <Button type="submit" className="w-full">
                    Começar a Jornada
                  </Button>
                  <p className="text-[10px] text-muted-foreground text-center px-4">
                    Ao continuar, você concorda que seus dados serão armazenados
                    apenas no seu dispositivo através do localStorage do
                    navegador
                  </p>
                </CardFooter>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
