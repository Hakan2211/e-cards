"use client";

import { motion } from "framer-motion";

interface MessageDisplayProps {
  recipientName: string;
  senderName: string;
  messageText: string;
  fontFamily?: string;
}

export function MessageDisplay({
  recipientName,
  senderName,
  messageText,
}: MessageDisplayProps) {
  const words = messageText.split(" ");

  return (
    <div className="text-center py-8 px-4">
      <motion.p
        className="text-lg font-medium text-foreground/80 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Dear {recipientName},
      </motion.p>

      <div className="text-base md:text-lg leading-relaxed text-foreground mb-6">
        {words.map((word, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 1 + index * 0.08,
              duration: 0.3,
            }}
            className="inline-block mr-1"
          >
            {word}
          </motion.span>
        ))}
      </div>

      <motion.p
        className="text-base font-medium text-foreground/80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 + words.length * 0.08 + 0.5 }}
      >
        With love,
        <br />
        <span className="text-lg font-semibold">{senderName}</span>
      </motion.p>
    </div>
  );
}
