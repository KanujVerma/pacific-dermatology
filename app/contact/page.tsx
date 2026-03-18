import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import AnimateIn from "@/components/AnimateIn";
import SplitHeading from "@/components/SplitHeading";
import ContactForm from "@/components/ContactForm";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Contact | Pacific Dermatology",
  description:
    "Contact Pacific Dermatology in Pleasanton, CA. Call (925) 426-8828 or send a message to Dr. Hank Fung's office at 5924 Stoneridge Dr STE 101.",
};

const contactDetails = [
  {
    icon: MapPin,
    label: "Address",
    value: "5924 Stoneridge Dr STE 101\nPleasanton, CA 94588",
    href: "https://maps.google.com/?q=5924+Stoneridge+Dr+STE+101+Pleasanton+CA+94588",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "(925) 426-8828",
    href: "tel:9254268828",
  },
  {
    icon: Mail,
    label: "Email",
    value: "pacificdermatology@yahoo.com",
    href: "mailto:pacificdermatology@yahoo.com",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Call for current hours",
    href: undefined,
  },
];

export default function ContactPage() {
  return (
    <main className="pt-20">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-navy-950 py-24 border-b border-gold-500/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimateIn>
            <p className="text-gold-400 text-xs tracking-[0.3em] uppercase mb-6 font-sans">
              Contact
            </p>
          </AnimateIn>

          <SplitHeading
            className="text-5xl md:text-6xl font-serif text-cream-100 leading-tight max-w-2xl"
            delay={0.1}
          >
            Get In Touch
          </SplitHeading>

          <AnimateIn delay={0.4}>
            <p className="text-cream-300 text-lg leading-relaxed max-w-xl mt-6">
              We&rsquo;re here to help. Reach out with questions, to request an
              appointment, or to learn more about our services.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* ── Two-column: Info + Form ───────────────────────────────────────── */}
      <section className="py-24 bg-navy-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/*
            Layout proportions: 5fr info (narrower) vs 7fr form (wider).
            The form has more vertical content so giving it more horizontal
            space keeps the columns visually balanced.
          */}
          <div className="grid md:grid-cols-[5fr_7fr] gap-16 lg:gap-24">
            {/* Left: practice information */}
            <div>
              <AnimateIn>
                <h2 className="text-2xl font-serif text-cream-100 mb-10">
                  Practice Information
                </h2>
              </AnimateIn>

              <div className="space-y-8">
                {contactDetails.map((item, i) => (
                  <AnimateIn key={item.label} delay={i * 0.08}>
                    <div className="flex gap-4">
                      {/* Gold icon anchored to top of text block */}
                      <div className="mt-0.5 text-gold-400 shrink-0">
                        <item.icon size={17} aria-hidden="true" />
                      </div>

                      <div>
                        <p className="text-cream-400 text-xs tracking-[0.15em] uppercase mb-1.5 font-sans">
                          {item.label}
                        </p>

                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-cream-100 hover:text-gold-400 transition-colors duration-200 font-sans text-sm leading-relaxed whitespace-pre-line"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-cream-100 font-sans text-sm leading-relaxed whitespace-pre-line">
                            {item.value}
                          </p>
                        )}
                      </div>
                    </div>
                  </AnimateIn>
                ))}
              </div>

              {/* Decorative gold rule — separates info from a subtle note */}
              <AnimateIn delay={0.4}>
                <div className="mt-12 pt-8 border-t border-gold-500/10">
                  <p className="text-cream-400/60 text-xs leading-relaxed font-sans">
                    Pacific Dermatology is a private practice. We accept most
                    major insurance plans. Please call to verify coverage before
                    your appointment.
                  </p>
                </div>
              </AnimateIn>
            </div>

            {/* Right: contact form */}
            <AnimateIn delay={0.2}>
              <h2 className="text-2xl font-serif text-cream-100 mb-10">
                Send a Message
              </h2>
              <ContactForm />
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ── Google Maps embed ─────────────────────────────────────────────── */}
      {/*
        Wrapped in navy-900 so the section background shows at the seam.
        Top border-t provides the gold hairline separator.
        Gradient overlay fades navy-950 into the map top edge for continuity.
      */}
      <section className="relative bg-navy-900 border-t border-gold-500/10">
        {/* Top gradient overlay for smooth section bleed */}
        <div
          className="absolute top-0 left-0 right-0 h-12 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, var(--color-navy-950, #04071a), transparent)",
          }}
          aria-hidden="true"
        />

        <iframe
          src="https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1s37.6909187,-121.8989218!6i16"
          width="100%"
          height="400"
          style={{ border: 0, display: "block" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Pacific Dermatology — 5924 Stoneridge Dr Suite 101, Pleasanton CA"
        />
      </section>

      <CTASection />
    </main>
  );
}
