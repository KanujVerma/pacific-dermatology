"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, ChevronDown } from "lucide-react";
import { getResponse } from "@/lib/chatResponses";

interface Message {
  id: string;
  role: "assistant" | "user";
  text: string;
}

const WELCOME: Message = {
  id: "welcome",
  role: "assistant",
  text: "Hello! Welcome to Pacific Dermatology. I'm here to help answer your questions about our services, Dr. Fung, scheduling, and more. How can I assist you today?",
};

const SUGGESTIONS = [
  "How do I book an appointment?",
  "What services do you offer?",
  "Where are you located?",
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        inputRef.current?.focus();
      }, 100);
    }
  }, [open, messages]);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const reply = getResponse(trimmed);
      const botMsg: Message = { id: (Date.now() + 1).toString(), role: "assistant", text: reply };
      setMessages((prev) => [...prev, botMsg]);
      setTyping(false);
    }, 700 + Math.random() * 400);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    send(input);
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat panel */}
      {open && (
        <div className="w-[340px] max-h-[520px] flex flex-col bg-cream-50 shadow-2xl shadow-navy-950/30 border border-cream-300 overflow-hidden">
          {/* Header */}
          <div className="bg-navy-950 px-5 py-4 flex items-center justify-between shrink-0">
            <div>
              <p className="text-cream-100 font-serif text-sm">Pacific Dermatology</p>
              <p className="text-gold-400 text-xs mt-0.5 flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400"></span>
                Typically replies instantly
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-cream-400 hover:text-cream-100 transition-colors"
              aria-label="Close chat"
            >
              <ChevronDown size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] text-sm leading-relaxed px-4 py-3 ${
                    msg.role === "user"
                      ? "bg-gold-500 text-navy-950 font-medium"
                      : "bg-navy-100 text-navy-800"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex justify-start">
                <div className="bg-navy-100 text-navy-600 px-4 py-3 text-sm flex gap-1 items-center">
                  <span className="animate-bounce" style={{ animationDelay: "0ms" }}>•</span>
                  <span className="animate-bounce" style={{ animationDelay: "150ms" }}>•</span>
                  <span className="animate-bounce" style={{ animationDelay: "300ms" }}>•</span>
                </div>
              </div>
            )}

            {/* Suggestion chips — only show after welcome with no further messages */}
            {messages.length === 1 && !typing && (
              <div className="flex flex-wrap gap-2 pt-1">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-xs text-navy-700 border border-navy-200 hover:border-gold-400 hover:text-gold-600 px-3 py-1.5 transition-colors bg-white"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="border-t border-cream-200 px-4 py-3 flex gap-2 shrink-0 bg-white">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 text-sm text-navy-800 placeholder:text-navy-400 outline-none bg-transparent"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="text-gold-500 hover:text-gold-600 disabled:text-cream-400 transition-colors"
              aria-label="Send"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      {/* Bubble */}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 bg-gold-500 hover:bg-gold-400 text-navy-950 shadow-lg shadow-navy-950/30 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}
