# Image Density Redesign — Pacific Dermatology

**Date:** 2026-03-16
**Goal:** Eliminate the "template-y" feel caused by too little imagery. Add curated Unsplash photos to every sparse section so the site feels like a real, personal practice rather than a generic template.

---

## Problem

The homepage has very few images. The hero background is nearly invisible (20% opacity), the about section has one generic clinic photo, service cards are plain text on dark backgrounds, and the contact section is a flat cream block. The result feels like a demo template, not a living medical practice.

## Solution

Add imagery at 5 points across the homepage. No new routes, no layout changes — every existing section gets a photo or photo upgrade. One new section (stats interstitial) is added between services and reviews.

---

## Change 1: Hero Background Opacity

**File:** `components/HeroSection.tsx`

- Change `className="object-cover opacity-20"` → `opacity-40` on the hero `<Image>`
- The text legibility remains fine because the navy gradient overlay (`opacity-90`) stays in place
- Effect: The background clinical photo becomes actually visible, grounding the hero in a real space

---

## Change 2: About Section — Bento Image Grid

**File:** `app/page.tsx` (about section)

Replace the single `<ClipReveal>` image column with a 2-column CSS grid containing 3 photos:

```
┌──────────┬──────────┐
│          │  small 1 │  ← row 1
│  large   ├──────────┤
│          │  small 2 │  ← row 2
└──────────┴──────────┘
```

- **Large (spans 2 rows):** Modern clinic interior — `https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80`
- **Small top:** Skincare / cosmetic treatment close-up — `https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=600&q=80`
- **Small bottom:** Dermatologist at work — `https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80`

All three wrapped in a single `<ClipReveal>` so they reveal together on scroll.

Grid CSS: `grid-template-columns: 1fr 1fr`, `grid-template-rows: 1fr 1fr`, height `h-80 md:h-[500px]`. Large image: `row-span-2`.

Each image uses Next.js `<Image fill>` inside a `relative overflow-hidden` wrapper. The large image gets a subtle `bg-gradient-to-t from-navy-950/20` overlay.

---

## Change 3: Service Cards — Photo Backgrounds

**Files:** `components/ServiceCard.tsx`, `components/HorizontalScroll.tsx`

Update `ServiceCard` to accept an optional `image` prop (Unsplash URL string). When present, render the card with:
- Full-bleed background image via `<Image fill className="object-cover">`
- `bg-gradient-to-t from-navy-950/95 via-navy-950/60 to-navy-950/20` overlay for text legibility
- Text anchored to bottom with `flex flex-col justify-end`
- Minimum card height: `h-48` (currently no explicit height)

When `image` is absent, the card renders exactly as before (backward compatible).

### Image assignments

| Service | Unsplash URL |
|---|---|
| Acne Treatment | `photo-1570172619644-dfd03ed5d881` |
| Skin Cancer Screening | `photo-1579165466741-7f35e4755660` |
| Eczema & Psoriasis | `photo-1576671081837-49000212a370` |
| Mole Removal | `photo-1584467735867-4297ae2ebcee` |
| Botox & Dysport | `photo-1616394584738-fc6e612e71b9` |
| Dermal Fillers | `photo-1512290923902-8a9f81dc236c` |
| Laser Treatments | `photo-1527613426441-4da17471b66d` |
| Chemical Peels | `photo-1487412947147-5cebf100ffc2` |

Full URLs: `https://images.unsplash.com/{photo-id}?w=600&q=80`

Pass `image` prop to each card in `app/page.tsx` via `HorizontalScroll`'s `medicalCards` / `cosmeticCards` arrays. Add `image` field to the `ServiceItem` interface in `HorizontalScroll.tsx`.

---

## Change 4: Stats Interstitial — New Section

**File:** `app/page.tsx`

Add a new `<StatsSection />` client component between `<HorizontalScroll />` and `<ReviewCarousel />`.

**File to create:** `components/StatsSection.tsx`

Layout: full-bleed background photo, dark overlay (`rgba(12,20,32,0.78)`), three stats centered horizontally with vertical dividers.

```
Background: https://images.unsplash.com/photo-1516549655669-df64a4db0cdd?w=1600&q=80
```

Stats (3 columns, separated by 1px vertical dividers):
- `20+` / Years of Care
- `5,000+` / Patients Served
- `4.9 ★` / Average Patient Rating

Animation: Each stat uses `CountUp` (already exists) triggered by `useInView`. The background image has a subtle `useScroll` parallax (`y: 0% → 15%`) matching the hero pattern.

Section height: `py-24` with `min-h-[240px]`.

---

## Change 5: Contact Section — Image Background

**File:** `app/page.tsx` (contact section)

Add a background image to the existing contact `<section>` using a Next.js `<Image fill>` with `object-cover` and high opacity overlay:

```
Image: https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=1600&q=80
Overlay: bg-cream-100/90 (keeps the cream aesthetic, lets texture show through)
```

Change `<section className="py-24 bg-cream-100">` to `<section className="py-24 bg-cream-100 relative overflow-hidden">` and add the image + overlay as absolute layers behind existing content.

---

## Architecture Notes

- All new images are `next/image` `<Image fill>` inside `relative overflow-hidden` containers — no layout shift, no CLS
- Unsplash URLs use `?w=NNN&q=80` sizing — appropriate per context (hero: 1600w, cards: 600w, etc.)
- `ServiceCard` change is backward compatible — `image` prop is optional
- `StatsSection` is a new `"use client"` component; it imports `CountUp` and `AnimateIn` (both already exist)
- No new dependencies required
- Build must pass after each chunk

---

## Out of Scope

- Services page (`app/services/page.tsx`) — not changing in this pass
- Header / Footer — not changing
- Any animation or layout changes beyond what's described above
- AI image generation (free-tier Gemini cannot generate images; using curated Unsplash)
