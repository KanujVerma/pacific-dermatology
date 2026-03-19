# Client Intake Questionnaire — Design Spec
**Date:** 2026-03-18
**Purpose:** A structured Google Form sent to prospective clients after they agree to have a website built. Answers feed directly to Claude to build the site without any follow-up calls needed.

---

## Overview

A 7-section Google Form with 80 questions covering everything needed to build a complete website from scratch. Sections are named and ordered so the client experiences a logical progression (who you are → what you want → what it should look like → what you need it to do → hand off your assets). Each section maps directly to a build concern.

**Estimated completion time:** 20–30 minutes
**Delivery method:** Google Form link sent after prospect signs
**Output:** Structured answers pasted to Claude as a build brief

---

## Section 1 — Business Basics
*Populates: site header, footer, contact page, meta info*

| # | Question | Format |
|---|----------|--------|
| 1 | Business name | Short text |
| 2 | Tagline or slogan (if you have one) | Short text |
| 3 | Industry / type of business | Dropdown: Medical/Health, Legal, Beauty/Wellness, Food & Beverage, Home Services, Retail, Professional Services, Other |
| 4 | Do you serve customers at one location, multiple locations, or remotely/online? | Multiple choice: One location, Multiple locations, Remotely / Online only |
| 5 | Business address(es) — list all locations if multiple | Long text |
| 6 | City, State | Short text |
| 7 | Phone number | Short text |
| 8 | Primary email address | Short text |
| 9 | Business hours | Long text (e.g. Mon–Fri 9am–5pm) |
| 10 | Do you have an existing website? | Yes / No |
| 11 | If yes, what's the URL? | Short text |

---

## Section 2 — Goals & Audience
*Populates: homepage headline, hero section, CTAs, overall site strategy*

