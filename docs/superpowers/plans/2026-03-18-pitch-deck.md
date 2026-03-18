# Dr. Fung Pitch Deck Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Generate a polished 8-slide PowerPoint pitch deck with speaker notes, matching the Pacific Dermatology dark luxury design system, ready to present on Zoom to Dr. Hank Fung.

**Architecture:** A single Python script (`scripts/generate_pitch_deck.py`) uses `python-pptx` to programmatically build the deck. Design constants (colors, fonts, sizes) are defined at the top of the script. Each slide is a discrete function. The output file is `docs/pitch/dr-fung-pitch.pptx`. No test framework — verification is opening the .pptx and checking visually against the spec.

**Tech Stack:** Python 3, python-pptx. No other dependencies.

**Spec:** `docs/superpowers/specs/2026-03-18-dr-fung-pitch-design.md`

---

## Chunk 1: Setup & Design System

### Task 1: Install python-pptx and scaffold the script

**Files:**
- Create: `scripts/generate_pitch_deck.py`

- [ ] **Step 1: Install python-pptx**

```bash
cd /Users/kanuj/pacific-dermatology && python3 -m pip install python-pptx
```

Expected: `Successfully installed python-pptx-X.X.X` (or `Requirement already satisfied` if already present)

- [ ] **Step 2: Create the script with design constants and helpers**

Create `scripts/generate_pitch_deck.py`:

```python
"""
Generate the Dr. Fung pitch deck.
Run: python3 scripts/generate_pitch_deck.py
Output: docs/pitch/dr-fung-pitch.pptx
"""

import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN

# ── Design constants ────────────────────────────────────────────────
NAVY      = RGBColor(0x1c, 0x23, 0x31)   # #1c2331 — background
NAVY_CARD = RGBColor(0x23, 0x35, 0x45)   # #233545 — card / subtle bg
GOLD      = RGBColor(0xC9, 0x96, 0x3E)   # #c9963e — accent
CREAM     = RGBColor(0xFD, 0xFB, 0xF7)   # #fdfbf7 — primary text
CREAM_MID = RGBColor(0xE9, 0xE3, 0xD3)   # #e9e3d3 — secondary text
GRAY      = RGBColor(0x64, 0x74, 0x8B)   # #64748b — muted text

FONT_HEADING = "Palatino Linotype"  # closest system serif to Playfair Display
FONT_BODY    = "Montserrat"         # must be installed on the system; fallback: Calibri

SLIDE_W = Inches(13.33)
SLIDE_H = Inches(7.5)

# ── Helpers ─────────────────────────────────────────────────────────

def new_prs() -> Presentation:
    prs = Presentation()
    prs.slide_width  = SLIDE_W
    prs.slide_height = SLIDE_H
    return prs

def blank_slide(prs: Presentation):
    """Add a truly blank slide (no placeholders)."""
    layout = prs.slide_layouts[6]  # index 6 is blank in default template
    return prs.slides.add_slide(layout)

def fill_bg(slide, color: RGBColor):
    """Fill slide background with a solid color."""
    background = slide.background
    fill = background.fill
    fill.solid()
    fill.fore_color.rgb = color

def add_textbox(slide, text: str, left, top, width, height,
                font_name=FONT_BODY, font_size=18, bold=False,
                color=CREAM, align=PP_ALIGN.LEFT, italic=False) -> None:
    txBox = slide.shapes.add_textbox(left, top, width, height)
    tf = txBox.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.alignment = align
    run = p.add_run()
    run.text = text
    run.font.name = font_name
    run.font.size = Pt(font_size)
    run.font.bold = bold
    run.font.italic = italic
    run.font.color.rgb = color

def add_line(slide, left, top, width, color: RGBColor, thickness_pt=1):
    """Add a horizontal rule."""
    line = slide.shapes.add_connector(
        1,  # MSO_CONNECTOR.STRAIGHT
        left, top, left + width, top
    )
    line.line.color.rgb = color
    line.line.width = Pt(thickness_pt)

def set_notes(slide, text: str):
    notes_slide = slide.notes_slide
    tf = notes_slide.notes_text_frame
    tf.text = text

def ensure_output_dir():
    os.makedirs("docs/pitch", exist_ok=True)

if __name__ == "__main__":
    ensure_output_dir()
    prs = new_prs()
    # Slides added in subsequent tasks
    out = "docs/pitch/dr-fung-pitch.pptx"
    prs.save(out)
    print(f"Saved: {out}")
```

