export const APP_NAME = "E-card4You";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

// ─── Occasion Types (needed early for style/example records) ──────────
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

// ─── Image Style Presets (per occasion) ───────────────────────────────
export interface StylePreset {
  id: string;
  name: string;
  icon: string;
  editPrompt: string; // used with fal-ai/nano-banana-2/edit when user uploads a photo
  generatePrompt: string; // used with fal-ai/nano-banana-2 when generating from scratch
}

export const OCCASION_STYLES: Record<OccasionKey, StylePreset[]> = {
  birthday: [
    {
      id: "polaroid",
      name: "Polaroid",
      icon: "📸",
      editPrompt: "Transform this photo into a polaroid-style image with a white border frame, slight natural tilt, warm vintage color tones, and a fun birthday party atmosphere",
      generatePrompt: "A fun birthday polaroid photo with warm vintage tones, white border frame, confetti and party decorations, joyful celebration",
    },
    {
      id: "party-illustration",
      name: "Party Illustration",
      icon: "🎨",
      editPrompt: "Transform this photo into a colorful hand-drawn party illustration style with bold outlines, festive birthday decorations, balloons and confetti around the subject",
      generatePrompt: "A colorful hand-drawn birthday party illustration with bold outlines, festive balloons, confetti, streamers, and a birthday cake, cheerful and fun",
    },
    {
      id: "pop-art",
      name: "Pop Art",
      icon: "💥",
      editPrompt: "Transform this photo into a vibrant pop art style with bold colors, halftone dots, comic book aesthetics, and birthday celebration elements",
      generatePrompt: "A vibrant pop art birthday celebration with bold colors, halftone dots, comic book style, birthday cake and presents, retro and energetic",
    },
    {
      id: "cartoon",
      name: "Cartoon",
      icon: "✨",
      editPrompt: "Transform this photo into a cute cartoon illustration style, like a Pixar character, with bright cheerful colors and birthday party elements",
      generatePrompt: "A cute cartoon birthday scene in Pixar style with bright cheerful colors, adorable characters celebrating with cake, balloons, and presents",
    },
  ],
  wedding: [
    {
      id: "watercolor",
      name: "Elegant Watercolor",
      icon: "🎨",
      editPrompt: "Transform this photo into an elegant watercolor painting with soft flowing brushstrokes, delicate floral accents, romantic pastel tones, and a dreamy wedding atmosphere",
      generatePrompt: "An elegant watercolor painting of a romantic wedding scene with soft flowing brushstrokes, white roses, golden rings, delicate floral accents, and dreamy pastel tones",
    },
    {
      id: "vintage",
      name: "Soft Vintage",
      icon: "📜",
      editPrompt: "Transform this photo into a soft vintage style with sepia-tinted tones, gentle vignette, classic film grain, and a timeless romantic wedding feel",
      generatePrompt: "A soft vintage wedding scene with sepia tones, classic film grain, elegant couple, white flowers, and timeless romantic atmosphere",
    },
    {
      id: "portrait",
      name: "Classic Portrait",
      icon: "🖼️",
      editPrompt: "Transform this photo into a classic oil painting portrait style with rich warm colors, soft lighting, elegant composition, and romantic wedding ambiance",
      generatePrompt: "A classic oil painting style wedding portrait with rich warm colors, soft golden lighting, elegant roses, and romantic ambiance",
    },
    {
      id: "gold-frame",
      name: "Gold Frame",
      icon: "✨",
      editPrompt: "Transform this photo by adding an ornate golden frame border, soft warm lighting, and elegant wedding decorations with a luxurious feel",
      generatePrompt: "An elegant wedding scene framed in an ornate golden border with soft warm lighting, white roses, champagne, and luxurious celebration atmosphere",
    },
  ],
  "baby-shower": [
    {
      id: "pastel-illustration",
      name: "Pastel Illustration",
      icon: "🎨",
      editPrompt: "Transform this photo into a soft pastel illustration with gentle colors, cute baby-themed elements like stars and clouds, and a warm nurturing feel",
      generatePrompt: "A soft pastel illustration of a baby nursery scene with gentle colors, cute stuffed animals, stars and clouds, warm and nurturing atmosphere",
    },
    {
      id: "storybook",
      name: "Storybook",
      icon: "📖",
      editPrompt: "Transform this photo into a children's storybook illustration style with whimsical details, soft colors, and charming baby-themed decorations",
      generatePrompt: "A charming children's storybook illustration with a cute baby theme, whimsical details, soft pastel colors, adorable animals, and magical atmosphere",
    },
    {
      id: "cute-cartoon",
      name: "Cute Cartoon",
      icon: "🧸",
      editPrompt: "Transform this photo into an adorable cartoon style with rounded soft shapes, pastel baby colors, cute characters, and sweet baby shower decorations",
      generatePrompt: "An adorable cartoon baby shower scene with rounded soft shapes, pastel colors, cute baby items, teddy bears, and sweet gentle atmosphere",
    },
    {
      id: "soft-watercolor",
      name: "Soft Watercolor",
      icon: "💧",
      editPrompt: "Transform this photo into a delicate watercolor style with soft washes of pastel pink and blue, gentle brushstrokes, and dreamy baby shower atmosphere",
      generatePrompt: "A delicate watercolor baby shower scene with soft washes of pastel pink and blue, gentle brushstrokes, baby booties, flowers, and dreamy atmosphere",
    },
  ],
  "get-well": [
    {
      id: "gentle-watercolor",
      name: "Gentle Watercolor",
      icon: "🎨",
      editPrompt: "Transform this photo into a gentle watercolor painting with warm soothing colors, soft sunflowers and daisies, and a hopeful healing atmosphere",
      generatePrompt: "A gentle watercolor painting of bright sunflowers and daisies in warm sunshine, soft soothing colors, hopeful and uplifting healing atmosphere",
    },
    {
      id: "sunny-illustration",
      name: "Sunny Illustration",
      icon: "☀️",
      editPrompt: "Transform this photo into a bright cheerful illustration with warm golden sunshine, happy flowers, butterflies, and an uplifting feel-better atmosphere",
      generatePrompt: "A bright cheerful illustration with warm golden sunshine streaming through a window, happy flowers, butterflies, and a cozy uplifting get-well atmosphere",
    },
    {
      id: "warm-pastel",
      name: "Warm Pastel",
      icon: "🌸",
      editPrompt: "Transform this photo into a warm pastel style with soft muted colors, gentle floral elements, and a calming comforting feel",
      generatePrompt: "A warm pastel scene with soft muted colors, a cozy window with flowers, warm tea, gentle sunlight, calming and comforting get-well atmosphere",
    },
  ],
  congratulations: [
    {
      id: "golden-celebration",
      name: "Golden Celebration",
      icon: "🏆",
      editPrompt: "Transform this photo into a grand golden celebration style with sparkles, confetti, golden light effects, and a triumphant achievement atmosphere",
      generatePrompt: "A grand golden celebration with sparkles, confetti, golden trophy, champagne toast, and triumphant achievement atmosphere",
    },
    {
      id: "fireworks",
      name: "Fireworks",
      icon: "🎆",
      editPrompt: "Transform this photo with a dramatic fireworks display background, golden sparkles, and a spectacular night celebration feel",
      generatePrompt: "Spectacular fireworks exploding in a night sky with golden sparkles, confetti streamers, and grand celebration atmosphere",
    },
    {
      id: "elegant-toast",
      name: "Elegant Toast",
      icon: "🥂",
      editPrompt: "Transform this photo into an elegant champagne toast scene with golden bubbles, luxurious setting, and sophisticated celebration style",
      generatePrompt: "An elegant champagne toast with golden bubbles, luxurious celebration setting, roses, and sophisticated congratulations atmosphere",
    },
  ],
  "thank-you": [
    {
      id: "floral-watercolor",
      name: "Floral Watercolor",
      icon: "🌺",
      editPrompt: "Transform this photo into a beautiful floral watercolor style with delicate flowers, warm grateful colors, and an elegant thank-you atmosphere",
      generatePrompt: "A beautiful floral watercolor arrangement with delicate flowers surrounding an elegant thank-you note, warm grateful colors and golden light",
    },
    {
      id: "heartfelt",
      name: "Heartfelt Warm",
      icon: "💛",
      editPrompt: "Transform this photo into a warm heartfelt style with golden light, soft bokeh, gentle flower accents, and a sincere grateful atmosphere",
      generatePrompt: "A heartfelt scene with warm golden light, gift box surrounded by flowers, soft bokeh background, sincere and grateful thank-you atmosphere",
    },
    {
      id: "calligraphy",
      name: "Elegant Calligraphy",
      icon: "✒️",
      editPrompt: "Transform this photo with elegant calligraphy-style decorative borders, refined typography elements, floral accents, and a sophisticated thank-you feel",
      generatePrompt: "An elegant calligraphy-style thank-you design with refined decorative borders, beautiful floral arrangements, and sophisticated grateful atmosphere",
    },
  ],
  christmas: [
    {
      id: "snow-globe",
      name: "Snow Globe",
      icon: "🔮",
      editPrompt: "Transform this photo into a magical snow globe scene with falling snowflakes, warm glowing lights, and enchanting Christmas atmosphere",
      generatePrompt: "A magical Christmas snow globe scene with a cozy village inside, falling snowflakes, warm glowing lights, and enchanting holiday atmosphere",
    },
    {
      id: "vintage-christmas",
      name: "Vintage Christmas",
      icon: "🎅",
      editPrompt: "Transform this photo into a classic vintage Christmas style with warm retro colors, traditional holiday decorations, and nostalgic cozy atmosphere",
      generatePrompt: "A classic vintage Christmas scene with warm retro colors, traditional holiday decorations, a glowing tree, presents, and nostalgic cozy atmosphere",
    },
    {
      id: "festive-illustration",
      name: "Festive Illustration",
      icon: "🎄",
      editPrompt: "Transform this photo into a cheerful festive Christmas illustration with bold holiday colors, decorated tree, presents, and joyful winter wonderland elements",
      generatePrompt: "A cheerful festive Christmas illustration with bold red and green colors, beautifully decorated tree, presents, and joyful winter wonderland atmosphere",
    },
  ],
  valentines: [
    {
      id: "romantic-watercolor",
      name: "Romantic Watercolor",
      icon: "🎨",
      editPrompt: "Transform this photo into a romantic watercolor painting with soft pink and red washes, hearts, roses, and a dreamy love atmosphere",
      generatePrompt: "A romantic watercolor painting with soft pink and red washes, red roses, floating hearts, and a dreamy Valentine's love atmosphere",
    },
    {
      id: "heart-frame",
      name: "Heart Frame",
      icon: "💕",
      editPrompt: "Transform this photo by framing it in a beautiful heart-shaped border with roses, soft bokeh lights, and romantic Valentine's atmosphere",
      generatePrompt: "A beautiful Valentine's scene framed in a heart-shaped border with red roses, soft pink bokeh lights, chocolates, and romantic love atmosphere",
    },
    {
      id: "dreamy-soft",
      name: "Dreamy Soft Focus",
      icon: "💫",
      editPrompt: "Transform this photo into a dreamy soft-focus style with gentle lens flare, warm pink tones, hearts, and ethereal romantic atmosphere",
      generatePrompt: "A dreamy Valentine's scene with soft focus, gentle lens flare, warm pink and red tones, floating hearts, candles, and ethereal romantic atmosphere",
    },
  ],
  condolences: [
    {
      id: "gentle-watercolor",
      name: "Gentle Watercolor",
      icon: "🎨",
      editPrompt: "Transform this photo into a gentle serene watercolor with muted peaceful colors, soft white lilies, and respectful comforting atmosphere",
      generatePrompt: "A gentle serene watercolor of white lilies with soft candlelight, muted peaceful colors, and respectful comforting memorial atmosphere",
    },
    {
      id: "soft-sepia",
      name: "Soft Sepia",
      icon: "🕊️",
      editPrompt: "Transform this photo into a soft sepia-toned style with gentle warmth, peaceful lighting, and a serene respectful memorial atmosphere",
      generatePrompt: "A peaceful sunset over calm water in soft sepia tones, gentle golden light, white dove, serene and respectful memorial atmosphere",
    },
    {
      id: "peaceful-illustration",
      name: "Peaceful Illustration",
      icon: "🌿",
      editPrompt: "Transform this photo into a peaceful illustration style with soft muted colors, gentle nature elements, and a calming serene atmosphere",
      generatePrompt: "A peaceful illustration of white flowers in gentle light, soft muted colors, nature elements like leaves and doves, calming serene memorial atmosphere",
    },
  ],
  anniversary: [
    {
      id: "golden-vintage",
      name: "Golden Vintage",
      icon: "✨",
      editPrompt: "Transform this photo into a golden vintage style with rich warm tones, elegant golden accents, classic film quality, and timeless romantic atmosphere",
      generatePrompt: "A golden vintage anniversary scene with rich warm tones, elegant roses, champagne, golden accents, classic film quality, and timeless romantic atmosphere",
    },
    {
      id: "classic-portrait",
      name: "Classic Portrait",
      icon: "🖼️",
      editPrompt: "Transform this photo into a classic renaissance-style portrait with rich colors, dramatic soft lighting, and elegant romantic anniversary atmosphere",
      generatePrompt: "A classic renaissance-style portrait of intertwined roses with rich colors, dramatic soft lighting, golden decorations, and elegant anniversary atmosphere",
    },
    {
      id: "elegant-watercolor",
      name: "Elegant Watercolor",
      icon: "🌹",
      editPrompt: "Transform this photo into an elegant watercolor with rich romantic reds and golds, flowing rose petal details, and a beautiful anniversary celebration feel",
      generatePrompt: "An elegant watercolor anniversary scene with rich romantic reds and golds, flowing rose petals, champagne glasses, and beautiful celebration atmosphere",
    },
  ],
};

