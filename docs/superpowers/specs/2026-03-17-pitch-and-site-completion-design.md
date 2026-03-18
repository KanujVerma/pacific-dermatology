# Pacific Dermatology — Site Completion + Pitch Strategy
**Date:** 2026-03-17
**Goal:** Complete the new site so it's pitch-ready, then land Dr. Fung as a paying client.

---

## Context

A luxury redesign of Dr. Hank Fung's dermatology website has been built at `https://pacific-dermatology-g5jw.vercel.app/`. His current site (`pacific-dermatology.com`) is a basic Brizy-built site. The new site is dramatically better visually but is missing pages and content that his current site has. Before pitching, the new site must feel complete.

The developer is a former patient of Dr. Fung, which provides a warm, personal angle for outreach.

---

## Part 1: What to Build

### 1.1 Contact Page (`/contact`)

A new page matching the existing dark navy luxury aesthetic.

**Sections:**
- Page hero: "Get In Touch" heading with gold accent label
- Two-column layout:
  - Left: address (5924 Stoneridge Dr STE 101, Pleasanton, CA 94588), phone (925-426-8828), email (pacificdermatology@yahoo.com), office hours (confirm with staff before launch)
  - Right: contact form — Name, Phone, Email, Message fields + Submit button styled in gold
- Google Maps embed: iframe centered on the Stoneridge Dr address
- Reuse existing `CTASection` or footer pattern for consistency

**Nav:** Already has a Contact link — this page just needs to exist.

### 1.2 Services Page Expansion

The current services page shows 8 cards (4 medical, 4 cosmetic). Dr. Fung's actual site lists 20+ treatments. Add the missing ones.

**Missing Medical treatments to add:**
Atypical Nevi, Seborrheic Dermatitis, Hair Loss, Warts, Cysts, Skin Infections, Skin Growths

**Missing Cosmetic treatments to add:**
Daxxify, Sculptra, Radiesse, Kybella, Sclerotherapy, Threads, IPL, Fractional Laser, Hair Removal, Smoothbeam, Skincare Products

**Implementation:** Add a "Full Treatment List" section below the existing horizontal scroll — a clean two-column grid organized by Medical vs Cosmetic category. Simple text-based list with gold dividers, no images needed (keeps build time low).

### 1.3 Patient Form Link

Dr. Fung's current site has a "New Patient Form" PDF download. Add this to:
- Nav bar: a text link "New Patient Form" alongside "Book Now"
- Footer: wire up the existing footer reference

**Note:** Use his existing PDF URL from `pacific-dermatology.com` until he provides a new one.

---

## Part 2: What NOT to Build Before the Pitch

These are Phase 2 items — pitch them as part of the ongoing retainer:
- **Online booking integration** — needs his scheduling system details
- **Before/after gallery** — needs actual patient photos from the practice
- **Individual service detail pages** — high SEO value, 3–4 hours each, ~15–20 pages total
- **Blog/content** — ongoing monthly work, retainer justification

---

## Part 3: Pricing

| Item | Amount |
|---|---|
| One-time build fee | $2,500 |
| Monthly retainer | $250/mo |
| Minimum commitment | 3 months, then month-to-month |
| **Year 1 total** | **$5,500** |
| **Year 2+ annually** | **$3,000** |

**Retainer includes:**
- Hosting (Vercel — effectively free at this traffic level)
- Unlimited minor content/photo updates
- Monthly performance report (visitors, traffic sources, top pages)
- Google Business Profile maintenance
- Same-day response if anything breaks
- Phase 2 roadmap execution (service pages, booking, gallery)

**Market anchor for the pitch:**
- Dermatology-specialized agencies: $8,000–$15,000 build + $1,000–$2,500/month
- Generalist freelancer market rate: $4,000–$8,000 build + $200–$500/month
- This offer: $2,500 + $250/mo — well below market, justified by the personal connection

---

## Part 4: Pitch Playbook

### The Call (goal: book a 20-min Zoom)

> "Hi, is this Dr. Fung? This is [name] — I was actually a patient of yours a few years back. I'm now a web developer and I built a redesign of your website as a project. I'd love to show it to you on a quick Zoom — maybe 20 minutes. No pitch, just want your feedback. Would [day] work?"

Key principles:
- Mention being a former patient — personal, not cold
- Say "feedback" not "sales call" — lowers resistance
- Keep it under 60 seconds, don't explain the site on the phone

### The Zoom (20 minutes)

1. **Open with his current site** — pull it up silently, say nothing negative
2. **Switch to the new site** — let the visual do the work: *"This is what I built."*
3. **Walk through three things:** about section with his real photo, services page, contact page
4. **Drop the price anchor:** *"Agencies that specialize in dermatology charge $10–15k to build something like this, then $1,000+ a month to maintain it. I'm proposing $2,500 to get started and $250 a month — I handle everything, you never think about your website again."*
5. **Close:** *"If you want to move forward I can have it live under your domain within a week."*

### Handling Objections

| Objection | Response |
|---|---|
| "I already have a website" | "I know — that's actually why I built this. I wanted to show you what it could look like." |
| "I don't really get many patients from my website" | "That's partly because it's hard to find and doesn't show up well in Google. This one is built to change that." |
| "Can I think about it?" | "Of course. I can send you the link so you can show your staff. What's your email?" |
| "That seems expensive" | "To put it in context — one new cosmetic patient covers six months of the retainer. And agencies charge four times this." |

### What Closes the Deal

The visual gap between his current site and the new one is the closer. The verbal pitch just needs to not get in the way. Show, don't sell.

---

## Part 5: Phase 2 Roadmap (retainer justification)

Present this during the Zoom as "what we build together over the first few months":

- **Month 1:** Go live, migrate domain, set up Google Analytics
- **Month 2:** Individual service detail pages (SEO — patients searching "Kybella Pleasanton", "Daxxify Pleasanton")
- **Month 3:** Online booking integration, before/after gallery
- **Ongoing:** Monthly performance reports, content updates, Google Business management

This gives Dr. Fung a sense of forward momentum — he's not just buying a static site, he's getting a partner who keeps improving it.
