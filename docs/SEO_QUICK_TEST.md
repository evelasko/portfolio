# SEO Quick Test Guide

**Run this immediately after deployment to verify SEO is working.**

---

## 🚀 5-Minute Validation

### Step 1: Build and Preview (30 seconds)

```bash
pnpm build
pnpm start
```

Visit: http://localhost:3000/

### Step 2: View Source (30 seconds)

**In browser:** Right-click → "View Page Source" (or Cmd+U / Ctrl+U)

**Look for these in `<head>`:**

```html
✅ <link rel="canonical" href="https://evelas.co/" /> ✅
<link rel="alternate" hreflang="en" href="..." /> ✅
<link rel="alternate" hreflang="es" href="..." /> ✅
<meta property="og:title" content="..." /> ✅
<meta property="og:image" content="..." /> ✅
<meta name="twitter:card" content="summary_large_image" />
```

**Look for JSON-LD schemas in `<body>`:**

```html
✅
<script type="application/ld+json">
  {"@context":"https://schema.org","@type":"Person"...}
</script>
✅
<script type="application/ld+json">
  {"@context":"https://schema.org","@type":"WebSite"...}
</script>
```

### Step 3: Test with Google (2 minutes)

1. Deploy to production
2. Go to: **https://search.google.com/test/rich-results**
3. Enter: `https://evelas.co/`
4. Wait for results

**Expected:**

- ✅ Person schema ✓ Valid
- ✅ WebSite schema ✓ Valid
- ✅ 0 errors

### Step 4: Test an Article (2 minutes)

1. Go to: **https://search.google.com/test/rich-results**
2. Enter: `https://evelas.co/articles/hello-world` (or any article)
3. Wait for results

**Expected:**

- ✅ BlogPosting/Article schema ✓ Valid
- ✅ BreadcrumbList schema ✓ Valid
- ✅ 0 errors

---

## ⚡ One-Line Checks

### Check Homepage Metadata

```bash
curl -s https://evelas.co/ | grep -o '<meta property="og:title"[^>]*>' | head -1
```

**Should show:** `<meta property="og:title" content="Enrique Velasco - ...">`

### Check Homepage JSON-LD

```bash
curl -s https://evelas.co/ | grep -o '"@type":"Person"' | head -1
```

**Should show:** `"@type":"Person"`

### Check Article Schema

```bash
curl -s https://evelas.co/articles/hello-world | grep -o '"@type":"BlogPosting"' | head -1
```

**Should show:** `"@type":"BlogPosting"`

### Check Canonical URL

```bash
curl -s https://evelas.co/bio | grep -o '<link rel="canonical"[^>]*>'
```

**Should show:** `<link rel="canonical" href="https://evelas.co/bio"/>`

---

## 🎯 Critical Pages to Test

| Page         | URL                                         | Expected Schemas            |
| ------------ | ------------------------------------------- | --------------------------- |
| Homepage     | `https://evelas.co/`                        | Person, WebSite             |
| Bio          | `https://evelas.co/bio`                     | Person, BreadcrumbList      |
| Article (EN) | `https://evelas.co/en/articles/hello-world` | BlogPosting, BreadcrumbList |
| Article (ES) | `https://evelas.co/articles/hola-mundo`     | BlogPosting, BreadcrumbList |
| Work         | `https://evelas.co/works/[any-work]`        | BreadcrumbList              |

---

## ✅ Quick Checklist

- [ ] Homepage has Person + WebSite schemas
- [ ] Bio page has Person schema with contact info
- [ ] Articles have BlogPosting + BreadcrumbList
- [ ] Works have BreadcrumbList
- [ ] All pages have canonical URL
- [ ] All pages have hreflang tags (en, es, x-default)
- [ ] All pages have OpenGraph image
- [ ] Twitter card is `summary_large_image`
- [ ] Google Rich Results Test shows 0 errors
- [ ] Social sharing preview looks good (Facebook/LinkedIn)

---

## 🚨 Red Flags (Fix Immediately)

| Issue                                         | Fix                                                      |
| --------------------------------------------- | -------------------------------------------------------- |
| No `<script type="application/ld+json">` tags | Check build output, verify JsonLd component is rendering |
| No canonical URL                              | Check generateMetadata is being called                   |
| No hreflang tags                              | Check generateAlternates is working                      |
| "Image not accessible" error                  | Verify Cloudinary URLs are public                        |
| "Missing required field"                      | Check MDX frontmatter completeness                       |
| Multiple canonical tags                       | Remove duplicate metadata sources                        |

---

## 📊 What Success Looks Like

### In Browser DevTools

```html
<head>
  <meta charset="utf-8" />
  <title>Enrique Velasco - Creative Technologist</title>
  <meta
    name="description"
    content="Harmonious Engineer: Bridging Dance, Code..."
  />

  <!-- Canonical + Hreflang -->
  <link rel="canonical" href="https://evelas.co/" />
  <link rel="alternate" hreflang="en" href="https://evelas.co/en/" />
  <link rel="alternate" hreflang="es" href="https://evelas.co/" />
  <link rel="alternate" hreflang="x-default" href="https://evelas.co/" />

  <!-- OpenGraph -->
  <meta property="og:url" content="https://evelas.co/" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Enrique Velasco - Creative Technologist" />
  <meta property="og:description" content="Harmonious Engineer..." />
  <meta property="og:site_name" content="Enrique Velasco" />
  <meta property="og:locale" content="es_ES" />
  <meta
    property="og:image"
    content="https://res.cloudinary.com/.../protrait-1_w9waah.jpg"
  />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta
    name="twitter:title"
    content="Enrique Velasco - Creative Technologist"
  />
  <meta name="twitter:description" content="Harmonious Engineer..." />
  <meta name="twitter:creator" content="@evelasko" />
  <meta
    name="twitter:image"
    content="https://res.cloudinary.com/.../protrait-1_w9waah.jpg"
  />
</head>
<body>
  <!-- JSON-LD Schemas -->
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Enrique Velasco",
      "url": "https://evelas.co",
      "image": "https://res.cloudinary.com/.../protrait-1_w9waah.jpg",
      "sameAs": [
        "https://www.instagram.com/evelas.co/",
        "https://www.linkedin.com/in/velascoenrique/",
        "https://github.com/evelasko"
      ],
      "jobTitle": "Harmonious Engineer: Bridging Dance, Code & Business...",
      "foundedOrganization": {
        "@type": "Organization",
        "name": "CENIE"
      }
    }
  </script>

  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Enrique Velasco",
      "description": "Portfolio of Enrique Velasco - Creative Technologist",
      "url": "https://evelas.co",
      "inLanguage": "es"
    }
  </script>
</body>
```

### In Google Rich Results Test

```
✓ Person schema is valid
✓ WebSite schema is valid
✓ All required properties are present
✓ No errors detected
✓ No warnings

Preview: [Shows your profile photo, name, and links]
```

---

## 🎉 Done!

If all checks pass:

1. ✅ Your SEO implementation is working
2. ✅ Schemas are valid
3. ✅ Ready for Google indexing
4. ✅ Social sharing will look great

**Next:** Monitor Google Search Console for the next 7 days.

---

**Time to Complete:** 5 minutes  
**Frequency:** After every deployment affecting metadata/schemas  
**Tools Needed:** Browser, Google Rich Results Test