// ─── Example Card Designs (per occasion) ──────────────────────────────
export interface ExampleCard {
  id: string;
  label: string;
  description: string;
  thumbnailUrl: string; // path to static asset in /public/examples/
  prompt: string; // hidden prompt for generating a similar image
}

export const OCCASION_EXAMPLES: Record<OccasionKey, ExampleCard[]> = {
  birthday: [
    {
      id: "birthday-cake",
      label: "Birthday Cake",
      description: "Colorful cake with candles",
      thumbnailUrl: "/examples/birthday-cake.webp",
      prompt: "A beautiful birthday cake with colorful lit candles and festive sprinkle decorations, warm golden lighting, celebration atmosphere, confetti falling softly",
    },
    {
      id: "birthday-balloons",
      label: "Party Balloons",
      description: "Festive balloons and confetti",
      thumbnailUrl: "/examples/birthday-balloons.webp",
      prompt: "Colorful birthday balloons floating in a bright sunny sky with confetti and streamers, joyful celebration party atmosphere, vibrant and festive",
    },
    {
      id: "birthday-gifts",
      label: "Gift Boxes",
      description: "Elegant wrapped presents",
      thumbnailUrl: "/examples/birthday-gifts.webp",
      prompt: "An elegant arrangement of beautifully wrapped birthday presents with golden ribbons, surrounded by party decorations, warm festive lighting",
    },
  ],
  wedding: [
    {
      id: "wedding-rings",
      label: "Wedding Rings",
      description: "Elegant golden rings",
      thumbnailUrl: "/examples/wedding-rings.webp",
      prompt: "Two intertwined golden wedding rings on a bed of white rose petals with soft bokeh lighting, elegant and romantic wedding atmosphere",
    },
    {
      id: "wedding-bouquet",
      label: "Bridal Bouquet",
      description: "Beautiful floral arrangement",
      thumbnailUrl: "/examples/wedding-bouquet.webp",
      prompt: "A stunning bridal bouquet of white roses and peonies with soft greenery, romantic soft lighting, elegant wedding celebration atmosphere",
    },
    {
      id: "wedding-arch",
      label: "Wedding Arch",
      description: "Flower-decorated ceremony arch",
      thumbnailUrl: "/examples/wedding-arch.webp",
      prompt: "A beautiful outdoor wedding arch decorated with white flowers and flowing fabric in a garden setting, dreamy romantic atmosphere with soft sunlight",
    },
  ],
  "baby-shower": [
    {
      id: "baby-nursery",
      label: "Cozy Nursery",
      description: "Adorable baby room",
      thumbnailUrl: "/examples/baby-nursery.webp",
      prompt: "An adorable baby nursery with pastel colors, soft plush toys, a beautiful wooden crib with stars mobile, gentle warm lighting, sweet nurturing atmosphere",
    },
    {
      id: "baby-stork",
      label: "Stork Delivery",
      description: "Classic stork with bundle",
      thumbnailUrl: "/examples/baby-stork.webp",
      prompt: "A sweet illustration of a stork carrying a baby bundle through a dreamy pastel sky with soft clouds and gentle sunshine, whimsical and heartwarming",
    },
    {
      id: "baby-items",
      label: "Baby Items",
      description: "Cute baby accessories",
      thumbnailUrl: "/examples/baby-items.webp",
      prompt: "Cute baby items beautifully arranged with pastel balloons, tiny booties, pacifier, and soft toys, gentle pastel colors and warm lighting",
    },
  ],
  "get-well": [
    {
      id: "getwell-flowers",
      label: "Bright Flowers",
      description: "Cheerful sunflower bouquet",
      thumbnailUrl: "/examples/getwell-flowers.webp",
      prompt: "A bright cheerful bouquet of sunflowers and daisies in warm sunshine, hopeful and uplifting, gentle healing atmosphere with soft golden light",
    },
    {
      id: "getwell-garden",
      label: "Peaceful Garden",
      description: "Serene garden scene",
      thumbnailUrl: "/examples/getwell-garden.webp",
      prompt: "A peaceful garden scene with blooming flowers, butterflies, and soft sunlight streaming through, serene calming healing atmosphere",
    },
    {
      id: "getwell-cozy",
      label: "Cozy Window",
      description: "Warm tea and flowers",
      thumbnailUrl: "/examples/getwell-cozy.webp",
      prompt: "A cozy window scene with warm herbal tea, fresh flowers in a vase, and soft sunlight streaming in, comforting and restful get-well atmosphere",
    },
  ],
  congratulations: [
    {
      id: "congrats-trophy",
      label: "Gold Trophy",
      description: "Achievement celebration",
      thumbnailUrl: "/examples/congrats-trophy.webp",
      prompt: "A gleaming golden trophy with confetti and streamers raining down, grand celebration of achievement, sparkling golden light atmosphere",
    },
    {
      id: "congrats-fireworks",
      label: "Fireworks",
      description: "Spectacular night display",
      thumbnailUrl: "/examples/congrats-fireworks.webp",
      prompt: "Spectacular fireworks exploding in a dark night sky with golden sparkles and colorful bursts, grand celebration atmosphere",
    },
    {
      id: "congrats-champagne",
      label: "Champagne Toast",
      description: "Elegant celebration toast",
      thumbnailUrl: "/examples/congrats-champagne.webp",
      prompt: "An elegant champagne toast with golden bubbles rising, sophisticated celebration setting with roses and golden confetti, luxurious atmosphere",
    },
  ],
  "thank-you": [
    {
      id: "thankyou-flowers",
      label: "Thank You Flowers",
      description: "Beautiful floral arrangement",
      thumbnailUrl: "/examples/thankyou-flowers.webp",
      prompt: "A beautiful floral arrangement with mixed colorful flowers surrounding a heartfelt scene, warm grateful golden light, elegant thank-you atmosphere",
    },
    {
      id: "thankyou-gift",
      label: "Gift of Thanks",
      description: "Heartfelt gift scene",
      thumbnailUrl: "/examples/thankyou-gift.webp",
      prompt: "A heartfelt gift box with a beautiful bow, surrounded by flowers and warm golden light, soft bokeh background, sincere grateful atmosphere",
    },
    {
      id: "thankyou-calligraphy",
      label: "Elegant Script",
      description: "Beautiful calligraphy design",
      thumbnailUrl: "/examples/thankyou-calligraphy.webp",
      prompt: "Elegant floral calligraphy-style design with refined decorative borders, beautiful mixed flowers, and sophisticated grateful thank-you atmosphere",
    },
  ],
  christmas: [
    {
      id: "christmas-tree",
      label: "Christmas Tree",
      description: "Magical decorated tree",
      thumbnailUrl: "/examples/christmas-tree.webp",
      prompt: "A magical Christmas tree with twinkling warm lights, beautiful ornaments, presents underneath, cozy winter scene with soft snowfall outside",
    },
    {
      id: "christmas-village",
      label: "Snow Village",
      description: "Cozy winter wonderland",
      thumbnailUrl: "/examples/christmas-village.webp",
      prompt: "A cozy snowy village on Christmas Eve with warm lights glowing from windows, snow-covered rooftops, gentle snowfall, and magical winter atmosphere",
    },
    {
      id: "christmas-santa",
      label: "Santa's Flight",
      description: "Santa over moonlit village",
      thumbnailUrl: "/examples/christmas-santa.webp",
      prompt: "Santa's sleigh flying over a moonlit snowy village on Christmas Eve, reindeer silhouettes against a bright full moon, magical holiday atmosphere",
    },
  ],
  valentines: [
    {
      id: "valentines-roses",
      label: "Red Roses",
      description: "Classic romantic roses",
      thumbnailUrl: "/examples/valentines-roses.webp",
      prompt: "Beautiful red roses with soft hearts and romantic pink lighting, Valentine's Day atmosphere with gentle bokeh, passionate and tender",
    },
    {
      id: "valentines-sunset",
      label: "Romantic Sunset",
      description: "Heart-shaped clouds at sunset",
      thumbnailUrl: "/examples/valentines-sunset.webp",
      prompt: "A romantic sunset scene with heart-shaped clouds and warm golden-pink light, Valentine's Day atmosphere, dreamy and passionate",
    },
    {
      id: "valentines-letter",
      label: "Love Letter",
      description: "Elegant love letter scene",
      thumbnailUrl: "/examples/valentines-letter.webp",
      prompt: "An elegant love letter with red roses, chocolate hearts, and candlelight, romantic Valentine's Day atmosphere with warm soft lighting",
    },
  ],
  condolences: [
    {
      id: "condolences-lily",
      label: "White Lily",
      description: "Peaceful lily with candlelight",
      thumbnailUrl: "/examples/condolences-lily.webp",
      prompt: "A single white lily with soft candlelight, peaceful and serene memorial atmosphere, gentle warm lighting, respectful and comforting",
    },
    {
      id: "condolences-sunset",
      label: "Peaceful Sunset",
      description: "Serene sunset over water",
      thumbnailUrl: "/examples/condolences-sunset.webp",
      prompt: "A peaceful sunset over calm still water with soft golden and purple light, tranquil and comforting memorial atmosphere, serene and respectful",
    },
    {
      id: "condolences-flowers",
      label: "White Flowers",
      description: "Gentle memorial flowers",
      thumbnailUrl: "/examples/condolences-flowers.webp",
      prompt: "White flowers arranged gently with soft candle light, serene and respectful memorial scene, peaceful calming atmosphere",
    },
  ],
  anniversary: [
    {
      id: "anniversary-roses",
      label: "Roses & Champagne",
      description: "Elegant celebration",
      thumbnailUrl: "/examples/anniversary-roses.webp",
      prompt: "Red roses with champagne glasses and a golden anniversary celebration, elegant warm lighting, romantic and timeless love atmosphere",
    },
    {
      id: "anniversary-dinner",
      label: "Romantic Dinner",
      description: "Candlelit dinner setting",
      thumbnailUrl: "/examples/anniversary-dinner.webp",
      prompt: "A romantic candlelit dinner setting with roses, wine glasses, and starlight, intimate elegant anniversary celebration atmosphere",
    },
    {
      id: "anniversary-hearts",
      label: "Hearts & Gold",
      description: "Intertwined hearts with roses",
      thumbnailUrl: "/examples/anniversary-hearts.webp",
      prompt: "Two hearts intertwined with red roses and golden decorations, timeless love anniversary celebration, warm romantic atmosphere",
    },
  ],
};

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
