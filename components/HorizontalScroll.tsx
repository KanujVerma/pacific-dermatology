"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";

interface ServiceItem {
  title: string;
  desc: string;
}

interface HorizontalScrollProps {
  medicalCards: ServiceItem[];
  cosmeticCards: ServiceItem[];
}

export default function HorizontalScroll({ medicalCards, cosmeticCards }: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const [scrollDistance, setScrollDistance] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (rowRef.current && containerRef.current) {
        const rowWidth = rowRef.current.scrollWidth;
        const viewportWidth = containerRef.current.offsetWidth;
        setScrollDistance(Math.max(0, rowWidth - viewportWidth));
      }
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (rowRef.current) observer.observe(rowRef.current);
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollDistance]);
  const labelOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.1]);

  const allCards = [
    { label: "Medical Dermatology", cards: medicalCards },
    { label: "Cosmetic Dermatology", cards: cosmeticCards },
  ];

  return (
    <>
      {/* Desktop horizontal scroll */}
      <div
        ref={containerRef}
        className="hidden md:block relative bg-navy-950"
        style={{ height: scrollDistance > 0 ? `calc(100vh + ${scrollDistance}px)` : "100vh" }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Background label */}
          <motion.p
            className="absolute top-12 left-8 text-[10vw] font-serif text-gold-400/10 pointer-events-none select-none leading-none z-0 whitespace-nowrap"
            style={{ opacity: labelOpacity }}
            aria-hidden="true"
          >
            Our Services
          </motion.p>

          {/* Section heading */}
          <div className="absolute top-12 right-8 text-right z-10">
            <p className="text-gold-400 text-xs tracking-[0.25em] uppercase mb-2 font-sans">Our Expertise</p>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 border border-gold-500/50 hover:border-gold-400 text-gold-400 hover:text-gold-300 px-6 py-3 text-xs tracking-wider uppercase transition-all"
            >
              View All <ArrowRight size={12} />
            </Link>
          </div>

          {/* Scrolling cards row */}
          <div className="absolute inset-0 flex items-center">
            <motion.div
              ref={rowRef}
              className="flex gap-6 px-16"
              style={{ x }}
            >
              {allCards.map(({ label, cards }) => (
                <div key={label} className="flex gap-4 shrink-0">
                  {/* Category label card */}
                  <div className="w-48 shrink-0 flex items-end pb-4">
                    <p className="text-gold-400 text-sm tracking-[0.2em] uppercase font-sans border-b border-gold-500/30 pb-3 leading-tight">
                      {label}
                    </p>
                  </div>
                  {cards.map((card, i) => (
                    <motion.div
                      key={card.title}
                      className="w-64 shrink-0"
                      initial={{ x: 60, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <ServiceCard title={card.title} description={card.desc} />
                    </motion.div>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile fallback — vertical grid */}
      <section className="md:hidden py-24 bg-navy-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-gold-400 text-xs tracking-[0.25em] uppercase mb-4 font-sans">Our Expertise</p>
            <h2 className="text-3xl font-serif text-cream-50 mb-4">Medical &amp; Cosmetic Dermatology</h2>
          </div>
          {allCards.map(({ label, cards }) => (
            <div key={label} className="mb-10">
              <p className="text-gold-400 text-xs tracking-[0.2em] uppercase mb-4 font-sans border-b border-gold-500/20 pb-3">{label}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {cards.map((card) => (
                  <ServiceCard key={card.title} title={card.title} description={card.desc} />
                ))}
              </div>
            </div>
          ))}
          <div className="text-center mt-8">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 border border-gold-500/50 hover:border-gold-400 text-gold-400 px-8 py-4 text-sm tracking-wider uppercase transition-all"
            >
              View All Services <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
