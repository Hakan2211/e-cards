"use client";

import { useEffect, useState } from "react";

interface ParticleEffectsProps {
  type: string;
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

interface Particle {
  id: number;
  x: number;
  y: number;
  emoji: string;
  size: number;
  duration: number;
  delay: number;
}

const PARTICLE_CONFIGS: Record<string, string[]> = {
  confetti: ["🎊", "🎉", "✨", "🎈", "⭐"],
  hearts: ["❤️", "💕", "💖", "💗", "💝"],
  "hearts-sparkle": ["❤️", "💖", "✨", "💕", "⭐"],
  snowflakes: ["❄️", "🌨️", "⛄", "❆", "✧"],
  bubbles: ["🫧", "○", "◌", "◯", "●"],
  butterflies: ["🦋", "🌸", "🌺", "🌼", "✿"],
  "gold-confetti": ["🏆", "⭐", "✨", "🎊", "🥇"],
  stars: ["⭐", "✨", "🌟", "💫", "✦"],
  "soft-light": ["🕯️", "✨", "💫", "○", "◌"],
  "rose-petals": ["🌹", "🥀", "🌸", "💐", "✿"],
};

export function ParticleEffects({ type }: ParticleEffectsProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const emojis = PARTICLE_CONFIGS[type] || PARTICLE_CONFIGS.confetti;
    const newParticles: Particle[] = [];

    for (let i = 0; i < 30; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: -10 - Math.random() * 20,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        size: 14 + Math.random() * 20,
        duration: 3 + Math.random() * 4,
        delay: Math.random() * 3,
      });
    }

    setParticles(newParticles);
  }, [type]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute animate-fall"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: `${p.size}px`,
            animation: `fall ${p.duration}s linear ${p.delay}s infinite`,
          }}
        >
          {p.emoji}
        </span>
      ))}

      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-20px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
