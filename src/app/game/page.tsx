"use client";

import type React from "react";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Send, PartyPopper } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ApiHandler from "@/api";

interface Question {
  question1: string;
  question2: string;
}

export default function GamePage() {
  const [userKey, setUserKey] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [question, setQuestion] = useState<Question | null>(null);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const savedKey = localStorage.getItem("userKey");
    const savedEmail = localStorage.getItem("userEmail");

    if (savedKey && savedEmail) {
      setUserKey(savedKey);
      setUserEmail(savedEmail);
      setIsRegistered(true);
      fetchQuestion(savedKey, savedEmail);
    }
  }, []);

  const fetchQuestion = async (key: string, email: string) => {
    setLoading(true);
    try {
      const { data } = await ApiHandler.post("/question", { key, email });

      if (data.status === "error") {
        toast({
          title: "Error",
          description: data.message || "Failed to fetch question",
          variant: "destructive",
        });
        setError(data.message || "Failed to fetch question");
        setIsCompleted(false);
        setQuestion(null);
        return;
      }
      if (data.completed === "yes") {
        setIsCompleted(true);
        setQuestion(null);
      } else {
        console.log(data);
        setQuestion(data.question);
        setIsCompleted(false);
      }
    } catch (err) {
      setError("An error occurred while fetching the question.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userKey || !userEmail) {
      toast({
        title: "Missing Information",
        description: "Please enter both your key and email",
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem("userKey", userKey);
    localStorage.setItem("userEmail", userEmail);
    setIsRegistered(true);
    fetchQuestion(userKey, userEmail);

    toast({
      title: "Welcome!",
      description: "Let's start your treasure hunt adventure! 🎄",
    });
  };

  const handleSubmitAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim()) {
      toast({
        title: "No Answer",
        description: "Please enter your answer",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      const { data } = await ApiHandler.post("/answer", {
        key: userKey,
        email: userEmail,
        answer: answer.trim().toLowerCase(),
      });

      if (data.status === "success") {
        toast({
          title: "Correct! 🎉",
          description: "Moving to the next level!",
        });
        setAnswer("");
        fetchQuestion(userKey, userEmail);
      } else {
        toast({
          title: "Not quite right",
          description: "Try again!",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Answer Submitted",
        description: "Check with the API for verification",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-christmas-primary via-christmas-secondary to-christmas-accent relative overflow-hidden">
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

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-8">
          <Link href="/">
            <Button
              variant="ghost"
              className="text-white hover:bg-white/10 mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        {!isRegistered && (
          <Card className="bg-white/95 backdrop-blur-sm border-2 border-christmas-gold shadow-2xl">
            <div className="p-6 md:p-8">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-christmas-primary mb-2">
                  Join the Hunt!
                </h2>
                <p className="text-muted-foreground">
                  Enter your details to start the adventure
                </p>
              </div>

              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <Label
                    htmlFor="key"
                    className="text-christmas-primary font-semibold"
                  >
                    Your Key
                  </Label>
                  <Input
                    id="key"
                    type="text"
                    placeholder="Enter your unique key"
                    value={userKey}
                    onChange={(e) => setUserKey(e.target.value)}
                    className="mt-1 border-2 border-christmas-neutral focus:border-christmas-gold"
                  />
                </div>

                <div>
                  <Label
                    htmlFor="email"
                    className="text-christmas-primary font-semibold"
                  >
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="mt-1 border-2 border-christmas-neutral focus:border-christmas-gold"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-christmas-gold hover:bg-christmas-gold/90 text-christmas-primary font-bold text-lg py-6"
                >
                  Start Adventure
                </Button>
              </form>
            </div>
          </Card>
        )}

        {isRegistered && isCompleted && (
          <Card className="bg-white/95 backdrop-blur-sm border-2 border-christmas-gold shadow-2xl">
            <div className="p-6 md:p-8 text-center">
              <div className="mb-6">
                <PartyPopper className="h-24 w-24 text-christmas-gold mx-auto mb-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-christmas-primary mb-4 text-balance">
                  Congratulations!
                </h2>
                <p className="text-xl text-foreground mb-4">
                  You've completed the Treasure Hunt!
                </p>
                <p className="text-lg text-muted-foreground">
                  Amazing work finding all the hidden holiday gold!
                </p>
              </div>

              <div className="space-y-4">
                <Link href="/status">
                  <Button
                    size="lg"
                    className="w-full bg-christmas-gold hover:bg-christmas-gold/90 text-christmas-primary font-bold text-lg py-6"
                  >
                    <PartyPopper className="mr-2 h-5 w-5" />
                    View Leaderboard
                  </Button>
                </Link>

                <Link href="/">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-2 border-christmas-gold text-christmas-primary hover:bg-christmas-neutral/20 font-bold text-lg py-6 bg-transparent"
                  >
                    Back to Home
                  </Button>
                </Link>
              </div>

              <div className="mt-6 pt-6 border-t border-christmas-neutral/30">
                <p className="text-sm text-muted-foreground">
                  Played by:{" "}
                  <span className="font-semibold text-christmas-primary">
                    {userEmail}
                  </span>
                </p>
              </div>
            </div>
          </Card>
        )}

        {isRegistered && !isCompleted && (
          <Card className="bg-white/95 backdrop-blur-sm border-2 border-christmas-gold shadow-2xl">
            <div className="p-6 md:p-8">
              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin text-christmas-primary text-4xl mb-4">
                    ⭐
                  </div>
                  <p className="text-muted-foreground">
                    Loading your question...
                  </p>
                </div>
              ) : question ? (
                <>
                  <div className="mb-6">
                    <h2
                      className="text-2xl md:text-3xl font-bold text-christmas-primary mb-3 text-balance"
                      dangerouslySetInnerHTML={{ __html: question.question1 }}
                    />

                    <p
                      className="text-lg text-foreground text-pretty leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: question.question2 }}
                    />
                  </div>

                  <form onSubmit={handleSubmitAnswer} className="space-y-4">
                    <div>
                      <Label
                        htmlFor="answer"
                        className="text-christmas-primary font-semibold text-lg"
                      >
                        Your Answer
                      </Label>
                      <Input
                        id="answer"
                        type="text"
                        placeholder="Type your answer here..."
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        className="mt-2 border-2 border-christmas-neutral focus:border-christmas-gold text-lg py-6"
                        disabled={submitting}
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-christmas-accent hover:bg-christmas-accent/90 text-white font-bold text-lg py-6"
                    >
                      {submitting ? (
                        <>Checking...</>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          Submit Answer
                        </>
                      )}
                    </Button>
                  </form>

                  <div className="mt-6 pt-6 border-t border-christmas-neutral/30">
                    <p className="text-sm text-muted-foreground text-center">
                      Playing as:{" "}
                      <span className="font-semibold text-christmas-primary">
                        {userEmail}
                      </span>
                    </p>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    {error || "No questions available"}
                  </p>
                </div>
              )}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