- [ ] **Step 3: Run the script to verify scaffold works**

```bash
cd /Users/kanuj/pacific-dermatology && python3 scripts/generate_pitch_deck.py
```

Expected: `Saved: docs/pitch/dr-fung-pitch.pptx` — a valid (empty) .pptx is created.

- [ ] **Step 4: Verify the file exists and opens**

```bash
cd /Users/kanuj/pacific-dermatology && ls -lh docs/pitch/dr-fung-pitch.pptx && open docs/pitch/dr-fung-pitch.pptx
```

Expected: `ls` prints a file size > 0 bytes. PowerPoint / Keynote opens with 0 slides and no errors.

- [ ] **Step 5: Commit**

```bash
cd /Users/kanuj/pacific-dermatology && git add scripts/generate_pitch_deck.py docs/pitch/ && git commit -m "feat: scaffold pitch deck generator with design constants"
```

---

## Chunk 2: Slides 1–4

### Task 2: Slide 1 — Title ("I built something for you.")

**Files:**
- Modify: `scripts/generate_pitch_deck.py`

- [ ] **Step 1: Add `slide_01_title()` function before `__main__` block**

```python
def slide_01_title(prs: Presentation):
    slide = blank_slide(prs)
    fill_bg(slide, NAVY)

    # Gold top bar
    bar = slide.shapes.add_shape(1, 0, 0, SLIDE_W, Inches(0.06))
    bar.fill.solid(); bar.fill.fore_color.rgb = GOLD
    bar.line.fill.background()

    # Gold label
    add_textbox(slide, "PACIFIC DERMATOLOGY",
                Inches(1.5), Inches(2.4), Inches(10), Inches(0.5),
                font_name=FONT_BODY, font_size=11, bold=True,
                color=GOLD, align=PP_ALIGN.CENTER)

    # Main heading
    add_textbox(slide, "I built something for you.",
                Inches(1.0), Inches(2.9), Inches(11.33), Inches(1.4),
                font_name=FONT_HEADING, font_size=52, bold=False,
                color=CREAM, align=PP_ALIGN.CENTER)

    # Subtitle — developer name + URL
    add_textbox(slide, "[Your Name]  ·  pacific-dermatology-g5jw.vercel.app",
                Inches(1.0), Inches(4.35), Inches(11.33), Inches(0.5),
                font_name=FONT_BODY, font_size=13, bold=False,
                color=CREAM_MID, align=PP_ALIGN.CENTER)

    # Gold bottom bar
    bar2 = slide.shapes.add_shape(1, 0, SLIDE_H - Inches(0.06), SLIDE_W, Inches(0.06))
    bar2.fill.solid(); bar2.fill.fore_color.rgb = GOLD
    bar2.line.fill.background()

    set_notes(slide,
        "OPENING — word for word:\n\n"
        "'Hey Dr. Fung, thanks for making time. I'll keep this to 20 minutes. "
        "I was actually a patient of yours a few years back — [specific memory: e.g. came in for a mole check]. "
        "I'm now doing web development, and I built something for your practice as a project. "
        "I'd love to just show it to you and get your honest reaction.'\n\n"
        "NOTE: Do NOT explain what you built yet. Just show."
    )
```

- [ ] **Step 2: Call it in `__main__`**

Replace the `# Slides added in subsequent tasks` comment with:
```python
    slide_01_title(prs)
```

- [ ] **Step 3: Run and verify**

