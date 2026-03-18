# Pacific Dermatology — Site Completion + Pitch Strategy
**Date:** 2026-03-17
**Goal:** Complete the new site so it's pitch-ready, then land Dr. Fung as a paying client.

---

## Context

A luxury redesign of Dr. Hank Fung's dermatology website has been built at `https://pacific-dermatology-g5jw.vercel.app/`. His current site (`pacific-dermatology.com`) is a basic Brizy-built site. The new site is dramatically better visually but is missing a contact page and a small number of treatments. Before pitching, the new site must feel complete.

The developer is a former patient of Dr. Fung, which provides a warm, personal angle for outreach.

---

## Part 1: What to Build

### 1.1 Contact Page (`/contact`)

A new page matching the existing dark navy luxury aesthetic.

**Sections:**
- Page hero: gold label "Contact" + heading "Get In Touch"
- Two-column layout:
  - Left column: address (5924 Stoneridge Dr STE 101, Pleasanton, CA 94588), phone (925-426-8828), email (pacificdermatology@yahoo.com), office hours. Use "Call for current hours" as placeholder — **developer obtains actual hours from Dr. Fung's staff before DNS cutover.** This is a go-live blocker.
  - Right column: contact form with Name, Phone, Email, Message fields + gold Submit button. Form submits via **Formspree** (free tier). The developer creates a Formspree account, creates a new form, and hardcodes the endpoint URL (format: `https://formspree.io/f/XXXXXXXX`) directly in the component. Include a visible disclaimer: *"This form is for general inquiries only. Do not submit personal health information or urgent medical concerns — call the office directly."*
- Google Maps embed using a plain `<iframe>` (no API key required) centered on the Stoneridge Dr address.

**Nav update required:** Both mobile and desktop nav currently link Contact to `/#contact` (a homepage anchor). Update both instances in `Header.tsx` to `/contact`.

### 1.2 Services Page — Missing Treatments

The services page already has 16 cards (8 medical, 8 cosmetic). Cross-referencing against Dr. Fung's current site, the following are genuinely missing:

**Medical (add as new cards):**
- Atypical Nevi — evaluation and monitoring of unusual moles
- Seborrheic Dermatitis — treatment of dandruff and scalp/facial flaking
- Cysts — diagnosis and removal of epidermal and pilar cysts
- Skin Infections — bacterial, fungal, and viral skin infections
- Skin Growths — benign growth removal (skin tags, seborrheic keratoses, dermatofibromas)

**Cosmetic (add as new cards):**
- Daxxify — longer-lasting neuromodulator alternative to Botox/Dysport
- Sculptra — collagen-stimulating filler for gradual, natural volume restoration
- Radiesse — calcium hydroxylapatite filler for hands and deep facial folds
- Threads — PDO thread lifts for non-surgical facial contouring
- Laser Hair Removal — permanent hair reduction with multiple laser modalities
- Smoothbeam — laser treatment targeting acne and acne scars

**Already built — do not duplicate:** Wart & Molluscum Removal, Nail & Hair Disorders (covers Hair Loss), Sclerotherapy, IPL / Photofacial, Laser Skin Resurfacing, Kybella.

**Implementation:** Append the new cards to the existing `medicalServices` and `cosmeticServices` arrays in `services/page.tsx`. The grid layout handles them automatically.

### 1.3 Nav — New Patient Form Link

The footer and CTASection already link to the patient form PDF. The nav does not. Add a "New Patient Form" text link to `Header.tsx` in both the desktop nav and the mobile menu, linking to:
`https://cloud-1de12d.becdn.net/customfile/2964d845db7b1468ce2e15a75719319187a8caef175da6f482760209006fadc3/pacderm---NEW-PT-INFO-combined.pdf`

### 1.4 Pre-Launch: Google Analytics

Set up Google Analytics (GA4) before the pitch so performance data begins accumulating from day one. Add the GA4 tracking snippet to `app/layout.tsx` using a `NEXT_PUBLIC_GA_ID` environment variable. Configure the Vercel project with this env var.

**Account ownership:** Create the GA4 property under a dedicated Google account for the practice (e.g., a Gmail created for this purpose), not the developer's personal account. Share the property with the developer. This ensures Dr. Fung retains access if the relationship ends.

This is required because the retainer promises a monthly performance report — reports need data from day one.

**Vercel plan note:** The current deployment is on Vercel's free Hobby plan. Custom domains are supported on Hobby — no upgrade needed for a single custom domain.

---

## Part 2: What NOT to Build Before the Pitch

