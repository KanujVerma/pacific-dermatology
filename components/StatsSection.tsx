"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import CountUp from "@/components/CountUp";
import AnimateIn from "@/components/AnimateIn";

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-24 min-h-[240px]">
      {/* Parallax background */}
      <motion.div
        className="absolute inset-x-0 -top-[15%] -bottom-[15%]"
        style={{ y: bgY }}
      >
        <Image
          src="https://images.unsplash.com/photo-1516549655669-df64a4db0cdd?w=1600&q=80"
          alt=""
          fill
          className="object-cover"
        />
      </motion.div>

      {/* Dark overlay */}
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(12,20,32,0.78)" }} />

      {/* Stats */}
      <div className="relative flex items-center justify-center gap-0 flex-wrap">
        <AnimateIn>
          <div className="text-center px-12 md:px-20">
            <p className="text-4xl md:text-5xl font-serif text-gold-400">
              <CountUp to={20} suffix="+" />
            </p>
            <p className="text-cream-400 text-xs tracking-[0.2em] uppercase mt-2 font-sans">
              Years of Care
            </p>
          </div>
        </AnimateIn>

        <div className="w-px h-12 bg-navy-700 hidden sm:block" />

        <AnimateIn delay={0.1}>
          <div className="text-center px-12 md:px-20">
            <p className="text-4xl md:text-5xl font-serif text-gold-400">
              <CountUp to={5} suffix="K+" />
            </p>
            <p className="text-cream-400 text-xs tracking-[0.2em] uppercase mt-2 font-sans">
              Patients Served
            </p>
          </div>
        </AnimateIn>

        <div className="w-px h-12 bg-navy-700 hidden sm:block" />

        <AnimateIn delay={0.2}>
          <div className="text-center px-12 md:px-20">
            <p className="text-4xl md:text-5xl font-serif text-gold-400">
              4.9 <span className="text-2xl">★</span>
            </p>
            <p className="text-cream-400 text-xs tracking-[0.2em] uppercase mt-2 font-sans">
              Average Patient Rating
            </p>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
