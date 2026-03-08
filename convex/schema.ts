import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  cards: defineTable({
    slug: v.string(),
    occasion: v.string(),
    recipientName: v.string(),
    senderName: v.string(),
    messageText: v.string(),

    // Image
    imageUrl: v.optional(v.string()),
    imageStorageId: v.optional(v.id("_storage")),
    imagePrompt: v.optional(v.string()),
    imageRegenCount: v.number(),
    originalPhotoUrl: v.optional(v.string()), // user's uploaded photo before AI transform
    imageStyle: v.optional(v.string()), // style preset used (e.g. "polaroid", "watercolor")

    // Voice
    voiceStorageId: v.optional(v.id("_storage")),

    // Music
    musicUrl: v.optional(v.string()),
    musicStorageId: v.optional(v.id("_storage")),
    musicPrompt: v.optional(v.string()),

    // Package & Payment
    packageType: v.string(), // basic | voice | music | full
    showWatermark: v.boolean(),
    stripeSessionId: v.optional(v.string()),
    isPaid: v.boolean(),

    // Viewing
    viewCount: v.number(),
    firstViewedAt: v.optional(v.number()),

    // Customization
    theme: v.optional(v.string()),
    fontFamily: v.optional(v.string()),
    particleEffect: v.optional(v.string()),

    // Status & Dates
    status: v.string(), // pending_payment | creating | ready | expired
    createdAt: v.number(),
    paidAt: v.optional(v.number()),
    expiresAt: v.optional(v.number()),
  })
    .index("by_slug", ["slug"])
    .index("by_stripeSessionId", ["stripeSessionId"])
    .index("by_status", ["status"]),

  occasions: defineTable({
    name: v.string(),
    slug: v.string(),
    icon: v.string(),
    description: v.string(),
    defaultParticles: v.string(),
    defaultMusicPrompt: v.string(),
    suggestedImagePrompts: v.array(v.string()),
    colorScheme: v.object({
      primary: v.string(),
      secondary: v.string(),
      accent: v.string(),
      background: v.string(),
    }),
    isActive: v.boolean(),
    sortOrder: v.number(),
  }).index("by_slug", ["slug"]),
});