| # | Question | Format |
|---|----------|--------|
| 12 | What is the #1 thing you want visitors to do on your site? | Multiple choice: Call us, Fill out a contact form, Book an appointment, Visit us in person, Buy a product, Other |
| 13 | If your homepage had one headline, what would it say? (We'll refine it — just give us a starting point) | Short text |
| 14 | Write 1–2 sentences that expand on that headline — the subheading visitors see first | Long text |
| 15 | What is the #1 problem your business solves for customers? | Long text |
| 16 | Who is your ideal customer? (age, lifestyle, situation) | Long text |
| 17 | What makes you different from competitors? | Long text |
| 18 | Are there any competitor websites you like or dislike? List URLs and note what you like/dislike about each | Long text |
| 19 | What words should people associate with your brand? | Checkboxes: Trustworthy, Luxury, Friendly, Professional, Modern, Affordable, Expert, Caring, Bold, Innovative |
| 20 | What is the one thing you want every visitor to walk away believing about your business? | Long text |
| 21 | Write 1–2 sentences for your website footer that summarize who you are and what you stand for (we'll draft one if you leave this blank) | Long text |

---

## Section 3 — Pages & Structure
*Populates: site navigation, page count, content scope*

| # | Question | Format |
|---|----------|--------|
| 22 | Which pages do you need? | Checkboxes: Home, About Us, Services/Menu, Individual Service Pages, Team/Staff, Testimonials/Reviews, Gallery/Portfolio, Blog, FAQ, Contact, Pricing, Other |
| 23 | Do you want a dedicated page per service, or one page listing all services? | Multiple choice: One page for all services, Separate page per service, Not sure |
| 24 | Do you want an About page focused on the business, the founder/owner, or both? | Multiple choice: The business, The founder/owner, Both |
| 25 | List all services or products you offer (one per line). Note: if you leave descriptions blank in Q26, we'll write them for you. | Long text |
| 26 | For each service above, write 2–3 sentences describing it (optional — leave blank and we'll draft based on service names) | Long text |
| 27 | Do you want a blog or news section? | Yes / No / Maybe later |
| 28 | Any pages or sections you've seen on other sites that you'd love to include? | Long text |

---

## Section 4 — Content
*Populates: all page copy, testimonials, team bios, stats, marquee, chat Q&A, FAQ*

| # | Question | Format |
|---|----------|--------|
| 29 | Who will write the copy (text) for the site? | Multiple choice: We'll provide it, You write it for us, Mix — we'll provide some, you write the rest |
| 30 | Do you have a bio or "About" write-up ready? | Yes / No |
| 31 | If yes, paste your bio or About write-up here | Long text |
| 32 | Do you have customer testimonials or reviews we can use? | Yes / No |
| 33 | If yes, paste up to 5 testimonials (name, city/location, and quote) | Long text |
| 34 | Do you have team/staff bios and headshots? | Yes / No / Not applicable |
| 35 | Do you have professional photos of your business, space, or work? | Yes / No — I'll need stock photos |
| 36 | Do you have a logo? | Yes / No |
| 37 | Provide up to 4 stats or numbers you're proud of. For each, give: the number, a suffix if needed (e.g. +, K+, %), and a short label. Example: "500 \| + \| Happy Patients" | Long text |
| 38 | List 4–6 short phrases that capture your brand's strengths (3–6 words each — used in a scrolling banner). Example: "Board-Certified Specialist", "Patient-Centered Care", "20 Years of Excellence" | Long text |
| 39 | Do you have a FAQ you'd like included? | Yes — I'll provide the Q&As / No |
| 40 | If yes, paste your FAQ questions and answers here | Long text |
| 41 | Any awards, certifications, or affiliations to highlight? | Long text |
| 42 | Are there any important policies or info visitors should know before contacting you? (e.g. insurance accepted, payment methods, service area, age restrictions) | Long text |
| 43 | Do you have any downloadable documents or forms you want linked on the site? (e.g. intake forms, brochures, menus, price lists) If yes, paste the URL(s) or note that you'll upload them | Long text |

---

## Section 5 — Design & Aesthetic
*Populates: color system, typography, layout mood, animation style*

| # | Question | Format |
|---|----------|--------|
| 44 | Do you have existing brand colors? | Yes — I'll provide hex codes / Yes — I'll describe them / No — I need you to choose |
| 45 | If yes, provide your brand color hex codes | Short text |
| 46 | What is the overall vibe you want? | Checkboxes (pick up to 3): Luxury & high-end, Clean & minimal, Warm & welcoming, Bold & confident, Soft & calming, Professional & corporate, Playful & energetic, Earthy & natural |
| 47 | Paste up to 3 website URLs (any industry) whose design you love — and note what you love about each | Long text |
| 48 | Paste up to 3 website URLs whose design you dislike — and note what you dislike | Long text |
| 49 | What font style fits your brand? | Multiple choice: Elegant serif (classic, refined — e.g. Playfair Display), Modern sans-serif (clean, minimal — e.g. Inter), Slab serif (bold, grounded — e.g. Merriweather), Not sure — you decide |
| 50 | How much animation do you want? | Multiple choice: Subtle (gentle fades only), Moderate (smooth reveals and transitions), Bold (impressive motion, parallax, scroll effects), None |
| 51 | How much white space do you prefer? | Multiple choice: Airy and spacious, Dense and content-rich, Somewhere in between |
| 52 | Any colors, styles, or looks you absolutely do NOT want? | Long text |

---

## Section 6 — Features & Functionality
*Populates: component list, integrations, interactive elements*

| # | Question | Format |
|---|----------|--------|
| 53 | Do you want a contact form? | Yes / No |
| 54 | Where should form submissions go? (email address) | Short text |
| 55 | Do you want an online booking/scheduling button? | Yes — I'll provide the booking link / No |
| 56 | If yes, paste your booking link (Calendly, Jane App, Acuity, etc.) | Short text |
| 57 | What should your primary call-to-action button say? (e.g. "Book Now", "Schedule a Consultation", "Get a Free Quote") | Short text |
| 58 | Is this a solo practitioner/individual, or a team/group business? | Multiple choice: Solo / just me, Small team (2–5 people), Larger team or group |
| 59 | Do you want a live chat or FAQ chat widget on the site? | Yes / No |
| 60 | If yes, list up to 8 common questions your customers ask along with your preferred answers | Long text |
| 61 | Do you want a reviews/testimonials carousel? | Yes / No |
| 62 | Do you want an embedded Google Map? | Yes / No |
| 63 | Do you want social media links in the header or footer? | Yes / No |
| 64 | Which social platforms? | Checkboxes: Instagram, Facebook, LinkedIn, TikTok, YouTube, X/Twitter, Yelp, Google Business |
| 65 | Paste the URL for each platform selected above (one per line, e.g. instagram.com/yourbusiness) | Long text |
| 66 | Do you want a photo gallery or before/after section? | Yes / No |
| 67 | Do you want a newsletter signup? | Yes / No |
| 68 | Do you want an announcement bar at the top of the site? | Yes / No |
| 69 | If yes, what should it say? | Short text |
| 70 | Any other features you've seen on websites you'd want? | Long text |

---

## Section 7 — Assets & Technical
*Populates: deployment, domain setup, asset library*

| # | Question | Format |
|---|----------|--------|
| 71 | Do you own a domain name already? | Yes / No — I need one |
| 72 | If yes, what is it? | Short text |
| 73 | Where is your domain registered? (GoDaddy, Namecheap, Google Domains, etc.) | Short text |
| 74 | Upload your logo file (PNG or SVG preferred) | File upload |
| 75 | Upload any photos you want used on the site | File upload (multiple) |
| 76 | Upload any brand guidelines or style documents (if you have them) | File upload |
| 77 | Are there any pages or content from your existing site you want carried over? | Yes — I'll describe below / No |
| 78 | If yes, describe what to carry over | Long text |
| 79 | When do you need the site live? | Date picker |
| 80 | Anything else you want us to know before we start building? | Long text |

---

## Design Rationale

- **Section order** follows a natural narrative arc: who you are → what you want → how it should look → what it needs to do → hand off your files. This reduces cognitive load for the client.
- **Mix of question types** (short text, long text, multiple choice, checkboxes, file upload) keeps the form engaging and prevents walls of open text fields.
- **80 questions across 7 sections** is comprehensive but completable in 20–30 minutes because roughly 60% of questions are quick-select, not essays. Long-text questions with high effort (service descriptions, FAQ) are marked as optional with a note that Claude will draft if left blank.
- **Design section (5)** is placed after goals and content so clients have already articulated their purpose before making aesthetic choices — this reduces arbitrary style decisions disconnected from business goals.
- **Design inspiration URLs** (Q47–48) are in Section 5 only, intentionally separated from competitor URLs (Q18 in Section 2). Section 2 is about strategy, Section 5 is about aesthetics.
- **Hero headline and subheading** (Q13–14) are surfaced early in Section 2 so the most prominent site element is never left to Claude to invent.
- **Stats format** (Q37) uses a structured pipe-delimited format so Claude receives a clean array, not a prose sentence to parse.
- **Marquee phrases** (Q38) are a distinct ask from stats and about-text — short brand signals for a scrolling ticker component.
- **Chat widget follow-up** (Q60) gates on Q59 and collects the actual Q&A content, so the chat response library is never invented.
- **CTA button copy** (Q57) is an explicit ask so no button label is invented by Claude.
- **Social media URLs** (Q65) follow the platform checkboxes (Q64) so footer/header links are always wired up with real URLs.
- **Policies & downloadable docs** (Q42–43) surface insurance info, payment terms, intake forms, and other content that varies by industry and cannot be assumed.
- **Solo vs. team** (Q58) informs copy voice ("I" vs. "we"), team page scope, and About section structure.
- **Testimonial format** (Q33) requests name, city/location, and quote so reviewer attribution is complete.
- **Q5 and Q6** ask for address and city/state separately — Q6 is used for structured metadata (page titles, schema markup) and avoids Claude having to parse city/state out of a full address string.
- **FAQ (Q39–40) and awards/certifications (Q41)** are gated optional fields — Q40 is shown only if Q39 is "Yes", so content is collected if it exists and silently skipped if not.
- **File uploads in Section 7** are last intentionally — clients gather assets while completing earlier sections.
