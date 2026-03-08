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
      {
        name: "Mother's Day",
        slug: "mothers-day",
        icon: "💐",
        description: "Celebrate the best mom",
        defaultParticles: "hearts",
        defaultMusicPrompt: "Warm, loving acoustic music, gentle and heartfelt, tender and beautiful",
        suggestedImagePrompts: [
          "A stunning bouquet of pink roses and peonies with warm soft lighting",
          "A serene garden with blooming flowers and a sun hat on a bench",
          "An elegant tea setting with fine china, flowers, and warm morning light",
        ],
        colorScheme: { primary: "#E8A0BF", secondary: "#F5D0E0", accent: "#C9699E", background: "#FFF5F9" },
        isActive: true,
        sortOrder: 11,
      },
      {
        name: "Father's Day",
        slug: "fathers-day",
        icon: "👔",
        description: "Honor an amazing dad",
        defaultParticles: "confetti",
        defaultMusicPrompt: "Warm, sophisticated jazz music, distinguished and heartfelt, classic and refined",
        suggestedImagePrompts: [
          "A classic gentleman's study with leather books and a pocket watch",
          "A scenic mountain landscape with a lake at golden hour",
          "A rustic woodworking workshop with warm lighting and quality tools",
        ],
        colorScheme: { primary: "#2C3E6B", secondary: "#4A6FA5", accent: "#C9A96E", background: "#F5F7FA" },
        isActive: true,
        sortOrder: 12,
      },
      {
        name: "Graduation",
        slug: "graduation",
        icon: "🎓",
        description: "Celebrate their achievement",
        defaultParticles: "confetti",
        defaultMusicPrompt: "Triumphant orchestral music, proud and uplifting, celebratory fanfare",
        suggestedImagePrompts: [
          "Graduation cap and diploma with golden confetti, achievement celebration",
          "Caps tossed in the air against a bright blue sky, joyful graduation",
          "A sunrise over an open road, bright future ahead, inspiring moment",
        ],
        colorScheme: { primary: "#1A2744", secondary: "#3D5A99", accent: "#FFD700", background: "#F5F6FA" },
        isActive: true,
        sortOrder: 13,
      },
      {
        name: "New Home",
        slug: "new-home",
        icon: "🏡",
        description: "Welcome to their new place",
        defaultParticles: "confetti",
        defaultMusicPrompt: "Warm, cheerful acoustic music, welcoming and homey, light and happy",
        suggestedImagePrompts: [
          "A golden house key with a ribbon in front of a home's front door",
          "A charming cottage with a flowering garden and warm glowing windows",
          "A cozy living room with a fireplace, sofa, and fresh flowers",
        ],
        colorScheme: { primary: "#5B8C5A", secondary: "#A8D5A2", accent: "#C9A96E", background: "#F5FAF5" },
        isActive: true,
        sortOrder: 14,
      },
      {
        name: "New Job",
        slug: "new-job",
        icon: "💼",
        description: "Cheers to their new role",
        defaultParticles: "stars",
        defaultMusicPrompt: "Upbeat, confident pop music, energetic and motivating, fresh start vibes",
        suggestedImagePrompts: [
          "A fresh modern desk setup with a city view, coffee, and morning light",
          "A stunning city skyline at sunrise with golden light",
          "A celebration toast with confetti and champagne, congratulations",
        ],
        colorScheme: { primary: "#1A7A6D", secondary: "#7FCEC5", accent: "#FFD700", background: "#F2FAF8" },
        isActive: true,
        sortOrder: 15,
      },
      {
        name: "Retirement",
        slug: "retirement",
        icon: "🌅",
        description: "Celebrate a life's work",
        defaultParticles: "gold-confetti",
        defaultMusicPrompt: "Smooth, relaxing jazz music, celebratory and mellow, warm saxophone",
        suggestedImagePrompts: [
          "A golden sunset over a calm ocean with a sailboat",
          "A beautiful garden retreat with a bench under a tree",
          "An elegant celebration with champagne and golden accents",
        ],
        colorScheme: { primary: "#D4760A", secondary: "#F5C16C", accent: "#8B4513", background: "#FFFAF0" },
        isActive: true,
        sortOrder: 16,
      },
      {
        name: "Engagement",
        slug: "engagement",
        icon: "💎",
        description: "They said yes!",
        defaultParticles: "hearts-sparkle",
        defaultMusicPrompt: "Romantic, enchanting music, sparkling and joyful, love and excitement",
        suggestedImagePrompts: [
          "A sparkling diamond ring on rose petals with soft bokeh lights",
          "Beautiful roses with champagne and a diamond ring",
          "A romantic sunset with two silhouettes, dreamy proposal",
        ],
        colorScheme: { primary: "#D4A574", secondary: "#F5E0CC", accent: "#E8B4B8", background: "#FFF8F5" },
        isActive: true,
        sortOrder: 17,
      },
      {
        name: "New Baby",
        slug: "new-baby",
        icon: "🍼",
        description: "Welcome the little one",
        defaultParticles: "bubbles",
        defaultMusicPrompt: "Gentle, sweet lullaby music, tender and loving, warm and soothing",
        suggestedImagePrompts: [
          "An adorable nursery with a crib, pastel colors, and a star mobile",
          "Tiny baby booties and a soft blanket with pastel flowers",
          "A stork delivering a baby bundle through a dreamy pastel sky",
        ],
        colorScheme: { primary: "#B8D4E3", secondary: "#F5D5E0", accent: "#E8E0A6", background: "#F8FBFF" },
        isActive: true,
        sortOrder: 18,
      },
      {
        name: "Easter",
        slug: "easter",
        icon: "🐣",
        description: "Happy Easter wishes",
        defaultParticles: "butterflies",
        defaultMusicPrompt: "Light, cheerful spring music, gentle and uplifting, pastoral and bright",
        suggestedImagePrompts: [
          "Decorated Easter eggs in a basket with spring flowers",
          "A cute Easter bunny in a blooming spring garden",
          "Beautiful spring flowers with cherry blossoms and butterflies",
        ],
        colorScheme: { primary: "#9ED2BE", secondary: "#F5C6D0", accent: "#E8D35A", background: "#F8FFF5" },
        isActive: true,
        sortOrder: 19,
      },
      {
        name: "New Year",
        slug: "new-year",
        icon: "🎆",
        description: "Ring in the new year",
        defaultParticles: "gold-confetti",
        defaultMusicPrompt: "Energetic, celebratory dance music, exciting countdown vibes, festive",
        suggestedImagePrompts: [
          "Spectacular midnight fireworks over a city skyline",
          "An elegant champagne toast at midnight with sparklers",
          "A vintage golden clock approaching midnight with confetti",
        ],
        colorScheme: { primary: "#1A1A3E", secondary: "#3D3D7A", accent: "#FFD700", background: "#F5F5FF" },
        isActive: true,
        sortOrder: 20,
      },
      {
        name: "Halloween",
        slug: "halloween",
        icon: "🎃",
        description: "Spooky season greetings",
        defaultParticles: "confetti",
        defaultMusicPrompt: "Playfully spooky music, mysterious and fun, quirky Halloween vibes",
        suggestedImagePrompts: [
          "Glowing jack-o-lanterns on a porch with autumn leaves",
          "A spooky haunted mansion under a full moon with bats",
          "Fun Halloween trick-or-treat scene with candy and decorations",
        ],
        colorScheme: { primary: "#E85D04", secondary: "#6A0572", accent: "#FFD700", background: "#FFF5EB" },
        isActive: true,
        sortOrder: 21,
      },
      {
        name: "Thanksgiving",
        slug: "thanksgiving",
        icon: "🍂",
        description: "Give thanks and gratitude",
        defaultParticles: "soft-light",
        defaultMusicPrompt: "Warm, grateful folk music, cozy and heartfelt, acoustic and wholesome",
        suggestedImagePrompts: [
          "A Thanksgiving feast table with autumn decorations and candles",
          "An autumn harvest cornucopia with fruits and golden wheat",
          "A rustic pumpkin patch with fall leaves and golden sunset",
        ],
        colorScheme: { primary: "#B85C2F", secondary: "#DBA15A", accent: "#8B4513", background: "#FFF8F0" },
        isActive: true,
        sortOrder: 22,
      },
      {
        name: "Thinking of You",
        slug: "thinking-of-you",
        icon: "💭",
        description: "Let them know you care",
        defaultParticles: "soft-light",
        defaultMusicPrompt: "Gentle, reflective piano music, calming and thoughtful, warm and caring",
        suggestedImagePrompts: [
          "Soft wildflowers in a gentle meadow with warm sunlight",
          "A cozy window scene with tea and rain falling outside",
          "A peaceful starlit sky with soft moonlight and a meadow",
        ],
        colorScheme: { primary: "#9B8EC4", secondary: "#D4CEE8", accent: "#B8A0D6", background: "#F8F5FF" },
        isActive: true,
        sortOrder: 23,
      },
      {
        name: "Good Luck",
        slug: "good-luck",
        icon: "🍀",
        description: "Wish them the best",
        defaultParticles: "stars",
        defaultMusicPrompt: "Uplifting, hopeful music, encouraging and bright, confident and warm",
        suggestedImagePrompts: [
          "A four-leaf clover with golden sparkles and dewy morning light",
          "A hopeful sunrise over a beautiful landscape with golden light",
          "Shooting stars across a twilight sky with magical sparkles",
        ],
        colorScheme: { primary: "#2D8B46", secondary: "#A8D5A2", accent: "#FFD700", background: "#F2FAF5" },
        isActive: true,
        sortOrder: 24,
      },
      {
        name: "Missing You",
        slug: "miss-you",
        icon: "🌙",
        description: "Bridge the distance",
        defaultParticles: "soft-light",
        defaultMusicPrompt: "Tender, nostalgic music, gentle and emotional, longing piano melody",
        suggestedImagePrompts: [
          "A full moon over calm water with soft reflections",
          "A handwritten letter with pressed flowers and candlelight",
          "A warm sunset over a distant horizon with gentle clouds",
        ],
        colorScheme: { primary: "#4A5D8E", secondary: "#8B9DC3", accent: "#C9A96E", background: "#F5F7FF" },
        isActive: true,
        sortOrder: 25,
      },
      {
        name: "Sorry",
        slug: "sorry",
        icon: "🕊️",
        description: "Make things right",
        defaultParticles: "soft-light",
        defaultMusicPrompt: "Gentle, sincere piano music, reflective and tender, peaceful and hopeful",
        suggestedImagePrompts: [
          "A white dove with an olive branch and soft muted tones",
          "A rainbow after rain with fresh raindrops on flowers",
          "A gentle bouquet of soft flowers with a heartfelt note",
        ],
        colorScheme: { primary: "#7E9AA7", secondary: "#B8CDD6", accent: "#A8B8A0", background: "#F5F8FA" },
        isActive: true,
        sortOrder: 26,
      },
      {
        name: "Custom Occasion",
        slug: "custom",
        icon: "✨",
        description: "Create your own occasion",
        defaultParticles: "confetti",
        defaultMusicPrompt: "Warm, versatile celebratory music, heartfelt and beautiful, elegant",
        suggestedImagePrompts: [
          "An elegant floral arrangement with warm golden lighting",
          "A whimsical scene with colorful confetti and sparkles",
          "A beautiful natural landscape with soft golden light",
        ],
        colorScheme: { primary: "#C9A96E", secondary: "#E8DCC8", accent: "#B8956A", background: "#FDFBF7" },
        isActive: true,
        sortOrder: 27,
      },
    ];

    for (const occasion of occasions) {
      await ctx.db.insert("occasions", occasion);
    }

    return "Seeded successfully";
  },
});
