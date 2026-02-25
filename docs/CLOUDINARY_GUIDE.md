# Cloudinary Image Integration Guide

This guide explains how to use Cloudinary for optimized image delivery in your portfolio.

## Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [Using Images in MDX Content](#using-images-in-mdx-content)
- [Cover Images](#cover-images)
- [Advanced Usage](#advanced-usage)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

---

## Overview

**What is Cloudinary?**
Cloudinary is a cloud-based image management service that automatically optimizes images for web delivery.

**Benefits:**

- **85-90% smaller file sizes** through automatic compression
- **Faster page loads** via global CDN (300+ edge locations)
- **Automatic format conversion** (WebP, AVIF based on browser)
- **Responsive images** generated automatically
- **Zero manual optimization** required

**Current Cloud:** `evelasco` (configured in `.env.local`)

---

## Quick Start

### 1. Upload an Image to Cloudinary

**Option A: Via Cloudinary Dashboard**

1. Log in to [cloudinary.com](https://cloudinary.com)
2. Navigate to Media Library
3. Upload your image to the appropriate folder:
   - `articles/` for article images
   - `works/` for work/project images
4. Copy the image URL

**Option B: Via Upload API**

```bash
# Example using curl
curl -X POST "https://api.cloudinary.com/v1_1/evelasco/image/upload" \
  -F "file=@/path/to/image.jpg" \
  -F "folder=articles" \
  -F "upload_preset=unsigned_preset"
```

### 2. Use the Image in Your Content

**Simple reference (recommended):**

```mdx
---
coverImage: "articles/my-article-cover"
---

![Description](https://res.cloudinary.com/evelasco/image/upload/articles/screenshot.jpg)
```

**The system automatically adds:**

- Quality optimization (`q_auto`)
- Format conversion (`f_auto`)
- Responsive sizing
- Lazy loading

---

## Using Images in MDX Content

### Article/Work Cover Images

**In frontmatter:**

```yaml
---
title: "My Article"
coverImage: "articles/ai-choreographer"
# OR full URL:
coverImage: "https://res.cloudinary.com/evelasco/image/upload/v1/articles/ai-choreographer.jpg"
---
```

**What happens:**

- Automatically optimized to 800×450px for cards
- Cropped with AI-powered subject detection
- Converted to WebP/AVIF for modern browsers
- Delivered from nearest CDN edge

### Inline Images in MDX

**Standard markdown syntax:**

```mdx
![AI Choreography Demo](https://res.cloudinary.com/evelasco/image/upload/demos/ai-dance.jpg)
```

**With size specifications:**

```mdx
![Screenshot](https://res.cloudinary.com/evelasco/image/upload/demos/screenshot.jpg)

<!-- width="800" height="600" -->
```

**Local images still work:**

```mdx
![Local Image](/assets/images/fallback.jpg)
```

---

## Cover Images

### For Articles

**Recommended:**

```yaml
# Frontmatter in src/content/articles/{locale}/article-name.mdx
coverImage: "articles/my-article"
```

**Fallback:**
If no `coverImage` is provided, the system uses:

```url
https://res.cloudinary.com/evelasco/image/upload/v1760912221/eVelasco/covers/article-placeholder.jpg
```

### For Works

**Recommended:**

```yaml
# Frontmatter in src/content/works/{locale}/work-name.mdx
coverImage: "works/my-project"
```

**Fallback:**
If no `coverImage` is provided, the system uses:

```url
https://res.cloudinary.com/evelasco/image/upload/v1760912222/eVelasco/covers/work-placeholder.jpg
```

---

## Advanced Usage

### Manual Transformations

**Direct URL with transformations:**

```mdx
![Thumbnail](https://res.cloudinary.com/evelasco/image/upload/
c_fill,w_400,h_400,g_face,q_auto,f_auto/profile/headshot.jpg)
```

**Transformation parameters:**

- `c_fill` - Crop and fill to exact dimensions
- `w_400,h_400` - Width and height
- `g_face` - Focus on faces when cropping
- `g_auto:subject` - AI-powered subject detection
- `q_auto` - Automatic quality optimization
- `f_auto` - Automatic format (WebP/AVIF)
- `e_blur:1000` - Blur effect

### Utility Functions

**For advanced use cases, import helpers:**

```typescript
import { cloudinaryPresets, getOptimizedImageUrl } from "@/lib/cloudinary";

// Use preset
const thumbnailUrl = cloudinaryPresets.thumbnail("articles/my-article");

// Custom transformation
const customUrl = getOptimizedImageUrl("articles/my-article", {
  width: 1200,
  height: 800,
  crop: "fill",
  gravity: "auto:subject",
  quality: "auto:best",
});
```

---

## Best Practices

### Image Naming

**Good:**

- `articles/ai-choreographer-cover`
- `works/hey-siri-performance`
- `demos/webgl-globe-interaction`

**Avoid:**

- Generic names: `image1.jpg`, `photo.png`
- Spaces: `my article.jpg` (use `my-article.jpg`)
- Special characters: `article#1.jpg`

### Folder Structure

Organize images by type:

```tree
cloudinary.com/evelasco/
├── articles/          # Article cover images
│   ├── ai-choreographer
│   ├── building-community
│   └── ...
├── works/             # Work/project images
│   ├── hey-siri-cover
│   ├── bankai-performance
│   └── ...
├── demos/             # Screenshots, demos
├── profile/           # Profile photos
└── backgrounds/       # Background images
```

### Image Sizes

**Upload high-quality originals:**

- Minimum: 1600×900px for covers
- Recommended: 2400×1350px
- Maximum: 4000×2250px (diminishing returns beyond this)

**Why?** Cloudinary generates smaller versions automatically. You can't upscale later!

### File Formats

**Upload as:**

- JPEG for photos
- PNG for graphics with transparency
- SVG for logos/icons (if no raster effects needed)

**Cloudinary serves as:**

- WebP to Chrome/Edge
- AVIF to Safari
- JPEG/PNG to older browsers

---

## Optimization Cheat Sheet

### Quick Reference

| Use Case         | Transformation                            | Example      |
| ---------------- | ----------------------------------------- | ------------ |
| Article card     | `c_fill,w_800,h_450,g_auto,q_auto,f_auto` | Thumbnail    |
| Hero image       | `c_fill,w_1920,h_1080,q_auto:best,f_auto` | Full-width   |
| Profile photo    | `c_fill,w_400,h_400,g_face,q_auto,f_auto` | Square crop  |
| Mobile thumbnail | `c_fill,w_400,h_225,g_auto,q_auto,f_auto` | Small screen |

### Quality Settings

- `q_auto:best` - Highest quality (articles, hero images)
- `q_auto` - Balanced (default, recommended)
- `q_auto:eco` - Smaller files (thumbnails, backgrounds)
- `q_auto:low` - Blur placeholders only

---

## Troubleshooting

### Image Not Loading

**1. Check the URL format:**

```text
✅ https://res.cloudinary.com/evelasco/image/upload/articles/my-image
✅ articles/my-image
❌ cloudinary.com/articles/my-image
```

**2. Verify the image exists:**

- Log in to Cloudinary dashboard
- Check Media Library
- Confirm folder and filename match exactly

**3. Check browser console:**

- Open DevTools → Console
- Look for 404 errors
- Verify the full resolved URL

### Image Quality Issues

**Blurry images:**

- Upload a higher resolution source
- Use `q_auto:best` instead of `q_auto`

**Over-compressed:**

- Check if original is already low quality
- Try `q_80` for specific quality control

### Performance Issues

**Images loading slowly:**

- Cloudinary CDN should be fast globally
- Check Network tab in DevTools
- Verify `f_auto` is being applied (WebP/AVIF)

**Large file sizes:**

- Ensure `q_auto` and `f_auto` are in URL
- Check if original upload is unnecessarily large (>5MB)

---

## Component Reference

### CloudinaryImage

**Basic usage:**

```tsx
import { CloudinaryImage } from "@/components/mdx/CloudinaryImage";

<CloudinaryImage
  src="articles/my-article"
  alt="Article cover"
  width={800}
  height={450}
/>;
```

**With transformations:**

```tsx
<CloudinaryImage
  src="articles/my-article"
  alt="Article cover"
  width={800}
  height={450}
  crop="fill"
  gravity="auto:subject"
  quality="auto:best"
/>
```

### CloudinaryThumbnail

**Preset for cards:**

```tsx
import { CloudinaryThumbnail } from "@/components/mdx/CloudinaryImage";

<CloudinaryThumbnail src="articles/my-article" alt="Article cover" />;
// Automatically: 800x450, fill crop, AI focus, auto quality
```

---

## Examples

### Complete Article Example

```mdx
---
title: "AI as Co-Choreographer"
description: "Exploring AI in dance performance"
coverImage: "articles/ai-choreographer-cover"
publishedAt: "2024-03-15"
featured: true
---

# AI as Co-Choreographer

![Performance setup](https://res.cloudinary.com/evelasco/image/upload/
w_1200,h_675,c_fill,g_auto,q_auto:best,f_auto/articles/ai-setup.jpg)

The system uses motion capture to track...

![Data visualization](https://res.cloudinary.com/evelasco/image/upload/
w_800,h_600,c_fit,q_auto,f_auto/articles/data-viz.jpg)
```

### Complete Work Example

```mdx
---
title: "Hey Siri, do you love me?"
description: "Contemporary dance choreography"
coverImage: "works/hey-siri-cover"
client: "Ballet Fundación Alicia Alonso"
category: "Art + Technology"
featured: true
---

# Hey Siri, do you love me?

![Performance](https://res.cloudinary.com/evelasco/image/upload/
works/hey-siri-performance.jpg)
```

---

## Resources

- **Cloudinary Dashboard:** [cloudinary.com/console](https://cloudinary.com/console)
- **Transformation Reference:** [cloudinary.com/documentation/image_transformations](https://cloudinary.com/documentation/image_transformations)
- **Upload API:** [cloudinary.com/documentation/upload_images](https://cloudinary.com/documentation/upload_images)

---

## Questions?

For technical issues with the integration, check:

1. [src/components/mdx/CloudinaryImage.tsx](../src/components/mdx/CloudinaryImage.tsx) - Component implementation
2. [src/lib/cloudinary.ts](../src/lib/cloudinary.ts) - Utility functions
3. [Next.js Image docs](https://nextjs.org/docs/app/api-reference/components/image) - Next.js Image component
4. [next-cloudinary docs](https://next.cloudinary.dev/) - Next.js Cloudinary integration
