# HANDOFF — Learning Website

## 0. Approval Record

- **Homepage options shown:** 3
  - Option A — Bright Playful (cream, violet, coral, yellow)
  - Option B — Dark Focus (dark, orange, minimal)
  - Option C — Colorful Swiss (white, bold color blocks)
- **Selected option:** Option A — Bright Playful
- **Preview artifact file paths:**
  - `output/learning/designs/homepage-option-a.png`
  - `output/learning/designs/homepage-option-b.png`
  - `output/learning/designs/homepage-option-c.png`
- **Final design export:** `output/learning/designs/design.png`
- **Pencil project paths used:**
  - Source/design workspace: `C:/Users/User/.pencil/documents/a4781df9-c512-450d-80dc-4e33fcd30b0b/pencil-new.pen`
- **Homepage previews covered:** Full homepage section flow (Header → Hero → Features → Subjects → CTA → Footer)
- **Full designed pages available:** Homepage, Services (Features), Portfolio (Subjects), Contact
- **Locked constraints:**
  - Primary color is violet `#5B4DFF`
  - Background is warm cream `#FDF8F3`
  - Rounded corners (12–24px) and pill buttons
  - Inter font family across all text
  - Playful, mobile-first tone

---

## 1. Design Summary

Learning is a student-focused microlearning platform marketing website. The visual direction is bright, playful, and mobile-first. The homepage introduces the platform value proposition, lists key features, showcases subject cards, and ends with a strong CTA. Inner pages expand the Features and Subjects sections into dedicated content pages and provide a contact form.

---

## 2. Visual Direction

- **Direction name:** Bright Playful
- **Concept:** Friendly, energetic study platform that feels light and approachable
- **Mood:** Positive, encouraging, clean, youthful
- **Typography:** Inter (Google Font) for display and body; bold headlines, readable body
- **Color energy:** Warm cream background with vivid violet primary, coral secondary, yellow accent
- **Layout feel:** Centered content, generous whitespace, rounded cards, pill buttons
- **Animation signature:** Fade-in-up on scroll, subtle card lift on hover, smooth page transitions
- **Complexity:** Medium — achievable with Tailwind + Framer Motion

---

## 3. Motion & Interaction

- **Motion level:** 2 (Alive)
- **Core library:** framer-motion
- **Scroll library:** lenis (for smooth scroll)
- **Page transitions:** Framer Motion `AnimatePresence` subtle fade
- **Micro-interactions:**
  - Buttons: scale 1.02 on hover, 0.98 on tap
  - Cards: lift -4px + shadow increase on hover
  - Links: underline/color transition on hover
- **Scroll animations:** Sections fade in + translate Y on scroll into view
- **Ambient motion:** Minimal — CSS-only decorative elements
- **Reduced motion:** Respect `prefers-reduced-motion` by disabling translate/scale animations

---

## 4. Typography

- **Font family:** Inter (weights 400, 500, 600, 700, 800)
- **Hero headline:** 80px / 800 weight / line-height 1.05
- **Section titles:** 44px / 700 weight
- **Card titles:** 22px / 700 weight
- **Body:** 15–20px / 400 weight / line-height 1.5
- **Labels/microcopy:** 12–13px / 500–600 weight
- **Multi-language:** Inter supports Latin, Cyrillic, and CJK characters. Verify Korean/Japanese rendering.

---

## 5. Color System

| Role | Hex | Token | Usage |
|------|-----|-------|-------|
| Background | `#FDF8F3` | `--background` | Page canvas |
| Foreground | `#1A1A2E` | `--foreground` | Headings, body text |
| Primary | `#5B4DFF` | `--primary` | CTA buttons, primary accents |
| Primary foreground | `#FFFFFF` | `--primary-foreground` | Text on primary |
| Secondary | `#FF6B6B` | `--secondary` | Secondary cards, highlights |
| Accent | `#FFD93D` | `--accent` | Tags, badges, focus states |
| Muted | `#6B7280` | `--muted-foreground` | Descriptions, secondary text |
| Border | `#E5E7EB` | `--border` | Card borders, input borders |
| Card | `#FFFFFF` | `--card` | Card surfaces |
| Surface | `#FFFFFF` | `--popover` | Form backgrounds |

---

## 6. Spacing & Radius

- **Section vertical padding:** 80px desktop, 48px mobile
- **Horizontal padding:** 60px desktop, 24px mobile
- **Content max-width:** 1000px
- **Card border radius:** 16px
- **Button border radius:** 9999px (pill)
- **Tag/badge border radius:** 9999px
- **Card gap:** 24px
- **Section gap:** 48px

---

## 7. Component Inventory

### Global
- **Header:** Fixed or sticky, logo left, nav center, language switcher right, transparent background over hero
- **Footer:** Logo left, copyright right, minimal
- **Language Switcher:** Pill button with current locale + dropdown indicator

