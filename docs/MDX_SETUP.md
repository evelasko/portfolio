# MDX Content Management System

This document describes the MDX-based content management system implemented for this Next.js portfolio with internationalization support via next-intl.

## Overview

The MDX system provides a powerful, file-based content management solution that:
- ✅ Supports internationalization (English & Spanish)
- ✅ Type-safe frontmatter validation with Zod
- ✅ Automatic reading time calculation
- ✅ Category-based organization
- ✅ Locale switching between translated content
- ✅ SEO metadata generation
- ✅ Custom React components in MDX
- ✅ Full TypeScript support

## Directory Structure

```
content/
├── articles/
│   ├── en/
│   │   ├── hello-world.mdx
│   │   └── ...
│   └── es/
│       ├── hola-mundo.mdx
│       └── ...
└── works/
    ├── en/
    │   ├── portfolio-website.mdx
    │   └── ...
    └── es/
        ├── sitio-web-portafolio.mdx
        └── ...
```

## Creating Content

### Article Frontmatter

Create a new article at `content/articles/{locale}/{slug}.mdx`:

```mdx
---
title: "Your Article Title"
description: "A concise description of your article"
publishedAt: "2025-01-15"
updatedAt: "2025-01-20" # Optional
author: "Enrique Velasco"
category: "Development" # Used for grouping
tags: ["Next.js", "MDX", "React"]
featured: true # Shows "Featured" badge
draft: false # Set to true to hide
coverImage: "/images/articles/cover.jpg" # Optional
readingTime: 8 # Optional, calculated automatically if omitted
seo: # Optional SEO overrides
  keywords: ["nextjs", "mdx"]
  ogImage: "/og/article.jpg"
  ogDescription: "Custom OG description"
alternateLocales: # For locale switching
  es: "hola-mundo" # Slug of Spanish version
---

# Your Article Content

Write your article content here using Markdown and JSX components...
```

### Work/Project Frontmatter

Create a new work at `content/works/{locale}/{slug}.mdx`:

```mdx
---
title: "Project Title"
description: "Project description"
publishedAt: "2025-01-10"
author: "Enrique Velasco"
category: "Web Development"
tags: ["Next.js", "Design"]
featured: true
draft: false
client: "Client Name" # Work-specific
role: "Full-Stack Developer" # Work-specific
technologies: ["Next.js 15", "React 19", "TypeScript"] # Work-specific
duration: "2 months" # Work-specific
projectUrl: "https://example.com" # Work-specific, optional
coverImage: "/images/works/project.jpg"
alternateLocales:
  es: "proyecto"
---

# Project Details

Your project case study content...
```

## Using Custom MDX Components

The system provides several custom components you can use in your MDX content:

### Callout Component

```mdx
<Callout type="info" title="Note">
This is an informational callout box.
</Callout>

<Callout type="warning" title="Warning">
Be careful with this!
</Callout>

<Callout type="success" title="Success">
Great job!
</Callout>

<Callout type="error" title="Error">
Something went wrong.
</Callout>
```

### Code Blocks

Use standard Markdown code fences with language specification:

````mdx
```typescript
interface User {
  name: string;
  email: string;
}

const user: User = {
  name: "Enrique",
  email: "hello@example.com"
};
```
````

### Images

Images are automatically optimized:

```mdx
![Alt text](/images/example.jpg)
```

For more control:

```mdx
<img src="/images/example.jpg" alt="Description" width="800" height="600" />
```

### Links

Internal links are automatically locale-aware:

```mdx
[Read more](/articles/another-post)
```

External links open in new tabs:

```mdx
[Visit Example](https://example.com)
```

## Programmatic Access

### Loading Content in Components

```typescript
import { getAllArticles, getArticleData } from "@/lib/mdx";

// Get all articles for a locale
const articles = await getAllArticles("en", {
  includeDrafts: false,
  sortBy: "publishedAt",
  sortOrder: "desc",
  category: "Development", // Optional filter
  featured: true, // Optional filter
});

// Get a specific article
const article = await getArticleData("en", "hello-world");
```

### Rendering MDX Content

```typescript
import { compileMDXContent } from "@/lib/mdx";
import { getMDXComponents } from "@/components/mdx";

// Compile MDX to React
const { content } = await compileMDXContent(
  articleData.content,
  getMDXComponents()
);

// Render
return <div>{content}</div>;
```

## Locale Switching

When a user switches locales while viewing content, the system attempts to redirect to the corresponding translated version:

```typescript
import { getAlternateLocaleSlug } from "@/lib/mdx";

const alternateSlug = await getAlternateLocaleSlug(
  "article", // or "work"
  "en", // current locale
  "hello-world", // current slug
  "es" // target locale
);

if (alternateSlug) {
  // Redirect to /es/articles/hola-mundo
  redirect(`/${targetLocale}/articles/${alternateSlug}`);
} else {
  // Fallback to listing page
  redirect(`/${targetLocale}/articles`);
}
```

## Categories

Get all categories for a content type:

```typescript
import { getContentCategories } from "@/lib/mdx";

const categories = await getContentCategories("article", "en");
// Returns: [{ name: "Development", slug: "development", count: 5, locale: "en" }, ...]
```

