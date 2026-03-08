"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Envelope } from "./Envelope";
import { ParticleEffects } from "./ParticleEffects";
import { MessageDisplay } from "./MessageDisplay";
import { Watermark } from "./Watermark";
import { OCCASIONS } from "@/lib/constants";

interface CardData {
  slug: string;
  occasion: string;
  recipientName: string;
  senderName: string;
  messageText: string;
  imageUrl?: string | null;
  voiceUrl?: string | null;
  musicUrl?: string | null;
  showWatermark: boolean;
  particleEffect?: string | null;
  fontFamily?: string | null;
}

interface ViewerExperienceProps {
  card: CardData;
  onOpen?: () => void;
}

type ViewState = "envelope" | "opening" | "revealed";

export function ViewerExperience({ card, onOpen }: ViewerExperienceProps) {
  const [viewState, setViewState] = useState<ViewState>("envelope");
  const voiceRef = useRef<HTMLAudioElement | null>(null);
  const musicRef = useRef<HTMLAudioElement | null>(null);

  const occasionData = OCCASIONS.find((o) => o.slug === card.occasion);
  const colorScheme = occasionData?.colorScheme || {
    primary: "#C9A96E",
    secondary: "#F5F0E8",
    accent: "#C9A96E",
    background: "#FDFBF7",
  };
  const particleType =
    card.particleEffect || occasionData?.defaultParticles || "confetti";

  const handleOpen = () => {
    setViewState("opening");
    onOpen?.();

    // Start audio after user interaction
    if (card.voiceUrl && voiceRef.current) {
      voiceRef.current.play().catch(console.error);
    }

    // Delay music slightly behind voice
    if (card.musicUrl && musicRef.current) {
      setTimeout(() => {
        if (musicRef.current) {
          musicRef.current.volume = 0.3;
          musicRef.current.play().catch(console.error);
        }
      }, 1000);
    }

    // Transition to revealed after opening animation
    setTimeout(() => {
      setViewState("revealed");
    }, 800);
  };

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      voiceRef.current?.pause();
      musicRef.current?.pause();
    };
  }, []);

  return (
    <div
      className="min-h-screen relative"
      style={{ background: colorScheme.background }}
    >
      {/* Audio elements (hidden) */}
      {card.voiceUrl && <audio ref={voiceRef} src={card.voiceUrl} />}
      {card.musicUrl && (
        <audio ref={musicRef} src={card.musicUrl} loop />
      )}

      <AnimatePresence mode="wait">
        {viewState === "envelope" && (
          <Envelope
            key="envelope"
            recipientName={card.recipientName}
            onOpen={handleOpen}
            colorScheme={colorScheme}
          />
        )}

        {(viewState === "opening" || viewState === "revealed") && (
          <motion.div
            key="card"
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
            className="min-h-screen flex flex-col"
          >
            {/* Particles */}
            <ParticleEffects type={particleType} colorScheme={colorScheme} />

            {/* Card Content */}
            <div className="flex-1 max-w-lg mx-auto w-full px-4 py-8">
              {/* Card Image */}
              {card.imageUrl && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="rounded-2xl overflow-hidden shadow-2xl mb-6"
                >
                  <img
                    src={card.imageUrl}
                    alt="Greeting card"
                    className="w-full aspect-[4/3] object-cover"
                  />
                </motion.div>
              )}

              {/* Message */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-[#E8E0D4]/40"
              >
                <MessageDisplay
                  recipientName={card.recipientName}
                  senderName={card.senderName}
                  messageText={card.messageText}
                  fontFamily={card.fontFamily || undefined}
                />
              </motion.div>

              {/* Watermark */}
              <Watermark show={card.showWatermark} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
