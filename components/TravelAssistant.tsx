"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { MessageCircle, X, Send, Sparkles, MapPin, Info } from "lucide-react";
import { monasteries } from "@/lib/monasteries";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

function formatList(items: string[]): string {
  return items.map((s, i) => `${i + 1}. ${s}`).join("\n");
}

function daysFromText(text: string): number | null {
  const m = text.match(/(\d+)\s*(?:day|days|d)\b/i);
  if (m) return Math.max(1, Math.min(14, parseInt(m[1], 10)));
  // common words
  if (/weekend|2\s*day/i.test(text)) return 2;
  if (/long\s*weekend|3\s*day/i.test(text)) return 3;
  if (/week\b|7\s*day/i.test(text)) return 7;
  return null;
}

function findMonasteryMentions(text: string) {
  const q = text.toLowerCase();
  return monasteries.filter(m =>
    [m.name, m.slug, ...(m.aliases || [])].some(k => q.includes(k.toLowerCase()))
  );
}

function makeItinerary(days: number, interests: string[]): string {
  const base = [
    "Rumtek Monastery",
    "Enchey Monastery",
    "Pemayangtse Monastery",
    "Tashiding Monastery",
    "Ralang Monastery",
    "Phensang Monastery",
    "Dubdi Monastery",
    "Sang Monastery",
  ];

  const picks = base.slice(0, Math.min(days + 1, base.length));

  const notes: string[] = [];
  if (interests.includes("culture") || interests.includes("festival")) {
    notes.push("Try to align with Losar (Tibetan New Year) or Pang Lhabsol celebrations for vibrant mask dances.");
  }
  if (interests.includes("nature") || interests.includes("hike") || interests.includes("trek")) {
    notes.push("Between transfers, include short valley walks and Teesta river viewpoints.");
  }
  if (interests.includes("photography")) {
    notes.push("Golden hour at Rumtek and Pemayangtse offers gorgeous monastery silhouettes with hills.");
  }

  const lines: string[] = [];
  for (let d = 1; d <= days; d++) {
    const spot = picks[(d - 1) % picks.length];
    if (d === 1) {
      lines.push(`Day ${d}: Arrive in Gangtok. Easy acclimatization walk. Sunset view and local food.`);
      continue;
    }
    lines.push(`Day ${d}: Visit ${spot}. Combine with nearby viewpoints and local cafes.`);
  }

  lines.push("\nLogistics:");
  lines.push("- Base yourself in Gangtok for 2-3 nights; add Pelling for West Sikkim temples like Pemayangtse and Dubdi.");
  lines.push("- Use shared cabs or pre-booked taxis between towns; roads are hilly, plan buffer time.");
  lines.push("- Best months: Oct–Dec and Mar–May. Avoid heavy rains (Jun–Sep). Winters are cold but clear.");
  if (notes.length) {
    lines.push("\nNotes:");
    notes.forEach(n => lines.push(`- ${n}`));
  }
  return lines.join("\n");
}

function planFromQuery(q: string): string {
  const days = daysFromText(q) ?? 4;
  const interests: string[] = [];
  if (/culture|heritage|history|festival/i.test(q)) interests.push("culture");
  if (/nature|hike|trek|scenic|view/i.test(q)) interests.push("nature");
  if (/photo|photography|camera/i.test(q)) interests.push("photography");
  return makeItinerary(days, interests);
}

function monasteryAnswer(q: string): string | null {
  const matches = findMonasteryMentions(q);
  if (!matches.length) return null;
  const answers = matches.map(m => {
    const parts = [
      `• ${m.name} (${m.region})`,
      m.description,
      `Best time: ${m.bestTime}`,
      `Tips: ${m.tips}`,
      `Nearby: ${m.nearby.join(", ")}`,
      `Learn more: /map/${m.slug}`,
    ];
    return parts.join("\n");
  });
  return answers.join("\n\n");
}

function genericHelp(): string {
  return [
    "Hi! I’m your Sikkim Monastery Travel Assistant.",
    "Ask me about monasteries (e.g., Rumtek, Pemayangtse) or say things like:",
    "- 3 day itinerary focused on culture",
    "- Best time to visit monasteries",
    "- How to get from Gangtok to Rumtek",
  ].join("\n");
}

