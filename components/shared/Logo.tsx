import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

function CardIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Card body */}
      <rect x="1" y="3" width="22" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.8" fill="currentColor" fillOpacity="0.1" />
      {/* Envelope flap — V shape */}
      <path d="M1.5 4.5 L12 12 L22.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Small heart in center */}
      <path d="M12 15.5 C12 15.5 9 13 9 11.5 C9 10.5 10 9.8 11 10.5 C11.5 10.9 12 11.5 12 11.5 C12 11.5 12.5 10.9 13 10.5 C14 9.8 15 10.5 15 11.5 C15 13 12 15.5 12 15.5Z" fill="currentColor" fillOpacity="0.6" />
    </svg>
  );
}

export function Logo({ className, size = "md" }: LogoProps) {
  const config = {
    sm: { text: "text-lg", icon: "w-5 h-5", gap: "gap-1.5" },
    md: { text: "text-2xl", icon: "w-6 h-6", gap: "gap-2" },
    lg: { text: "text-4xl md:text-5xl", icon: "w-9 h-9 md:w-11 md:h-11", gap: "gap-2.5" },
  };

  const { text, icon, gap } = config[size];

  return (
    <span
      className={cn(
        "inline-flex items-center font-heading tracking-tight",
        gap,
        className
      )}
    >
      <CardIcon className={cn(icon, "text-accent flex-shrink-0")} />
      <span
        className={cn(text, "text-foreground")}
        style={{ fontFamily: "var(--font-heading), 'Playfair Display', Georgia, serif" }}
      >
        Cardlar
      </span>
    </span>
  );
}
