"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { OCCASIONS, MAX_IMAGE_REGENERATIONS } from "@/lib/constants";
import { Loader2, RefreshCw, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageGeneratorProps {
  occasion: string;
  imageUrl: string | null;
  imageRegenCount: number;
  onImageGenerated: (url: string, prompt: string) => void;
  slug: string;
}

export function ImageGenerator({
  occasion,
  imageUrl,
  imageRegenCount,
  onImageGenerated,
  slug,
}: ImageGeneratorProps) {
  const occasionData = OCCASIONS.find((o) => o.slug === occasion);
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remainingGenerations = MAX_IMAGE_REGENERATIONS - imageRegenCount;

  const handleGenerate = async (customPrompt?: string) => {
    const finalPrompt = customPrompt || prompt;
    if (!finalPrompt.trim()) return;

    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: finalPrompt, slug }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        onImageGenerated(data.imageUrl, finalPrompt);
      }
    } catch {
      setError("Failed to generate image. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">
          Describe your card image
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe what you want on your card..."
          className="w-full h-24 px-3 py-2 rounded-lg border border-border bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Suggested prompts */}
      {occasionData && (
        <div>
          <p className="text-xs text-muted-foreground mb-2">
            Or try a suggestion:
          </p>
          <div className="flex flex-wrap gap-2">
            {occasionData.suggestedImagePrompts.map((suggestion, i) => (
              <button
                key={i}
                onClick={() => {
                  setPrompt(suggestion);
                  handleGenerate(suggestion);
                }}
                disabled={isGenerating || remainingGenerations <= 0}
                className="text-xs px-3 py-1.5 rounded-full border border-border hover:bg-muted transition-colors disabled:opacity-50"
              >
                {suggestion.slice(0, 50)}...
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-3">
        <Button
          onClick={() => handleGenerate()}
          disabled={isGenerating || !prompt.trim() || remainingGenerations <= 0}
          className="flex-1"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : imageUrl ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2" />
              Regenerate
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Image
            </>
          )}
        </Button>
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          {remainingGenerations} left
        </span>
      </div>

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}

      {/* Image Preview */}
      <AnimatePresence mode="wait">
        {imageUrl && (
          <motion.div
            key={imageUrl}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="rounded-xl overflow-hidden border border-border"
          >
            <img
              src={imageUrl}
              alt="Generated card"
              className="w-full aspect-[4/3] object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
