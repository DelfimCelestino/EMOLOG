"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-12 items-center justify-center">
        <motion.p
          className="text-[10px] text-muted-foreground flex items-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Criado com{" "}
          <motion.span
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <Heart className="h-3 w-3 text-red-400 fill-red-400" />
          </motion.span>{" "}
          por{" "}
          <a
            href="https://delfim.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary hover:underline"
          >
            Delfim Celestino
          </a>
        </motion.p>
      </div>
    </footer>
  );
}
