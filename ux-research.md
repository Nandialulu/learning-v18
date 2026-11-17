# UX Research Document — Learning

> **Version:** 1.0
> **Date:** 2026-08-07
> **Author:** UX Researcher (AI)
> **Based on:** business-requirements.md v1.0

---

## 1. Research Overview

### 1.1 Objectives
- Гар утасны хэрэглэгчдэд эхний 5 секундэд платформын зорилгыг ойлгомжтой харуулах.
- Learning платформын flashcard + quiz давуу талыг итгэл үнэмшилтэйгээр танилцуулах.
- Хэрэглэгчийг бүртгүүлэх, холбоо барих эсвэл курсын тухай дэлгэрэнгүй мэдээлэл авах үйлдэл рүү чиглүүлэх.
- Олон хэл (mn, en, ko, ja) болон соёлын онцлогийг дэмжсэн UI бүтээх.

### 1.2 Methodology
- Document analysis
- Stakeholder interview (plain-chat)
- Competitive analysis for microlearning platforms (Duolingo, Quizlet, Coursera)

### 1.3 Scope
- Шат 1: Learning брэндийн marketing/tanilcuulga website — homepage (hero, services, portfolio/subjects, contact).
- Шат 2: Бүрэн сургалтын платформ (курс, flashcard, quiz, progress) — одоогийн research-д хамаарахгүй, дараа өргөжүүлнэ.

### 1.4 Key Findings Summary
1. **Mobile-first:** Оюутнууд ихэвчлэн гар утас, таблет ашигладаг тул marketing сайт ч гар утанд эхлээд сайн харагдах ёстой.
2. **Microlearning messaging:** "Urт хичээл биш, товч ойлголт" гэдэг давуу талыг hero-д шууд харуулах нь чухал.
3. **Student motivation:** Оюутнууд шалгалтанд бэлтгэх, хичээлээ давтах, шинэ чадвар эзэмшихэд сургалт хэрэгтэй.
4. **Trust + social proof:** Subject/хичээлийн жагсаалт, онцлог давуу тал, холбоо барих хэсэг нь итгэл үнэмшил төрүүлнэ.
5. **Multi-language expansion:** mn/en/ko/ja хэлүүдэд хадгалалт, текст урт, font rendering анхаарах.

---

## 2. User Personas

### Persona 1: Enkhjin — Их сургуулийн оюутан

#### Demographics & Context
- **Age Range:** 18–24
- **Location:** Ulaanbaatar
- **Occupation:** Их сургуулийн 2-р курсын оюутан
- **Tech Proficiency:** Өндөр (гар утас өдөржин ашигладаг)
- **Primary Device:** Smartphone

#### Behavioral Patterns
- **Usage Frequency:** Хичээлийн завсарлага, оройн цагаар өдөрт 15–30 минут
- **Task Priorities:** 1) Хичээлээ давтах, 2) Quiz өгөх, 3) Flashcard үзэх
- **Decision Factors:** Үнэгүй/хямд, хөгжилтэй, хурдан
- **Pain Points:** Урт видео хичээл, ойлгомжгүй бүртгэл, хэт олон мэдээлэл
- **Motivations:** Шалгалтанд сайн бэлтгэх, цаг хэмнэх, ойлгомжтой тайлбар авах

#### Goals & Needs
- **Primary Goals:** Товч ойлголт, flashcard, quiz ашиглан хичээлээ давтах
- **Secondary Goals:** Өөрийн дэвшлийг хянах, найзаасаа илүү оноо авах (gamification)
- **Success Criteria:** 3 минутын дотор хичээл эхлүүлж чадна

#### Context of Use
- **Environment:** Их сургуулийн номын сан, оюутны байр, олон нийтийн тээвэр
- **Time Constraints:** Хичээл, хувийн ажлын завсар
- **Distractions:** Мессеж, сошиал медиа, найзууд

#### Quote
> "Би хичээлийнхээ завсарлагаар 10 минутын дотор чухал ойлголтоо flashcard-аар давтахыг хүсдэг."

---

### Persona 2: David — Олон улсын оюутан

#### Demographics & Context
- **Age Range:** 19–26
- **Location:** South Korea / Japan / International student
- **Occupation:** Их сургуулийн оюутан эсвэл шинэхэн төгсөгч
- **Tech Proficiency:** Өндөр
- **Primary Device:** Smartphone + laptop