```bash
cd /Users/kanuj/pacific-dermatology && python3 scripts/generate_pitch_deck.py && open docs/pitch/dr-fung-pitch.pptx
```

Expected: Slide 1 — dark navy background, gold bars top and bottom, large serif heading, subtitle line. Speaker notes contain the opening script.

- [ ] **Step 4: Commit**

```bash
cd /Users/kanuj/pacific-dermatology && git add scripts/generate_pitch_deck.py && git commit -m "feat: add slide 1 - title"
```

---

### Task 3: Slide 2 — His Current Site

**Files:**
- Modify: `scripts/generate_pitch_deck.py`

- [ ] **Step 1: Add `slide_02_current_site()` function**

```python
def slide_02_current_site(prs: Presentation):
    slide = blank_slide(prs)
    fill_bg(slide, NAVY)

    # Gold label
    add_textbox(slide, "TODAY",
                Inches(0.6), Inches(0.5), Inches(4), Inches(0.4),
                font_name=FONT_BODY, font_size=10, bold=True, color=GOLD)

    # Heading
    add_textbox(slide, "What patients find when they Google you.",
                Inches(0.6), Inches(0.95), Inches(11), Inches(0.9),
                font_name=FONT_HEADING, font_size=36, color=CREAM)

    # Screenshot placeholder box
    ph = slide.shapes.add_shape(
        1,
        Inches(1.5), Inches(2.0), Inches(10.33), Inches(4.6)
    )
    ph.fill.solid(); ph.fill.fore_color.rgb = NAVY_CARD
    ph.line.color.rgb = GOLD
    ph.line.width = Pt(0.75)

    # Placeholder label inside box
    add_textbox(slide,
                "[ Paste screenshot of pacific-dermatology.com here ]",
                Inches(1.5), Inches(4.0), Inches(10.33), Inches(0.6),
                font_name=FONT_BODY, font_size=12, color=GRAY,
                align=PP_ALIGN.CENTER, italic=True)

    set_notes(slide,
        "Pull up the screenshot. Say nothing. Let 3–4 seconds pass.\n\n"
        "Then: 'This is what patients see when they Google you today.'\n\n"
        "NOTE: Do NOT say anything negative about it. "
        "If he defends it, nod — 'totally, it gets the job done' — and move on immediately.\n\n"
        "BEFORE THE ZOOM: Take a full-page screenshot of pacific-dermatology.com "
        "and insert it into this slide, replacing the placeholder box."
    )
```

- [ ] **Step 2: Append call in `__main__`**

After `slide_01_title(prs)`, append:
```python
    slide_02_current_site(prs)
```

- [ ] **Step 3: Run and verify**

```bash
cd /Users/kanuj/pacific-dermatology && python3 scripts/generate_pitch_deck.py && open docs/pitch/dr-fung-pitch.pptx
```

Expected: Slide 2 has heading, a clearly labelled placeholder box with a gold border, and full script in speaker notes.

- [ ] **Step 4: Commit**

```bash
cd /Users/kanuj/pacific-dermatology && git add scripts/generate_pitch_deck.py && git commit -m "feat: add slide 2 - current site"
```

---

### Task 4: Slide 3 — The Reveal

**Files:**
- Modify: `scripts/generate_pitch_deck.py`

- [ ] **Step 1: Add `slide_03_reveal()` function**

```python
def slide_03_reveal(prs: Presentation):
    slide = blank_slide(prs)
    fill_bg(slide, NAVY)

    # Large centered cue text
    add_textbox(slide, "→  Switch to browser tab now.",
                Inches(1.0), Inches(2.8), Inches(11.33), Inches(0.9),
                font_name=FONT_BODY, font_size=28, bold=True,
                color=GOLD, align=PP_ALIGN.CENTER)

    # URL in small text at bottom — presenter reference
    add_textbox(slide, "pacific-dermatology-g5jw.vercel.app",
                Inches(1.0), Inches(6.7), Inches(11.33), Inches(0.4),
                font_name=FONT_BODY, font_size=10,
                color=GRAY, align=PP_ALIGN.CENTER)

    set_notes(slide,
        "THE REVEAL — word for word:\n\n"
        "Switch browser tabs to the live site. Say:\n"
        "'And this is what I built.'\n\n"
        "[Pause on the hero section for 4–5 seconds. Let him look.]\n\n"
        "'I'll walk you through it in a second — but what's your first impression?'\n\n"
        "NOTE: Ask for his reaction BEFORE the walkthrough. "
        "His words tell you how engaged he is. The audience sees almost nothing on this slide — "
        "you switch tabs immediately. This slide is your cue only."
    )
```

