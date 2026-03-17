"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Phone } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import AnimateIn from "@/components/AnimateIn";

const PDF_URL =
  "https://cloud-1de12d.becdn.net/customfile/2964d845db7b1468ce2e15a75719319187a8caef175da6f482760209006fadc3/pacderm---NEW-PT-INFO-combined.pdf";

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 1],
    ["#f6f3e9", "#1c2331"]
  );

  const textColor = useTransform(
    scrollYProgress,
    [0, 1],
    ["#1c2331", "#fdfbf7"]
  );

  const subTextColor = useTransform(
    scrollYProgress,
    [0, 1],
    ["#365b76", "#d6ccb5"]
  );

  return (
    <motion.section
      ref={sectionRef}
      className="py-20 relative overflow-hidden"
      style={{ backgroundColor }}
    >
      {/* Ambient watermark */}
      <p
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif whitespace-nowrap pointer-events-none select-none text-cream-50"
        style={{ fontSize: "12vw", opacity: 0.04 }}
        aria-hidden="true"
      >
        PACIFIC DERMATOLOGY
      </p>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <AnimateIn>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <motion.p
                className="text-xs tracking-[0.25em] uppercase mb-3 font-sans text-gold-400"
              >
                New Patients Welcome
              </motion.p>
              <motion.h2
                className="text-3xl md:text-4xl font-serif mb-2"
                style={{ color: textColor }}
              >
                Ready to Get Started?
              </motion.h2>
              <motion.p
                className="text-base max-w-xl"
                style={{ color: subTextColor }}
              >
                Download the new patient registration form and have it ready before
                your first visit. Then call us to schedule — we&apos;ll take care of the rest.
              </motion.p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <MagneticButton>
                <a
                  href={PDF_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-gold-400/50 hover:border-gold-400 text-gold-400 hover:text-gold-300 px-7 py-4 text-sm tracking-wide uppercase transition-all"
                >
                  Download Patient Form
                </a>
              </MagneticButton>
              <MagneticButton>
                <a
                  href="tel:9254268828"
                  className="inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-medium px-7 py-4 text-sm tracking-wide uppercase transition-all"
                >
                  <Phone size={15} />
                  Call to Schedule
                </a>
              </MagneticButton>
            </div>
          </div>
        </AnimateIn>
      </div>
    </motion.section>
  );
}
