# Pacific Dermatology — Luxury Experience Design Spec

**Date:** 2026-03-17
**Goal:** Transform the site into an immersive luxury premium experience inspired by Tidescape, using Lenis smooth scroll + Framer Motion. Maintains clinical trust while delivering a high-end interactive feel comparable to top-tier cosmetic brand sites.

---

## Architecture

**New dependencies:**
- `lenis@^1.3.18` — smooth scroll momentum library. Install: `npm install lenis@^1.3.18`

**New components (ALL require `"use client"` directive):**
- `components/LenisProvider.tsx` — global smooth scroll provider
- `components/HeroSection.tsx` — extracts hero parallax + SplitHeading + scroll indicator into a client component (required because `useScroll`, `useTransform`, `useInView` cannot be used in server components)
- `components/SplitHeading.tsx` — word-by-word clip-mask reveal for headings
- `components/Marquee.tsx` — infinite horizontal scroll strip
- `components/HorizontalScroll.tsx` — pinned horizontal scroll for service cards
- `components/MagneticButton.tsx` — cursor-attracted button wrapper
- `components/ReviewCarousel.tsx` — auto-scrolling infinite review carousel

**Modified files:**
- `app/layout.tsx` — add `<LenisProvider>`, remove `scroll-smooth` from `<html>` className (conflicts with Lenis)
- `app/page.tsx` — replace hero JSX with `<HeroSection>`, replace trust bar with `<Marquee>`, update about section, replace services grid with `<HorizontalScroll>`, replace reviews section with `<ReviewCarousel>`, update CTA with `<MagneticButton>` and scroll-linked background
- `app/globals.css` — no changes needed (marquee edge fades handled with Tailwind)

---

## Section Specs

### 1. LenisProvider — `components/LenisProvider.tsx`

```
"use client"
```

- `import 'lenis/dist/lenis.css'` — required to prevent overflow flash during hydration
- Instantiate: `new Lenis({ autoRaf: true, lerp: 0.1, smoothWheel: true })`
  - `autoRaf: true` eliminates the manual `requestAnimationFrame` loop (use this, not the old `lenis.raf(time)` pattern)
- No explicit Framer Motion sync needed: Framer Motion's `useScroll` reads from `window.scrollY` which Lenis updates natively in window scroll mode
- Add to `app/layout.tsx`: wrap `{children}` with `<LenisProvider>`
- Remove `scroll-smooth` from `<html className="...">` in `app/layout.tsx` — Lenis handles scroll smoothing; CSS `scroll-behavior: smooth` double-smooths and causes jitter

### 2. HeroSection — `components/HeroSection.tsx`

Extracts all hero interactivity into a single `"use client"` component. `app/page.tsx` replaces the entire hero `<section>` with `<HeroSection />`.

**Parallax:**
- `const { scrollYProgress } = useScroll()` (window scroll)
- `bgY = useTransform(scrollYProgress, [0, 0.4], ["0%", "30%"])` applied to hero `<Image>` wrapper `motion.div`
- `textY = useTransform(scrollYProgress, [0, 0.4], ["0%", "-10%"])` applied to text content `motion.div`

**SplitHeading integration:**
- Replace the `<AnimateIn delay={0.1}>` wrapper around `<h1>` with `<SplitHeading>` directly — do NOT keep both, as they will double-animate
- Other content inside the hero (subtext, CTAs) keeps its `AnimateIn` wrappers

**Scroll indicator:**
- `position: absolute` (not `fixed`) at `bottom-8 left-1/2 -translate-x-1/2` within the hero `<section>`
- Thin 2px × 40px vertical `motion.div` with `scaleY` looping animation (`keyframes: [0.3, 1, 0.3]`, duration 1.5s, repeat Infinity)
- `SCROLL` label in 9px tracking-widest uppercase above line
- `opacity = useTransform(scrollYProgress, [0, 0.08], [1, 0])` fades out after scrolling ~8vh

### 3. SplitHeading — `components/SplitHeading.tsx`

```
"use client"
```

Props: `children: string`, `className?: string`, `as?: "h1" | "h2" | "h3"` (default `"h1"`)

