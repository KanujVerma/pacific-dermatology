# Pacific Dermatology Site Enhancements Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove "Learn More" clutter, update patient form PDF links, generate AI hero imagery via Imagen, and add Framer Motion scroll animations + 3D card tilt to the site.

**Architecture:** Pure Next.js App Router — no new routes. Enhancements are additive (new components + CSS) that layer onto existing pages. Image generation is a one-time Node script run at dev time that writes static files to `public/images/`. Framer Motion is client-only ("use client" wrappers around server components where needed).

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, Framer Motion, @google/generative-ai (Imagen 3)

---

## Chunk 1: Simple Fixes

### Task 1: Remove "Learn More" from ServiceCard

**Files:**
- Modify: `components/ServiceCard.tsx`

- [ ] **Step 1: Remove the Learn More span**

In `components/ServiceCard.tsx`, delete lines 19-21:
```tsx
<span className="flex items-center gap-1.5 text-gold-500 text-xs tracking-wider uppercase group-hover:gap-2.5 transition-all">
  Learn More <ArrowRight size={12} />
</span>
```
Also remove the `mb-4` from the `<p>` description (line 18) since nothing follows it now.
Remove the `ArrowRight` import if no longer used elsewhere in the file.

Final file:
```tsx
import type { ServiceCardProps } from "@/types";

interface ServiceCardProps {
  title: string;
  description: string;
  href?: string;
}

export default function ServiceCard({ title, description, href = "/services" }: ServiceCardProps) {
  return (
    <a
      href={href}
      className="group block bg-navy-900 border border-navy-700 hover:border-gold-500/50 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-navy-950/50"
    >
      <h3 className="text-cream-100 font-serif text-lg mb-2 group-hover:text-gold-300 transition-colors">
        {title}
      </h3>
      <p className="text-cream-400 text-sm leading-relaxed">{description}</p>
    </a>
  );
}
```

- [ ] **Step 2: Verify build passes**
```bash
cd /Users/kanuj/pacific-dermatology && npm run build 2>&1 | tail -10
```
Expected: `✓ Compiled successfully`

- [ ] **Step 3: Commit**
```bash
git add components/ServiceCard.tsx
git commit -m "feat: remove Learn More from service cards"
```

---

### Task 2: Update all patient form / Book Now links to new PDF

**Files:**
- Modify: `components/Header.tsx` (Book Now button, line 52)
- Modify: `app/page.tsx` (Download Patient Form, line 207)
- Modify: `app/services/page.tsx` (New Patient Form, line 168)

New PDF URL: `https://cloud-1de12d.becdn.net/customfile/2964d845db7b1468ce2e15a75719319187a8caef175da6f482760209006fadc3/pacderm---NEW-PT-INFO-combined.pdf`

- [ ] **Step 1: Update Header.tsx Book Now**

Change line 52-58 in `components/Header.tsx` from `href="https://www.zocdoc.com"` to the PDF URL, add `target="_blank" rel="noopener noreferrer"`:
```tsx
<a
  href="https://cloud-1de12d.becdn.net/customfile/2964d845db7b1468ce2e15a75719319187a8caef175da6f482760209006fadc3/pacderm---NEW-PT-INFO-combined.pdf"
  target="_blank"
  rel="noopener noreferrer"
  className="bg-gold-500 hover:bg-gold-400 text-navy-950 text-sm font-medium px-5 py-2.5 tracking-wide uppercase transition-colors"
>
  Book Now
</a>
```

- [ ] **Step 2: Update page.tsx Download Patient Form**

Change the `href` on the "Download Patient Form" `<a>` tag (around line 207) to the new PDF URL.

- [ ] **Step 3: Update services/page.tsx New Patient Form**

Change the `href` on the "New Patient Form" `<a>` tag (around line 168) to the new PDF URL.

- [ ] **Step 4: Verify build**
```bash
cd /Users/kanuj/pacific-dermatology && npm run build 2>&1 | tail -10
```

- [ ] **Step 5: Commit**
```bash
git add components/Header.tsx app/page.tsx app/services/page.tsx
git commit -m "feat: update patient form and Book Now links to new PDF"
```

---

## Chunk 2: AI Image Generation

### Task 3: Add Gemini API key and generate images

**Pre-requisite:** User must add `GEMINI_API_KEY=<key>` to `/Users/kanuj/pacific-dermatology/.env.local` before running the script. Get key from https://aistudio.google.com.

**Files:**
- Create: `scripts/generate-images.mjs`
- Create: `public/images/` (directory, already exists)

- [ ] **Step 1: Install @google/genai**

Note: Use `@google/genai` (not `@google/generative-ai`) — it's the newer SDK that supports Imagen 3.
```bash
cd /Users/kanuj/pacific-dermatology && npm install @google/genai
```

- [ ] **Step 2: Create image generation script**

