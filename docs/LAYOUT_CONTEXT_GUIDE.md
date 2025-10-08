# Layout Context Pattern - Usage Guide

## Overview

This implementation uses React Context to provide maximum flexibility in configuring page layouts. Each page can independently control:

- **NavBar visibility** and hero-based behavior
- **Footer visibility** and variant (full/simple/minimal)
- **Hero reference** for scroll-based NavBar animations

## Architecture

```tree
RootLayout (layout.tsx)
└─ LayoutProvider (Context wrapper)
   └─ LayoutContent (Consumes context, renders NavBar/Footer)
      └─ Page Content
```

### Key Components

1. **LayoutContext** (`/src/contexts/LayoutContext.tsx`)
   - Provides layout configuration state
   - Exports `useLayout()` hook for pages to consume

2. **LayoutProvider** (in LayoutContext)
   - Wraps entire app in `layout.tsx`
   - Manages layout state

3. **LayoutContent** (`/src/components/layout/LayoutContent.tsx`)
   - Consumes layout context
   - Conditionally renders NavBar and Footer based on config

4. **Page Components**
   - Use `useLayout()` hook to configure their layout needs
   - Each page is independent and flexible

---

## Usage Examples

### 1. Home Page (Full Layout with Hero)

```tsx
"use client";

import { useRef, useEffect } from "react";
import { useLayout } from "@/contexts/LayoutContext";
import AnimatedHero from "@/components/home/AnimatedHero";

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { setHeroRef, setShowNavBar, setShowFooter, setFooterVariant } =
    useLayout();

  useEffect(() => {
    setHeroRef(heroRef); // Pass hero ref for NavBar scroll detection
    setShowNavBar(true); // Show navigation
    setShowFooter(true); // Show footer
    setFooterVariant("full"); // Full footer with all info
  }, [setHeroRef, setShowNavBar, setShowFooter, setFooterVariant]);

  return (
    <>
      <AnimatedHero heroRef={heroRef} {...heroProps} />
      {/* Other content */}
    </>
  );
}
```

### 2. About Page (Simple Footer, No Hero)

```tsx
"use client";

import { useEffect } from "react";
import { useLayout } from "@/contexts/LayoutContext";

export default function AboutPage() {
  const { setShowNavBar, setShowFooter, setFooterVariant } = useLayout();

  useEffect(() => {
    setShowNavBar(true);
    setShowFooter(true);
    setFooterVariant("simple"); // Simpler footer variant
  }, [setShowNavBar, setShowFooter, setFooterVariant]);

  return <div>{/* Page content */}</div>;
}
```

### 3. Blog Post (Minimal Footer)

```tsx
"use client";

import { useEffect } from "react";
import { useLayout } from "@/contexts/LayoutContext";

export default function BlogPostPage() {
  const { setShowNavBar, setShowFooter, setFooterVariant } = useLayout();

  useEffect(() => {
    setShowNavBar(true);
    setShowFooter(true);
    setFooterVariant("minimal"); // Just copyright and back-to-top
  }, [setShowNavBar, setShowFooter, setFooterVariant]);

  return <article>{/* Blog content */}</article>;
}
```

### 4. Contact Form (No Nav/Footer)

```tsx
"use client";

import { useEffect } from "react";
import { useLayout } from "@/contexts/LayoutContext";

export default function ContactFormPage() {
  const { setShowNavBar, setShowFooter } = useLayout();

  useEffect(() => {
    setShowNavBar(false); // Hide navigation
    setShowFooter(false); // Hide footer

    // Cleanup: restore defaults when unmounting
    return () => {
      setShowNavBar(true);
      setShowFooter(true);
    };
  }, [setShowNavBar, setShowFooter]);

  return <form>{/* Form content */}</form>;
}
```

---

## Layout Configuration Options

### NavBar Configuration

| Property     | Type                                | Description                                           |
| ------------ | ----------------------------------- | ----------------------------------------------------- |
| `showNavBar` | `boolean`                           | Show/hide the navigation bar                          |
| `heroRef`    | `RefObject<HTMLDivElement \| null>` | Reference to hero section for scroll-based animations |

**NavBar Behavior:**

- **With heroRef**: Logo hidden when hero in view, shown when scrolled past
- **Without heroRef**: Logo always visible, standard behavior
- Hides on scroll down, shows on scroll up (when `showNavBar: true`)

### Footer Configuration

| Property        | Type      | Options                             | Description             |
| --------------- | --------- | ----------------------------------- | ----------------------- |
| `showFooter`    | `boolean` | `true` / `false`                    | Show/hide footer        |
| `footerVariant` | `string`  | `"full"` / `"simple"` / `"minimal"` | Footer complexity level |

**Footer Variants:**

