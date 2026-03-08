"use client";

import { useVoiceRecorder } from "@/hooks/useVoiceRecorder";
import { Button } from "@/components/ui/button";
import { Mic, Square, Trash2, Play, Pause, Loader2, Check } from "lucide-react";
import { useState, useRef, useCallback } from "react";
import { toast } from "sonner";

interface VoiceRecorderProps {
  onVoiceRecorded: (blob: Blob) => Promise<void>;
  hasVoice: boolean;
}

export function VoiceRecorder({ onVoiceRecorded, hasVoice }: VoiceRecorderProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(hasVoice);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Auto-save callback — called immediately when recording stops
  const handleRecordingComplete = useCallback(
    async (blob: Blob) => {
      setIsSaving(true);
      setIsSaved(false);
      try {
        await onVoiceRecorded(blob);
        setIsSaved(true);
        toast.success("Voice recording saved!");
      } catch {
        toast.error("Failed to save recording. Please try again.");
        setIsSaved(false);
      } finally {
        setIsSaving(false);
      }
    },
    [onVoiceRecorded]
  );

  const {
    isRecording,
    audioBlob,
    audioUrl,
    duration,
    error,
    startRecording,
    stopRecording,
    clearRecording,
  } = useVoiceRecorder({ onRecordingComplete: handleRecordingComplete });

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const togglePlayback = () => {
    if (!audioRef.current || !audioUrl) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleReRecord = () => {
    setIsSaved(false);
    clearRecording();
  };

  return (
    <div className="space-y-4">
      {/* Saved indicator (when returning to this step with existing recording) */}
      {hasVoice && !audioBlob && !isRecording && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 text-sm text-green-700 border border-green-200">
          <Check className="w-4 h-4 flex-shrink-0" />
          Voice recording saved! You can record a new one to replace it.
        </div>
      )}

      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Recording Controls */}
      <div className="flex items-center justify-center gap-4 py-6">
        {!audioBlob ? (
          <>
            {isRecording ? (
              <div className="flex flex-col items-center gap-3">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-destructive/20 animate-pulse flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-destructive/40 flex items-center justify-center">
                      <Mic className="w-8 h-8 text-destructive" />
                    </div>
                  </div>
                </div>
                <span className="text-lg font-mono font-bold">
                  {formatDuration(duration)}
                </span>
                <Button
                  onClick={stopRecording}
                  variant="destructive"
                  size="lg"
                >
                  <Square className="w-4 h-4 mr-2" />
                  Stop Recording
                </Button>
                <p className="text-xs text-muted-foreground">
                  Recording will be saved automatically when you stop
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <Button
                  onClick={startRecording}
                  size="lg"
                  className="h-20 w-20 rounded-full"
                >
                  <Mic className="w-8 h-8" />
                </Button>
                <span className="text-sm text-muted-foreground">
                  Tap to start recording
                </span>
              </div>
            )}
          </>
        ) : (
          <div className="w-full space-y-4">
            {/* Saving indicator */}
            {isSaving && (
              <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-primary/10 text-sm text-primary">
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving your recording...
              </div>
            )}

            {/* Saved confirmation */}
            {isSaved && !isSaving && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 text-sm text-green-700 border border-green-200">
                <Check className="w-4 h-4 flex-shrink-0" />
                Recording saved successfully!
              </div>
            )}

            {/* Playback */}
            <div className="flex items-center gap-3 p-4 rounded-lg border border-border">
              <button
                onClick={togglePlayback}
                disabled={isSaving}
                className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 disabled:opacity-50"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5 ml-0.5" />
                )}
              </button>
              <div className="flex-1">
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full bg-primary rounded-full transition-all ${
                      isSaved ? "w-full" : "w-0"
                    }`}
                  />
                </div>
              </div>
              <span className="text-sm font-mono text-muted-foreground">
                {formatDuration(duration)}
              </span>
            </div>

            {audioUrl && (
              <audio
                ref={audioRef}
                src={audioUrl}
                onEnded={() => setIsPlaying(false)}
              />
            )}

            {/* Re-record button */}
            <Button
              variant="outline"
              onClick={handleReRecord}
              disabled={isSaving}
              className="w-full"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Re-record
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
