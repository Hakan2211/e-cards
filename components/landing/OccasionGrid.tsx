"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { OCCASIONS, OCCASION_CATEGORIES, OccasionInfo } from "@/lib/constants";
import { X } from "lucide-react";

export function OccasionGrid() {
  const router = useRouter();
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customName, setCustomName] = useState("");

  const handleSelect = (occasionSlug: string) => {
    if (occasionSlug === "custom") {
      setShowCustomModal(true);
      return;
    }
    router.push(`/select-package?occasion=${occasionSlug}`);
  };

  const handleCustomSubmit = () => {
    const trimmed = customName.trim();
    if (!trimmed) return;
    router.push(
      `/select-package?occasion=custom&customOccasionName=${encodeURIComponent(trimmed)}`
    );
  };

  const getOccasion = (slug: string): OccasionInfo | undefined =>
    OCCASIONS.find((o) => o.slug === slug);

  return (
    <section id="occasions" className="py-20 px-4 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          What&apos;s the Occasion?
        </h2>
        <p className="text-muted-foreground text-lg">
          Choose an event and start creating your personalized card
        </p>
      </motion.div>

      {/* Category Groups */}
      <div className="space-y-10">
        {OCCASION_CATEGORIES.map((category) => (
          <div key={category.label}>
            <motion.h3
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-lg font-heading font-semibold text-foreground/80 mb-4 pl-1"
            >
              {category.label}
            </motion.h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {category.slugs.map((slug, index) => {
                const occasion = getOccasion(slug);
                if (!occasion) return null;
                return (
                  <motion.button
                    key={slug}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.03, duration: 0.25 }}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleSelect(slug)}
                    className="flex flex-col items-center gap-2.5 p-5 rounded-xl border border-border bg-card hover:border-accent/50 hover:shadow-md transition-all duration-200 cursor-pointer"
                  >
                    <span className="text-3xl">{occasion.icon}</span>
                    <span className="text-xs font-medium text-foreground leading-tight text-center">
                      {occasion.name}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Custom Occasion — standalone at the bottom */}
        <div>
          <motion.h3
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-lg font-heading font-semibold text-foreground/80 mb-4 pl-1"
          >
            Something Else?
          </motion.h3>
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleSelect("custom")}
            className="flex flex-col items-center gap-2.5 p-5 rounded-xl border-2 border-dashed border-accent/40 bg-accent/5 hover:border-accent hover:bg-accent/10 hover:shadow-md transition-all duration-200 cursor-pointer w-full sm:w-48"
          >
            <span className="text-3xl">✨</span>
            <span className="text-xs font-medium text-accent leading-tight text-center">
              Custom Occasion
            </span>
            <span className="text-[10px] text-muted-foreground">
              Type your own
            </span>
          </motion.button>
        </div>
      </div>

      {/* Custom Occasion Modal */}
      <AnimatePresence>
        {showCustomModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowCustomModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="bg-card rounded-2xl shadow-xl border border-border p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-heading font-bold">
                  What&apos;s the occasion?
                </h3>
                <button
                  onClick={() => setShowCustomModal(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Type the name of your occasion and we&apos;ll create a card for
                it.
              </p>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleCustomSubmit();
                }}
                placeholder="e.g. Promotion, Housewarming, Farewell..."
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 mb-4"
                autoFocus
                maxLength={60}
              />
              <div className="flex gap-3">
                <button
                  onClick={() => setShowCustomModal(false)}
                  className="flex-1 px-4 py-2.5 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCustomSubmit}
                  disabled={!customName.trim()}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
