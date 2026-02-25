/* eslint-disable */
/**
 * Generated API stub - will be replaced by `npx convex dev`
 */
import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

// Stub types for cards module
declare const cards: {
  create: FunctionReference<
    "mutation",
    "public",
    {
      slug: string;
      occasion: string;
      packageType: string;
      showWatermark: boolean;
      stripeSessionId?: string;
    },
    string
  >;
  markPaid: FunctionReference<
    "mutation",
    "public",
    { stripeSessionId: string },
    string
  >;
  getBySlug: FunctionReference<
    "query",
    "public",
    { slug: string },
    any | null
  >;
  getByStripeSession: FunctionReference<
    "query",
    "public",
    { stripeSessionId: string },
    any | null
  >;
  updateContent: FunctionReference<
    "mutation",
    "public",
    Record<string, any>,
    void
  >;
  incrementImageRegen: FunctionReference<
    "mutation",
    "public",
    { slug: string },
    number
  >;
  markReady: FunctionReference<
    "mutation",
    "public",
    { slug: string },
    void
  >;
  incrementViewCount: FunctionReference<
    "mutation",
    "public",
    { slug: string },
    void
  >;
};

declare const occasions: {
  list: FunctionReference<"query", "public", Record<string, never>, any[]>;
  getBySlug: FunctionReference<
    "query",
    "public",
    { slug: string },
    any | null
  >;
  seed: FunctionReference<"mutation", "public", Record<string, never>, string>;
};

declare const files: {
  generateUploadUrl: FunctionReference<
    "mutation",
    "public",
    Record<string, never>,
    string
  >;
  getFileUrl: FunctionReference<
    "query",
    "public",
    { storageId: string },
    string | null
  >;
};

export declare const api: {
  cards: typeof cards;
  occasions: typeof occasions;
  files: typeof files;
};
