"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SplitHeadingProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
  delay?: number;
}

export default function SplitHeading({
  children,
  className = "",
  as: Tag = "h1",
  delay = 0,
}: SplitHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: "-60px" });

  const words = children.split(" ");

  return (
    <Tag ref={ref as React.RefObject<HTMLHeadingElement>} className={className} aria-label={children}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{ display: "inline-block", overflow: "hidden", marginRight: "0.25em" }}
        >
          <motion.span
            aria-hidden="true"
            style={{ display: "inline-block" }}
            initial={{ y: 40, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
            transition={{
              delay: delay + i * 0.08,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
