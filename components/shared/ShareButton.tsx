"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Share2, Copy, Check, MessageCircle } from "lucide-react";
import { getCardUrl, getShareText, getWhatsAppShareUrl } from "@/lib/utils";

interface ShareButtonProps {
  slug: string;
  recipientName: string;
}

export function ShareButton({ slug, recipientName }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const cardUrl = getCardUrl(slug);

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "You have a card!",
          text: getShareText(recipientName, slug),
          url: cardUrl,
        });
      } catch {
        // User cancelled share
      }
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(cardUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const hasNativeShare = typeof navigator !== "undefined" && !!navigator.share;

  return (
    <div className="space-y-3">
      {/* Card URL display */}
      <div className="flex items-center gap-2 p-3 rounded-lg bg-muted border border-border">
        <input
          type="text"
          value={cardUrl}
          readOnly
          className="flex-1 bg-transparent text-sm font-mono truncate outline-none"
        />
        <button
          onClick={handleCopy}
          className="flex-shrink-0 p-2 rounded-md hover:bg-background transition-colors"
        >
          {copied ? (
            <Check className="w-4 h-4 text-primary" />
          ) : (
            <Copy className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
      </div>

      {/* Share buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {hasNativeShare && (
          <Button onClick={handleNativeShare} size="lg" className="w-full">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        )}

        <Button
          onClick={() =>
            window.open(getWhatsAppShareUrl(recipientName, slug), "_blank")
          }
          size="lg"
          className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          WhatsApp
        </Button>
      </div>

      {/* Copy link fallback */}
      {!hasNativeShare && (
        <Button onClick={handleCopy} variant="outline" size="lg" className="w-full">
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              Copy Link
            </>
          )}
        </Button>
      )}
    </div>
  );
}
