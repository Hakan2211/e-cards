"use client";

import { use } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Logo } from "@/components/shared/Logo";
import { ShareButton } from "@/components/shared/ShareButton";
import { Button } from "@/components/ui/button";
import { Eye, Plus, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function SharePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();
  const card = useQuery(api.cards.getBySlug, { slug });

  if (card === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!card) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-2">Card not found</h1>
        <Button onClick={() => router.push("/")}>Go Home</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-lg mx-auto px-4 h-16 flex items-center justify-center">
          <Logo size="sm" />
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🎉</span>
          </div>
          <h1 className="text-2xl font-bold mb-2">Your Card is Ready!</h1>
          <p className="text-muted-foreground">
            Share the link below to send your card to{" "}
            <strong>{card.recipientName}</strong>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <ShareButton slug={slug} recipientName={card.recipientName} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-3"
        >
          <Button
            variant="outline"
            onClick={() => window.open(`/c/${slug}`, "_blank")}
            className="w-full"
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview Your Card
          </Button>

          <Button
            variant="ghost"
            onClick={() => router.push("/")}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Another Card
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 p-4 rounded-lg bg-muted text-center"
        >
          <p className="text-sm text-muted-foreground">
            Card opened <strong>{card.viewCount}</strong> time
            {card.viewCount !== 1 ? "s" : ""}
          </p>
        </motion.div>
      </main>
    </div>
  );
}
