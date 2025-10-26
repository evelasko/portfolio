# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Package Manager**: This project uses **pnpm** (not npm or yarn).

### Running the Application

```bash
pnpm dev             # Start development server with debugging and Turbopack (port 3000)
pnpm build           # Build for production
pnpm start           # Run production build
pnpm clean           # Remove .next build artifacts
```

### Code Quality

```bash
pnpm lint            # Run ESLint
pnpm lint:fix        # Run ESLint and auto-fix issues
pnpm format          # Format all files with Prettier
pnpm format:check    # Check formatting without making changes
```

**Prettier Configuration:**

- Double quotes for strings
- Semicolons required
- 2 spaces for indentation
- 80 character line width
- Arrow functions without parentheses when possible

## High-Level Architecture

### Framework Stack

- **Next.js 15** with App Router
- **React 19**
- **TypeScript** with strict mode enabled
- **Tailwind CSS v4** with custom design system
- Path aliases: `@/*` maps to `./src/*`

### Core Libraries

- **Motion** (Framer Motion fork) - Animation library
- **Lenis** - Smooth scrolling
- **next-intl** - Internationalization (en/es locales, default: es)
- **Vercel Speed Insights** - Performance monitoring
- **Lucide React** - Icon library

### Design System

This project uses a **custom responsive typography system** that differs from standard Tailwind approaches:

#### Custom Breakpoints

- `s` (small): 0px - default/mobile
- `m` (medium): 810px - tablet
- `l` (large): 1200px - desktop

#### Typography System

All typography is managed through `src/lib/typography.ts` which exports the `TYPOGRAPHY` constant. This provides consistent responsive classes across:

- **9 heading levels** (h1-h9)
- **4 text sizes** (text20, text18, text16, text14)
- **5 monospace sizes** (mono24, mono20, mono18, mono16, mono14)
- **Menu and navbar styles**
- **4 link style variants**

**Always use `TYPOGRAPHY` constants for text styling:**

```tsx
import { TYPOGRAPHY } from "@/lib/typography";

<h1 className={TYPOGRAPHY.h1}>Main Heading</h1>
<p className={TYPOGRAPHY.text18}>Body text</p>
<code className={TYPOGRAPHY.mono16}>Code snippet</code>
```

Each typography constant includes three responsive classes:

```tsx
// Example: TYPOGRAPHY.h3 expands to:
"text-h3 text-h3-s m:text-h3-m l:text-h3-l";
```

#### Font Families

- **Sans-serif**: Plus Jakarta Sans (via `next/font/google`)
- **Monospace**: Fragment Mono (via `next/font/google`)

#### Color Palette

Primary colors defined in `src/app/globals.css`:

- Black scale: `black-10` through `black-100` (10 shades)
- White scale: `white-96`, `white-98`, `white-100`
- Accent: `orange-100` (#ff4400)

### Internationalization

The project uses **next-intl** for i18n:

- **Supported locales**: `en` (English), `es` (Spanish)
- **Default locale**: `es`
- **Locale prefix**: `as-needed` (default locale has no prefix)
- **Configuration**: `src/i18n/routing.ts`
- **Pathnames**: Localized routes defined in `src/i18n/pathnames.ts`

All page routes are under `src/app/[locale]/` and use the `useTranslations` hook for content:

```tsx
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations();
  return <h1>{t("homepage.title")}</h1>;
}
```

### Global Layout Context

The `LayoutContext` (`src/contexts/LayoutContext.tsx`) manages layout configuration across pages:

- Hero section reference for scroll detection
- NavBar visibility
- Footer visibility and variant (full | simple | minimal)

**Every page should configure layout in `useEffect`:**

```tsx
import { useLayout } from "@/contexts/LayoutContext";

export default function Page() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { setHeroRef, setShowNavBar, setShowFooter, setFooterVariant } = useLayout();

  useEffect(() => {
    setHeroRef(heroRef);
    setShowNavBar(true);
    setShowFooter(true);
    setFooterVariant("full");
  }, [setHeroRef, setShowNavBar, setShowFooter, setFooterVariant]);

  return (/* ... */);
}
```

### Component Organization

Components are organized by type in `src/components/`:

- **`banners/`** - Banner components (BlockQuoteBanner, ConnectBanner)
- **`buttons/`** - Button components (PortfolioButton, ArrowButton)
- **`cards/`** - Card components (ProjectCard, ThoughtCard, ImageCard, BentoGrid)
- **`heroes/`** - Hero sections (MainHero, MinimalHero, PhotoHero, ThoughtHero, AnimatedHero)
- **`list_items/`** - List item components (ProjectItem, SkillsItem, TestimonialItem)
- **`content_blocks/`** - Content blocks (ContentHeadingBlock, InfoTextBlock, InfoImageBlock, CardGrid)
- **`image_stripes/`** - Image stripe components (ImageSimpleStripe, LongStripe)
- **`layout/`** - Layout components (Footer, NavBar, LayoutContent)
- **`headings/`** - Heading components (MainHeading)
- **`misc/`** - Miscellaneous (Globe WebGL component, BioBlock)
- **`home/`** - Home page specific components
- **`graphics/`** - SVG graphic components
- **`mdx/`** - MDX-specific components for article/work content
- **`ui/`** - shadcn/ui components

### WebGL Globe Component

A custom WebGL globe implementation (`src/components/misc/Globe/`) features:

- Custom vertex and fragment shaders
- WebGL engine abstraction
- Shader uniform management
- Interactive dragging and rotation
- Custom hooks for engine lifecycle

Key files:

- `webgl/WebGLEngine.ts` - Core WebGL rendering engine
- `webgl/WebGLShader.ts` - Shader compilation and program management
- `hooks/useGlobeEngine.ts` - React hook for engine integration
- `webgl/shaders/` - GLSL shader code

## Key Development Patterns

### Animation with Motion

Use Motion for animations with spring physics:

```tsx
import { motion } from "motion/react";

<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8, ease: [0.44, 0, 0.56, 1] }}
>
  Content
</motion.div>;
```

### Smooth Scrolling

Lenis is configured globally in `src/app/[locale]/layout.tsx` via `<ReactLenis root>`.

### MDX Content System

The project uses MDX for blog articles and portfolio work content:

- **Content location**: `src/content/articles/` and `src/content/works/`
- **Structure**: Organized by locale (`en/`, `es/`) with `.mdx` files
- **Frontmatter**: YAML frontmatter with metadata (title, description, publishedAt, etc.)
- **Loading**: Custom MDX loader at `src/lib/mdx/loader.ts`
- **Rendering**: MDX rendering utilities at `src/lib/mdx/render.tsx`
- **Validation**: Zod schemas in `src/lib/mdx/validation.ts`

**Example content structure:**

```tree
src/content/
├── articles/
│   ├── en/
│   │   └── hello-world.mdx
│   └── es/
│       └── hola-mundo.mdx
└── works/
    ├── en/
    │   └── portfolio-website.mdx
    └── es/
        └── sitio-web-portafolio.mdx
```

**MDX frontmatter example:**

```yaml
---
title: "Article Title"
description: "Article description"
publishedAt: "2025-01-15"
author: "Enrique Velasco"
category: "Development"
tags: ["Next.js", "MDX", "React"]
featured: true
draft: false
alternateLocales:
  en: "slug-in-english"
---
```

### Image Management

- **Cloudinary Integration**: Images hosted on Cloudinary
- **Remote patterns**: Configured in `next.config.mjs` to allow `res.cloudinary.com`
- **next-cloudinary**: Library for optimized image delivery
- **Local images**: Static images in `public/` directory

### Demo Pages

Component demos are available at `/demo` routes:

- `/demo/styles` - Typography showcase
- `/demo/components` - Component library
- `/demo/components/[component-type]` - Individual component demos

## Project Structure

```tree
src/
├── app/              # Next.js App Router pages
│   ├── [locale]/     # Localized pages (en, es)
│   │   ├── page.tsx      # Homepage
│   │   ├── layout.tsx    # Locale layout with fonts and providers
│   │   ├── articles/     # Blog/thoughts pages
│   │   ├── works/        # Project portfolio pages
│   │   ├── bio/          # About page
│   │   └── legal/        # Legal pages (privacy, terms, imprint)
│   ├── demo/         # Component demo pages
│   └── globals.css   # Tailwind and custom styles
├── components/       # React components (organized by type)
├── content/          # MDX content files
│   ├── articles/     # Blog articles (en/, es/)
│   └── works/        # Portfolio work items (en/, es/)
├── contexts/         # React contexts (LayoutContext)
├── i18n/             # Internationalization configuration
│   ├── routing.ts    # next-intl routing configuration
│   ├── pathnames.ts  # Localized route definitions
│   └── navigation.ts # Localized navigation helpers
├── lib/              # Utilities
│   ├── mdx/          # MDX loading and rendering utilities
│   ├── typography.ts # Typography constants
│   ├── types/        # Shared TypeScript types
│   └── utils.ts      # Utility functions
├── messages/         # Translation files (en.json, es.json)
└── references/       # Reference implementations and examples
```

## Typography Usage Reference

Always import and use `TYPOGRAPHY` constants instead of writing classes manually:

```tsx
import { TYPOGRAPHY } from "@/lib/typography";
import clsx from "clsx";

// Headings
<h1 className={TYPOGRAPHY.h1}>Largest heading</h1>
<h6 className={TYPOGRAPHY.h6}>Smaller heading</h6>

// Body text
<p className={TYPOGRAPHY.text18}>Standard paragraph</p>
<span className={TYPOGRAPHY.text16}>Smaller text</span>

// Monospace
<code className={TYPOGRAPHY.mono16}>Code text</code>

// With additional classes
<h2 className={clsx(TYPOGRAPHY.h2, "text-orange-100")}>Colored heading</h2>

// Links
<a className={TYPOGRAPHY.linkWhiteToOrange}>Hover effect link</a>
```

## Translation Agents

Two specialized agents are available for translating articles from English to Spanish:

### 1. Single Article Translator (.claude/agents/translate-single-article.md)

Translates ONE specific article. Use for individual article translation.

**When to invoke:** User asks to translate a specific article.

**How to invoke:**

```typescript
Task(
  description: "Translate article: {slug}",
  subagent_type: "general-purpose",
  prompt: "Follow .claude/agents/translate-single-article.md to translate '{slug}' from English to Spanish. Config: translation-config.json. Report Spanish slug generated."
)
```

### 2. Translation Orchestrator (.claude/agents/article-translator.md)

Identifies all untranslated articles and orchestrates their translation by calling the single-article translator for each one.

**When to invoke:** User asks to:

- "update article translations"
- "translate missing articles"
- "translate all articles to Spanish"
- "sync article translations"

**How to invoke:**

```typescript
Task(
  description: "Translate all missing articles",
  subagent_type: "general-purpose",
  prompt: "Follow .claude/agents/article-translator.md to identify and translate all missing Spanish articles using the single-article translator."
)
```

**Key principle:** One agent call = one article translation (prevents wasteful DeepL API calls)

**Documentation:** See [TRANSLATION-GUIDE.md](TRANSLATION-GUIDE.md) for details.
