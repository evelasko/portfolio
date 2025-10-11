# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Running the Application

```bash
npm run dev          # Start development server with debugging and Turbopack
npm run build        # Build for production
npm start            # Run production build
npm run clean        # Remove .next build artifacts
```

### Code Quality

```bash
npm run lint         # Run ESLint
npm run lint:fix     # Run ESLint and auto-fix issues
npm run format       # Format all files with Prettier
npm run format:check # Check formatting without making changes
```

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

Lenis is configured globally in `src/app/layout.tsx` via `<ReactLenis root>`.

### Demo Pages

Component demos are available at `/demo` routes:

- `/demo/styles` - Typography showcase
- `/demo/components` - Component library
- `/demo/components/[component-type]` - Individual component demos

## Project Structure

```tree
src/
├── app/              # Next.js App Router pages
│   ├── page.tsx      # Homepage
│   ├── layout.tsx    # Root layout with fonts and providers
│   ├── globals.css   # Tailwind and custom styles
│   └── demo/         # Component demo pages
├── components/       # React components (organized by type)
├── contexts/         # React contexts (LayoutContext)
├── lib/              # Utilities
│   ├── typography.ts # Typography constants
│   ├── types.tsx     # Shared TypeScript types
│   └── utils.ts      # Utility functions
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
