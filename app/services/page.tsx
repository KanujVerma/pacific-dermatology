import type { Metadata } from "next";
import Image from "next/image";
import ServiceCard from "@/components/ServiceCard";
import AnimateIn from "@/components/AnimateIn";
import SplitHeading from "@/components/SplitHeading";
import Marquee from "@/components/Marquee";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Services | Pacific Dermatology",
  description: "Medical and cosmetic dermatology services by Dr. Hank Fung in Pleasanton, CA. Acne, skin cancer, Botox, fillers, lasers, and more.",
};

const medicalServices = [
  {
    title: "Acne Treatment",
    description: "Comprehensive acne care for teens and adults — from topical regimens to prescription medications and procedural treatments like extractions and chemical peels.",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80",
  },
  {
    title: "Skin Cancer Screening",
    description: "Thorough full-body skin checks with dermoscopy for early detection of melanoma, basal cell, and squamous cell carcinomas. Early detection saves lives.",
    image: "https://images.unsplash.com/photo-1579165466741-7f35e4755660?w=600&q=80",
  },
  {
    title: "Mole Evaluation & Removal",
    description: "Expert evaluation of suspicious or cosmetically unwanted moles with surgical excision and pathology review when indicated.",
    image: "https://images.unsplash.com/photo-1584467735867-4297ae2ebcee?w=600&q=80",
  },
  {
    title: "Eczema (Atopic Dermatitis)",
    description: "Evidence-based management plans tailored to your triggers — including topical treatments, biologics, and lifestyle guidance to reduce flares.",
    image: "https://images.unsplash.com/photo-1576671081837-49000212a370?w=600&q=80",
  },
  {
    title: "Psoriasis",
    description: "Medical-grade psoriasis treatment ranging from topical corticosteroids and phototherapy to advanced biologic therapies for moderate-to-severe cases.",
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&q=80",
  },
  {
    title: "Rosacea",
    description: "Customized rosacea management including topical therapies, oral antibiotics, laser treatments, and trigger identification to reduce visible redness.",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80",
  },
  {
    title: "Wart & Molluscum Removal",
    description: "Safe, effective removal of common, plantar, and genital warts as well as molluscum contagiosum using cryotherapy and other proven techniques.",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80",
  },
  {
    title: "Nail & Hair Disorders",
    description: "Diagnosis and treatment of nail fungus, alopecia, and other scalp and hair conditions — including referral pathways when systemic workup is needed.",
    image: "https://images.unsplash.com/photo-1522337913770-5c60c20c54a0?w=600&q=80",
  },
  {
    title: "Atypical Nevi",
    description: "Expert monitoring and evaluation of unusual or dysplastic moles with dermoscopy, with surgical excision when biopsy is indicated.",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80",
  },
  {
    title: "Seborrheic Dermatitis",
    description: "Targeted treatment for persistent dandruff, scalp flaking, and facial seborrheic dermatitis — including medicated shampoos and topical antifungals.",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80",
  },
  {
    title: "Cysts",
    description: "Diagnosis and removal of epidermal inclusion cysts, pilar cysts, and other benign subcutaneous lesions with minimal scarring technique.",
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=600&q=80",
  },
  {
    title: "Skin Infections",
    description: "Diagnosis and treatment of bacterial (impetigo, cellulitis), fungal (tinea, candida), and viral (herpes, molluscum) skin infections.",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80",
  },
  {
    title: "Skin Growths",
    description: "Safe removal of benign skin growths including skin tags, seborrheic keratoses, dermatofibromas, and lipomas for comfort and clarity.",
    image: "https://images.unsplash.com/photo-1536064479547-7ee40b74b807?w=600&q=80",
  },
];

