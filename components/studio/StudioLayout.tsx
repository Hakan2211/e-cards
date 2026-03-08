"use client";

import { useState, useCallback, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { ImageGenerator } from "./ImageGenerator";
import { MessageEditor } from "./MessageEditor";
import { VoiceRecorder } from "./VoiceRecorder";
import { MusicGenerator } from "./MusicGenerator";
import { PACKAGES, PackageKey, OCCASIONS } from "@/lib/constants";
import {
  Image,
  MessageSquare,
  Mic,
  Music,
  Eye,
  Check,
  ArrowRight,
  ArrowLeft,
  Loader2,
} from "lucide-react";


interface StudioLayoutProps {
  slug: string;
}

type StepKey = "image" | "message" | "voice" | "music" | "preview";

interface Step {
  key: StepKey;
  label: string;
  icon: React.ReactNode;
  available: boolean;
}

export function StudioLayout({ slug }: StudioLayoutProps) {
  const router = useRouter();
  const card = useQuery(api.cards.getBySlug, { slug });
  const updateContent = useMutation(api.cards.updateContent);
  const incrementImageRegen = useMutation(api.cards.incrementImageRegen);
  const markReady = useMutation(api.cards.markReady);
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const getFileUrlMutation = useMutation(api.files.getFileUrlMutation);

  const [currentStep, setCurrentStep] = useState<StepKey>("image");
  const [localImageUrl, setLocalImageUrl] = useState<string | null>(null);
  const [localMusicUrl, setLocalMusicUrl] = useState<string | null>(null);
  const [isFinishing, setIsFinishing] = useState(false);

  useEffect(() => {
    if (card) {
      setLocalImageUrl(card.imageUrl || null);
      setLocalMusicUrl(card.musicUrl || null);
    }
  }, [card]);

  const pkg = card ? PACKAGES[card.packageType as PackageKey] : null;
  const occasionData = card ? OCCASIONS.find((o) => o.slug === card.occasion) : null;
  const displayOccasionName =
    card?.occasion === "custom" && card?.customOccasionName
      ? card.customOccasionName
      : occasionData?.name || "Card";

  const allSteps: Step[] = [
    { key: "image" as StepKey, label: "Image", icon: <Image className="w-4 h-4" />, available: true },
    { key: "message" as StepKey, label: "Message", icon: <MessageSquare className="w-4 h-4" />, available: true },
    { key: "voice" as StepKey, label: "Voice", icon: <Mic className="w-4 h-4" />, available: pkg?.includes.voice || false },
    { key: "music" as StepKey, label: "Music", icon: <Music className="w-4 h-4" />, available: pkg?.includes.music || false },
    { key: "preview" as StepKey, label: "Preview", icon: <Eye className="w-4 h-4" />, available: true },
  ];
  const steps = allSteps.filter((s) => s.available);

  const currentStepIndex = steps.findIndex((s) => s.key === currentStep);
  const isLastStep = currentStepIndex === steps.length - 1;

  const handleNext = () => {
    if (isLastStep) return;
    setCurrentStep(steps[currentStepIndex + 1].key);
  };

  const handlePrev = () => {
    if (currentStepIndex === 0) return;
    setCurrentStep(steps[currentStepIndex - 1].key);
  };

  const handleImageGenerated = useCallback(
    async (
      url: string,
      prompt: string,
      meta?: {
        originalPhotoUrl?: string;
        imageStyle?: string;
        skipRegen?: boolean;
      }
    ) => {
      setLocalImageUrl(url);
      try {
        // Only increment regen count for AI-generated images, not direct photo use
        if (!meta?.skipRegen) {
          await incrementImageRegen({ slug });
        }
        await updateContent({
          slug,
          imageUrl: url,
          imagePrompt: prompt,
          ...(meta?.originalPhotoUrl
            ? { originalPhotoUrl: meta.originalPhotoUrl }
            : {}),
          ...(meta?.imageStyle ? { imageStyle: meta.imageStyle } : {}),
        });
      } catch (e) {
        console.error("Failed to save image:", e);
      }
    },
    [slug, incrementImageRegen, updateContent]
  );

  const handlePhotoUploaded = useCallback(
    async (file: File): Promise<string> => {
      // Upload the file to Convex storage (same pattern as voice recording)
      const uploadUrl = await generateUploadUrl();
      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
      const { storageId } = await result.json();

      // Get the public URL for the uploaded file
      const publicUrl = await getFileUrlMutation({ storageId });
      if (!publicUrl) {
        throw new Error("Failed to get public URL for uploaded photo");
      }
      return publicUrl;
    },
    [generateUploadUrl, getFileUrlMutation]
  );

  const handleMessageUpdate = useCallback(
    async (data: {
      recipientName?: string;
      senderName?: string;
      messageText?: string;
    }) => {
      try {
        await updateContent({ slug, ...data });
      } catch (e) {
        console.error("Failed to save message:", e);
      }
    },
    [slug, updateContent]
  );

  const handleVoiceRecorded = useCallback(
    async (blob: Blob) => {
      try {
        const uploadUrl = await generateUploadUrl();
        const result = await fetch(uploadUrl, {
          method: "POST",
          headers: { "Content-Type": blob.type },
          body: blob,
        });
        const { storageId } = await result.json();
        await updateContent({ slug, voiceStorageId: storageId });
      } catch (e) {
        console.error("Failed to upload voice:", e);
        throw e; // Rethrow so VoiceRecorder can show error toast
      }
    },
    [slug, generateUploadUrl, updateContent]
  );

  const handleMusicGenerated = useCallback(
    async (url: string, prompt: string) => {
      setLocalMusicUrl(url);
      try {
        await updateContent({ slug, musicUrl: url, musicPrompt: prompt });
      } catch (e) {
        console.error("Failed to save music:", e);
      }
    },
    [slug, updateContent]
  );

  const handleFinish = async () => {
    setIsFinishing(true);
    try {
      await markReady({ slug });
      router.push(`/share/${slug}`);
    } catch (e) {
      console.error("Failed to finish:", e);
      setIsFinishing(false);
    }
  };

  if (card === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  if (card === null) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-2">Card not found</h1>
        <p className="text-muted-foreground mb-4">
          This card does not exist or has expired.
        </p>
        <Button onClick={() => router.push("/")}>Go Home</Button>
      </div>
    );
  }

  if (!card.isPaid) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <Loader2 className="w-8 h-8 animate-spin text-accent mb-4" />
        <p className="text-muted-foreground">Waiting for payment confirmation...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <Logo size="sm" />
          <div className="flex items-center gap-3">
            {occasionData && (
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-xs font-medium border border-border">
                <span>{occasionData.icon}</span>
                {displayOccasionName}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Step Navigation */}
      <div className="border-b border-border bg-background">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-3">
            {steps.map((step, index) => (
              <button
                key={step.key}
                onClick={() => setCurrentStep(step.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  currentStep === step.key
                    ? "bg-accent/15 text-accent border border-accent/30"
                    : index < currentStepIndex
                    ? "text-foreground/70 hover:bg-muted"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {step.icon}
                {step.label}
                {index < currentStepIndex && (
                  <Check className="w-3 h-3 text-accent" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {currentStep === "image" && (
              <div>
                <h2 className="text-xl font-heading font-bold mb-1">
                  Create Your {displayOccasionName} Card Image
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Upload your own photo or pick from our designs
                </p>
                <ImageGenerator
                  occasion={card.occasion}
                  imageUrl={localImageUrl}
                  imageRegenCount={card.imageRegenCount}
                  onImageGenerated={handleImageGenerated}
                  onPhotoUploaded={handlePhotoUploaded}
                  slug={slug}
                />
              </div>
            )}

            {currentStep === "message" && (
              <div>
                <h2 className="text-xl font-heading font-bold mb-1">Write Your Message</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Add the recipient and sender names, and write your heartfelt message
                </p>
                <MessageEditor
                  recipientName={card.recipientName}
                  senderName={card.senderName}
                  messageText={card.messageText}
                  onUpdate={handleMessageUpdate}
                />
              </div>
            )}

            {currentStep === "voice" && (
              <div>
                <h2 className="text-xl font-heading font-bold mb-1">Record Your Voice</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Record a personal voice message that plays when the card is opened
                </p>
                <VoiceRecorder
                  onVoiceRecorded={handleVoiceRecorded}
                  hasVoice={!!card.voiceStorageId}
                />
              </div>
            )}

            {currentStep === "music" && (
              <div>
                <h2 className="text-xl font-heading font-bold mb-1">Generate Music</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Create custom AI-generated music that plays in the background
                </p>
                <MusicGenerator
                  occasion={card.occasion}
                  musicUrl={localMusicUrl}
                  onMusicGenerated={handleMusicGenerated}
                  slug={slug}
                />
              </div>
            )}

            {currentStep === "preview" && (
              <div>
                <h2 className="text-xl font-heading font-bold mb-1">Preview Your Card</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  This is what your recipient will see
                </p>

                {/* Mini preview */}
                <div className="rounded-xl border border-border overflow-hidden mb-6 bg-card shadow-sm">
                  {localImageUrl && (
                    <img
                      src={localImageUrl}
                      alt="Card preview"
                      className="w-full aspect-[4/3] object-cover"
                    />
                  )}
                  <div className="p-6 text-center">
                    <p className="text-lg font-heading italic text-foreground/80 mb-2">
                      Dear {card.recipientName || "___"},
                    </p>
                    <p className="text-muted-foreground whitespace-pre-wrap">
                      {card.messageText || "Your message will appear here..."}
                    </p>
                    <p className="mt-4 text-sm font-heading italic text-muted-foreground">
                      With love, <span className="not-italic font-semibold">{card.senderName || "___"}</span>
                    </p>
                  </div>
                </div>

                <Button
                  onClick={handleFinish}
                  disabled={isFinishing || !card.recipientName || !card.messageText}
                  size="lg"
                  className="w-full text-lg h-14"
                >
                  {isFinishing ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Finalizing...
                    </>
                  ) : (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      Finish & Get Share Link
                    </>
                  )}
                </Button>

                {(!card.recipientName || !card.messageText) && (
                  <p className="text-sm text-destructive text-center mt-2">
                    Please fill in the recipient name and message before finishing.
                  </p>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        {currentStep !== "preview" && (
          <div className="flex justify-between mt-8 pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button onClick={handleNext}>
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