- [ ] **Step 2: Append call in `__main__`**

After `slide_02_current_site(prs)`, append:
```python
    slide_03_reveal(prs)
```

- [ ] **Step 3: Run and verify**

```bash
cd /Users/kanuj/pacific-dermatology && python3 scripts/generate_pitch_deck.py && open docs/pitch/dr-fung-pitch.pptx
```

Expected: Slide 3 is near-blank — gold cue text centered, small URL at bottom. Speaker notes contain the reveal script.

- [ ] **Step 4: Commit**

```bash
cd /Users/kanuj/pacific-dermatology && git add scripts/generate_pitch_deck.py && git commit -m "feat: add slide 3 - reveal cue"
```

---

### Task 5: Slide 4 — Live Walkthrough Cue

**Files:**
- Modify: `scripts/generate_pitch_deck.py`

- [ ] **Step 1: Add `slide_04_walkthrough()` function**

```python
def slide_04_walkthrough(prs: Presentation):
    slide = blank_slide(prs)
    fill_bg(slide, NAVY)

    # Gold label
    add_textbox(slide, "WALKTHROUGH",
                Inches(0.6), Inches(0.5), Inches(4), Inches(0.4),
                font_name=FONT_BODY, font_size=10, bold=True, color=GOLD)

    # Heading
    add_textbox(slide, "Stay on the live site.",
                Inches(0.6), Inches(0.95), Inches(9), Inches(0.8),
                font_name=FONT_HEADING, font_size=36, color=CREAM)

    # Three talking point chips
    points = [
        ("About Section", "His actual headshot. Not a template."),
        ("Services Page", "Every treatment, medical and cosmetic."),
        ("Contact Page",  "Address, phone, form, and Google Maps."),
    ]
    for i, (label, desc) in enumerate(points):
        top = Inches(2.1) + i * Inches(1.45)
        # Card background
        card = slide.shapes.add_shape(1, Inches(0.6), top, Inches(12.0), Inches(1.2))
        card.fill.solid(); card.fill.fore_color.rgb = NAVY_CARD
        card.line.color.rgb = RGBColor(0x2d, 0x37, 0x48)
        card.line.width = Pt(0.5)
        # Gold label
        add_textbox(slide, label,
                    Inches(0.9), top + Inches(0.12), Inches(4), Inches(0.38),
                    font_name=FONT_BODY, font_size=11, bold=True, color=GOLD)
        # Description
        add_textbox(slide, desc,
                    Inches(0.9), top + Inches(0.52), Inches(11.0), Inches(0.5),
                    font_name=FONT_BODY, font_size=14, color=CREAM_MID)

    set_notes(slide,
        "TALKING POINTS — loose, not word for word. Keep under 4 minutes total.\n\n"
        "About section: 'I used your actual headshot — wanted it to feel like your practice, not a template.'\n\n"
        "Services page: 'Every treatment you offer is listed — medical and cosmetic. "
        "I cross-referenced your current site.'\n\n"
        "Contact page: 'Address, phone, a contact form, and Google Maps. "
        "Patients can reach you without hunting.'\n\n"
        "CHECK IN: 'Does this feel like it represents your practice?'\n\n"
        "NOTE: Only go deeper on what he asks about. You're letting him feel ownership, not demoing features."
    )
```

- [ ] **Step 2: Append call in `__main__`**

