import { NextRequest, NextResponse } from "next/server";
import { PACKAGES, PackageKey } from "@/lib/constants";
import { createSlug } from "@/lib/slug";

export async function POST(req: NextRequest) {
  try {
    const { packageType, occasion, showWatermark, customOccasionName } = await req.json();

    // Validate package
    if (!PACKAGES[packageType as PackageKey]) {
      return NextResponse.json({ error: "Invalid package" }, { status: 400 });
    }

    const pkg = PACKAGES[packageType as PackageKey];
    const slug = createSlug();
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const customParam = customOccasionName
      ? `&customOccasionName=${encodeURIComponent(customOccasionName)}`
      : "";

    // If Stripe is not configured, go directly to studio (dev mode)
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({
        url: `${baseUrl}/checkout/success?slug=${slug}&occasion=${occasion}&package=${packageType}&watermark=${showWatermark}&dev=true${customParam}`,
      });
    }

    // Dynamic import to avoid errors when stripe key not set
    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-08-27.basil",
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Cardlar - ${pkg.name}`,
              description: pkg.description,
            },
            unit_amount: pkg.price,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}&slug=${slug}&occasion=${occasion}&package=${packageType}&watermark=${showWatermark}${customParam}`,
      cancel_url: `${baseUrl}/checkout/cancel?occasion=${occasion}`,
      metadata: {
        slug,
        occasion,
        packageType,
        showWatermark: String(showWatermark),
        ...(customOccasionName ? { customOccasionName } : {}),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe session error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