const cosmeticServices = [
  {
    title: "Botox & Dysport",
    description: "Precise neuromodulator injections to soften forehead lines, crow's feet, and frown lines. Dr. Fung's approach emphasizes natural-looking results — refreshed, never frozen.",
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&q=80",
  },
  {
    title: "Dermal Fillers",
    description: "Hyaluronic acid fillers (Juvederm, Restylane) to restore cheek volume, soften nasolabial folds, and define lip contours with artful, balanced results.",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&q=80",
  },
  {
    title: "Laser Skin Resurfacing",
    description: "Fractional laser treatments to improve texture, reduce fine lines, minimize pores, and address sun damage — with minimal downtime.",
    image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=600&q=80",
  },
  {
    title: "IPL / Photofacial",
    description: "Intense pulsed light therapy to target brown spots, broken capillaries, and uneven skin tone for a clearer, more luminous complexion.",
    image: "https://images.unsplash.com/photo-1526835862850-97bb8c8c9f2e?w=600&q=80",
  },
  {
    title: "Chemical Peels",
    description: "Medical-grade glycolic, salicylic, and TCA peels to exfoliate and renew the skin — addressing acne scars, hyperpigmentation, and dullness.",
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80",
  },
  {
    title: "Microneedling",
    description: "Collagen induction therapy to improve skin texture, minimize pores, and reduce the appearance of acne scarring and fine lines.",
    image: "https://images.unsplash.com/photo-1556227834-09f1de7a7d14?w=600&q=80",
  },
  {
    title: "Sclerotherapy",
    description: "Minimally invasive treatment for spider veins and small varicose veins, using precise injections to fade unwanted visible vessels.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
  },
  {
    title: "Kybella",
    description: "FDA-approved deoxycholic acid injections to permanently destroy fat cells under the chin — eliminating submental fullness without surgery.",
    image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600&q=80",
  },
  {
    title: "Daxxify",
    description: "Next-generation neuromodulator offering longer-lasting wrinkle relaxation than traditional Botox — fewer appointments, same natural results.",
    image: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?w=600&q=80",
  },
  {
    title: "Sculptra",
    description: "Poly-L-lactic acid filler that gradually rebuilds collagen over months — delivering natural volume restoration that improves over time.",
    image: "https://images.unsplash.com/photo-1598300188480-626f2f79ab8d?w=600&q=80",
  },
  {
    title: "Radiesse",
    description: "Calcium hydroxylapatite filler for immediate volume and long-term collagen stimulation — ideal for deep facial folds and hand rejuvenation.",
    image: "https://images.unsplash.com/photo-1552862750-746b8f6f7f25?w=600&q=80",
  },
  {
    title: "PDO Thread Lift",
    description: "Non-surgical facial contouring using dissolvable PDO threads to lift and tighten sagging skin with minimal downtime.",
    image: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=600&q=80",
  },
  {
    title: "Laser Hair Removal",
    description: "Permanent hair reduction across all skin types using advanced laser modalities — face, body, and sensitive areas treated with precision.",
    image: "https://images.unsplash.com/photo-1583795128727-6ec3642408f8?w=600&q=80",
  },
  {
    title: "Smoothbeam Laser",
    description: "1450nm diode laser targeting the sebaceous gland to reduce active acne and improve post-acne scarring with minimal side effects.",
    image: "https://images.unsplash.com/photo-1546015720-b8b30df5aa27?w=600&q=80",
  },
];

export default function ServicesPage() {
  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative min-h-[60vh] bg-navy-950 flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&q=80"
            alt=""
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900/90 to-navy-950" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <AnimateIn>
              <p className="text-gold-400 text-xs tracking-[0.3em] uppercase mb-6 font-sans">
                Our Services
              </p>
            </AnimateIn>
            <SplitHeading
              className="text-5xl md:text-6xl font-serif text-cream-50 leading-tight mb-6"
              delay={0.1}
            >
              Comprehensive Care For Your Skin
            </SplitHeading>
            <AnimateIn delay={0.5}>
              <p className="text-cream-300 text-lg leading-relaxed max-w-2xl">
                Dr. Hank Fung offers the full spectrum of medical and cosmetic dermatology —
                bringing over 20 years of clinical depth to every treatment, from skin cancer
                screenings to the latest aesthetic procedures.
              </p>
            </AnimateIn>
          </div>
        </div>
      </section>

      <Marquee
        items={[
          "Medical Dermatology",
          "Cosmetic Treatments",
          "Board-Certified Dermatologist",
          "20+ Years of Care",
          "Pleasanton, CA",
          "Dr. Hank Fung",
        ]}
        duration={35}
      />

      {/* Medical Services */}
      <section className="py-24 bg-navy-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimateIn>
            <div className="mb-12">
              <p className="text-gold-400 text-xs tracking-[0.25em] uppercase mb-3 font-sans">Clinical Excellence</p>
              <h2 className="text-4xl font-serif text-cream-50 mb-4">Medical Dermatology</h2>
              <p className="text-cream-400 text-base max-w-2xl">
                Evidence-based care for the full range of skin conditions — delivered with the
                precision and attentiveness that have made Dr. Fung the trusted choice in Pleasanton for decades.
              </p>
            </div>
          </AnimateIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {medicalServices.map((s, i) => (
              <AnimateIn key={s.title} delay={i * 0.05}>
                <ServiceCard title={s.title} description={s.description} image={s.image} />
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Cosmetic Services */}
      <section className="py-24 bg-cream-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimateIn>
            <div className="mb-12">
              <p className="text-gold-600 text-xs tracking-[0.25em] uppercase mb-3 font-sans">Aesthetic Medicine</p>
              <h2 className="text-4xl font-serif text-navy-900 mb-4">Cosmetic Dermatology</h2>
              <p className="text-navy-600 text-base max-w-2xl">
                Advanced aesthetic treatments performed with surgical precision and an artist&apos;s
                eye. Our philosophy: enhancement that looks entirely natural.
              </p>
            </div>
          </AnimateIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cosmeticServices.map((s, i) => (
              <AnimateIn key={s.title} delay={i * 0.05}>
                <ServiceCard title={s.title} description={s.description} image={s.image} />
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