#### Behavioral Patterns
- **Usage Frequency:** 5–7 удаа/долоо хоног
- **Task Priorities:** 1) Subject catalog харах, 2) Features ойлгох, 3) Contact/CTA
- **Decision Factors:** Credibility, design quality, mobile support, free tier
- **Pain Points:** Cluttered information, slow loading, hidden pricing
- **Motivations:** Exam prep, language learning, new skill building

#### Goals & Needs
- **Primary Goals:** Quickly understand platform value and available subjects
- **Secondary Goals:** Compare features, sign up or contact team
- **Success Criteria:** Finds relevant subject within 30 seconds

#### Context of Use
- **Environment:** Dorm, library, cafe
- **Time Constraints:** Between classes, study sessions
- **Distractions:** Social media, notifications

#### Quote
> "I need to see immediately what subjects are offered and why this platform is better than just reading textbooks."

---

## 3. Customer Journey Mapping

### Journey Overview
**Stages:** Discovery → Consideration → Conversion → Retention

### Stage 1: Discovery
- **Touchpoints:** Social media (Instagram, TikTok), campus groups, search engine, friend referral
- **User Actions:** Link дээр дарж сайт нээнэ
- **Emotions:** Сонирхолтой, түргэн шалгахыг хүснэ
- **Pain Points:** Удаан ачаалалт, hero-ийн мэссэж ойлгомжгүй
- **Opportunities:** Hero-д platform value proposition-г товч, хөгжилтэйгөөр харуулах

### Stage 2: Consideration
- **Touchpoints:** Homepage, features section, subjects portfolio
- **User Actions:** Доош scroll хийж, хичээлийн сэдвүүд, онцлогуудыг харна
- **Emotions:** Харьцуулж, итгэл үнэмшил хайна, хөгжилтэй байхыг хүснэ
- **Pain Points:** Мэдээлэл хэт олон, холбоо барих хэсэг хэцүү, үнэ тодорхойгүй
- **Opportunities:** Feature cards, subject portfolio, student testimonials, clear free tier messaging

### Stage 3: Conversion
- **Touchpoints:** CTA buttons, contact form, sign-up link
- **User Actions:** "Эхлэх" / "Бүртгүүлэх" дээр дарна
- **Emotions:** Шийдвэр гаргахад бэлэн
- **Pain Points:** Form олон талбартай, redirect unclear, email verification complicated
- **Opportunities:** Богино form (email/nuuts ug or social login), clear next step, playful confirmation

### Stage 4: Retention
- **Touchpoints:** Email reminders, progress dashboard, streak notifications, study group invites
- **User Actions:** Дахин орж ирж, шинэ хичээл үзнэ, quiz давтан өгнө
- **Emotions:** Амжилт, хөгжилтэй, өрсөлдөөн
- **Pain Points:** Progress not saved, no reminders, boring content
- **Opportunities:** Gamification, spaced repetition, study streaks (future app phase)

---

## 4. Information Architecture & Sitemap

### 4.1 Content Hierarchy

```text
/
├── Hero (value proposition + CTA)
├── Services / Features
│   ├── Flashcard-based learning
│   ├── Instant quiz feedback
│   ├── Progress tracking
│   └── Mobile-first experience
├── Portfolio / Subjects
│   ├── Mathematics
│   ├── Physics
│   ├── Programming
│   └── Language (English / Korean / Japanese)
└── Contact / CTA
```

### 4.2 Navigation Design
- **Primary Navigation:** Home, Features, Subjects, Contact
- **Secondary Navigation:** Language switcher (mn/en/ko/ja)
- **Footer Navigation:** Home, Features, Subjects, Contact, Privacy
- **Mobile Navigation:** Hamburger menu with language switcher

### 4.3 Content Organization Principles
- Homepage-ийн дээд хэсэгт value proposition + CTA
- Features болон Subjects хооронд ялгах, хоёуланг нь scan хийхэд хялбар
- Contact section footer-ийн дэргэдэх тусдаа биш, хамгийн доор хүчтэй CTA-аар

### 4.4 Search & Filter Strategy
- Шат 1-д хайлт/шүүлтүүр хэрэггүй (marketing site).
- Шат 2-д курс хайлт, subject filter, level filter нэмнэ.

---

## 5. Wireframe Guidance

### 5.1 Global Layout Structure
- **Header:** Fixed, transparent→solid on scroll, logo left, nav center/right, language switcher right
- **Footer:** Logo, nav links, social links, copyright
- **Content Width:** Max 1280px centered
- **Grid System:** 12-column grid, mobile 1-col, tablet 2-col, desktop 3–4-col

