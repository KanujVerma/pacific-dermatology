# Site Completion Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a contact page, expand the services list, fix the nav, and wire up GA4 so the site is pitch-ready for Dr. Fung.

**Architecture:** Four independent tasks — none depend on each other and can be done in any order. Each task modifies existing files or adds one new file. The contact page is the only net-new page; everything else is additive edits to existing files.

**Tech Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Framer Motion, Lucide React. No test framework — verification is `npm run build` + manual browser check at localhost:3000.

**Spec:** `docs/superpowers/specs/2026-03-17-pitch-and-site-completion-design.md`

---

## Chunk 1: Header + Services

### Task 1: Fix nav Contact link + add New Patient Form to mobile menu

**Files:**
- Modify: `components/Header.tsx`

**Background:** Both nav arrays (desktop line ~30, mobile line ~79) have `{ href: "/#contact", label: "Contact" }`. Change both to `/contact`. The desktop header already has "Book Now" linking to the patient PDF. The mobile menu has no equivalent — add a "New Patient Form" link there.

- [ ] **Step 1: Update Contact href in both nav arrays**

In `components/Header.tsx`, change `/#contact` → `/contact` in both the desktop nav array (~line 30) and the mobile nav array (~line 79):

```tsx
{ href: "/contact", label: "Contact" },   // ← was /#contact
```

- [ ] **Step 2: Add New Patient Form link to mobile menu**

In the mobile menu section, insert the following after the closing `})}` of the links `.map()` and before the `<a href="tel:...">` phone link:

```tsx
          {/* End of existing links map: })} */}
          <a
            href="https://cloud-1de12d.becdn.net/customfile/2964d845db7b1468ce2e15a75719319187a8caef175da6f482760209006fadc3/pacderm---NEW-PT-INFO-combined.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="block text-gold-400 hover:text-gold-300 text-sm tracking-wider uppercase py-2 border-b border-navy-800 transition-colors"
          >
            New Patient Form
          </a>
          {/* Existing phone <a href="tel:..."> follows here */}
```

Note: `onClick={() => setOpen(false)}` is required so the mobile menu closes when this link is tapped.

- [ ] **Step 3: Verify build passes**

```bash
cd /Users/kanuj/pacific-dermatology && npm run build
```

Expected: Build completes with no errors.

- [ ] **Step 4: Commit**

```bash
cd /Users/kanuj/pacific-dermatology && git add components/Header.tsx && git commit -m "feat: fix Contact nav link to /contact, add patient form to mobile menu"
```

---

### Task 2: Expand services page with missing treatments

**Files:**
- Modify: `app/services/page.tsx`

**Background:** The services page has 8 medical + 8 cosmetic cards. Add the genuinely missing ones. **Important:** Every new card must use a unique Unsplash photo ID not already in either array. The existing IDs in use are listed below — do not reuse any of them.

**Existing image IDs already in use (do not duplicate):**
Medical: `1570172619644`, `1579165466741`, `1584467735867`, `1576671081837`, `1559757175`, `1522337360788`, `1584308666744`, `1522337913770`
Cosmetic: `1616394584738`, `1512290923902`, `1527613426441`, `1526835862850`, `1487412947147`, `1556227834`, `1571019613454`

Before committing, open each new image URL in a browser to confirm it loads. If any returns a 404, replace it with a working Unsplash URL of similar subject matter before committing.

- [ ] **Step 1: Add 5 missing medical cards**

Append to the `medicalServices` array after the existing 8 entries:

```tsx
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
```

- [ ] **Step 2: Add 6 missing cosmetic cards**

Append to the `cosmeticServices` array after the existing 8 entries:

```tsx
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
  image: "https://images.unsplash.com/photo-1570053969760-0b5ff76e0e66?w=600&q=80",
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
```

- [ ] **Step 3: Verify all new image URLs load**

Open each of the 11 new image URLs in a browser. If any returns a 404, replace it with a working Unsplash URL of similar subject matter before continuing.

- [ ] **Step 4: Verify build passes**

```bash
cd /Users/kanuj/pacific-dermatology && npm run build
```

Expected: Build completes. Services page renders 13 medical + 14 cosmetic cards.

- [ ] **Step 5: Commit**

```bash
cd /Users/kanuj/pacific-dermatology && git add app/services/page.tsx && git commit -m "feat: add 11 missing treatment cards to services page"
```

---

## Chunk 2: Contact Page

### Task 3: Build the contact page

**Files:**
- Create: `components/ContactForm.tsx` (client component — form state)
- Create: `app/contact/page.tsx` (server component — page layout)

**Design constraints:** Dark navy background (`bg-navy-950`), gold accents (`text-gold-400`, `border-gold-500/20`), cream text (`text-cream-100` for headings, `text-cream-300` for body). Wrap reveal elements in `<AnimateIn>`, headings in `<SplitHeading>`. Section padding `py-24`, max width `max-w-7xl mx-auto px-6 lg:px-8`.

