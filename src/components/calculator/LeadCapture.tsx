"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Send } from "lucide-react";

export function LeadCapture() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <Card className="p-6 text-center bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800">
        <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
        <p className="font-semibold text-green-800 dark:text-green-300">You&apos;re on the list!</p>
        <p className="text-sm text-green-700 dark:text-green-400 mt-1">
          We&apos;ll notify you when our full-service import assistance launches.
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
      <div className="text-center mb-4">
        <h3 className="font-semibold text-lg">Want us to handle the entire import?</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Join our waitlist for full-service import assistance — paperwork, shipping,
          customs clearance, and modifications handled for you.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
        <Input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-white"
        />
        <Button type="submit" disabled={isSubmitting}>
          <Send className="h-4 w-4 mr-2" />
          {isSubmitting ? "..." : "Join"}
        </Button>
      </form>
    </Card>
  );
}