## Type Safety

All frontmatter is validated using Zod schemas:

```typescript
import { ArticleFrontmatterSchema, WorkFrontmatterSchema } from "@/lib/mdx";

// Validate article frontmatter
const result = ArticleFrontmatterSchema.safeParse(data);
if (result.success) {
  // result.data is type-safe
}
```

## Search Preparation

The frontmatter includes fields to prepare for search functionality:

- `title` - Primary search field
- `description` - Search description
- `tags` - Array of searchable tags
- `category` - Category filter
- Full MDX `content` - Can be indexed for full-text search

A search index builder can process all content:

```typescript
import { getAllArticles, getAllWorks } from "@/lib/mdx";

// Build search index
const articles = await getAllArticles("en");
const works = await getAllWorks("en");

const searchIndex = [...articles, ...works].map((item) => ({
  type: item.frontmatter.contentType,
  slug: item.slug,
  title: item.frontmatter.title,
  description: item.frontmatter.description,
  tags: item.frontmatter.tags,
  category: item.frontmatter.category,
  // Extract plain text from MDX for full-text search
  content: stripMarkdown(item.content),
  url: `/${item.locale}/${item.type}s/${item.slug}`,
}));
```

## Routes

The MDX system creates the following routes:

### Articles
- `/articles` or `/es/articles` - Listing page
- `/articles/[slug]` or `/es/articles/[slug]` - Article detail

### Works
- `/works` or `/es/works` - Listing page
- `/works/[slug]` or `/es/works/[slug]` - Work detail

All routes support both locales with appropriate prefixes.

## Best Practices

1. **Consistent Slugs**: Use lowercase, hyphenated slugs (e.g., `hello-world`, not `Hello_World`)

2. **Alternate Locales**: Always provide `alternateLocales` mapping for content available in multiple languages

3. **Cover Images**: Use optimized images and provide appropriate dimensions

4. **Categories**: Use consistent category names across content for proper grouping

5. **Tags**: Use lowercase tags for consistency

6. **Draft Mode**: Use `draft: true` for unpublished content during development

7. **Reading Time**: Let the system calculate reading time automatically unless you have a specific requirement

8. **SEO**: Provide meaningful titles and descriptions; use the `seo` field for overrides when needed

## File Organization Tips

```
content/
├── articles/
│   ├── en/
│   │   ├── 2025-01-hello-world.mdx      # Prefix with date
│   │   ├── 2025-02-react-patterns.mdx
│   │   └── ...
│   └── es/
│       ├── 2025-01-hola-mundo.mdx
│       ├── 2025-02-patrones-react.mdx
│       └── ...
└── works/
    ├── en/
    │   ├── 01-portfolio-website.mdx      # Prefix with number
    │   ├── 02-ecommerce-platform.mdx
    │   └── ...
    └── es/
        ├── 01-sitio-web-portafolio.mdx
        ├── 02-plataforma-ecommerce.mdx
        └── ...
```

## Troubleshooting

### Content Not Appearing

1. Check that `draft: false` in frontmatter
2. Verify file is in correct directory: `content/{type}/{locale}/{slug}.mdx`
3. Ensure frontmatter is valid (check for syntax errors)
4. Run build to see validation errors: `npm run build`

### Locale Switching Not Working

1. Ensure `alternateLocales` is defined in both language versions
2. Verify slugs match exactly what's in the frontmatter
3. Check that both MDX files exist

### Build Errors

1. Validate frontmatter schema matches requirements
2. Check for invalid dates (use `YYYY-MM-DD` format)
3. Ensure all required fields are present
4. Look for unclosed JSX tags in MDX content

## Extending the System

### Adding a New Content Type

1. Create new directory: `content/new-type/{locale}/`
2. Add type to `ContentType` union in [src/lib/mdx/types.ts](../src/lib/mdx/types.ts)
3. Create Zod schema for frontmatter
4. Add loader functions in [src/lib/mdx/loader.ts](../src/lib/mdx/loader.ts)
5. Create pages at `src/app/[locale]/new-type/`

### Adding Custom MDX Components

1. Create component in [src/components/mdx/](../src/components/mdx/)
2. Add to `getMDXComponents()` in [src/components/mdx/MDXComponents.tsx](../src/components/mdx/MDXComponents.tsx)
3. Use in MDX files: `<YourComponent prop="value" />`

## Example Workflows

### Publishing a New Article

1. Create `content/articles/en/my-article.mdx`
2. Write content and frontmatter
3. Create Spanish version `content/articles/es/mi-articulo.mdx`
4. Add `alternateLocales` to both files
5. Test locally: `npm run dev`
6. Build: `npm run build`
7. Commit and deploy

### Updating Existing Content

1. Edit the MDX file
2. Update `updatedAt` in frontmatter
3. Build and deploy

### Featuring Content

Set `featured: true` in frontmatter to highlight content in listings.

---

For more information, see the implementation files:
- [src/lib/mdx/](../src/lib/mdx/) - Core MDX utilities
- [src/components/mdx/](../src/components/mdx/) - MDX components
- [content/](../content/) - Example content files