### Homepage
- **Hero:** Tagline badge, large headline, subheadline, two CTA buttons, flashcard + quiz visual cards
- **Features Section:** 3-column feature cards (Flashcards, Instant Quiz, Track Progress)
- **Subjects Section:** 4-column subject cards (Mathematics, Physics, Programming, Language)
- **CTA Block:** Full-width violet card with heading, subtext, and pill button

### Services Page (`/services`)
- **Hero:** Page title "How Learning Works" + short description
- **Feature Detail Rows:** 3 large cards stacked vertically with icon dot, title, description
- **CTA:** Same violet CTA card

### Portfolio Page (`/portfolio`)
- **Hero:** Page title "Explore Subjects" + short description
- **Subject Grid:** 6 subject cards in 3-column grid (Mathematics, Physics, Programming, Language, Chemistry, Biology)
- **CTA:** "Can not Find Your Subject?" request card

### Contact Page (`/contact`)
- **Hero:** Page title "Get in Touch" + short description
- **Contact Form:** Name, Email, Message fields + submit button
- **Footer:** Minimal

---

## 8. Responsive Behavior

- **Desktop (1280px+):** Full multi-column grids, 1440px max-width
- **Tablet (768px–1279px):** 2-column grids, reduced headline size (56px)
- **Mobile (< 768px):** Single column, stacked nav hamburger, 40px section padding, 40px headline size
- **Touch targets:** Minimum 44x44px for buttons and interactive elements
- **Form:** Full-width inputs on mobile

---

## 9. Accessibility Notes

- WCAG 2.1 Level AA target
- Color contrast: violet on white passes, white on violet passes
- All interactive elements keyboard accessible
- Focus indicators visible on buttons, links, inputs
- Alt text for all subject/feature icons/decorations
- `prefers-reduced-motion` must disable motion animations
- Form labels associated with inputs

---

## 10. Frontend Build Map

```
app/
├── [locale]/
│   ├── page.tsx              # Homepage
│   ├── services/
│   │   └── page.tsx          # Services/features page
│   ├── portfolio/
│   │   └── page.tsx          # Subjects/portfolio page
│   └── contact/
│       └── page.tsx          # Contact page
components/
├── Header.tsx
├── Footer.tsx
├── Hero.tsx
├── FeatureCard.tsx
├── SubjectCard.tsx
├── CTABlock.tsx
├── ContactForm.tsx
├── LanguageSwitcher.tsx
└── SectionReveal.tsx         # Scroll animation wrapper
lib/
├── apollo/                   # erxes CMS queries
└── design-tokens.ts          # Token loader from design-tokens.json
```

---

## 11. erxes CMS Field Map

### Pages to seed

| Slug | Section | Purpose | Languages |
|------|---------|---------|-----------|
| `/` | homepage | Landing page with all sections | mn, en, ko, ja |
| `/services` | services | Feature detail page | mn, en, ko, ja |
| `/portfolio` | portfolio | Subjects listing page | mn, en, ko, ja |
| `/contact` | contact | Contact form page | mn, en, ko, ja |

### Homepage sections (in order)
1. Hero
2. Features (mapped to `services` section)
3. Subjects (mapped to `portfolio` section)
4. CTA / Contact block

### Menu structure

**Header menu:**
- Home → `/`
- Features → `/services`
- Subjects → `/portfolio`
- Contact → `/contact`

**Footer menu:**
- Home → `/`
- Features → `/services`
- Subjects → `/portfolio`
- Contact → `/contact`

### Translation expectations
- Default language: `mn` (Mongolian)
- Additional languages: `en`, `ko`, `ja`
- Slugs remain identical across all languages (e.g., `/mn/services` and `/en/services`)
- All menu labels, page titles, and CTA copy must be translated per locale

---

## 12. Content Strategy

### Tone
- Playful, encouraging, concise
- Avoid jargon; use student-friendly language
- Use active voice

### Key copy (English examples — to be translated)
- **Hero headline:** "Learn More in Less Time"
- **Hero subheadline:** "Flashcards and quizzes designed for busy students. Learn one concept at a time, get instant feedback, and track your progress."
- **CTA primary:** "Start Learning Free"
- **CTA secondary:** "Browse Subjects"
- **Features title:** "Everything You Need to Ace Your Exams"
- **Subjects title:** "Popular Subjects"
- **Final CTA:** "Ready to Start Studying Smarter?"

---

## 13. Source / Reference Notes

- Design created from scratch in Pencil based on the approved UX research and business requirements.
- No reference website was copied.
- The Pencil design file contains homepage direction previews and full page designs.

---

## 14. Next Steps

1. Review the final design in Pencil and exported `design.png`.
2. Confirm no further edits are needed.
3. Proceed to frontend implementation (Next.js + Tailwind + erxes CMS).
4. Seed CMS content for all 4 languages.
5. Build and deploy.
