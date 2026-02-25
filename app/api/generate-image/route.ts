import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { prompt, slug } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    if (!process.env.FAL_KEY) {
      // Return a placeholder in dev mode
      return NextResponse.json({
        imageUrl: `https://placehold.co/1024x1024/6366f1/white?text=${encodeURIComponent("AI Generated Card")}&font=playfair-display`,
        message: "Dev mode: FAL_KEY not configured. Using placeholder image.",
      });
    }

    const { fal } = await import("@fal-ai/client");
    
    fal.config({
      credentials: process.env.FAL_KEY,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await fal.subscribe("fal-ai/nano-banana-pro" as any, {
      input: {
        prompt: `High quality greeting card illustration: ${prompt}. Professional card design, beautiful and detailed, suitable for a greeting card.`,
        num_images: 1,
        aspect_ratio: "4:3",
        output_format: "png",
        resolution: "1K",
      } as Record<string, unknown>,
      logs: false,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const imageUrl = (result.data as any)?.images?.[0]?.url;

    if (!imageUrl) {
      return NextResponse.json(
        { error: "No image generated" },
        { status: 500 }
      );
    }

    return NextResponse.json({ imageUrl, slug });
  } catch (error) {
    console.error("Image generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 }
    );
  }
}
