import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, Trophy } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-christmas-primary via-christmas-secondary to-christmas-accent">
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-snow text-white/30 text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          >
            ❄
          </div>
        ))}
      </div>

      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-christmas-primary via-white to-christmas-primary opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-christmas-primary via-white to-christmas-primary opacity-60"></div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 text-balance drop-shadow-2xl">
            ILLU-μ-NATE
          </h1>
          <div className="text-4xl md:text-6xl font-bold text-christmas-gold mb-6 text-balance drop-shadow-2xl">
            TREASURE HUNT
          </div>

          <p className="text-xl md:text-2xl text-white/90 font-medium text-pretty max-w-2xl mx-auto drop-shadow-lg">
            Find the hidden holiday gold!
          </p>
          <p className="text-lg md:text-xl text-white/80 font-medium text-pretty max-w-2xl mx-auto drop-shadow-lg mt-2">
            A festive adventure.
          </p>
          <p className="text-sm text-white/70 mt-4">
            μLearn - a GTech Initiative
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 mt-8">
          <Link href="/game">
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-christmas-gold hover:bg-christmas-gold/90 text-christmas-primary font-bold shadow-2xl hover:scale-105 transition-transform"
            >
              <Sparkles className="mr-2 h-6 w-6" />
              Start Hunt
            </Button>
          </Link>

          <Link href="/status">
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 bg-white/95 hover:bg-white text-christmas-primary hover:text-christmas-primary border-2 border-christmas-gold font-bold shadow-2xl hover:scale-105 transition-transform"
            >
              <Trophy className="mr-2 h-6 w-6 text-christmas-primary" />
              Leaderboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
