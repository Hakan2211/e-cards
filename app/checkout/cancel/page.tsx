"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/Logo";
import { ArrowLeft } from "lucide-react";
import { Suspense } from "react";

function CancelContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const occasion = searchParams.get("occasion") || "";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Logo size="md" className="mb-8" />
      <h1 className="text-2xl font-bold mb-2">Payment Cancelled</h1>
      <p className="text-muted-foreground mb-8 text-center">
        No worries! Your card was not created and you were not charged.
      </p>
      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={() => router.push("/")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back Home
        </Button>
        <Button
          onClick={() =>
            router.push(
              occasion
                ? `/select-package?occasion=${occasion}`
                : "/select-package"
            )
          }
        >
          Try Again
        </Button>
      </div>
    </div>
  );
}

export default function CheckoutCancelPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      }
    >
      <CancelContent />
    </Suspense>
  );
}
