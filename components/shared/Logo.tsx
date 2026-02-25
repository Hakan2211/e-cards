import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className, size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
  };

  return (
    <span
      className={cn(
        "font-bold tracking-tight",
        sizeClasses[size],
        className
      )}
    >
      <span className="text-primary">E-card</span>
      <span className="text-accent">4</span>
      <span className="text-primary">You</span>
    </span>
  );
}
