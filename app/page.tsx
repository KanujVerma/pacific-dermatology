import React from "react";
import Link from "next/link";
import { ArrowRight, Shield, Award, Heart, Users, Phone } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
import ReviewCard from "@/components/ReviewCard";
import AnimateIn from "@/components/AnimateIn";
import TiltCard from "@/components/TiltCard";
import HeroOrbs from "@/components/HeroOrbs";
import CountUp from "@/components/CountUp";

export default function Home() {
  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative min-h-screen bg-navy-950 flex items-center pt-20">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,_var(--gold-500)_0%,_transparent_60%)] opacity-5" />
        <HeroOrbs />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <AnimateIn delay={0.1}>
            <div className="max-w-3xl">
              <p className="text-gold-400 text-xs tracking-[0.3em] uppercase mb-6 font-sans">
                Pleasanton's Premier Dermatology Practice
              </p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-cream-50 leading-tight mb-6">
                Exceptional Skin Care,<br />
                <span className="text-gold-400">Trusted for 20+ Years</span>
              </h1>
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
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── Trust bar ── */}
      <section className="bg-gold-500 py-5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {(
              [
                { icon: Award, label: <><CountUp to={20} suffix="+" /> Years of Trusted Care</> },
                { icon: Shield, label: "Board-Certified Dermatologist" },
                { icon: Heart, label: "Patient-Centered Environment" },
                { icon: Users, label: "Full-Service Medical Care" },
              ] as { icon: React.ElementType; label: React.ReactNode }[]
            ).map(({ icon: Icon, label }, i) => (
              <div key={i} className="flex items-center gap-3">
                <Icon size={18} className="text-navy-900 shrink-0" />
                <span className="text-navy-900 text-xs font-medium tracking-wide uppercase leading-tight">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About Dr. Fung ── */}
      <section className="py-24 bg-cream-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimateIn direction="left">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-gold-600 text-xs tracking-[0.25em] uppercase mb-4 font-sans">About the Practice</p>
              <h2 className="text-4xl md:text-5xl font-serif text-navy-900 mb-8 leading-tight">
                Dr. Hank Fung —<br />Dermatology With Depth
              </h2>
              <p className="text-navy-700 text-lg leading-relaxed mb-6">
                For over two decades, Dr. Hank Fung has been the dermatologist Pleasanton families trust for
                everything from annual skin cancer screenings to the latest cosmetic treatments. His
                patient-centered approach means you're never rushed — every concern is heard, every
                question answered.
              </p>
              <p className="text-navy-600 text-base leading-relaxed mb-10">
                Pacific Dermatology offers a rare combination: the diagnostic precision of a
                top-tier medical practice with the refined, elevated experience of a boutique clinic.
                Because your skin deserves nothing less.
              </p>
              <a
                href="tel:9254268828"
                className="inline-flex items-center gap-2 text-gold-600 hover:text-gold-700 text-sm tracking-wider uppercase border-b border-gold-400 hover:border-gold-600 pb-1 transition-all"
              >
                Schedule a Consultation <ArrowRight size={14} />
              </a>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── Services Teaser ── */}
      <section className="py-24 bg-navy-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-16">
              <p className="text-gold-400 text-xs tracking-[0.25em] uppercase mb-4 font-sans">Our Expertise</p>
              <h2 className="text-4xl md:text-5xl font-serif text-cream-50 mb-6">Medical &amp; Cosmetic Dermatology</h2>
              <p className="text-cream-400 text-lg max-w-2xl mx-auto">
                Comprehensive care for your skin health — from clinical diagnosis to aesthetic refinement.
              </p>
            </div>
          </AnimateIn>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Medical */}
            <div>
              <p className="text-gold-400 text-xs tracking-[0.2em] uppercase mb-5 font-sans border-b border-gold-500/20 pb-3">Medical Dermatology</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { title: "Acne Treatment", desc: "Targeted therapies for all ages and severity levels." },
                  { title: "Skin Cancer Screening", desc: "Early detection and full-body mole evaluations." },
                  { title: "Eczema & Psoriasis", desc: "Evidence-based management for chronic conditions." },
                  { title: "Mole Removal", desc: "Safe, precise removal with pathology when indicated." },
                ].map((s) => (
                  <TiltCard key={s.title}>
                    <ServiceCard title={s.title} description={s.desc} />
                  </TiltCard>
                ))}
              </div>
            </div>

            {/* Cosmetic */}
            <div>
              <p className="text-gold-400 text-xs tracking-[0.2em] uppercase mb-5 font-sans border-b border-gold-500/20 pb-3">Cosmetic Dermatology</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { title: "Botox & Dysport", desc: "Natural-looking wrinkle relaxation and prevention." },
                  { title: "Dermal Fillers", desc: "Restore volume and contour with precision." },
                  { title: "Laser Treatments", desc: "Resurfacing, pigmentation, and rejuvenation." },
                  { title: "Chemical Peels", desc: "Exfoliation and renewal for a luminous complexion." },
                ].map((s) => (
                  <TiltCard key={s.title}>
                    <ServiceCard title={s.title} description={s.desc} />
                  </TiltCard>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 border border-gold-500/50 hover:border-gold-400 hover:bg-gold-500/5 text-gold-400 hover:text-gold-300 px-8 py-4 text-sm tracking-wider uppercase transition-all"
            >
              View All Services <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Patient Reviews ── */}
      <section id="reviews" className="py-24 bg-cream-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-gold-600 text-xs tracking-[0.25em] uppercase mb-4 font-sans">Patient Stories</p>
            <h2 className="text-4xl md:text-5xl font-serif text-navy-900 mb-6">
              What Our Patients Say
            </h2>
            <p className="text-navy-600 text-lg max-w-xl mx-auto">
              Over 20 years of care reflected in the words of the Pleasanton families we serve.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                quote: "Dr. Fung is the best dermatologist I've ever seen. He took the time to really listen and explain my diagnosis. I finally feel like my skin is in good hands.",
                author: "Karen C.",
                location: "Pleasanton, CA",
              },
              {
                quote: "I've been coming to Pacific Dermatology for over 10 years. The care here is truly different — attentive, thorough, and never rushed. Highly recommend to anyone in the East Bay.",
                author: "Michael T.",
                location: "Dublin, CA",
              },
              {
                quote: "Dr. Fung caught an early-stage melanoma during my annual screening. I cannot overstate how much that visit meant to my family. Exceptional physician.",
                author: "Linda R.",
                location: "Pleasanton, CA",
              },
              {
                quote: "The cosmetic work Dr. Fung has done is subtle and natural. I look refreshed, not done. His aesthetic sense is impeccable. This is now my go-to for everything skin.",
                author: "Sarah M.",
                location: "San Ramon, CA",
              },
            ].map((review, i) => (
              <AnimateIn key={review.author} delay={i * 0.1}>
                <ReviewCard
                  quote={review.quote}
                  author={review.author}
                  location={review.location}
                />
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── New Patient CTA ── */}
      <section className="py-20 bg-navy-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimateIn>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <p className="text-gold-400 text-xs tracking-[0.25em] uppercase mb-3 font-sans">New Patients Welcome</p>
                <h2 className="text-3xl md:text-4xl font-serif text-cream-50 mb-2">Ready to Get Started?</h2>
                <p className="text-cream-400 text-base max-w-xl">
                  Download the new patient registration form and have it ready before your first visit.
                  Then call us to schedule — we'll take care of the rest.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                <a
                  href="https://cloud-1de12d.becdn.net/customfile/2964d845db7b1468ce2e15a75719319187a8caef175da6f482760209006fadc3/pacderm---NEW-PT-INFO-combined.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-gold-400/50 hover:border-gold-400 text-gold-400 hover:text-gold-300 px-7 py-4 text-sm tracking-wide uppercase transition-all"
                >
                  Download Patient Form
                </a>
                <a
                  href="tel:9254268828"
                  className="inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-medium px-7 py-4 text-sm tracking-wide uppercase transition-all"
                >
                  <Phone size={15} />
                  Call to Schedule
                </a>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-24 bg-cream-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
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