1. **`"full"`** (Default)
   - Heading
   - Email + Phone (with copy buttons)
   - Current time display
   - Full address
   - All social links
   - Legal links
   - Copyright + Back to top

2. **`"simple"`**
   - Heading
   - Email + Phone
   - City only (no full address)
   - Limited social links (2-3 main ones)
   - Copyright + Back to top

3. **`"minimal"`**
   - Copyright only
   - Back to top button
   - Perfect for blog posts, articles, focused content

---

## Best Practices

### 1. **Always Use useEffect for Configuration**

```tsx
useEffect(() => {
  setShowNavBar(true);
  setFooterVariant("simple");
}, [setShowNavBar, setFooterVariant]);
```

This ensures configuration happens after mount and avoids hydration issues.

### 2. **Cleanup When Hiding Nav/Footer**

If hiding NavBar or Footer, restore defaults on unmount:

```tsx
useEffect(() => {
  setShowNavBar(false);

  return () => {
    setShowNavBar(true); // Restore for next page
  };
}, [setShowNavBar]);
```

### 3. **Hero Reference Pattern**

Only pass `heroRef` if your page has a hero section:

```tsx
const heroRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  setHeroRef(heroRef); // Only if you have a hero
}, [setHeroRef]);

return <AnimatedHero heroRef={heroRef} />;
```

### 4. **Page-Specific Defaults**

Each page should explicitly set its layout needs:

```tsx
// ❌ Bad - Relying on defaults
useEffect(() => {
  // Nothing set, using defaults
}, []);

// ✅ Good - Explicit configuration
useEffect(() => {
  setShowNavBar(true);
  setShowFooter(true);
  setFooterVariant("full");
}, [setShowNavBar, setShowFooter, setFooterVariant]);
```

---

## Extending the Pattern

### Adding New Footer Variants

1. Update `LayoutConfig` interface in `LayoutContext.tsx`:

   ```tsx
   footerVariant: "full" | "simple" | "minimal" | "custom";
   ```

2. Add variant in `LayoutContent.tsx`:

   ```tsx
   {
     config.footerVariant === "custom" && <Footer {...customProps} />;
   }
   ```

### Adding New Layout Options

Extend the context with new configuration:

```tsx
interface LayoutConfig {
  heroRef: RefObject<HTMLDivElement | null>;
  showNavBar: boolean;
  showFooter: boolean;
  footerVariant: "full" | "simple" | "minimal";

  // NEW OPTIONS
  navBarVariant?: "default" | "transparent" | "dark";
  showSidebar?: boolean;
  contentWidth?: "full" | "contained";
}
```

---

## Troubleshooting

### NavBar not responding to hero scroll

**Issue:** NavBar doesn't change behavior when scrolling past hero.

**Solution:** Ensure you're passing `heroRef` to the context:

```tsx
const heroRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  setHeroRef(heroRef); // ← Make sure this is called
}, [setHeroRef]);

// And pass to AnimatedHero
<AnimatedHero heroRef={heroRef} />;
```

### Layout not updating when navigating between pages

**Issue:** Previous page's layout configuration persists.

**Solution:** Either:

1. Set explicit configuration in every page's `useEffect`
2. Use cleanup functions to restore defaults

### "useLayout must be used within LayoutProvider" error

**Issue:** Trying to use `useLayout()` outside of `LayoutProvider`.

**Solution:** Ensure `LayoutProvider` wraps your app in `layout.tsx`:

```tsx
<LayoutProvider>
  <LayoutContent>{children}</LayoutContent>
</LayoutProvider>
```

---

## Performance Considerations

1. **Context updates are efficient** - Only affected components re-render
2. **useEffect with proper dependencies** - Avoids unnecessary updates
3. **Ref updates don't trigger re-renders** - `heroRef` updates are performant

---

## Migration Guide

### Moving from Page-Level NavBar to Context

**Before:**

```tsx
<NavBar links={links} heroRef={heroRef} />
<AnimatedHero heroRef={heroRef} />
```

**After:**

```tsx
// In page component
const { setHeroRef } = useLayout();
useEffect(() => {
  setHeroRef(heroRef);
}, [setHeroRef]);

<AnimatedHero heroRef={heroRef} />;
// NavBar is now in Layout, no need to include here
```

---

## Examples in Codebase

- `/app/page.tsx` - Full layout with hero
- `/app/about/page.tsx` - Simple footer variant
- `/app/blog-example/page.tsx` - Minimal footer variant
- `/app/contact-form-example/page.tsx` - No nav/footer

---

## Summary

The Context pattern provides:

✅ **Centralized** NavBar and Footer management  
✅ **Flexible** per-page configuration  
✅ **Type-safe** with TypeScript  
✅ **DRY** - No component repetition  
✅ **Scalable** - Easy to extend with new options  
✅ **Clean** - Pages only declare what they need
