"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader2 } from "lucide-react";
import { Logo } from "@/components/shared/Logo";

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const createCard = useMutation(api.cards.create);
  const markPaid = useMutation(api.cards.markPaid);

  const slug = searchParams.get("slug");
  const occasion = searchParams.get("occasion") || "birthday";
  const packageType = searchParams.get("package") || "basic";
  const showWatermark = searchParams.get("watermark") !== "false";
  const sessionId = searchParams.get("session_id");
  const isDev = searchParams.get("dev") === "true";
  const customOccasionName = searchParams.get("customOccasionName") || undefined;

  const [status, setStatus] = useState("Setting up your card...");

  useEffect(() => {
    async function setupCard() {
      if (!slug) return;

      try {
        // Create the card in Convex
        await createCard({
          slug,
          occasion,
          packageType,
          showWatermark,
          stripeSessionId: sessionId || `dev_${slug}`,
          ...(customOccasionName ? { customOccasionName } : {}),
        });

        setStatus("Card created! Redirecting to studio...");

        // In dev mode or if we have a session, mark as paid immediately
        if (isDev || sessionId) {
          try {
            await markPaid({
              stripeSessionId: sessionId || `dev_${slug}`,
            });
          } catch {
            // Might fail if webhook already handled it - that's OK
          }
        }

        // Redirect to studio
        setTimeout(() => {
          router.push(`/studio/${slug}`);
        }, 1000);
      } catch (error) {
        console.error("Setup error:", error);
        setStatus("Something went wrong. Please try again.");
      }
    }

    setupCard();
  }, [slug, occasion, packageType, showWatermark, sessionId, isDev, customOccasionName, createCard, markPaid, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Logo size="md" className="mb-8" />
      <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
      <p className="text-muted-foreground text-center">{status}</p>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      }
    >
      <CheckoutSuccessContent />
    </Suspense>
  );
}
