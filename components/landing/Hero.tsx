"use client";

import { motion } from "framer-motion";
import { Logo } from "@/components/shared/Logo";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 px-4 text-center">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-3xl mx-auto"
      >
        <Logo size="lg" className="mb-6 inline-block" />

        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 leading-tight">
          Send Personalized{" "}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            E-Cards
          </span>{" "}
          That Wow
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Create stunning AI-generated cards with custom images, voice messages,
          and music. Share the perfect greeting in just minutes.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#occasions"
            className="inline-flex items-center justify-center h-12 px-8 text-base font-medium rounded-lg bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all hover:shadow-xl hover:-translate-y-0.5"
          >
            Create Your Card
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center justify-center h-12 px-8 text-base font-medium rounded-lg border border-border hover:bg-muted transition-all"
          >
            How It Works
          </a>
        </motion.div>
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        className="absolute top-20 left-10 text-4xl opacity-20"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        🎂
      </motion.div>
      <motion.div
        className="absolute top-40 right-16 text-3xl opacity-20"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
      >
        💍
      </motion.div>
      <motion.div
        className="absolute bottom-20 left-1/4 text-3xl opacity-20"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
      >
        🎄
      </motion.div>
      <motion.div
        className="absolute bottom-32 right-1/4 text-4xl opacity-20"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: 0.3 }}
      >
        ❤️
      </motion.div>
    </section>
  );
}
