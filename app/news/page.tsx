"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export default function NewsPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setMessage("Enter a valid email address.");
      return;
    }
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setMessage("You're subscribed. Check your inbox for a confirmation email.");
        setEmail("");
        return;
      }

      // Fallback to mailto if server returns non-OK
      const mailto = `mailto:info@example.com?subject=Newsletter%20Subscription&body=Please%20subscribe%20me%20with%20this%20email:%20${encodeURIComponent(
        email
      )}`;
      window.location.href = mailto;
      setStatus("success");
      setMessage("Opening your email app to complete subscription.");
    } catch (err) {
      // Fallback to mailto if network error
      const mailto = `mailto:info@example.com?subject=Newsletter%20Subscription&body=Please%20subscribe%20me%20with%20this%20email:%20${encodeURIComponent(
        email
      )}`;
      window.location.href = mailto;
      setStatus("success");
      setMessage("Opening your email app to complete subscription.");
    }
  }

  return (
    <main className="min-h-screen pt-28 pb-20 px-6 flex items-start justify-center bg-black text-white">
      <section className="w-full max-w-xl">
        <h1 className="text-3xl sm:text-4xl font-semibold mb-6">Subscribe to our newsletter</h1>
        <p className="text-white/80 mb-8">
          Get updates on monasteries, events, and new features. No spam.
        </p>
        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            inputMode="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 h-12 rounded-md bg-white/10 text-white placeholder:text-white/60 px-4 outline-none focus:ring-2 focus:ring-white/30 border border-white/10"
            aria-label="Email address"
            required
          />
          <Button type="submit" className="h-12 px-6 bg-white text-black hover:bg-white/90">
            Subscribe
          </Button>
        </form>
        {status !== "idle" && (
          <p className={`mt-4 text-sm ${status === "error" ? "text-red-400" : "text-white/80"}`}>
            {message}
          </p>
        )}
        <div className="mt-10 text-xs text-white/60">
          By subscribing, you agree to receive emails from us. You can unsubscribe at any time.
        </div>
      </section>
    </main>
  );
}