### 5.2 Section Layouts

#### Hero
- **Layout Type:** Full-width, centered or left-aligned content
- **Content Priority:** Headline → subheadline → primary CTA
- **Component Types:** Large text, decorative visual, CTA button
- **White Space:** Generous, 80–120px vertical padding
- **Responsive Behavior:** Text scales down, CTA stacks

#### Features (Services)
- **Layout Type:** 3–4 column grid
- **Content Priority:** Feature icon/title → description
- **Component Types:** Cards or icon blocks
- **White Space:** 48–64px between cards
- **Responsive Behavior:** 1 col mobile, 2 col tablet, 3 col desktop

#### Subjects (Portfolio)
- **Layout Type:** Grid or masonry
- **Content Priority:** Subject image/title → brief description
- **Component Types:** Cards, hover reveal
- **White Space:** 24px gap
- **Responsive Behavior:** 1 col mobile, 2 col tablet, 3–4 col desktop

#### Contact / CTA
- **Layout Type:** Centered or split
- **Content Priority:** Heading → description → CTA button/form
- **Component Types:** Form, button
- **White Space:** 80–120px vertical padding
- **Responsive Behavior:** Form stacks, button full-width on mobile

### 5.3 Content Priority
1. **Homepage:** Hero value prop → Features → Subjects → Contact CTA

### 5.4 Component Patterns
- **Cards:** Rounded corners (playful tone), soft shadows, hover lift
- **Lists:** Minimal bullet points, icon + text pairs
- **Forms:** Inline email + button, minimal labels
- **Media:** Subject imagery, icons, abstract shapes

---

## 6. Accessibility Requirements

### 6.1 WCAG 2.1 Level AA Compliance

| Requirement | Implementation | Priority |
|-------------|---------------|----------|
| Keyboard Navigation | All interactive elements accessible via keyboard | High |
| Screen Reader Support | ARIA labels, landmarks, skip links | High |
| Color Contrast | 4.5:1 for normal text, 3:1 for large text | High |
| Focus Indicators | Visible focus states on all interactive elements | High |
| Alt Text | Descriptive alt text for all images | High |
| Form Labels | All form inputs have associated labels | High |
| Text Resizing | Support 200% zoom without loss of function | Medium |
| Motion Sensitivity | Respect `prefers-reduced-motion` | Medium |

### 6.2 Multi-language Accessibility
- Text expansion allowance (Korean/Japanese may be compact, Mongolian may be longer)
- Font rendering for Cyrillic, Latin, Hangul, Kanji characters
- Language switcher visible on every page

### 6.3 Mobile Accessibility
- Touch targets at least 44x44px
- Alternatives for gesture-based interactions
- Allow zoom

---

## 7. Responsive Design Strategy

### 7.1 Breakpoints

| Breakpoint | Width | Target Devices | Layout Changes |
|-----------|-------|---------------|----------------|
| Mobile | 375px | Smartphones | Single column, stacked |
| Tablet | 768px | Tablets | Two columns, adjusted spacing |
| Desktop | 1280px | Laptops, desktops | Full multi-column layout |

### 7.2 Mobile-first Approach
- Design for mobile first, then expand to desktop.
- Hero text scales down but remains prominent.
- Feature cards stack vertically on mobile.
- Subject cards become 2-column on tablet.

### 7.3 Content Adaptation
- Reduce decorative elements on mobile.
- Keep CTA above the fold on mobile.
- Language switcher always accessible.

### 7.4 Performance Budget
- Mobile: < 1MB initial load, < 3s load time
- Desktop: < 2MB initial load, < 2s load time

---

## 8. Interaction & Motion Design

### 8.1 Animation Principles
- Playful tone: бүрэн хөдөлгөөнгүй биш, хөнгөн, уян хатан анимаци.
- Hero load animation: headline fade-in, staggered elements.
- Scroll-triggered reveals for features and subjects.

### 8.2 Micro-interactions

| Element | Trigger | Animation | Duration |
|---------|---------|-----------|----------|
| Buttons | Hover | Scale 1.02, shadow increase | 200ms |
| Cards | Hover | Lift, shadow | 250ms |
| Links | Hover | Color transition, underline | 150ms |
| Form Inputs | Focus | Border color, shadow | 200ms |
| Loading | Active | Spinner or skeleton | Continuous |

