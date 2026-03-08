import { Hero } from "@/components/landing/Hero";
import { OccasionGrid } from "@/components/landing/OccasionGrid";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Logo } from "@/components/shared/Logo";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Logo size="sm" />
          <div className="flex items-center gap-4">
            <a
              href="/pricing"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </a>
            <a
              href="#occasions"
              className="inline-flex items-center justify-center h-9 px-4 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
            >
              Create Card
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Hero />
        <OccasionGrid />
        <HowItWorks />
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border text-center">
        <Logo size="sm" className="mb-2" />
        <p className="text-sm text-muted-foreground">
          Personalized digital greeting cards powered by{" "}
          <a
            href="https://hakanda.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent/70 hover:text-accent transition-colors"
          >
            hakanda.com
          </a>
        </p>
      </footer>
    </div>
  );
}
