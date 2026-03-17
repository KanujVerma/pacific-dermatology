"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface ClipRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function ClipReveal({ children, className = "", delay = 0 }: ClipRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ clipPath: "inset(100% 0 0 0)" }}
      animate={inView ? { clipPath: "inset(0% 0 0 0)" } : { clipPath: "inset(100% 0 0 0)" }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
