# Pacific Dermatology — Luxury Experience Design Spec

**Date:** 2026-03-17
**Goal:** Transform the site into an immersive luxury premium experience inspired by Tidescape, using Lenis smooth scroll + Framer Motion. Maintains clinical trust while delivering a high-end interactive feel comparable to top-tier cosmetic brand sites.

---

## Architecture

**New dependencies:**
- `lenis` — smooth scroll momentum library (~7KB). Wraps the entire app via a `LenisProvider` client component inserted into `app/layout.tsx`.
- No other new packages. All animation via existing Framer Motion.

**New components:**
- `components/LenisProvider.tsx` — global smooth scroll provider
- `components/SplitHeading.tsx` — word-by-word clip-mask reveal for headings
- `components/Marquee.tsx` — infinite horizontal scroll strip with pause-on-hover and edge fade gradients
- `components/HorizontalScroll.tsx` — pinned horizontal scroll section for service cards (desktop only, vertical fallback on mobile)
- `components/MagneticButton.tsx` — wrapper that shifts toward cursor on approach
- `components/ReviewCarousel.tsx` — auto-scrolling infinite review carousel with decorative quote mark

**Modified files:**
- `app/layout.tsx` — add `<LenisProvider>`
- `app/page.tsx` — integrate all new components, replace trust bar, add scroll-linked hero parallax, clip-path about reveal, horizontal services scroll, review carousel, magnetic CTA, ambient watermark text
- `app/globals.css` — add `.marquee-fade` edge gradient utility

---

## Section Specs

### 1. Global Smooth Scroll — `LenisProvider`

- Instantiate Lenis with `{ lerp: 0.1, smoothWheel: true }`
- Use `requestAnimationFrame` loop to call `lenis.raf(time)`
- Sync with Framer Motion: pass `lenis.scrollTo` via context or direct call
- Render `{children}` — transparent wrapper, no DOM output

### 2. Hero — Parallax + Split Text + Scroll Indicator

**Parallax:**
- Use Framer Motion `useScroll` + `useTransform` to bind hero background `y` to scroll: `[0, heroHeight] → ["0%", "30%"]`
- Hero text `y`: `[0, heroHeight] → ["0%", "-10%"]` — text rises slightly slower than background, creating depth

**Split heading (`SplitHeading`):**
- Split `children` string by spaces into word spans
- Each word wrapped in an outer `overflow-hidden` div (clip mask)
- Inner span animates `y: 40 → 0, opacity: 0 → 1` with stagger `0.08s` per word, triggered by `useInView`
- Easing: `[0.22, 1, 0.36, 1]` (snappy decelerate)

**Scroll indicator:**
- Fixed to bottom-center of hero section
- Animated thin vertical line (2px wide, 40px tall) with a pulsing `scaleY` loop animation
- Label "SCROLL" in 9px tracking-widest uppercase
- Fades out via `useScroll` when page scrolls past 5vh

### 3. Marquee — `Marquee`

- Accepts `items: string[]` and `speed?: number` (default 40s loop duration)
- Renders two identical sets of items side-by-side (seamless loop via CSS `animation: marquee linear infinite`)
- Items separated by `◆` gold diamond character with `mx-6` spacing
- `pause-on-hover`: `animation-play-state: paused` on wrapper `:hover`
- Left/right fade: `::before` and `::after` pseudo-elements with `background: linear-gradient(to right, var(--gold-500), transparent)` and `to left` respectively, `w-24`, `pointer-events-none`, `absolute`
- Replaces current static trust bar grid entirely

Trust signal strings:
```
["20+ Years of Trusted Care", "Board-Certified Dermatologist", "Patient-Centered Environment", "Full-Service Medical Care", "Pleasanton, CA", "Dr. Hank Fung"]
```

### 4. About Section — Clip-Path Reveal + Text Stagger

**Image reveal:**
- Wrap `<Image>` in a `motion.div` with `clipPath: "inset(100% 0 0 0)"` → `"inset(0% 0 0 0)"` triggered by `useInView`
- Duration: 0.9s, ease: `[0.76, 0, 0.24, 1]` (sharp ease-in-out — cinematic curtain feel)

**Text stagger:**
- Replace single `<AnimateIn direction="right">` with individual `<AnimateIn>` wrappers per element (label, h2, p1, p2, CTA link) each with incrementing `delay` (0, 0.1, 0.2, 0.3, 0.4)

### 5. Services — Horizontal Scroll — `HorizontalScroll`

**Desktop (md+):**
- Outer wrapper: `position: sticky, top: 0, height: 100vh, overflow: hidden`
- Parent container tall enough to create scroll distance: `height: (numCards * cardWidth)px`
- Use Framer Motion `useScroll({ target: containerRef })` + `useTransform(scrollYProgress, [0,1], ["0%", "-75%"])` applied to inner cards flex row `x` position
- Section heading (`MEDICAL DERMATOLOGY` / `COSMETIC DERMATOLOGY`) pinned at top-left in large `text-[10vw]` gold serif, fades `opacity: 1 → 0.1` as scroll progresses past 50%

**Mobile (< md):**
- Normal vertical grid, no horizontal scroll — standard `AnimateIn` stagger

**Card entrance:**
- Each card `x: 60 → 0, opacity: 0 → 1` triggered individually as it enters the horizontal viewport

### 6. Reviews — `ReviewCarousel`

- Two rows of review card duplicates (set A + set B), scrolling at different speeds and opposite directions (row 1: left, row 2: right) for a layered depth effect
- Each row uses CSS `animation: marquee` with `animation-duration: 25s` (row 1) and `32s` (row 2)
- Pause all on hover of the section container
- Large `"` decorative quote: `position: absolute`, `font-size: 20vw`, `opacity: 0.04`, `color: gold-500`, `top: 0`, `left: 8px`, `font-family: serif`, `pointer-events: none`
- Cards: wider (`min-width: 380px`), more whitespace, star rating row (5 filled gold stars), author name bold + location muted below

### 7. CTA — Magnetic Button + Ambient Text + Background Shift

**Magnetic button (`MagneticButton`):**
- `onMouseMove`: calculate cursor offset from button center → apply `x/y` transform up to `±12px` using spring physics (`stiffness: 200, damping: 20`)
- `onMouseLeave`: spring back to `x: 0, y: 0`
- Wrap existing gold CTA `<a>` tags — no style changes, just movement

**Background color shift:**
- Use Framer Motion `useScroll` on the CTA section ref + `useTransform` to interpolate background from `#f6f3e9` (cream-200) to `#1c2331` (navy-950) as section scrolls into view
- Text colors invert accordingly (navy → cream) driven by the same scroll progress value

**Ambient watermark:**
- `PACIFIC DERMATOLOGY` in Playfair Display, `text-[12vw]`, `opacity-[0.04]`, `whitespace-nowrap`, `absolute`, centered behind CTA content
- `pointer-events-none`, `select-none`, `text-cream-50` (visible on navy bg)

---

## Constraints

- All horizontal scroll sections must degrade to vertical on mobile — no horizontal scroll on touch devices
- Lenis must not interfere with the existing `Header` scroll-based behavior
- All `"use client"` components import cleanly into server `app/page.tsx`
- Build must pass `npm run build` with zero TypeScript errors
