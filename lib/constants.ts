export const APP_NAME = "E-card4You";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export type PackageKey = "basic" | "voice" | "music" | "full";

export interface PackageInfo {
  name: string;
  price: number; // in cents
  priceDisplay: string;
  description: string;
  features: string[];
  includes: {
    image: boolean;
    voice: boolean;
    music: boolean;
  };
}

export const PACKAGES: Record<PackageKey, PackageInfo> = {
  basic: {
    name: "Basic Card",
    price: 199,
    priceDisplay: "$1.99",
    description: "AI-generated image with your personal message",
    features: [
      "AI-generated card image",
      "Custom text message",
      "3 image re-generations",
      "Shareable link",
    ],
    includes: { image: true, voice: false, music: false },
  },
  voice: {
    name: "Card + Voice",
    price: 299,
    priceDisplay: "$2.99",
    description: "Add your personal voice recording to the card",
    features: [
      "Everything in Basic",
      "Voice recording",
      "Auto-plays on card open",
    ],
    includes: { image: true, voice: true, music: false },
  },
  music: {
    name: "Card + Music",
    price: 399,
    priceDisplay: "$3.99",
    description: "Add AI-generated music to set the mood",
    features: [
      "Everything in Basic",
      "AI-generated custom music",
      "Background music on card open",
    ],
    includes: { image: true, voice: false, music: true },
  },
  full: {
    name: "Full Experience",
    price: 499,
    priceDisplay: "$4.99",
    description: "The ultimate personalized card with everything",
    features: [
      "AI-generated card image",
      "Custom text message",
      "Voice recording",
      "AI-generated music",
      "Best value",
    ],
    includes: { image: true, voice: true, music: true },
  },
} as const;

export const WATERMARK_ADDON_PRICE = 99; // cents - to remove watermark
export const MAX_IMAGE_REGENERATIONS = 3;
export const CARD_EXPIRY_DAYS = 7;

export type OccasionKey =
  | "birthday"
  | "wedding"
  | "baby-shower"
  | "get-well"
  | "congratulations"
  | "thank-you"
  | "christmas"
  | "valentines"
  | "condolences"
  | "anniversary";

export interface OccasionInfo {
  name: string;
  slug: OccasionKey;
  icon: string;
  description: string;
  defaultParticles: string;
  defaultMusicPrompt: string;
  suggestedImagePrompts: string[];
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
}

export const OCCASIONS: OccasionInfo[] = [
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
      "A beautiful handwritten 'Thank You' surrounded by flowers and warm colors",
      "A heartfelt scene with a gift box, flowers, and warm golden light",
      "Elegant floral arrangement with a thank you note in beautiful calligraphy",
    ],
    colorScheme: {
      primary: "#7B68EE",
      secondary: "#98D8C8",
      accent: "#F67280",
      background: "#F8F5FF",
    },
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
      "Santa's sleigh flying over a moonlit snowy village on Christmas Eve",
    ],
    colorScheme: {
      primary: "#C41E3A",
      secondary: "#1B5E20",
      accent: "#FFD700",
      background: "#FFF5F5",
    },
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
      "Red roses with hearts and soft romantic lighting, Valentine's Day atmosphere",
      "A romantic sunset scene with heart-shaped clouds and warm golden light",
      "Elegant love letter with red roses, chocolate hearts, and candle light",
    ],
    colorScheme: {
      primary: "#E91E63",
      secondary: "#FF5252",
      accent: "#FF80AB",
      background: "#FFF0F5",
    },
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
  },
];