### 8.3 Page Transitions
- Subtle fade between pages (Next.js App Router transition).
- Respect reduced motion preference.

### 8.4 Scroll Behaviors
- Smooth scroll to sections from nav.
- Header background opacity on scroll.

---

## 9. Content Strategy & UX Writing

### 9.1 Tone of Voice
- **Playful + modern:** Хөнгөн, сургамжтай, хөгжилтэй.
- **Encouraging:** Хэрэглэгчийг сурахад уриална.
- **Concise:** Microlearning philosophy-г илэрхийлнэ.

### 9.2 Terminology

| Term | Usage | Avoid |
|------|-------|-------|
| Flashcard | Товч ойлголт судлах хэрэгсэл | "карт" гэдэг нь ойлгомжгүй |
| Quiz | Мэдлэгээ шалгах | "тест" (тийм ч буруу биш, quiz илүү хөгжилтэй) |
| Subject | Сургалтын сэдэв | "хичээл" (full lesson-тэй андуурч болно) |
| Progress | Дэвшил, явц | "түүх" (ambiguous) |

### 9.3 CTA Copy Guidelines
- Primary: "Эхлэх" / "Start Learning" / "Сурж эхлэх"
- Secondary: "Илүү мэдэх" / "Learn More" / "Дэлгэрэнгүй"
- Contact: "Холбогдох" / "Contact Us"

### 9.4 Multi-language UX Writing
- Keep CTA text short across all languages.
- Mongolian text may be longer; allow wrapping.
- Korean/Japanese: compact but ensure readability.

### 9.5 Error Messages
- Friendly, actionable.
- Example: "И-мэйл хаягаа шалгана уу." / "Please check your email address."

---

## 10. Usability Testing Plan

### 10.1 Test Scenarios
- Хэрэглэгч 5 секундэнд platform-ийн зорилгыг ойлгож чадна уу?
- Mobile дээр nav + language switcher ашиглах хялбар уу?
- Subject portfolio-оос хүсэж буй сэдвээ хурдан олж чадна уу?
- Contact form-ыг бөглөхөд ямар нэг асуудал гарч байна уу?

### 10.2 Testing Methods
- 5-second test
- Mobile navigation test
- Task-based usability test (find a subject, click CTA)

### 10.3 Success Metrics
- 80%+ users correctly identify platform purpose in 5 seconds
- 90%+ complete mobile navigation tasks
- Contact form completion rate > 50%

---

## 11. Competitive UX Analysis

| Competitor | Strengths | Weaknesses | Opportunities |
|-----------|-----------|------------|---------------|
| Duolingo | Gamification, mobile-first, addictive streaks | Language-only, repetitive | Apply gamification to academic subjects |
| Quizlet | Flashcard focus, simple study sets | Dated UI, limited quiz depth | Modern design + instant feedback |
| Khan Academy | Free, accessible, comprehensive | Long video lessons, child-oriented visuals | Tighter microlearning + student-friendly mobile UI |
| Anki | Spaced repetition, powerful | Steep learning curve, old UI | Simpler, more playful onboarding |
| Notion Study Templates | Flexible, customizable | Not a learning platform, requires setup | Pre-built flashcard + quiz flows for students |

---

## 12. Success Metrics & KPIs

### 12.1 UX Metrics
- Time to understand value (5-sec test pass rate)
- Scroll depth on homepage
- Mobile navigation task success
- CTA click-through rate

### 12.2 Business Metrics
- Contact/sign-up conversion rate
- Bounce rate
- Return visitor rate

### 12.3 Technical Metrics
- Mobile load time < 3s
- Lighthouse performance score > 80
- Accessibility score > 90

---

## 13. Design Agent Collaboration

Specialized design assistance may help with:
- Custom illustration or 3D visual for hero
- Playful animation direction
- Multi-language typography pairing

---

## 14. Assumptions & Constraints

### Assumptions
- Target users are students (university/college level), mobile-first.
- Playful tone will motivate students to study more frequently.
- Subjects will be academic: Mathematics, Physics, Programming, Language.
- Free tier is important for student adoption.

### Constraints
- Phase 1 is marketing site only; full app features deferred to Phase 2.
- CMS-driven content must support 4 languages.
- Must use erxes CMS for content management.

---

## 15. Next Steps

1. Present this UX research to stakeholder for confirmation.
2. Apply any requested revisions.
3. Proceed to Section B — Step 2 (Design) once approved.
