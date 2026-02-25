import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Create a new card (called when starting the checkout flow)
export const create = mutation({
  args: {
    slug: v.string(),
    occasion: v.string(),
    packageType: v.string(),
    showWatermark: v.boolean(),
    stripeSessionId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const cardId = await ctx.db.insert("cards", {
      slug: args.slug,
      occasion: args.occasion,
      recipientName: "",
      senderName: "",
      messageText: "",
      imageRegenCount: 0,
      packageType: args.packageType,
      showWatermark: args.showWatermark,
      stripeSessionId: args.stripeSessionId,
      isPaid: false,
      viewCount: 0,
      status: "pending_payment",
      createdAt: Date.now(),
    });
    return cardId;
  },
});

// Mark card as paid (called from Stripe webhook)
export const markPaid = mutation({
  args: {
    stripeSessionId: v.string(),
  },
  handler: async (ctx, args) => {
    const card = await ctx.db
      .query("cards")
      .withIndex("by_stripeSessionId", (q) =>
        q.eq("stripeSessionId", args.stripeSessionId)
      )
      .first();

    if (!card) throw new Error("Card not found");

    const now = Date.now();
    const expiresAt = now + 7 * 24 * 60 * 60 * 1000; // 7 days

    await ctx.db.patch(card._id, {
      isPaid: true,
      status: "creating",
      paidAt: now,
      expiresAt,
    });

    return card.slug;
  },
});

// Get card by slug (public - for viewing)
export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("cards")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
  },
});

// Get card by stripe session ID
export const getByStripeSession = query({
  args: { stripeSessionId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("cards")
      .withIndex("by_stripeSessionId", (q) =>
        q.eq("stripeSessionId", args.stripeSessionId)
      )
      .first();
  },
});

// Update card content (during creation studio)
export const updateContent = mutation({
  args: {
    slug: v.string(),
    recipientName: v.optional(v.string()),
    senderName: v.optional(v.string()),
    messageText: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    imageStorageId: v.optional(v.id("_storage")),
    imagePrompt: v.optional(v.string()),
    voiceStorageId: v.optional(v.id("_storage")),
    musicUrl: v.optional(v.string()),
    musicStorageId: v.optional(v.id("_storage")),
    musicPrompt: v.optional(v.string()),
    theme: v.optional(v.string()),
    fontFamily: v.optional(v.string()),
    particleEffect: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const card = await ctx.db
      .query("cards")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    if (!card) throw new Error("Card not found");
    if (!card.isPaid) throw new Error("Card is not paid");

    const { slug, ...updates } = args;
    // Remove undefined values
    const cleanUpdates: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(updates)) {
      if (value !== undefined) {
        cleanUpdates[key] = value;
      }
    }

    await ctx.db.patch(card._id, cleanUpdates);
  },
});

// Increment image regen count
export const incrementImageRegen = mutation({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const card = await ctx.db
      .query("cards")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    if (!card) throw new Error("Card not found");
    if (card.imageRegenCount >= 3)
      throw new Error("Maximum image regenerations reached");

    await ctx.db.patch(card._id, {
      imageRegenCount: card.imageRegenCount + 1,
    });

    return card.imageRegenCount + 1;
  },
});

// Mark card as ready (after creation is complete)
export const markReady = mutation({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const card = await ctx.db
      .query("cards")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    if (!card) throw new Error("Card not found");

    await ctx.db.patch(card._id, { status: "ready" });
  },
});

// Increment view count (when recipient opens the card)
export const incrementViewCount = mutation({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const card = await ctx.db
      .query("cards")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    if (!card) throw new Error("Card not found");

    const updates: Record<string, unknown> = {
      viewCount: card.viewCount + 1,
    };

    if (!card.firstViewedAt) {
      updates.firstViewedAt = Date.now();
    }

    await ctx.db.patch(card._id, updates);
  },
});
