"use client";

import { motion } from "framer-motion";
import { APP_NAME } from "@/lib/constants";

interface WatermarkProps {
  show: boolean;
}

export function Watermark({ show }: WatermarkProps) {
  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 5 }}
      className="text-center py-8 border-t border-border/50"
    >
      <p className="text-xs text-muted-foreground mb-2">
        Made with {APP_NAME}
      </p>
      <a
        href="/"
        className="inline-flex items-center gap-1 text-xs text-accent hover:text-accent/80 hover:underline transition-colors"
      >
        Create a card for your loved ones
      </a>
    </motion.div>
  );
}