function routeHelp(q: string): string | null {
  if (!/how\s*to\s*get|route|reach|travel|distance/i.test(q)) return null;
  if (/gangtok.*rumtek|rumtek.*gangtok/i.test(q)) {
    return [
      "Gangtok → Rumtek: ~23 km / 1–1.5 hours by taxi. Shared cabs available from Gangtok; roads are hilly.",
      "Combine with Enchey in Gangtok for a half-day circuit.",
    ].join("\n");
  }
  return "Road travel between towns is via hilly routes; plan 1–4 hours depending on distance and weather. Shared cabs and taxis are common.";
}

function bestTimeHelp(q: string): string | null {
  if (!/best\s*time|when\s*to\s*visit|season/i.test(q)) return null;
  return "Best months: Oct–Dec and Mar–May for clear views and festivals. Monsoon (Jun–Sep) has heavy rain; winters (Jan–Feb) are cold but peaceful.";
}

export default function TravelAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const listRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, open]);

  useEffect(() => {
    if (!open && messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content: genericHelp(),
        },
      ]);
    }
  }, [open, messages.length]);

  // Focus input and trap keyboard events while chat is open
  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();

    const trap = (e: KeyboardEvent) => {
      // Do not prevent default typing/scrolling, but stop propagation so global shortcuts don't fire
      e.stopPropagation();
    };

    window.addEventListener("keydown", trap, true);
    window.addEventListener("keyup", trap, true);
    return () => {
      window.removeEventListener("keydown", trap, true);
      window.removeEventListener("keyup", trap, true);
    };
  }, [open]);

  const handleSend = () => {
    const q = input.trim();
    if (!q) return;
    const id = crypto.randomUUID();
    const userMsg: ChatMessage = { id, role: "user", content: q };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const lower = q.toLowerCase();
      const itinerary = /itinerary|plan|days?|route\s*plan/i.test(lower)
        ? planFromQuery(q)
        : null;
      const spot = monasteryAnswer(q);
      const route = routeHelp(q);
      const best = bestTimeHelp(q);

      let answer = spot || itinerary || route || best;
      if (!answer) {
        // lightweight search-based reply
        if (/monaster(y|ies)\b|sikkim\b/.test(lower)) {
          const names = monasteries.map(m => m.name);
          answer = `Here are notable monasteries in Sikkim:\n${formatList(names)}\n\nTell me days and interests, e.g. \"4 day culture + nature plan\".`;
        } else {
          answer = genericHelp();
        }
      }

      setMessages(prev => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content: answer! },
      ]);
    }, 250);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    e.stopPropagation();
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggle = () => setOpen(v => !v);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3">
      {/* Chat Panel */}
      {open && (
        <div className="w-80 sm:w-96 max-w-[90vw] bg-white text-black rounded-2xl shadow-2xl border border-black/10 overflow-hidden flex flex-col animate-[fadeIn_.2s_ease-out]">
          <div className="flex items-center justify-between px-4 py-3 bg-blue-600 text-white">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <p className="text-sm font-semibold">Sikkim Travel Assistant</p>
            </div>
            <button aria-label="Close chat" className="rounded-full p-1 hover:bg-white/20" onClick={toggle}>
              <X className="w-4 h-4" />
            </button>
          </div>

          <div ref={listRef} className="px-4 py-3 h-80 overflow-y-auto space-y-3 bg-white">
            {messages.map(m => (
              <div key={m.id} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                <div className={
                  m.role === "user"
                    ? "max-w-[80%] rounded-2xl rounded-br-sm bg-blue-600 text-white px-3 py-2 text-sm shadow"
                    : "max-w-[80%] rounded-2xl rounded-bl-sm bg-gray-100 px-3 py-2 text-sm shadow"
                }>
                  {m.content.split("\n").map((line, i) => (
                    <p key={i} className="whitespace-pre-wrap leading-relaxed">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-black/10 bg-white p-2">
            <div className="flex items-end gap-2">
              <textarea
                aria-label="Message"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder="Ask about monasteries or request a plan..."
                className="flex-1 resize-none rounded-xl border border-black/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/60 min-h-9 max-h-32"
              />
              <button
                aria-label="Send"
                onClick={handleSend}
                className="inline-flex items-center justify-center rounded-full bg-blue-600 text-white p-2 hover:bg-blue-700 active:scale-[0.98] transition"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        aria-label="Open travel assistant"
        onClick={toggle}
        className="w-14 h-14 rounded-full bg-blue-600 shadow-2xl ring-1 ring-black/5 hover:bg-blue-700 text-white flex items-center justify-center transition transform hover:scale-105"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      <style jsx global>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