Create `scripts/generate-images.mjs`:
```js
import { GoogleGenAI } from "@google/genai";
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

// Load env manually since this is a script
import { readFileSync } from "node:fs";
const envFile = readFileSync(".env.local", "utf-8");
const GEMINI_API_KEY = envFile.match(/GEMINI_API_KEY=(.+)/)?.[1]?.trim();
if (!GEMINI_API_KEY) throw new Error("GEMINI_API_KEY not found in .env.local");

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const prompts = [
  {
    name: "hero-bg",
    prompt: "A serene, luxurious modern medical dermatology clinic interior, soft warm lighting, cream and navy color palette, minimalist aesthetic, no people, photorealistic, wide angle",
  },
  {
    name: "about-dr",
    prompt: "A refined, upscale dermatology examination room with soft lighting, white clinical surfaces, warm wood accents, a framed medical degree on the wall, no people, photorealistic",
  },
  {
    name: "treatment-cosmetic",
    prompt: "Close-up of professional cosmetic skincare treatment tools on a clean white marble surface, gold accents, soft natural light, luxury medical spa aesthetic, photorealistic",
  },
];

mkdirSync("public/images", { recursive: true });

for (const { name, prompt } of prompts) {
  console.log(`Generating: ${name}...`);
  try {
    const response = await ai.models.generateContent({
      model: "imagen-3.0-generate-002",
      contents: prompt,
      config: { numberOfImages: 1, outputMimeType: "image/jpeg" },
    });
    const imageData = response.generatedImages[0].image.imageBytes;
    const buffer = Buffer.from(imageData, "base64");
    const outPath = join("public/images", `${name}.jpg`);
    writeFileSync(outPath, buffer);
    console.log(`✓ Saved ${outPath}`);
  } catch (err) {
    console.error(`✗ Failed ${name}:`, err.message);
  }
}
console.log("Done.");
```

- [ ] **Step 3: Run the script** (only after GEMINI_API_KEY is in .env.local)
```bash
cd /Users/kanuj/pacific-dermatology && node scripts/generate-images.mjs
```
Expected: `✓ Saved public/images/hero-bg.jpg` etc.

- [ ] **Step 4: Use hero-bg.jpg in hero section of page.tsx**

In `app/page.tsx`, add the generated image as a background behind the hero gradient:
```tsx
import Image from "next/image";

// Inside the hero <section>, after the gradient divs:
<Image
  src="/images/hero-bg.jpg"
  alt=""
  fill
  className="object-cover opacity-20"
  priority
/>
```

- [ ] **Step 5: Use about-dr.jpg in About section**

In the About Dr. Fung section in `app/page.tsx`, add a two-column layout:
```tsx
<div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
  <div className="relative h-80 md:h-96">
    <Image src="/images/about-dr.jpg" alt="Pacific Dermatology clinic" fill className="object-cover" />
  </div>
  <div className="text-left">
    {/* existing text content */}
  </div>
</div>
```

- [ ] **Step 6: Build and verify**
```bash
cd /Users/kanuj/pacific-dermatology && npm run build 2>&1 | tail -10
```

- [ ] **Step 7: Commit**
```bash
git add public/images/ app/page.tsx scripts/generate-images.mjs
git commit -m "feat: add AI-generated imagery via Imagen 3"
```

---

## Chunk 3: Animations & 3D Interactivity

### Task 4: Install Framer Motion and create animation primitives

**Files:**
- Create: `components/AnimateIn.tsx` — reusable scroll-triggered fade/slide wrapper
- Create: `components/TiltCard.tsx` — 3D perspective tilt on hover

- [ ] **Step 1: Install framer-motion**

Pin to v11+ for React 19 compatibility:
```bash
cd /Users/kanuj/pacific-dermatology && npm install framer-motion@^11
```

Note: `AnimateIn`, `TiltCard`, `HeroOrbs`, and `CountUp` are all `"use client"` components. In Next.js App Router, importing a client component into a server component (like `app/page.tsx`) is perfectly valid — Next.js automatically establishes the client boundary at the component level. No extra wrapper file is needed.

- [ ] **Step 2: Create AnimateIn component**

Create `components/AnimateIn.tsx`:
```tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface AnimateInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
}

export default function AnimateIn({
  children,
  className,
  delay = 0,
  direction = "up",
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const initial = {
    opacity: 0,
    y: direction === "up" ? 24 : 0,
    x: direction === "left" ? -24 : direction === "right" ? 24 : 0,
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : initial}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 3: Create TiltCard component**

Create `components/TiltCard.tsx`:
```tsx
"use client";

