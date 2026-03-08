"use client";

interface WatermarkToggleProps {
  showWatermark: boolean;
  onChange: (show: boolean) => void;
}

export function WatermarkToggle({
  showWatermark,
  onChange,
}: WatermarkToggleProps) {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-background">
      <div>
        <p className="font-medium text-sm">Show watermark</p>
        <p className="text-xs text-muted-foreground">
          &quot;Made with Cardlar&quot; will appear on the card
        </p>
      </div>
      <button
        onClick={() => onChange(!showWatermark)}
        className={`relative w-11 h-6 rounded-full transition-colors ${
          showWatermark ? "bg-primary" : "bg-border"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
            showWatermark ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
