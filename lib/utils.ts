import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export function getBaseUrl(): string {
  if (typeof window !== "undefined") return window.location.origin;
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
  return "http://localhost:3000";
}

export function getCardUrl(slug: string): string {
  return `${getBaseUrl()}/c/${slug}`;
}

export function getShareText(recipientName: string, slug: string): string {
  const url = getCardUrl(slug);
  return `Hey ${recipientName}! I made a special personalized card just for you. Tap here to open it: ${url}`;
}

export function getWhatsAppShareUrl(
  recipientName: string,
  slug: string
): string {
  const text = encodeURIComponent(getShareText(recipientName, slug));
  return `https://wa.me/?text=${text}`;
}

export function timeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

