"use client";

import { useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import HeroOrbs from "@/components/HeroOrbs";

interface ParallaxHeroProps {
  src: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * Hero section wrapper with a mouse-following parallax background image.
 * The background shifts ±4% as the cursor moves across the section.
 * Usage: wrap hero content inside this component; it renders a <section>.
 */
export default function ParallaxHero({ src, className, children }: ParallaxHeroProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 45, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 45, damping: 20 });

  const imgX = useTransform(springX, [-1, 1], ["-4%", "4%"]);
  const imgY = useTransform(springY, [-1, 1], ["-4%", "4%"]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
      mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <section
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Parallax background layer — oversized so edges stay hidden during movement */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{
            x: imgX,
            y: imgY,
            position: "absolute",
            top: "-5%",
            left: "-5%",
            width: "110%",
            height: "110%",
          }}
        >
          <Image
            src={src}
            alt=""
            fill
            className="object-cover opacity-30"
            priority
          />
        </motion.div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900/90 to-navy-950" />

      {/* Orbs + particles */}
      <HeroOrbs />

      {/* Content */}
      {children}
    </section>
  );
}
