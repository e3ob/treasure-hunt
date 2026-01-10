"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Trophy, Medal, Award } from "lucide-react"

interface LeaderboardEntry {
  name: string
  level: number
  score?: number
}

export default function StatusPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    // Replace with your API endpoint
    fetch("/api/leaderboard")
      .then((res) => res.json())
      .then((data) => {
        setLeaderboard(data)
        setLoading(false)
      })
      .catch((err) => {
        setError("Failed to load leaderboard")
        setLoading(false)
        // Mock data for demonstration
        setLeaderboard([
          { name: "Santa Claus", level: 12 },
          { name: "Elf Helper", level: 10 },
          { name: "Rudolph", level: 9 },
        ])
      })
  }, [])

  const getMedalIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="h-6 w-6 text-christmas-gold" />
      case 1:
        return <Medal className="h-6 w-6 text-gray-400" />
      case 2:
        return <Award className="h-6 w-6 text-amber-700" />
      default:
        return <span className="text-white/60 font-bold">{index + 1}</span>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-christmas-primary via-christmas-secondary to-christmas-accent relative overflow-hidden">
      {/* Snowflakes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-snow text-white/20 text-xl"
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

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="text-white hover:bg-white/10 mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>

          <div className="text-center">
            <div className="text-5xl mb-4">🏆</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 text-balance drop-shadow-lg">Leaderboard</h1>
            <p className="text-white/80 text-lg">Top treasure hunters this season</p>
          </div>
        </div>

        {/* Leaderboard */}
        <Card className="bg-white/95 backdrop-blur-sm border-2 border-christmas-gold shadow-2xl">
          <div className="p-6">
            {loading ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4 animate-spin">🎄</div>
                <p className="text-muted-foreground">Loading leaderboard...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-destructive mb-4">{error}</p>
                <p className="text-sm text-muted-foreground">Showing sample data</p>
              </div>
            ) : null}

            <div className="space-y-3">
              {leaderboard.map((entry, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-4 p-4 rounded-lg transition-all hover:scale-102 ${
                    index < 3
                      ? "bg-gradient-to-r from-christmas-gold/20 to-christmas-gold/5 border-2 border-christmas-gold/30"
                      : "bg-christmas-neutral/30"
                  }`}
                >
                  <div className="w-10 h-10 flex items-center justify-center">{getMedalIcon(index)}</div>

                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-christmas-primary">{entry.name}</h3>
                    <p className="text-sm text-muted-foreground">Level {entry.level}</p>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-bold text-christmas-accent">{entry.level}</div>
                    <div className="text-xs text-muted-foreground">Level</div>
                  </div>
                </div>
              ))}
            </div>

            {leaderboard.length === 0 && !loading && (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">🎅</div>
                <p className="text-muted-foreground">No entries yet. Be the first!</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