- [ ] **Step 1: Consult ui-ux-pro-max skill**

Before writing any code, invoke the `ui-ux-pro-max` skill. Describe: dark navy luxury medical site, contact page with hero + two-column info/form layout + map embed. Get recommendations on spacing, typography hierarchy, form input styling, and whether the two-column layout should be equal or weighted. If the skill is unavailable, proceed with the design constraints above.

- [ ] **Step 2: Get the Google Maps embed URL**

Open Google Maps, search "5924 Stoneridge Dr STE 101, Pleasanton, CA 94588", click Share → Embed a map, copy the full `<iframe>` `src` attribute value. It will look like:
`https://www.google.com/maps/embed?pb=!1m18!1m12!...`

Use this `pb=...` URL in Step 4 below. Do not use `maps.google.com/maps?q=...&output=embed` — that legacy format is blocked by browsers.

- [ ] **Step 3: Create a Formspree account and get a form ID**

Go to formspree.io, create a free account, create a new form (name it "Pacific Dermatology Contact"), and copy the 8-character form ID. Replace `YOUR_FORMSPREE_ID` in Step 4 with this ID (format: `https://formspree.io/f/abcd1234`).

- [ ] **Step 4: Create `components/ContactForm.tsx`**

```tsx
"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("https://formspree.io/f/YOUR_FORMSPREE_ID", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-cream-400 text-xs tracking-[0.15em] uppercase mb-2 font-sans">
            Name
          </label>
          <input
            type="text"
            name="name"
            required
            className="w-full bg-navy-900 border border-gold-500/20 text-cream-100 px-4 py-3 text-sm font-sans focus:outline-none focus:border-gold-400 transition-colors placeholder:text-cream-400/40"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-cream-400 text-xs tracking-[0.15em] uppercase mb-2 font-sans">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            className="w-full bg-navy-900 border border-gold-500/20 text-cream-100 px-4 py-3 text-sm font-sans focus:outline-none focus:border-gold-400 transition-colors placeholder:text-cream-400/40"
            placeholder="(925) 000-0000"
          />
        </div>
      </div>
      <div>
        <label className="block text-cream-400 text-xs tracking-[0.15em] uppercase mb-2 font-sans">
          Email
        </label>
        <input
          type="email"
          name="email"
          required
          className="w-full bg-navy-900 border border-gold-500/20 text-cream-100 px-4 py-3 text-sm font-sans focus:outline-none focus:border-gold-400 transition-colors placeholder:text-cream-400/40"
          placeholder="your@email.com"
        />
      </div>
      <div>
        <label className="block text-cream-400 text-xs tracking-[0.15em] uppercase mb-2 font-sans">
          Message
        </label>
        <textarea
          name="message"
          required
          rows={5}
          className="w-full bg-navy-900 border border-gold-500/20 text-cream-100 px-4 py-3 text-sm font-sans focus:outline-none focus:border-gold-400 transition-colors placeholder:text-cream-400/40 resize-none"
          placeholder="How can we help you?"
        />
      </div>

      <p className="text-cream-400/60 text-xs leading-relaxed font-sans border-l-2 border-gold-500/30 pl-3">
        This form is for general inquiries only. Do not submit personal health
        information or urgent medical concerns — call the office directly at{" "}
        <a href="tel:9254268828" className="text-gold-400 hover:underline">
          (925) 426-8828
        </a>
        .
      </p>

      <button
        type="submit"
        disabled={status === "sending" || status === "sent"}
        className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 disabled:opacity-60 text-navy-950 text-sm font-medium px-8 py-3 tracking-wide uppercase transition-colors"
      >
        <Send size={14} />
        {status === "sending"
          ? "Sending..."
          : status === "sent"
          ? "Message Sent ✓"
          : "Send Message"}
      </button>

      {status === "error" && (
        <p className="text-red-400 text-sm font-sans">
          Something went wrong. Please call us at (925) 426-8828.
        </p>
      )}
    </form>
  );
}
```

- [ ] **Step 5: Create `app/contact/page.tsx`**

Replace `PASTE_MAP_EMBED_URL_HERE` with the `pb=...` URL from Step 2.

```tsx
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
  },
];

export default function ContactPage() {
  return (
    <main className="pt-20">
      {/* Hero */}
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
              We&apos;re here to help. Reach out with questions, to request an
              appointment, or to learn more about our services.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Info + Form */}
      <section className="py-24 bg-navy-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Left: contact details */}
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
                      <div className="mt-0.5 text-gold-400 shrink-0">
                        <item.icon size={18} />
                      </div>
                      <div>
                        <p className="text-cream-400 text-xs tracking-[0.15em] uppercase mb-1 font-sans">
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-cream-100 hover:text-gold-400 transition-colors font-sans whitespace-pre-line"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-cream-100 font-sans whitespace-pre-line">
                            {item.value}
                          </p>
                        )}
                      </div>
                    </div>
                  </AnimateIn>
                ))}
              </div>
            </div>

            {/* Right: form */}
            <AnimateIn delay={0.2}>
              <h2 className="text-2xl font-serif text-cream-100 mb-10">
                Send a Message
              </h2>
              <ContactForm />
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* Google Maps */}
      <section className="bg-navy-900">
        <iframe
          src="PASTE_MAP_EMBED_URL_HERE"
          width="100%"
          height="400"
          style={{ border: 0, display: "block" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Pacific Dermatology — 5924 Stoneridge Dr, Pleasanton CA"
        />
      </section>

      <CTASection />
    </main>
  );
}
```