- Container element (`as` prop) gets `aria-label={children}` for screen readers
- Split `children` by `" "` into word array
- Each word: outer `<span style={{ display: "inline-block", overflow: "hidden" }}>`  (clip mask), inner `<motion.span>` with `aria-hidden="true"`
- Inner span: `initial={{ y: 40, opacity: 0 }}`, `animate={{ y: 0, opacity: 1 }}` triggered by `useInView` on container ref (`once: true, margin: "-60px"`)
- Stagger: `transition={{ delay: index * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}`
- Words separated by `" "` space spans between clip divs

### 4. Marquee — `components/Marquee.tsx`

```
"use client"
```

Props: `items: string[]`, `duration?: number` (default `40`, in seconds)

- Renders a `<div>` with `overflow: hidden`, `position: relative`
- Left/right edge fades: two absolute `<div>`s, `w-24 h-full`, left one with `bg-gradient-to-r from-gold-500 to-transparent`, right one `from-transparent to-gold-500`, `pointer-events-none z-10`
  - Wait — these should match the section background color, not gold. Left fade: `from-gold-500 to-transparent` where gold-500 is the trust bar background. Use `from-[#c9963e]` (gold-500 hex) to match
- Inner: two identical `<div>`s side by side in a flex row, each containing `items.map(item => <span>{item}</span>)` separated by `<span className="mx-6 text-navy-900">◆</span>`
- CSS: both inner divs get `animation: marquee {duration}s linear infinite`
- `@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-100%) } }` in globals.css
- Hover pause: `group` class on outer div, inner flex row gets `group-hover:[animation-play-state:paused]`
- Replaces the entire existing trust bar `<section className="bg-gold-500 py-5">` in `app/page.tsx`

### 5. About Section — Clip-Path Reveal + Text Stagger

No new component needed. Modify directly in `app/page.tsx`.

**Image reveal:**
- Replace `<AnimateIn direction="left">` wrapper on the image div with a `motion.div` using `useInView`:
```tsx
const [ref, inView] = [useRef(), useInView(ref, { once: true, margin: "-80px" })]
// apply to motion.div:
initial={{ clipPath: "inset(100% 0 0 0)" }}
animate={inView ? { clipPath: "inset(0% 0 0 0)" } : {}}
transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
```
- Create `components/ClipReveal.tsx` — a `"use client"` wrapper: accepts `children: React.ReactNode, className?: string`, returns `<motion.div ref={ref} className={className} ...clipPath animation...>{children}</motion.div>`. Replace `<AnimateIn direction="left">` on the image div with `<ClipReveal>`.

**Text stagger:**
- The about text column requires a `"use client"` context for per-element stagger — `AnimateIn` is already a client component so this is handled automatically when imported into `app/page.tsx` (server page can import client children)
- Replace single `<AnimateIn direction="right">` with individual `<AnimateIn>` per element (label, h2, p1, p2, CTA), delays: 0, 0.1, 0.2, 0.3, 0.4

### 6. HorizontalScroll — `components/HorizontalScroll.tsx`

```
"use client"
```

**Target:** `app/page.tsx` home page services teaser section only. Replaces the existing `<section className="py-24 bg-navy-950">` services grid. Does NOT apply to `app/services/page.tsx`.

**TiltCard relationship:** `TiltCard` wrappers are removed inside `HorizontalScroll` — the horizontal scroll itself provides the interactive feel, and nested 3D transforms cause visual conflict.

Props: `medicalCards: {title, desc}[]`, `cosmeticCards: {title, desc}[]`

**Desktop (md+):**
- Outer `ref` container: `position: relative` with `height` computed as `100vh + scrollDistance`
  - `scrollDistance` = total row width − viewport width, measured in `useEffect` via `ResizeObserver` on the inner row ref
  - Store in `useState`, recalculate on resize
- Inner sticky div: `position: sticky, top: 0, height: 100vh, overflow: hidden`
- Cards flex row: `motion.div` with `x = useTransform(scrollYProgress, [0, 1], [0, -scrollDistance])` (in px, not %)
  - `scrollYProgress` from `useScroll({ target: containerRef, offset: ["start start", "end end"] })`