After `slide_03_reveal(prs)`, append:
```python
    slide_04_walkthrough(prs)
```

- [ ] **Step 3: Run and verify**

```bash
cd /Users/kanuj/pacific-dermatology && python3 scripts/generate_pitch_deck.py && open docs/pitch/dr-fung-pitch.pptx
```

Expected: Slide 4 shows three navy cards with gold labels and talking points. Speaker notes have full guidance.

- [ ] **Step 4: Commit**

```bash
cd /Users/kanuj/pacific-dermatology && git add scripts/generate_pitch_deck.py && git commit -m "feat: add slide 4 - walkthrough cue"
```

---

## Chunk 3: Slides 5–8

### Task 6: Slide 5 — Your Story

**Files:**
- Modify: `scripts/generate_pitch_deck.py`

- [ ] **Step 1: Add `slide_05_story()` function**

```python
def slide_05_story(prs: Presentation):
    slide = blank_slide(prs)
    fill_bg(slide, NAVY)

    # Gold label
    add_textbox(slide, "WHY I BUILT THIS",
                Inches(0.6), Inches(0.5), Inches(6), Inches(0.4),
                font_name=FONT_BODY, font_size=10, bold=True, color=GOLD)

    # Heading
    add_textbox(slide, "Former Patient → Web Developer.",
                Inches(0.6), Inches(0.95), Inches(11), Inches(0.9),
                font_name=FONT_HEADING, font_size=38, color=CREAM)

    # Thin gold divider
    add_line(slide, Inches(0.6), Inches(2.05), Inches(4.0), GOLD, thickness_pt=0.75)

    # Body copy
    body = (
        "I was your patient. I trust you as a doctor.\n\n"
        "When I started learning web development, I wanted\n"
        "a real project — not a tutorial. Your practice came to mind."
    )
    add_textbox(slide, body,
                Inches(0.6), Inches(2.3), Inches(8.5), Inches(2.2),
                font_name=FONT_BODY, font_size=18, color=CREAM_MID)

    set_notes(slide,
        "YOUR STORY — word for word:\n\n"
        "'So here's the honest story. I was your patient — I genuinely trust you as a doctor. "
        "When I started learning web development, I wanted a real project to build, not just a tutorial. "
        "Your practice came to mind because I know the care you put into it, "
        "and I thought it deserved a better online presence. "
        "So I just built it. No strings attached.'\n\n"
        "[Pause.]\n\n"
        "'I do have a proposal if you'd like to hear it — but even if not, I'm happy to hand this over.'\n\n"
        "NOTE: The last line is critical. It lowers stakes entirely. "
        "Only move to the pricing slide if he gives a green light — even a nod counts."
    )
```

- [ ] **Step 2: Append call in `__main__`**

After `slide_04_walkthrough(prs)`, append:
```python
    slide_05_story(prs)
```

- [ ] **Step 3: Run and verify**

```bash
cd /Users/kanuj/pacific-dermatology && python3 scripts/generate_pitch_deck.py && open docs/pitch/dr-fung-pitch.pptx
```

Expected: Slide 5 — heading, gold divider, body copy. Speaker notes contain the word-for-word story script.

- [ ] **Step 4: Commit**

```bash
cd /Users/kanuj/pacific-dermatology && git add scripts/generate_pitch_deck.py && git commit -m "feat: add slide 5 - your story"
```

---

### Task 7: Slide 6 — The Ask

**Files:**
- Modify: `scripts/generate_pitch_deck.py`

- [ ] **Step 1: Add `slide_06_ask()` function**

