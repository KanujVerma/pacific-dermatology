"use client";

import ReviewCard from "@/components/ReviewCard";

const reviews = [
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
];

const doubled = [...reviews, ...reviews];

function CarouselRow({ reverse = false, duration = 25 }: { reverse?: boolean; duration?: number }) {
  return (
    <div
      className="flex group overflow-hidden"
      style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
    >
      <div
        className={`flex gap-6 shrink-0 ${reverse ? "animate-marquee-reverse" : "animate-marquee"} group-hover:[animation-play-state:paused]`}
      >
        {doubled.map((review, i) => (
          <div
            key={`${review.author}-${i}`}
            style={{ minWidth: "min(380px, 80vw)" }}
          >
            <ReviewCard
              quote={review.quote}
              author={review.author}
              location={review.location}
            />
          </div>
        ))}
      </div>
      {/* Duplicate for seamless loop */}
      <div
        className={`flex gap-6 shrink-0 ${reverse ? "animate-marquee-reverse" : "animate-marquee"} group-hover:[animation-play-state:paused]`}
        aria-hidden="true"
      >
        {doubled.map((review, i) => (
          <div
            key={`dup-${review.author}-${i}`}
            style={{ minWidth: "min(380px, 80vw)" }}
          >
            <ReviewCard
              quote={review.quote}
              author={review.author}
              location={review.location}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ReviewCarousel() {
  return (
    <section id="reviews" className="py-24 bg-cream-200 overflow-hidden relative">
      {/* Decorative quote mark */}
      <p
        className="absolute top-0 left-2 font-serif text-navy-900 pointer-events-none select-none leading-none"
        style={{ fontSize: "20vw", opacity: 0.04 }}
        aria-hidden="true"
      >
        &ldquo;
      </p>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12">
        <div className="text-center">
          <p className="text-gold-600 text-xs tracking-[0.25em] uppercase mb-4 font-sans">Patient Stories</p>
          <h2 className="text-4xl md:text-5xl font-serif text-navy-900 mb-6">
            What Our Patients Say
          </h2>
          <p className="text-navy-600 text-lg max-w-xl mx-auto">
            Over 20 years of care reflected in the words of the Pleasanton families we serve.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <CarouselRow reverse={false} duration={25} />
        <CarouselRow reverse={true} duration={32} />
      </div>
    </section>
  );
}