- Section label: `<p className="text-[10vw] font-serif text-gold-400/20 ...">` positioned absolute top-left, `opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.1])`
- Two groups: Medical first (label + 4 cards), Cosmetic second (label + 4 cards), all in one row

**Mobile (< md):**
- `hidden md:flex` on sticky/horizontal elements
- Normal `<div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">` vertical grid with `AnimateIn` stagger

### 7. ReviewCarousel — `components/ReviewCarousel.tsx`

```
"use client"
```

**Replaces** the existing `<section id="reviews">` in `app/page.tsx`. Add `"use client"` to `components/ReviewCard.tsx` — once added, it can be imported directly into any client component without additional directives. Safe: `ReviewCard` has no server-only logic.

**Layout:**
- Two rows, each a Marquee-style infinite scroll using CSS animation
  - Row 1: left direction, `animation-duration: 25s`
  - Row 2: right direction (`animation-direction: reverse`), `animation-duration: 32s`
- Both rows pause when section container is hovered (`group` + `group-hover:[animation-play-state:paused]`)
- Each row contains the 4 existing reviews duplicated: `[...reviews, ...reviews]` (8 items total) for seamless CSS loop — render both arrays, each `ReviewCard` gets `min-width: min(380px, 80vw)`

**Card sizing:**
- `min-width: min(380px, 80vw)` — caps at 80vw on narrow screens, preventing overflow
- More whitespace: `p-8` instead of default
- Add 5 gold star row above quote text: `★★★★★` in `text-gold-500 text-sm`

**Decorative quote:**
- `position: absolute, top: 0, left: 8, font-size: 20vw, opacity: 0.04, color: gold-500, font-family: Playfair Display, pointer-events-none, select-none, aria-hidden: true`

### 8. MagneticButton — `components/MagneticButton.tsx`

```
"use client"
```

Props: `children: React.ReactNode`, `className?: string`

- `x = useMotionValue(0)`, `y = useMotionValue(0)`
- `springX = useSpring(x, { stiffness: 300, damping: 30 })` — critically damped, no overshoot (luxury feel)
- `springY = useSpring(y, { stiffness: 300, damping: 30 })`
- `onMouseMove`: get bounding rect, compute offset from center, set `x` and `y` clamped to `±12`
- `onMouseLeave`: `x.set(0)`, `y.set(0)`
- Returns `<motion.div style={{ x: springX, y: springY }}>{children}</motion.div>`
- Applied to: the gold CTA `<a>` buttons in the New Patient CTA section

### 9. CTA Section — Background Shift + Ambient Watermark

No new component. Modify CTA section directly in `app/page.tsx`. Extract into a `"use client"` component `components/CTASection.tsx` since it uses `useScroll`/`useTransform`.

**Background shift:**
- `useScroll({ target: sectionRef, offset: ["start end", "start start"] })`
- `bg = useTransform(scrollYProgress, [0, 1], ["#f6f3e9", "#1c2331"])` applied to section `motion.section` `backgroundColor`
- `textColor = useTransform(scrollYProgress, [0, 1], ["#1c2331", "#fdfbf7"])` applied to heading `color`

**Ambient watermark:**
- Inside section, `position: absolute, inset: 0, overflow: hidden, pointer-events: none`
- `<p aria-hidden="true">PACIFIC DERMATOLOGY</p>` in `font-serif text-[12vw] opacity-[0.04] whitespace-nowrap absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-cream-50 select-none`

---

## Constraints

- All horizontal scroll sections must degrade gracefully on mobile
- Remove `scroll-smooth` from `<html>` in `layout.tsx` when adding Lenis
- Import `lenis/dist/lenis.css` in `LenisProvider`
- Every new component must have `"use client"` as first line
- All split text elements must have `aria-label` on container and `aria-hidden` on word spans
- `min-width` on carousel cards must use `min(380px, 80vw)` — never a fixed px that can overflow mobile
- Build must pass `npm run build` with zero TypeScript errors