```python
def slide_06_ask(prs: Presentation):
    slide = blank_slide(prs)
    fill_bg(slide, NAVY)

    # Gold label
    add_textbox(slide, "THE PROPOSAL",
                Inches(0.6), Inches(0.5), Inches(4), Inches(0.4),
                font_name=FONT_BODY, font_size=10, bold=True, color=GOLD)

    # Price — large, centered, impossible to miss
    add_textbox(slide, "$750",
                Inches(0.0), Inches(1.1), Inches(13.33), Inches(2.2),
                font_name=FONT_HEADING, font_size=110, bold=False,
                color=GOLD, align=PP_ALIGN.CENTER)

    # One-time label
    add_textbox(slide, "one-time  ·  site is yours  ·  live under your domain in one week",
                Inches(0.0), Inches(3.35), Inches(13.33), Inches(0.5),
                font_name=FONT_BODY, font_size=13,
                color=CREAM_MID, align=PP_ALIGN.CENTER)

    # Thin divider
    add_line(slide, Inches(3.5), Inches(4.1), Inches(6.33), GOLD, thickness_pt=0.5)

    # Market anchor
    add_textbox(slide, "Dermatology agencies charge $8,000 – $15,000 + $1,000 / month.",
                Inches(0.0), Inches(4.3), Inches(13.33), Inches(0.5),
                font_name=FONT_BODY, font_size=13,
                color=GRAY, align=PP_ALIGN.CENTER)

    set_notes(slide,
        "THE ASK — word for word:\n\n"
        "'I want to be upfront. I'm newer to freelancing and you're genuinely someone I wanted to build this for — "
        "so I'm not coming in with agency pricing. Agencies that do this for dermatology practices charge "
        "$8–15k to build and $1,000+ a month after that.\n\n"
        "I'm proposing $750, one time. That covers the build, I handle the Vercel hosting, "
        "and I get your domain pointed to this site within a week — "
        "you just give me DNS access, which takes about five minutes on your end.'\n\n"
        "[Pause.]\n\n"
        "'And honestly — if the number doesn't work for you, I'm open to talking about it.'\n\n"
        "NOTE: 'I'm open to talking about it' signals warmth and flexibility, not desperation. "
        "It's a deliberate choice — he's not just a client, he's someone you trust."
    )
```

- [ ] **Step 2: Append call in `__main__`**

After `slide_05_story(prs)`, append:
```python
    slide_06_ask(prs)
```

- [ ] **Step 3: Run and verify**

```bash
cd /Users/kanuj/pacific-dermatology && python3 scripts/generate_pitch_deck.py && open docs/pitch/dr-fung-pitch.pptx
```

Expected: Slide 6 — "$750" dominates the slide in large gold type. One-time label beneath. Market anchor in muted gray at the bottom. Nothing else on screen.

- [ ] **Step 4: Commit**

```bash
cd /Users/kanuj/pacific-dermatology && git add scripts/generate_pitch_deck.py && git commit -m "feat: add slide 6 - the ask"
```

---

### Task 8: Slide 7 — Optional Retainer

**Files:**
- Modify: `scripts/generate_pitch_deck.py`

- [ ] **Step 1: Add `slide_07_retainer()` function**

