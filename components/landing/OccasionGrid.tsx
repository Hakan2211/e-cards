"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { OCCASIONS } from "@/lib/constants";

export function OccasionGrid() {
  const router = useRouter();

  const handleSelect = (occasionSlug: string) => {
    router.push(`/select-package?occasion=${occasionSlug}`);
  };

  return (
    <section id="occasions" className="py-16 px-4 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          What&apos;s the Occasion?
        </h2>
        <p className="text-muted-foreground text-lg">
          Choose an event and start creating your personalized card
        </p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {OCCASIONS.map((occasion, index) => (
          <motion.button
            key={occasion.slug}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleSelect(occasion.slug)}
            className="flex flex-col items-center gap-3 p-6 rounded-xl border border-border bg-background hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer"
            style={{
              background: `linear-gradient(135deg, ${occasion.colorScheme.background}44, transparent)`,
            }}
          >
            <span className="text-4xl">{occasion.icon}</span>
            <span className="text-sm font-medium text-foreground">
              {occasion.name}
            </span>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