- [ ] **Step 6: Verify build passes**

```bash
cd /Users/kanuj/pacific-dermatology && npm run build
```

Expected: Build completes with no TypeScript errors.

- [ ] **Step 7: Manual browser verification**

```bash
cd /Users/kanuj/pacific-dermatology && npm run dev
```

Open http://localhost:3000/contact. Verify:
- Hero section renders with gold label + serif heading
- Contact info block shows all four items with icons
- Form renders with navy inputs and gold submit button
- HIPAA disclaimer is visible below the form
- Google Maps iframe shows the correct location (not blank)
- Mobile layout stacks to single column cleanly

- [ ] **Step 8: Commit**

```bash
cd /Users/kanuj/pacific-dermatology && git add components/ContactForm.tsx app/contact/page.tsx && git commit -m "feat: add contact page with Formspree form, info block, and Maps embed"
```

---

## Chunk 3: GA4

### Task 4: Wire up Google Analytics 4

**Files:**
- Modify: `app/layout.tsx`
- Environment: `.env.local` (local, gitignored), Vercel project env vars

**Pre-requisite:** Create a GA4 property at analytics.google.com under an account owned by or shared with Dr. Fung's practice — not your personal account. Copy the Measurement ID (format: `G-XXXXXXXXXX`).

- [ ] **Step 1: Append `NEXT_PUBLIC_GA_ID` to `.env.local`**

```bash
echo 'NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX' >> /Users/kanuj/pacific-dermatology/.env.local
```

Replace `G-XXXXXXXXXX` with the actual Measurement ID. Use `>>` (append), not `>` (overwrite) — the file already contains `GITHUB_TOKEN` and `GEMINI_API_KEY`.

- [ ] **Step 2: Add env var to Vercel BEFORE deploying**

`NEXT_PUBLIC_` variables are inlined at build time. The env var must exist in Vercel before the build that uses it — not after.

```bash
cd /Users/kanuj/pacific-dermatology && npx vercel env add NEXT_PUBLIC_GA_ID production
```

Enter `G-XXXXXXXXXX` when prompted.

- [ ] **Step 3: Add GA4 Script tags to `app/layout.tsx`**

Add `import Script from "next/script"` to the imports. Place the `<Script>` tags **inside `<body>`** (required by Next.js App Router — they cannot be siblings of `<body>` inside `<html>`):

```tsx
import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import LenisProvider from "@/components/LenisProvider";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pacific Dermatology | Dr. Hank Fung — Pleasanton, CA",
  description:
    "Pacific Dermatology offers 20+ years of trusted full-service medical and cosmetic dermatology in Pleasanton, CA under Dr. Hank Fung. Book your appointment today.",
  keywords: [
    "dermatologist Pleasanton CA",
    "Dr Hank Fung dermatologist",
    "Pacific Dermatology Pleasanton",
    "skin cancer screening Pleasanton",
    "Botox Pleasanton",
    "cosmetic dermatology East Bay",
    "medical dermatology Pleasanton",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${montserrat.variable} font-sans antialiased bg-background text-foreground selection:bg-gold-500/30`}
      >
        <LenisProvider>
          <Header />
          {children}
          <Footer />
          <ChatWidget />
        </LenisProvider>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Verify build passes**

```bash
cd /Users/kanuj/pacific-dermatology && npm run build
```

Expected: Build completes. No TypeScript errors.

- [ ] **Step 5: Commit and push**

```bash
cd /Users/kanuj/pacific-dermatology && git add app/layout.tsx && git commit -m "feat: add GA4 tracking via NEXT_PUBLIC_GA_ID env var" && git push origin main
```

Expected: Vercel auto-deploys. After deploy, open the live site and confirm a visit appears in the GA4 Realtime dashboard (Analytics > Realtime).

---

## Post-Build Checklist

Before the pitch Zoom, verify every item:

- [ ] `/contact` nav link works from every page — desktop and mobile
- [ ] Contact form submits and Formspree sends a confirmation email to the configured address
- [ ] Google Maps iframe shows the correct location (not blank)
- [ ] New Patient Form link in mobile nav opens PDF in new tab
- [ ] Services page shows all treatments with no duplicate images
- [ ] GA4 Realtime shows live traffic after deploy
- [ ] `npm run build` passes cleanly one final time
- [ ] Update `"Call for current hours"` placeholder once Dr. Fung's staff confirms actual hours