```python
def slide_07_retainer(prs: Presentation):
    slide = blank_slide(prs)
    fill_bg(slide, NAVY)

    # Gold label
    add_textbox(slide, "IF YOU WANT TO KEEP GROWING IT",
                Inches(0.6), Inches(0.5), Inches(10), Inches(0.4),
                font_name=FONT_BODY, font_size=10, bold=True, color=GOLD)

    # Heading
    add_textbox(slide, "What we could build together.",
                Inches(0.6), Inches(0.95), Inches(11), Inches(0.8),
                font_name=FONT_HEADING, font_size=36, color=CREAM)

    # Four growth items in two columns
    left_items = [
        ("SEO Pages",      "One page per treatment.\n'Kybella Pleasanton.' 'Daxxify Pleasanton.'\nShow up when patients search."),
        ("Google Business", "Profile updates, reviews,\nlocal search visibility."),
    ]
    right_items = [
        ("Monthly Reports", "Traffic, leads, top pages.\nGA4 analytics every month."),
        ("Phase 2",         "Booking, before/after gallery,\nblog — when you're ready."),
    ]

    for i, (label, desc) in enumerate(left_items):
        top = Inches(2.1) + i * Inches(2.2)
        add_textbox(slide, label,
                    Inches(0.6), top, Inches(5.5), Inches(0.45),
                    font_name=FONT_BODY, font_size=13, bold=True, color=GOLD)
        add_textbox(slide, desc,
                    Inches(0.6), top + Inches(0.45), Inches(5.8), Inches(1.4),
                    font_name=FONT_BODY, font_size=14, color=CREAM_MID)

    for i, (label, desc) in enumerate(right_items):
        top = Inches(2.1) + i * Inches(2.2)
        add_textbox(slide, label,
                    Inches(7.0), top, Inches(5.5), Inches(0.45),
                    font_name=FONT_BODY, font_size=13, bold=True, color=GOLD)
        add_textbox(slide, desc,
                    Inches(7.0), top + Inches(0.45), Inches(5.8), Inches(1.4),
                    font_name=FONT_BODY, font_size=14, color=CREAM_MID)

    # Footer note
    add_textbox(slide, "Month-to-month · No long commitment · $150–$250 / month depending on scope",
                Inches(0.0), Inches(6.8), Inches(13.33), Inches(0.4),
                font_name=FONT_BODY, font_size=11,
                color=GRAY, align=PP_ALIGN.CENTER)

    set_notes(slide,
        "RETAINER — only show this slide if he's visibly engaged. Skip or skim if energy is neutral.\n\n"
        "LOOSE script:\n"
        "'If you ever want to take this further — this is what that looks like. "
        "The big SEO opportunity is individual pages for each treatment. "
        "When someone Googles Kybella Pleasanton or Daxxify Pleasanton, you want to show up. "
        "That's about 15–20 pages, Month 2 type work. "
        "We'd do it month-to-month, no long commitment.'\n\n"
        "'But that's all optional — the $750 stands on its own.'\n\n"
        "IF HE ASKS PRICE: '$150–$250 a month depending on what we're working on.'\n"
        "HOSTING COST: Vercel free tier covers this site's traffic — nothing to pass on to him."
    )
```

- [ ] **Step 2: Append call in `__main__`**

After `slide_06_ask(prs)`, append:
```python
    slide_07_retainer(prs)
```

- [ ] **Step 3: Run and verify**

```bash
cd /Users/kanuj/pacific-dermatology && python3 scripts/generate_pitch_deck.py && open docs/pitch/dr-fung-pitch.pptx
```

Expected: Slide 7 — two-column growth items with gold labels, footer with month-to-month note.

- [ ] **Step 4: Commit**

```bash
cd /Users/kanuj/pacific-dermatology && git add scripts/generate_pitch_deck.py && git commit -m "feat: add slide 7 - retainer options"
```

---

### Task 9: Slide 8 — Close

**Files:**
- Modify: `scripts/generate_pitch_deck.py`

- [ ] **Step 1: Add `slide_08_close()` function**

