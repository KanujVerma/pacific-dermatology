import type { Metadata } from "next";
import { ArrowRight, Phone } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";

export const metadata: Metadata = {
  title: "Services | Pacific Dermatology",
  description: "Medical and cosmetic dermatology services by Dr. Hank Fung in Pleasanton, CA. Acne, skin cancer, Botox, fillers, lasers, and more.",
};

const medicalServices = [
  {
    title: "Acne Treatment",
    description: "Comprehensive acne care for teens and adults — from topical regimens to prescription medications and procedural treatments like extractions and chemical peels.",
  },
  {
    title: "Skin Cancer Screening",
    description: "Thorough full-body skin checks with dermoscopy for early detection of melanoma, basal cell, and squamous cell carcinomas. Early detection saves lives.",
  },
  {
    title: "Mole Evaluation & Removal",
    description: "Expert evaluation of suspicious or cosmetically unwanted moles with surgical excision and pathology review when indicated.",
  },
  {
    title: "Eczema (Atopic Dermatitis)",
    description: "Evidence-based management plans tailored to your triggers — including topical treatments, biologics, and lifestyle guidance to reduce flares.",
  },
  {
    title: "Psoriasis",
    description: "Medical-grade psoriasis treatment ranging from topical corticosteroids and phototherapy to advanced biologic therapies for moderate-to-severe cases.",
  },
  {
    title: "Rosacea",
    description: "Customized rosacea management including topical therapies, oral antibiotics, laser treatments, and trigger identification to reduce visible redness.",
  },
  {
    title: "Wart & Molluscum Removal",
    description: "Safe, effective removal of common, plantar, and genital warts as well as molluscum contagiosum using cryotherapy and other proven techniques.",
  },
  {
    title: "Nail & Hair Disorders",
    description: "Diagnosis and treatment of nail fungus, alopecia, and other scalp and hair conditions — including referral pathways when systemic workup is needed.",
  },
];

const cosmeticServices = [
  {
    title: "Botox & Dysport",
    description: "Precise neuromodulator injections to soften forehead lines, crow's feet, and frown lines. Dr. Fung's approach emphasizes natural-looking results — refreshed, never frozen.",
  },
  {
    title: "Dermal Fillers",
    description: "Hyaluronic acid fillers (Juvederm, Restylane) to restore cheek volume, soften nasolabial folds, and define lip contours with artful, balanced results.",
  },
  {
    title: "Laser Skin Resurfacing",
    description: "Fractional laser treatments to improve texture, reduce fine lines, minimize pores, and address sun damage — with minimal downtime.",
  },
  {
    title: "IPL / Photofacial",
    description: "Intense pulsed light therapy to target brown spots, broken capillaries, and uneven skin tone for a clearer, more luminous complexion.",
  },
  {
    title: "Chemical Peels",
    description: "Medical-grade glycolic, salicylic, and TCA peels to exfoliate and renew the skin — addressing acne scars, hyperpigmentation, and dullness.",
  },
  {
    title: "Microneedling",
    description: "Collagen induction therapy to improve skin texture, minimize pores, and reduce the appearance of acne scarring and fine lines.",
  },
  {
    title: "Sclerotherapy",
    description: "Minimally invasive treatment for spider veins and small varicose veins, using precise injections to fade unwanted visible vessels.",
  },
  {
    title: "Kybella",
    description: "FDA-approved deoxycholic acid injections to permanently destroy fat cells under the chin — eliminating submental fullness without surgery.",
  },
];

export default function ServicesPage() {
  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="bg-navy-950 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-gold-400 text-xs tracking-[0.3em] uppercase mb-4 font-sans">
              Our Services
            </p>
            <h1 className="text-5xl md:text-6xl font-serif text-cream-50 mb-6 leading-tight">
              Comprehensive Care<br />
              <span className="text-gold-400">For Your Skin</span>
            </h1>
            <p className="text-cream-300 text-lg leading-relaxed">
              Dr. Hank Fung offers the full spectrum of medical and cosmetic dermatology —
              bringing over 20 years of clinical depth to every treatment, from skin cancer
              screenings to the latest aesthetic procedures.
            </p>
          </div>
        </div>
      </section>

      {/* Medical Services */}
      <section className="py-24 bg-cream-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold-600 text-xs tracking-[0.25em] uppercase mb-3 font-sans">Clinical Excellence</p>
            <h2 className="text-4xl font-serif text-navy-900 mb-4">Medical Dermatology</h2>
            <p className="text-navy-600 text-base max-w-2xl">
              Evidence-based care for the full range of skin conditions — delivered with the
              precision and attentiveness that have made Dr. Fung the trusted choice in Pleasanton for decades.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {medicalServices.map((s) => (
              <div
                key={s.title}
                className="bg-white border border-cream-300 hover:border-gold-400/50 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                <h3 className="text-navy-900 font-serif text-lg mb-2">{s.title}</h3>
                <p className="text-navy-600 text-sm leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cosmetic Services */}
      <section className="py-24 bg-navy-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold-400 text-xs tracking-[0.25em] uppercase mb-3 font-sans">Aesthetic Medicine</p>
            <h2 className="text-4xl font-serif text-cream-50 mb-4">Cosmetic Dermatology</h2>
            <p className="text-cream-400 text-base max-w-2xl">
              Advanced aesthetic treatments performed with surgical precision and an artist&apos;s
              eye. Our philosophy: enhancement that looks entirely natural.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cosmeticServices.map((s) => (
              <ServiceCard key={s.title} title={s.title} description={s.description} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gold-500">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-navy-950 mb-4">
            Ready to Schedule Your Visit?
          </h2>
          <p className="text-navy-800 text-base mb-8 max-w-xl mx-auto">
            Call Pacific Dermatology today to book with Dr. Hank Fung.
            New patients are always welcome.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:9254268828"
              className="inline-flex items-center justify-center gap-2 bg-navy-950 hover:bg-navy-900 text-cream-50 font-medium px-8 py-4 text-sm tracking-wide uppercase transition-all"
            >
              <Phone size={15} />
              (925) 426-8828
            </a>
            <a
              href="https://d1wqtots2bk2xi.cloudfront.net/Pacific+Dermatology+New+Patient+Registration+Form.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border-2 border-navy-950 text-navy-950 hover:bg-navy-950 hover:text-gold-400 font-medium px-8 py-4 text-sm tracking-wide uppercase transition-all"
            >
              New Patient Form <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
