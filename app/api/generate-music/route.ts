import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { prompt, lyricsPrompt, slug } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    if (!process.env.FAL_KEY) {
      return NextResponse.json({
        audioUrl: "",
        message: "Dev mode: FAL_KEY not configured. Music generation disabled.",
      });
    }

    const { fal } = await import("@fal-ai/client");
    
    fal.config({
      credentials: process.env.FAL_KEY,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await fal.subscribe("fal-ai/minimax-music/v2" as any, {
      input: {
        prompt: prompt,
        lyrics_prompt: lyricsPrompt || "[instrumental]",
      } as Record<string, unknown>,
      logs: false,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const audioUrl = (result.data as any)?.audio?.url;

    if (!audioUrl) {
      return NextResponse.json(
        { error: "No music generated" },
        { status: 500 }
      );
    }

    return NextResponse.json({ audioUrl, slug });
  } catch (error) {
    console.error("Music generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate music" },
      { status: 500 }
    );
  }
}
