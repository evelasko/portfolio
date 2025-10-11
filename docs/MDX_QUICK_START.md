# MDX Quick Start Guide

Quick reference for creating and managing MDX content.

## Create New Article

**File**: `content/articles/en/my-article.mdx`

```mdx
---
title: "Article Title"
description: "Brief description"
publishedAt: "2025-01-15"
author: "Enrique Velasco"
category: "Development"
tags: ["Next.js", "React"]
featured: false
draft: false
alternateLocales:
  es: "mi-articulo"
---

# Heading

Your content here with **markdown** and *formatting*.

## Subheading

- List item 1
- List item 2

<Callout type="info" title="Note">
Important information
</Callout>

```typescript
const example = "code";
```
```

## Create New Work

**File**: `content/works/en/my-project.mdx`

```mdx
---
title: "Project Title"
description: "Project description"
publishedAt: "2025-01-10"
author: "Enrique Velasco"
category: "Web Development"
tags: ["Next.js"]
featured: false
draft: false
client: "Client Name"
role: "Developer"
technologies: ["Next.js", "TypeScript"]
duration: "2 months"
projectUrl: "https://example.com"
alternateLocales:
  es: "mi-proyecto"
---

# Project Overview

Project details...
```

## Available MDX Components

### Callout

```mdx
<Callout type="info|warning|success|error" title="Title">
Content
</Callout>
```

### Images

```mdx
![Alt text](/images/photo.jpg)
```

### Links

```mdx
[Internal link](/articles/other-post)
[External link](https://example.com)
```

### Code

````mdx
```typescript
const code = "example";
```
````

## Common Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Check for errors
npm run build
```

## Checklist for New Content

- [ ] File in correct directory: `content/{type}/{locale}/{slug}.mdx`
- [ ] All required frontmatter fields present
- [ ] `draft: false` to publish
- [ ] Spanish version created with matching `alternateLocales`
- [ ] Images added to `public/images/`
- [ ] Tested locally with `npm run dev`
- [ ] Build passes with `npm run build`

## File Naming

- ✅ Use lowercase with hyphens: `hello-world.mdx`
- ✅ Keep it concise and descriptive
- ❌ Avoid spaces: ~~`Hello World.mdx`~~
- ❌ Avoid special characters: ~~`hello_world!.mdx`~~

## Required Frontmatter Fields

### Articles & Works
- `title` (string)
- `description` (string)
- `publishedAt` (YYYY-MM-DD)
- `author` (string)
- `category` (string)
- `tags` (array)
- `draft` (boolean)

### Works Only
- `client` (string, optional)
- `role` (string, optional)
- `technologies` (array)
- `duration` (string, optional)
- `projectUrl` (URL, optional)

## URLs Generated

### Articles
- English: `/articles/slug` or `/en/articles/slug`
- Spanish: `/es/articles/slug`

### Works
- English: `/works/slug` or `/en/works/slug`
- Spanish: `/es/works/slug`

## Tips

1. **Preview Locally**: Always test with `npm run dev` before building
2. **Use Drafts**: Set `draft: true` while working on content
3. **Consistent Categories**: Reuse existing categories for proper grouping
4. **Meaningful Slugs**: Slugs become URLs, make them descriptive
5. **Translations**: Keep content structure similar across locales for better UX

## Getting Help

- Full documentation: [docs/MDX_SETUP.md](./MDX_SETUP.md)
- Example files: [content/articles/en/hello-world.mdx](../content/articles/en/hello-world.mdx)
- Component code: [src/components/mdx/](../src/components/mdx/)
