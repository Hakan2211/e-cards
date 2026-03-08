import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { imageUrl, prompt, slug } = await req.json();

    if (!imageUrl) {
      return NextResponse.json(
        { error: "Image URL is required" },
        { status: 400 }
      );
    }

    if (!prompt) {
      return NextResponse.json(
        { error: "Style prompt is required" },
        { status: 400 }
      );
    }

    if (!process.env.FAL_KEY) {
      // Return a placeholder in dev mode
      return NextResponse.json({
        imageUrl: `https://placehold.co/1024x768/8b5cf6/white?text=${encodeURIComponent("Styled Card")}&font=playfair-display`,
        message: "Dev mode: FAL_KEY not configured. Using placeholder image.",
      });
    }

    const { fal } = await import("@fal-ai/client");

    fal.config({
      credentials: process.env.FAL_KEY,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await fal.subscribe("fal-ai/nano-banana-2/edit" as any, {
      input: {
        prompt: `${prompt}. Professional greeting card design, beautiful and high quality.`,
        image_urls: [imageUrl],
        num_images: 1,
        aspect_ratio: "4:3",
        output_format: "png",
        resolution: "1K",
      } as Record<string, unknown>,
      logs: false,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const resultImageUrl = (result.data as any)?.images?.[0]?.url;

    if (!resultImageUrl) {
      return NextResponse.json(
        { error: "No image generated" },
        { status: 500 }
      );
    }

    return NextResponse.json({ imageUrl: resultImageUrl, slug });
  } catch (error) {
    console.error("Image edit error:", error);
    return NextResponse.json(
      { error: "Failed to edit image" },
      { status: 500 }
    );
  }
}
