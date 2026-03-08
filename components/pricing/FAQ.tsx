"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "What's included in every card?",
    answer:
      "Every Cardlar card includes an AI-generated image (or upload your own photo), a custom text message, up to 3 image regenerations, and a shareable link you can send to anyone.",
  },
  {
    question: "How long does my card last?",
    answer:
      "Your card is available permanently. Once created, the recipient can view it anytime using the share link.",
  },
  {
    question: "Can I change my package after purchase?",
    answer:
      "Packages cannot be changed after purchase, but you can create a new card with a different package at any time. With prices starting at just $1.99, it's easy to try different options.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit and debit cards, Apple Pay, and Google Pay through our secure Stripe payment processing. All transactions are encrypted and secure.",
  },
  {
    question: "How does the watermark work?",
    answer:
      'By default, a small "Made with Cardlar" watermark appears on your card. You can toggle it off for free during checkout for a completely clean, professional look.',
  },
  {
    question: "How many times can I regenerate the image?",
    answer:
      'You get 3 image regenerations per card. Each regeneration creates a new AI-generated image. If you upload your own photo and choose the "Original" style, no regeneration is used.',
  },
  {
    question: "Can I use my own photo?",
    answer:
      "Yes! You can upload your own photo and either keep it as-is with the Original style, or apply one of our AI style presets to transform it into something unique like a watercolor, pop art, or vintage look.",
  },
  {
    question: "What occasions are available?",
    answer:
      "We offer 26 pre-designed occasions covering celebrations, holidays, life events, and heartfelt sentiments — from birthdays and weddings to thinking-of-you and sorry cards. Plus a Custom Occasion option where you can type any occasion you'd like.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-3">
      {faqItems.map((item, index) => (
        <div
          key={index}
          className="rounded-xl border border-border bg-card overflow-hidden"
        >
          <button
            onClick={() => toggle(index)}
            className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-muted/30 transition-colors"
          >
            <span className="text-sm font-medium text-foreground pr-4">
              {item.question}
            </span>
            <motion.div
              animate={{ rotate: openIndex === index ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="flex-shrink-0"
            >
              <ChevronDown className="w-4 h-4 text-accent" />
            </motion.div>
          </button>
          <AnimatePresence initial={false}>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <div className="px-6 pb-4 text-sm text-muted-foreground leading-relaxed">
                  {item.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