```python
def slide_08_close(prs: Presentation):
    slide = blank_slide(prs)
    fill_bg(slide, NAVY)

    # Gold top bar
    bar = slide.shapes.add_shape(1, 0, 0, SLIDE_W, Inches(0.06))
    bar.fill.solid(); bar.fill.fore_color.rgb = GOLD
    bar.line.fill.background()

    # Gold label
    add_textbox(slide, "WHAT HAPPENS NEXT",
                Inches(0.6), Inches(0.5), Inches(6), Inches(0.4),
                font_name=FONT_BODY, font_size=10, bold=True, color=GOLD)

    # Heading
    add_textbox(slide, "Live under your domain.\nOne week.",
                Inches(0.6), Inches(0.95), Inches(9), Inches(1.6),
                font_name=FONT_HEADING, font_size=44, color=CREAM)

    # Two bullet points
    bullets = [
        "You give me DNS access — about five minutes on your end.",
        "I handle everything. You never think about your website again.",
    ]
    for i, b in enumerate(bullets):
        top = Inches(2.85) + i * Inches(0.85)
        # Gold dot
        dot = slide.shapes.add_shape(1, Inches(0.6), top + Inches(0.15), Inches(0.12), Inches(0.12))
        dot.fill.solid(); dot.fill.fore_color.rgb = GOLD
        dot.line.fill.background()
        add_textbox(slide, b,
                    Inches(0.9), top, Inches(11.0), Inches(0.65),
                    font_name=FONT_BODY, font_size=16, color=CREAM_MID)

    # URL
    add_textbox(slide, "pacific-dermatology-g5jw.vercel.app",
                Inches(0.0), Inches(5.5), Inches(13.33), Inches(0.4),
                font_name=FONT_BODY, font_size=13,
                color=GOLD, align=PP_ALIGN.CENTER)

    # Gold bottom bar
    bar2 = slide.shapes.add_shape(1, 0, SLIDE_H - Inches(0.06), SLIDE_W, Inches(0.06))
    bar2.fill.solid(); bar2.fill.fore_color.rgb = GOLD
    bar2.line.fill.background()

    set_notes(slide,
        "CLOSE — word for word:\n\n"
        "'If you want to move forward, I can have this live under pacific-dermatology.com within a week. "
        "I just need DNS access on your end — it's about five minutes, I walk you through it.\n\n"
        "If you want some time to think or show your staff, totally fine — "
        "I'll send you the link right after this call so you can pull it up whenever.\n\n"
        "Either way, I appreciate you taking the time. Genuinely.'\n\n"
        "OBJECTION RESPONSES:\n"
        "• 'I already have a website' → 'I know — that's why I built this. Wanted to show you what it could look like.'\n"
        "• 'I don't get patients from my site' → 'That's partly because it's hard to find in Google. This is built to change that.'\n"
        "• 'Can I think about it?' → 'Of course — I'll send you the link right now.' Follow up in 3 days.\n"
        "• 'That seems expensive' → 'A single Sculptra or Kybella patient covers the whole build fee.'\n\n"
        "NOTE: Do NOT ask 'so what do you think?' Give a concrete next step (DNS) or a graceful out (share link). Both lead somewhere."
    )
```

- [ ] **Step 2: Append call in `__main__`**

After `slide_07_retainer(prs)`, append:
```python
    slide_08_close(prs)
```

- [ ] **Step 3: Run and verify**

```bash
cd /Users/kanuj/pacific-dermatology && python3 scripts/generate_pitch_deck.py && open docs/pitch/dr-fung-pitch.pptx
```

Expected: Slide 8 — gold bars top and bottom (matching slide 1), heading, two bullet points, live URL, all objection responses in speaker notes.

- [ ] **Step 4: Final full-deck verification**

Open `docs/pitch/dr-fung-pitch.pptx` and check every slide:
- [ ] 8 slides total, in correct order
- [ ] Every slide has a navy background and gold accents
- [ ] Every slide has speaker notes with script
- [ ] Slide 6 — "$750" is the dominant element, nothing else competes
- [ ] Slide 3 — near-blank, presenter cue only
- [ ] Fonts render correctly (if Montserrat is not installed, accept Calibri fallback)

- [ ] **Step 5: Commit**

```bash
cd /Users/kanuj/pacific-dermatology && git add scripts/generate_pitch_deck.py && git commit -m "feat: add slide 8 - close; pitch deck complete"
```

- [ ] **Step 6: Push**

```bash
cd /Users/kanuj/pacific-dermatology && git push origin main
```

---

## Post-Build Checklist

Before the Zoom call:

- [ ] Fill in the personal memory placeholder on Slide 1 (speaker notes)
- [ ] Take a full-page screenshot of `pacific-dermatology.com` and paste it into Slide 2 (replacing the placeholder box) — use browser dev tools or a tool like GoFullPage
- [ ] Run through all 8 slides once in presenter mode — check speaker notes are visible
- [ ] Have the live site open in a separate browser tab, ready to switch to on Slide 3
- [ ] Test the contact form on the live site before the call (Formspree endpoint working?)
