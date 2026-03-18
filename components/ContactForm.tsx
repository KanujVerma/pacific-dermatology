"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("https://formspree.io/f/YOUR_FORMSPREE_ID", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Name + Phone row */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="contact-name" className="block text-cream-400 text-xs tracking-[0.15em] uppercase mb-2 font-sans">
            Name <span className="text-gold-400" aria-hidden="true">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            required
            autoComplete="name"
            className="w-full bg-navy-900 border border-gold-500/20 text-cream-100 px-4 py-3.5 text-sm font-sans focus:outline-none focus:border-gold-400 transition-colors duration-200 placeholder:text-cream-400/40 cursor-text"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="contact-phone" className="block text-cream-400 text-xs tracking-[0.15em] uppercase mb-2 font-sans">
            Phone
          </label>
          <input
            id="contact-phone"
            type="tel"
            name="phone"
            autoComplete="tel"
            className="w-full bg-navy-900 border border-gold-500/20 text-cream-100 px-4 py-3.5 text-sm font-sans focus:outline-none focus:border-gold-400 transition-colors duration-200 placeholder:text-cream-400/40 cursor-text"
            placeholder="(925) 000-0000"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="contact-email" className="block text-cream-400 text-xs tracking-[0.15em] uppercase mb-2 font-sans">
          Email <span className="text-gold-400" aria-hidden="true">*</span>
        </label>
        <input
          id="contact-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          className="w-full bg-navy-900 border border-gold-500/20 text-cream-100 px-4 py-3.5 text-sm font-sans focus:outline-none focus:border-gold-400 transition-colors duration-200 placeholder:text-cream-400/40 cursor-text"
          placeholder="your@email.com"
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className="block text-cream-400 text-xs tracking-[0.15em] uppercase mb-2 font-sans">
          Message <span className="text-gold-400" aria-hidden="true">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          className="w-full bg-navy-900 border border-gold-500/20 text-cream-100 px-4 py-3.5 text-sm font-sans focus:outline-none focus:border-gold-400 transition-colors duration-200 placeholder:text-cream-400/40 resize-none cursor-text"
          placeholder="How can we help you?"
        />
      </div>

      {/* HIPAA / PHI notice */}
      <p className="text-cream-400/60 text-xs leading-relaxed font-sans border-l-2 border-gold-500/30 pl-3">
        This form is for general inquiries only. Do not submit personal health
        information or urgent medical concerns — call the office directly at{" "}
        <a href="tel:9254268828" className="text-gold-400 hover:text-gold-300 underline transition-colors">
          (925) 426-8828
        </a>
        .
      </p>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "sending" || status === "sent"}
        className="inline-flex items-center gap-2.5 bg-gold-500 hover:bg-gold-400 disabled:opacity-60 disabled:cursor-not-allowed text-navy-950 text-xs font-sans font-semibold px-8 py-3.5 tracking-[0.15em] uppercase transition-colors duration-200 cursor-pointer"
      >
        <Send size={13} aria-hidden="true" />
        {status === "sending"
          ? "Sending…"
          : status === "sent"
          ? "Message Sent ✓"
          : "Send Message"}
      </button>

      {/* Error state */}
      {status === "error" && (
        <p role="alert" className="text-red-400 text-sm font-sans leading-relaxed">
          Something went wrong. Please call us at{" "}
          <a href="tel:9254268828" className="underline hover:text-red-300 transition-colors">
            (925) 426-8828
          </a>
          .
        </p>
      )}
    </form>
  );
}
