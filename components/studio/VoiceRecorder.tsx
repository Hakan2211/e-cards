"use client";

import { useVoiceRecorder } from "@/hooks/useVoiceRecorder";
import { Button } from "@/components/ui/button";
import { Mic, Square, Trash2, Play, Pause, Upload, Loader2 } from "lucide-react";
import { useState, useRef } from "react";

interface VoiceRecorderProps {
  onVoiceRecorded: (blob: Blob) => Promise<void>;
  hasVoice: boolean;
}

export function VoiceRecorder({ onVoiceRecorded, hasVoice }: VoiceRecorderProps) {
  const {
    isRecording,
    audioBlob,
    audioUrl,
    duration,
    error,
    startRecording,
    stopRecording,
    clearRecording,
  } = useVoiceRecorder();

  const [isPlaying, setIsPlaying] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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

  const handleSave = async () => {
    if (!audioBlob) return;
    setIsUploading(true);
    try {
      await onVoiceRecorded(audioBlob);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      {hasVoice && !audioBlob && (
        <div className="p-3 rounded-lg bg-primary/10 text-sm text-primary">
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
            {/* Playback */}
            <div className="flex items-center gap-3 p-4 rounded-lg border border-border">
              <button
                onClick={togglePlayback}
                className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5 ml-0.5" />
                )}
              </button>
              <div className="flex-1">
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-primary rounded-full w-0 transition-all" />
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

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={clearRecording}
                className="flex-1"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Re-record
              </Button>
              <Button
                onClick={handleSave}
                disabled={isUploading}
                className="flex-1"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Save Recording
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
