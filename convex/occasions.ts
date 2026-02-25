import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("occasions")
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("occasions")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
  },
});

// Seed occasion data
export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if already seeded
    const existing = await ctx.db.query("occasions").first();
    if (existing) return "Already seeded";

    const occasions = [
      {
        name: "Birthday",
        slug: "birthday",
        icon: "🎂",
        description: "Celebrate their special day",
        defaultParticles: "confetti",
        defaultMusicPrompt:
          "Upbeat, celebratory pop music, birthday party vibes, joyful and festive",
        suggestedImagePrompts: [
          "A beautiful birthday cake with colorful candles and festive decorations, warm lighting, celebration atmosphere",
          "Colorful birthday balloons floating in a sunny sky with confetti, joyful celebration",
          "An elegant birthday party scene with gifts, streamers, and golden decorations",
        ],
        colorScheme: {
          primary: "#FF6B6B",
          secondary: "#4ECDC4",
          accent: "#FFE66D",
          background: "#FFF9E6",
        },
        isActive: true,
        sortOrder: 1,
      },
      {
        name: "Wedding",
        slug: "wedding",
        icon: "💍",
        description: "Congratulate the happy couple",
        defaultParticles: "hearts",
        defaultMusicPrompt:
          "Romantic, orchestral, elegant wedding music, graceful and beautiful",
        suggestedImagePrompts: [
          "Elegant wedding scene with white roses, golden rings, and soft romantic lighting",
          "A beautiful wedding arch decorated with flowers in a garden setting, dreamy atmosphere",
          "Two intertwined wedding rings on a bed of rose petals with soft bokeh lighting",
        ],
        colorScheme: {
          primary: "#E8D5B7",
          secondary: "#F5E6CC",
          accent: "#C9A96E",
          background: "#FFF8F0",
        },
        isActive: true,
        sortOrder: 2,
      },
      {
        name: "Baby Shower",
        slug: "baby-shower",
        icon: "👶",
        description: "Welcome the little one",
        defaultParticles: "bubbles",
        defaultMusicPrompt:
          "Gentle, soft lullaby music, warm and tender, sweet and calming",
        suggestedImagePrompts: [
          "Adorable baby nursery with pastel colors, soft toys, and gentle lighting",
          "Cute baby items arranged beautifully with pastel balloons and soft decorations",
          "A sweet stork carrying a baby bundle through a dreamy pastel sky",
        ],
        colorScheme: {
          primary: "#B5D8EB",
          secondary: "#F8C8DC",
          accent: "#E8E8A6",
          background: "#F5F9FF",
        },
        isActive: true,
        sortOrder: 3,
      },
      {
        name: "Get Well Soon",
        slug: "get-well",
        icon: "🌻",
        description: "Send healing thoughts",
        defaultParticles: "butterflies",
        defaultMusicPrompt:
          "Calm, hopeful acoustic music, uplifting and soothing, gentle guitar",
        suggestedImagePrompts: [
          "A bright bouquet of sunflowers and daisies in warm sunshine, hopeful and uplifting",
          "A peaceful garden scene with butterflies and blooming flowers, serene healing atmosphere",
          "A cozy window scene with warm tea, flowers, and soft sunlight streaming in",
        ],
        colorScheme: {
          primary: "#FFD93D",
          secondary: "#6BCB77",
          accent: "#FF8C42",
          background: "#FFFBEB",
        },
        isActive: true,
        sortOrder: 4,
      },
      {
        name: "Congratulations",
        slug: "congratulations",
        icon: "🎉",
        description: "Celebrate their achievement",
        defaultParticles: "gold-confetti",
        defaultMusicPrompt:
          "Triumphant, uplifting music with brass instruments, celebratory and grand",
        suggestedImagePrompts: [
          "A golden trophy with confetti and streamers, celebration of achievement",
          "Fireworks exploding in a night sky with golden sparkles, grand celebration",
          "A champagne toast with golden bubbles and elegant celebration atmosphere",
        ],
        colorScheme: {
          primary: "#FFD700",
          secondary: "#FF6B35",
          accent: "#1A535C",
          background: "#FFFCE8",
        },
        isActive: true,
        sortOrder: 5,
      },
      {
        name: "Thank You",
        slug: "thank-you",
        icon: "🙏",
        description: "Express your gratitude",
        defaultParticles: "stars",
        defaultMusicPrompt:
          "Warm, grateful folk music, heartfelt acoustic, gentle and sincere",
        suggestedImagePrompts: [
          "A beautiful handwritten Thank You surrounded by flowers and warm colors",
          "A heartfelt scene with a gift box, flowers, and warm golden light",
          "Elegant floral arrangement with a thank you note in beautiful calligraphy",
        ],
        colorScheme: {
          primary: "#7B68EE",
          secondary: "#98D8C8",
          accent: "#F67280",
          background: "#F8F5FF",
        },
        isActive: true,
        sortOrder: 6,
      },
      {
        name: "Christmas",
        slug: "christmas",
        icon: "🎄",
        description: "Spread holiday cheer",
        defaultParticles: "snowflakes",
        defaultMusicPrompt:
          "Classic Christmas orchestral music, warm and festive, holiday bells and choir",
        suggestedImagePrompts: [
          "A magical Christmas tree with twinkling lights and presents underneath, cozy winter scene",
          "A snowy winter wonderland with a cozy cabin, warm lights, and falling snow",
          "Santas sleigh flying over a moonlit snowy village on Christmas Eve",
        ],
        colorScheme: {
          primary: "#C41E3A",
          secondary: "#1B5E20",
          accent: "#FFD700",
          background: "#FFF5F5",
        },
        isActive: true,
        sortOrder: 7,
      },
      {
        name: "Valentine's Day",
        slug: "valentines",
        icon: "❤️",
        description: "Share your love",
        defaultParticles: "hearts-sparkle",
        defaultMusicPrompt:
          "Romantic R&B love song, smooth and passionate, heartfelt and tender",
        suggestedImagePrompts: [
          "Red roses with hearts and soft romantic lighting, Valentines Day atmosphere",
          "A romantic sunset scene with heart-shaped clouds and warm golden light",
          "Elegant love letter with red roses, chocolate hearts, and candle light",
        ],
        colorScheme: {
          primary: "#E91E63",
          secondary: "#FF5252",
          accent: "#FF80AB",
          background: "#FFF0F5",
        },
        isActive: true,
        sortOrder: 8,
      },
      {
        name: "Condolences",
        slug: "condolences",
        icon: "🕯️",
        description: "Offer comfort and support",
        defaultParticles: "soft-light",
        defaultMusicPrompt:
          "Somber, gentle piano music, peaceful and comforting, reflective and serene",
        suggestedImagePrompts: [
          "A single white lily with soft candlelight, peaceful and serene atmosphere",
          "A peaceful sunset over calm water with soft golden light, tranquil and comforting",
          "White flowers with gentle light, a serene and respectful memorial scene",
        ],
        colorScheme: {
          primary: "#607D8B",
          secondary: "#90A4AE",
          accent: "#B0BEC5",
          background: "#F5F5F5",
        },
        isActive: true,
        sortOrder: 9,
      },
      {
        name: "Anniversary",
        slug: "anniversary",
        icon: "🌹",
        description: "Celebrate years of love",
        defaultParticles: "rose-petals",
        defaultMusicPrompt:
          "Romantic jazz music, nostalgic and elegant, smooth saxophone and piano",
        suggestedImagePrompts: [
          "Red roses with champagne glasses and a golden anniversary number, elegant celebration",
          "A romantic dinner setting with candles, roses, and starlight",
          "Two hearts intertwined with roses and golden decorations, timeless love",
        ],
        colorScheme: {
          primary: "#8B0000",
          secondary: "#DAA520",
          accent: "#FF69B4",
          background: "#FFF5F5",
        },
        isActive: true,
        sortOrder: 10,
      },
    ];

    for (const occasion of occasions) {
      await ctx.db.insert("occasions", occasion);
    }

    return "Seeded successfully";
  },
});
