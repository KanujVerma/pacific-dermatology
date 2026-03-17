"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import HeroOrbs from "@/components/HeroOrbs";
import SplitHeading from "@/components/SplitHeading";
import AnimateIn from "@/components/AnimateIn";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-navy-950 flex items-center pt-20 overflow-hidden"
    >
      {/* Parallax background image */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <Image
          src="/images/hero-bg.jpg"
          alt=""
          fill
          className="object-cover opacity-40"
          priority
        />
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 opacity-90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,_var(--gold-500)_0%,_transparent_60%)] opacity-5" />
      <HeroOrbs />

      {/* Content */}
      <motion.div
        className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 w-full"
        style={{ y: textY }}
      >
        <div className="max-w-3xl">
          <AnimateIn>
            <p className="text-gold-400 text-xs tracking-[0.3em] uppercase mb-6 font-sans">
              Pleasanton&apos;s Premier Dermatology Practice
            </p>
          </AnimateIn>

          <SplitHeading
            className="text-5xl md:text-6xl lg:text-7xl font-serif text-cream-50 leading-tight mb-6"
            delay={0.1}
          >
            Exceptional Skin Care Trusted for 20 Years
          </SplitHeading>

          <AnimateIn delay={0.5}>
            <p className="text-cream-300 text-lg md:text-xl leading-relaxed mb-4 max-w-2xl">
              Dr. Hank Fung and the team at Pacific Dermatology deliver concierge-level
              medical and cosmetic dermatology — combining deep clinical expertise with
              a patient-centered approach that keeps Pleasanton families coming back for decades.
            </p>
            <p className="text-cream-400 text-base leading-relaxed mb-10 max-w-xl">
              Full-service medical care for skin conditions, and advanced cosmetic
              treatments to help you look and feel your best.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:9254268828"
                className="inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-medium px-8 py-4 tracking-wide uppercase text-sm transition-all hover:shadow-lg hover:shadow-gold-500/20"
              >
                <Phone size={16} />
                Call (925) 426-8828
              </a>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 border border-cream-400/40 hover:border-gold-400 text-cream-200 hover:text-gold-400 px-8 py-4 tracking-wide uppercase text-sm transition-all"
              >
                View Services <ArrowRight size={14} />
              </Link>
            </div>
          </AnimateIn>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: indicatorOpacity }}
      >
        <p className="text-cream-400 text-[9px] tracking-[0.3em] uppercase font-sans">Scroll</p>
        <motion.div
          className="w-px bg-gold-400"
          style={{ height: 40 }}
          animate={{ scaleY: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
