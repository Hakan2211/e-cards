import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className, size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl md:text-5xl",
  };

  return (
    <span
      className={cn(
        "font-heading tracking-tight",
        sizeClasses[size],
        className
      )}
      style={{ fontFamily: "var(--font-heading), 'Playfair Display', Georgia, serif" }}
    >
      <span className="text-foreground">E-card</span>
      <span className="text-accent">4</span>
      <span className="text-foreground">You</span>
    </span>
  );
}
