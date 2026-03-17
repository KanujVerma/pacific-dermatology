"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy-950/95 backdrop-blur-sm border-b border-gold-500/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none group">
            <span className="text-gold-400 font-serif text-xl tracking-wide group-hover:text-gold-300 transition-colors">
              Pacific Dermatology
            </span>
            <span className="text-cream-400 text-xs tracking-[0.15em] uppercase mt-0.5 font-sans">
              Dr. Hank Fung · Pleasanton, CA
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { href: "/", label: "Home" },
              { href: "/services", label: "Services" },
              { href: "#reviews", label: "Patient Stories" },
              { href: "#contact", label: "Contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-cream-300 hover:text-gold-400 text-sm tracking-wider uppercase font-sans transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:9254268828"
              className="flex items-center gap-2 text-cream-300 hover:text-gold-400 text-sm transition-colors"
            >
              <Phone size={14} />
              (925) 426-8828
            </a>
            <a
              href="https://cloud-1de12d.becdn.net/customfile/2964d845db7b1468ce2e15a75719319187a8caef175da6f482760209006fadc3/pacderm---NEW-PT-INFO-combined.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold-500 hover:bg-gold-400 text-navy-950 text-sm font-medium px-5 py-2.5 tracking-wide uppercase transition-colors"
            >
              Book Now
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-cream-300 hover:text-gold-400 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-navy-950 border-t border-gold-500/20 px-6 py-6 space-y-4">
          {[
            { href: "/", label: "Home" },
            { href: "/services", label: "Services" },
            { href: "#reviews", label: "Patient Stories" },
            { href: "#contact", label: "Contact" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block text-cream-300 hover:text-gold-400 text-sm tracking-wider uppercase py-2 border-b border-navy-800 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="tel:9254268828"
            className="flex items-center gap-2 text-gold-400 text-sm pt-2"
          >
            <Phone size={14} />
            (925) 426-8828
          </a>
        </div>
      )}
    </header>
  );
}