These are Phase 2 items — pitch them as part of the ongoing retainer:
- **Online booking integration** — needs his scheduling system details
- **Before/after gallery** — needs actual patient photos from the practice
- **Individual service detail pages** — high SEO value (~15–20 pages), propose as Month 2 retainer work
- **Blog/content** — ongoing monthly work, retainer justification

---

## Part 3: Pricing

| Item | Amount |
|---|---|
| One-time build fee | $2,500 |
| Monthly retainer | $250/mo |
| Minimum commitment | 3 months, then month-to-month |
| **Year 1 total (projected, full 12 months)** | **$5,500** |
| **Year 2+ (retainer only)** | **$3,000/yr** |

**Retainer includes:**
- Hosting (Vercel free tier covers this site's traffic)
- Unlimited minor content and photo updates
- Monthly performance report (visitors, traffic sources, top pages via Google Analytics)
- Google Business Profile maintenance
- Same-day response if anything breaks
- Phase 2 roadmap execution (service detail pages, booking, gallery)

**Market anchor:**
- Dermatology-specialized agencies: $8,000–$15,000 build + $1,000–$2,500/month
- Generalist freelancer market rate: $4,000–$8,000 build + $200–$500/month
- This offer: $2,500 + $250/mo — well below market, justified by the personal connection

*Note for pitch delivery: when speaking, anchor agency rates at "$10–15k" (the upper-mid range) to anchor high without overstating.*

---

## Part 4: Pitch Playbook

### The Call (goal: book a 20-min Zoom)

> "Hi, is this Dr. Fung? This is [name] — I was actually a patient of yours a few years back. I'm now a web developer and I built a redesign of your website as a project. I'd love to show it to you on a quick Zoom — maybe 20 minutes. No obligation, I'd just love your feedback. Would [day] work?"

Key principles:
- Mention being a former patient — personal, not cold
- "No obligation, I'd love your feedback" — lowers resistance, doesn't promise "no pitch"
- Keep it under 60 seconds, don't explain the site on the phone

### The Zoom (20 minutes)

1. **Open with his current site** — pull it up, say nothing negative, let him see it
2. **Switch to the new site** — let the visual do the work: *"This is what I built."*
3. **Walk through three things:** about section with his real photo, services page, contact page
4. **Check in:** *"Does this feel like it represents your practice?"* — pause, let him respond. Only proceed to pricing if he's engaged.
5. **Bridge to pricing:** *"I'll be upfront — I do have a proposal if you like what you see. Agencies that specialize in dermatology charge $10–15k to build something like this, then $1,000+ a month. I'm proposing $2,500 to get started and $250 a month. I handle everything — you never think about your website again."*
6. **Show Phase 2 roadmap:** *"In the first few months we'd add individual pages for each treatment — that's what gets you showing up when someone Googles 'Kybella Pleasanton' or 'Daxxify Pleasanton.'"*
7. **Close:** *"If you want to move forward I can have it live under your domain within a week — just need DNS access on your end, which takes about five minutes."*

### Handling Objections

| Objection | Response |
|---|---|
| "I already have a website" | "I know — that's actually why I built this. I wanted to show you what it could look like." |
| "I don't really get many patients from my website" | "That's partly because it's hard to find in Google search. This one is built to change that, especially once we add individual pages for each treatment." |
| "Can I think about it?" | "Of course. I can send you the link so you can show your staff. What's your email?" Then: send the link same day with a brief note. Follow up by phone in 3 business days if no response. |
| "That seems expensive" | "To put it in context — a single Kybella or Sculptra patient covers several months of the retainer. And agencies charge four times this for the same result." |

*Note on "expensive" objection: cite high-ticket cosmetic treatments (Kybella ~$1,200–$1,800, Sculptra ~$1,500–$3,000) when making the one-patient comparison. Don't use Botox as the example — a single Botox session (~$300–$600) only covers 1–2 months.*

### What Closes the Deal

The visual gap between his current site and the new one is the closer. The verbal pitch just needs to not get in the way. Show, don't sell.

---

## Part 5: Phase 2 Roadmap (retainer justification)

Present during the Zoom as "what we build together in the first few months":

- **Week 1:** Go live — domain migration (DNS cutover from `pacific-dermatology.com` to the new site), Google Analytics confirmed active
- **Month 2:** Individual service detail pages (SEO — one page per treatment, targeting local search terms like "Kybella Pleasanton", "Daxxify Pleasanton")
- **Month 3:** Online booking integration, before/after gallery
- **Ongoing:** Monthly performance reports, content updates, Google Business management

*Domain migration is a Week 1 deliverable, not a Phase 2 deferral — the pitch close promise ("live under your domain within a week") depends on it.*
