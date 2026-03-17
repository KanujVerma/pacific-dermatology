import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";
import ReviewCarousel from "@/components/ReviewCarousel";
import AnimateIn from "@/components/AnimateIn";
import ClipReveal from "@/components/ClipReveal";
import HeroSection from "@/components/HeroSection";
import Marquee from "@/components/Marquee";
import HorizontalScroll from "@/components/HorizontalScroll";
import CTASection from "@/components/CTASection";
import StatsSection from "@/components/StatsSection";

export default function Home() {
  return (
    <main>
      {/* ── Hero ── */}
      <HeroSection />

      <Marquee
        items={[
          "20+ Years of Trusted Care",
          "Board-Certified Dermatologist",
          "Patient-Centered Environment",
          "Full-Service Medical Care",
          "Pleasanton, CA",
          "Dr. Hank Fung",
        ]}
        duration={35}
      />

      {/* ── About Dr. Fung ── */}
      <section className="py-24 bg-cream-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ClipReveal className="h-80 md:h-[500px]">
              <div
                className="grid h-full gap-2"
                style={{ gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr" }}
              >
                {/* Large image — spans both rows */}
                <div className="relative overflow-hidden" style={{ gridRow: "1 / 3" }}>
                  <Image
                    src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80"
                    alt="Pacific Dermatology clinic interior"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/20 to-transparent" />
                </div>
                {/* Small top */}
                <div className="relative overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=600&q=80"
                    alt="Skincare treatment"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Small bottom */}
                <div className="relative overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80"
                    alt="Dermatologist at work"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </ClipReveal>
            <div>
              <AnimateIn delay={0}><p className="text-gold-600 text-xs tracking-[0.25em] uppercase mb-4 font-sans">About the Practice</p></AnimateIn>
              <AnimateIn delay={0.1}><h2 className="text-4xl md:text-5xl font-serif text-navy-900 mb-8 leading-tight">Dr. Hank Fung —<br />Dermatology With Depth</h2></AnimateIn>
              <AnimateIn delay={0.2}><p className="text-navy-700 text-lg leading-relaxed mb-6">For over two decades, Dr. Hank Fung has been the dermatologist Pleasanton families trust for everything from annual skin cancer screenings to the latest cosmetic treatments. His patient-centered approach means you&apos;re never rushed — every concern is heard, every question answered.</p></AnimateIn>
              <AnimateIn delay={0.3}><p className="text-navy-600 text-base leading-relaxed mb-10">Pacific Dermatology offers a rare combination: the diagnostic precision of a top-tier medical practice with the refined, elevated experience of a boutique clinic. Because your skin deserves nothing less.</p></AnimateIn>
              <AnimateIn delay={0.4}><a href="tel:9254268828" className="inline-flex items-center gap-2 text-gold-600 hover:text-gold-700 text-sm tracking-wider uppercase border-b border-gold-400 hover:border-gold-600 pb-1 transition-all">Schedule a Consultation <ArrowRight size={14} /></a></AnimateIn>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services Teaser ── */}
      <HorizontalScroll
        medicalCards={[
          {
            title: "Acne Treatment",
            desc: "Targeted therapies for all ages and severity levels.",
            image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80",
          },
          {
            title: "Skin Cancer Screening",
            desc: "Early detection and full-body mole evaluations.",
            image: "https://images.unsplash.com/photo-1579165466741-7f35e4755660?w=600&q=80",
          },
          {
            title: "Eczema & Psoriasis",
            desc: "Evidence-based management for chronic conditions.",
            image: "https://images.unsplash.com/photo-1576671081837-49000212a370?w=600&q=80",
          },
          {
            title: "Mole Removal",
            desc: "Safe, precise removal with pathology when indicated.",
            image: "https://images.unsplash.com/photo-1584467735867-4297ae2ebcee?w=600&q=80",
          },
        ]}
        cosmeticCards={[
          {
            title: "Botox & Dysport",
            desc: "Natural-looking wrinkle relaxation and prevention.",
            image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&q=80",
          },
          {
            title: "Dermal Fillers",
            desc: "Restore volume and contour with precision.",
            image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&q=80",
          },
          {
            title: "Laser Treatments",
            desc: "Resurfacing, pigmentation, and rejuvenation.",
            image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=600&q=80",
          },
          {
            title: "Chemical Peels",
            desc: "Exfoliation and renewal for a luminous complexion.",
            image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80",
          },
        ]}
      />

      <StatsSection />

      <ReviewCarousel />

      <CTASection />

      {/* ── Contact ── */}
      <section id="contact" className="py-24 relative overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=1600&q=80"
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-cream-100/90" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gold-600 text-xs tracking-[0.25em] uppercase mb-4 font-sans">Get In Touch</p>
            <h2 className="text-4xl font-serif text-navy-900 mb-6">We&apos;re Here for You</h2>
            <p className="text-navy-600 text-base mb-10">
              Whether you have a clinical concern, a cosmetic question, or just want to meet Dr. Fung,
              we welcome new and existing patients with the same attentive care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:9254268828"
                className="inline-flex items-center justify-center gap-2 bg-navy-900 hover:bg-navy-800 text-cream-100 px-8 py-4 text-sm tracking-wide uppercase transition-all"
              >
                <Phone size={15} />
                (925) 426-8828
              </a>
              <a
                href="mailto:pacificdermatology@yahoo.com"
                className="inline-flex items-center justify-center gap-2 border border-navy-300 hover:border-navy-500 text-navy-700 hover:text-navy-900 px-8 py-4 text-sm tracking-wide uppercase transition-all"
              >
                Email the Practice
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
