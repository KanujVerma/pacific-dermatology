# Image Density Redesign — Pacific Dermatology

**Date:** 2026-03-16
**Goal:** Eliminate the "template-y" feel caused by too little imagery. Add curated Unsplash photos to every sparse section so the site feels like a real, personal practice rather than a generic template.

---

## Problem

The homepage has very few images. The hero background is nearly invisible (20% opacity), the about section has one generic clinic photo, service cards are plain text on dark backgrounds, and the contact section is a flat cream block. The result feels like a demo template, not a living medical practice.

## Solution

Add imagery at 5 points across the homepage. No new routes, no layout changes — every existing section gets a photo or photo upgrade. One new section (stats interstitial) is added between services and reviews.

---

## Change 0: Allow Unsplash images in Next.js config (do this first)

**File:** `next.config.ts`

Add `images.remotePatterns` so Next.js `<Image>` can load from `images.unsplash.com`. Without this all Unsplash `<Image>` tags throw a runtime error.

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
```

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

The `<ClipReveal>` is the outermost element and receives the height class directly: `<ClipReveal className="h-80 md:h-[500px]">`. This ensures the CSS grid inside has a defined height from which to distribute `1fr` rows.

Inside `<ClipReveal>`, render a `<div>` with:
```
className="grid h-full gap-2"
style={{ gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr" }}
```

Each cell is a `<div className="relative overflow-hidden">` containing `<Image fill className="object-cover">`.

The large image cell gets `style={{ gridRow: "1 / 3" }}` and a subtle `<div className="absolute inset-0 bg-gradient-to-t from-navy-950/20 to-transparent" />` overlay.

---

## Change 3: Service Cards — Photo Backgrounds

**Files:** `components/ServiceCard.tsx`, `components/HorizontalScroll.tsx`, `app/page.tsx`

### 3a. Update `ServiceCard` props and render

Add optional `image?: string` to `ServiceCardProps`. When `image` is present:

- The root `<a>` tag must have `relative overflow-hidden h-48` added to its className (in addition to existing classes). `relative` is required for `<Image fill>` to be bounded; `h-48` gives the card an explicit height.
- Render `<Image fill className="object-cover" src={image} alt="" />` as the first child (behind everything else)
- Render `<div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/60 to-navy-950/20" />` overlay
- Wrap the text content in `<div className="relative flex flex-col justify-end h-full">` so title/description anchor to the bottom

When `image` is absent, render exactly as before (no height, no image, no overlay).

Since `<Image>` from `next/image` is used, add `import Image from "next/image"` to `ServiceCard.tsx`. No `"use client"` needed — `<Image>` works in server components.

### 3b. Update `HorizontalScroll` to thread `image` through

In `HorizontalScroll.tsx`:
1. Add `image?: string` to the `ServiceItem` interface
2. Update **both** `<ServiceCard>` render call sites to pass `image={card.image}`:
   - The desktop horizontal-scroll render path (inside the `motion.div` row)
   - The mobile fallback vertical grid render path (inside `md:hidden` section)

   Both calls become:
   ```tsx
   <ServiceCard title={card.title} description={card.desc} image={card.image} />
   ```

### 3c. Pass image URLs in `app/page.tsx`

Add `image` to each card object in the `medicalCards` and `cosmeticCards` arrays:

| Service | Unsplash photo ID |
|---|---|
| Acne Treatment | `photo-1570172619644-dfd03ed5d881` |
| Skin Cancer Screening | `photo-1579165466741-7f35e4755660` |
| Eczema & Psoriasis | `photo-1576671081837-49000212a370` |
| Mole Removal | `photo-1584467735867-4297ae2ebcee` |
| Botox & Dysport | `photo-1616394584738-fc6e612e71b9` |
| Dermal Fillers | `photo-1512290923902-8a9f81dc236c` |
| Laser Treatments | `photo-1527613426441-4da17471b66d` |
| Chemical Peels | `photo-1487412947147-5cebf100ffc2` |

Full URL format: `https://images.unsplash.com/{photo-id}?w=600&q=80`

---

## Change 4: Stats Interstitial — New Section

**File to create:** `components/StatsSection.tsx`
**File to modify:** `app/page.tsx` (add `<StatsSection />` between `<HorizontalScroll />` and `<ReviewCarousel />`)

`StatsSection` is a `"use client"` component. Required imports at the top of the file:

```tsx
"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import CountUp from "@/components/CountUp";
import AnimateIn from "@/components/AnimateIn";
```

### Layout

Full-bleed background photo with a `<motion.div>` parallax wrapper, dark overlay, and 3 stats in a centered flex row separated by 1px vertical dividers.

```
Background: https://images.unsplash.com/photo-1516549655669-df64a4db0cdd?w=1600&q=80
```

### Parallax

```tsx
const sectionRef = useRef<HTMLElement>(null);
const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
```

The parallax `y` value is applied to a `<motion.div className="absolute inset-0" style={{ y: bgY }}>` that wraps the `<Image fill>` — **not** to the `<Image>` tag directly (Next.js `<Image>` does not accept Framer Motion `style` props).

```tsx
<section ref={sectionRef} className="relative overflow-hidden py-24 min-h-[240px]">
  <motion.div className="absolute inset-x-0 -top-[15%] -bottom-[15%]" style={{ y: bgY }}>
    <Image src="https://images.unsplash.com/photo-1516549655669-df64a4db0cdd?w=1600&q=80" alt="" fill className="object-cover" />
  </motion.div>
  <div className="absolute inset-0" style={{ backgroundColor: "rgba(12,20,32,0.78)" }} />
  {/* stats content */}
</section>
```

### Stats

Three stats in a `<div className="relative flex items-center justify-center gap-0">` with `<div className="w-px h-12 bg-navy-700">` dividers between them. Each stat is a `<div className="text-center px-12 md:px-20">`.

**Correct prop name:** `CountUp` uses `to` (not `end`). `CountUp` uses integer stepping and does not add comma separators, so use compact forms:

```tsx
<CountUp to={20} suffix="+" />   // renders "20+"
<CountUp to={5} suffix="K+" />   // renders "5K+" (not 5000+)
```

**Important:** `4.9 ★` cannot use `CountUp` (integer stepping snaps to 5). Render as static JSX:
```tsx
<p className="text-4xl md:text-5xl font-serif text-gold-400">4.9 <span className="text-2xl">★</span></p>
```

Wrap each stat number in `<AnimateIn>` for scroll entrance.

Labels: `<p className="text-cream-400 text-xs tracking-[0.2em] uppercase mt-2 font-sans">Years of Care</p>` etc.

---

## Change 5: Contact Section — Image Background

**File:** `app/page.tsx` (contact section)

Change the contact `<section>` className from `py-24 bg-cream-100` to `py-24 relative overflow-hidden`.

Add two absolute layers as the first children of the section (before the existing `<div className="max-w-7xl...">`):

```tsx
<Image
  src="https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=1600&q=80"
  alt=""
  fill
  className="object-cover"
/>
<div className="absolute inset-0 bg-cream-100/90" />
```

Add `import Image from "next/image"` if not already present. The `relative overflow-hidden` on the section bounds the `fill` image. The `bg-cream-100/90` overlay preserves the cream aesthetic while allowing the texture to show through.

---

## Architecture Notes

- **Do Change 0 first** — all other changes depend on Unsplash images loading without error
- All new `<Image fill>` usages are inside `relative overflow-hidden` containers
- `ServiceCard` root `<a>` gets `relative overflow-hidden h-48` only when `image` prop is present (conditional className)
- `StatsSection` parallax uses `<motion.div>` wrapper around `<Image>`, not `style` on `<Image>` directly
- `CountUp` prop is `to: number`, not `end` — verify before use
- `4.9 ★` stat is rendered as static JSX, not via `CountUp`
- No new npm dependencies required
- Build must pass after each change

---

## Out of Scope

- Services page (`app/services/page.tsx`) — not changing in this pass
- Header / Footer — not changing
- Any animation or layout changes beyond what's described above
- AI image generation (free-tier Gemini cannot generate images; using curated Unsplash)