import { useRef } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function TiltCard({ children, className = "" }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(4px)`;
  }

  function handleMouseLeave() {
    if (ref.current) {
      ref.current.style.transform = "perspective(600px) rotateY(0deg) rotateX(0deg) translateZ(0)";
    }
  }

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: "transform 0.15s ease-out", willChange: "transform" }}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 4: Commit**
```bash
git add components/AnimateIn.tsx components/TiltCard.tsx
git commit -m "feat: add AnimateIn and TiltCard animation components"
```

---

### Task 5: Add hero particle orb effect

**Files:**
- Create: `components/HeroOrbs.tsx`

- [ ] **Step 1: Create HeroOrbs component**

Create `components/HeroOrbs.tsx`:
```tsx
"use client";

import { useEffect, useRef } from "react";

export default function HeroOrbs() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    let mouseX = 0;
    let mouseY = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    window.addEventListener("mousemove", onMouse);

    // Subtle floating dots
    const dots = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.4 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Soft mouse-following orb
      const grd = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 300);
      grd.addColorStop(0, "rgba(201,150,62,0.06)");
      grd.addColorStop(1, "rgba(201,150,62,0)");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (const d of dots) {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0) d.x = canvas.width;
        if (d.x > canvas.width) d.x = 0;
        if (d.y < 0) d.y = canvas.height;
        if (d.y > canvas.height) d.y = 0;

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,150,62,${d.alpha})`;
        ctx.fill();
      }

      animFrame = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
```

- [ ] **Step 2: Add HeroOrbs to hero section in page.tsx**

In `app/page.tsx` hero `<section>`, add `<HeroOrbs />` after the existing gradient divs:
```tsx
import HeroOrbs from "@/components/HeroOrbs";

// inside the hero section, after the two gradient divs:
<HeroOrbs />
```

- [ ] **Step 3: Commit**
```bash
git add components/HeroOrbs.tsx app/page.tsx
git commit -m "feat: add animated particle orb to hero section"
```

---

### Task 6: Add scroll animations to page sections

**Files:**
- Modify: `app/page.tsx` — wrap section headings and cards with AnimateIn
- Modify: `app/services/page.tsx` — wrap section headings and cards with AnimateIn

Note: `AnimateIn` uses `"use client"` internally, so server page.tsx files can use it directly.

- [ ] **Step 1: Animate landing page sections**

In `app/page.tsx`, wrap these elements with `<AnimateIn>`:
- Hero `h1` + subtext: `<AnimateIn delay={0.1}>`
- Hero CTA buttons: `<AnimateIn delay={0.3}>`
- Trust bar items: each `<AnimateIn delay={i * 0.1}>`
- About section heading + text: `<AnimateIn direction="left">`
- Services section heading: `<AnimateIn>`
- Each ServiceCard column: `<AnimateIn delay={i * 0.1}>`
- Each ReviewCard: `<AnimateIn delay={i * 0.1}>`
- CTA section: `<AnimateIn>`

- [ ] **Step 2: Animate services page sections**

In `app/services/page.tsx`, wrap:
- Hero heading: `<AnimateIn>`
- Section headings: `<AnimateIn>`
- Each service card (medical): `<AnimateIn delay={i * 0.05}>`
- Cosmetic ServiceCard section: `<AnimateIn delay={i * 0.05}>`

- [ ] **Step 3: Add TiltCard to service cards on landing page**

In `app/page.tsx`, wrap each `<ServiceCard>` with `<TiltCard>`:
```tsx
import TiltCard from "@/components/TiltCard";

<TiltCard>
  <ServiceCard key={s.title} title={s.title} description={s.desc} />
</TiltCard>
```

- [ ] **Step 4: Create CountUp component**

Create `components/CountUp.tsx` first (required before using it in step 5):
```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export default function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(to / 30);
    const timer = setInterval(() => {
      start += step;
      if (start >= to) { setCount(to); clearInterval(timer); }
      else setCount(start);
    }, 40);
    return () => clearInterval(timer);
  }, [inView, to]);

  return <span ref={ref}>{count}{suffix}</span>;
}
```

- [ ] **Step 5: Wire CountUp into trust bar**

In `app/page.tsx` trust bar, replace `"20+ Years of Trusted Care"` label:
```tsx
import CountUp from "@/components/CountUp";
// ...
{ icon: Award, label: <><CountUp to={20} suffix="+" /> Years of Trusted Care</> },
```
Note: Update the trust bar map's `label` type to `React.ReactNode` to support JSX labels.

- [ ] **Step 5: Build and verify**
```bash
cd /Users/kanuj/pacific-dermatology && npm run build 2>&1 | tail -15
```
Expected: `✓ Compiled successfully`

- [ ] **Step 6: Commit**
```bash
git add app/page.tsx app/services/page.tsx components/CountUp.tsx
git commit -m "feat: add scroll animations, 3D card tilt, and count-up to site"
```

---

## Final Step: Deploy

- [ ] **Deploy to Vercel**
```bash
cd /Users/kanuj/pacific-dermatology && npx vercel --prod --yes
```
Or push to the connected Git branch if Vercel GitHub integration is active:
```bash
git push origin main
```
