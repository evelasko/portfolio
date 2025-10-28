# SEO Validation Guide

Quick guide to validate your SEO implementation before and after deployment.

---

## 🧪 Pre-Deployment Testing (Local)

### 1. Build and Run Production Build

```bash
# Build the production version
pnpm build

# Run production server locally
pnpm start
```

### 2. Check JSON-LD Output

Visit these pages in your browser and view source (Cmd+U / Ctrl+U):

#### Homepage

```
http://localhost:3000/
```

Look for:

```html
<script type="application/ld+json">
  {
    "@context":"https://schema.org",
    "@type":"Person",
    "name":"Enrique Velasco",
    ...
  }
</script>

<script type="application/ld+json">
  {
    "@context":"https://schema.org",
    "@type":"WebSite",
    ...
  }
</script>
```

#### Bio Page

```
http://localhost:3000/bio
```

Look for Person schema with full contact info and BreadcrumbList.

#### Any Article

```
http://localhost:3000/articles/[any-slug]
```

Look for BlogPosting schema and BreadcrumbList.

### 3. Check Metadata Tags

In the `<head>` section, verify:

```html
<!-- Canonical URL -->
<link rel="canonical" href="https://evelas.co/..." />

<!-- Hreflang -->
<link rel="alternate" hreflang="en" href="https://evelas.co/en/..." />
<link rel="alternate" hreflang="es" href="https://evelas.co/..." />
<link rel="alternate" hreflang="x-default" href="https://evelas.co/..." />

<!-- OpenGraph -->
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:image" content="..." />
<meta property="og:url" content="https://evelas.co/..." />
<meta property="og:site_name" content="Enrique Velasco" />
<meta property="og:locale" content="es_ES" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="..." />
<meta name="twitter:description" content="..." />
<meta name="twitter:image" content="..." />
```

---

## 🌐 Post-Deployment Testing (Production)

### 1. Google Rich Results Test

**URL:** https://search.google.com/test/rich-results

Test these pages:

#### Homepage

```
https://evelas.co/
```

**Expected Results:**

- ✅ Person schema detected
- ✅ WebSite schema detected
- ✅ No errors or warnings

#### Bio Page

```
https://evelas.co/bio
```

**Expected Results:**

- ✅ Person schema detected with full contact info
- ✅ BreadcrumbList detected
- ✅ Social media links (`sameAs`) valid
- ✅ No errors or warnings

#### Sample Article (English)

```
https://evelas.co/en/articles/hello-world
```

**Expected Results:**

- ✅ BlogPosting/Article schema detected
- ✅ Author schema (Person) valid
- ✅ Publisher schema (Person) valid
- ✅ BreadcrumbList detected
- ✅ Publish date, modified date valid
- ✅ Image URL accessible
- ✅ No errors or warnings

#### Sample Article (Spanish)

```
https://evelas.co/articles/hola-mundo
```

**Expected Results:**

- ✅ Same as English article
- ✅ `inLanguage: "es"` in schema

### 2. Schema.org Validator

**URL:** https://validator.schema.org/

1. Visit any page on your site
2. View page source (Cmd+U / Ctrl+U)
3. Copy the JSON-LD script content
4. Paste into validator
5. Verify no errors

### 3. OpenGraph Debugger

#### Facebook Sharing Debugger

**URL:** https://developers.facebook.com/tools/debug/

1. Enter page URL
2. Click "Debug"
3. Verify image, title, description appear correctly
4. Click "Scrape Again" if cached version is old

#### LinkedIn Post Inspector

**URL:** https://www.linkedin.com/post-inspector/

1. Enter page URL
2. Click "Inspect"
3. Verify preview looks correct

#### Twitter Card Validator

**URL:** https://cards-dev.twitter.com/validator

1. Enter page URL
2. Verify card preview
3. Check image, title, description

### 4. Google Search Console

**URL:** https://search.google.com/search-console

#### Submit Sitemaps

1. Go to "Sitemaps" section
2. Submit these sitemaps (if not already):
   ```
   https://evelas.co/sitemap.xml
   https://evelas.co/sitemap-pages.xml
   https://evelas.co/sitemap-articles.xml
   https://evelas.co/sitemap-works.xml
   https://evelas.co/sitemap-legal.xml
   ```

#### Monitor Coverage

- **Pages:** Should show increase in "Valid" pages
- **Enhancements:** Watch for structured data reports
  - Articles
  - Breadcrumbs
- **International Targeting:** Check hreflang status

#### URL Inspection

Test specific URLs:

1. Click "URL Inspection" (top bar)
2. Enter page URL
3. Click "Test Live URL"
4. Verify:
   - ✅ URL is indexable
   - ✅ Canonical URL is correct
   - ✅ Structured data detected

---

## 📊 Monitoring Schedule

### First Week After Launch

- **Daily:** Check Google Search Console for errors
- **Day 3:** Re-test with Rich Results Test
- **Day 7:** Check for structured data appearing in GSC

### First Month

- **Weekly:** Monitor GSC coverage reports
- **Weekly:** Check for hreflang errors
- **Bi-weekly:** Test key pages with Rich Results Test

### Ongoing

- **Monthly:** Review organic traffic growth
- **Monthly:** Monitor rich results impressions
- **Quarterly:** Validate schemas still comply with updates

---

## 🔍 Common Issues & Fixes

### Issue: "Image URL not accessible"

**Cause:** Cloudinary image URL blocked or wrong format

**Fix:**

1. Check image URL in browser
2. Verify it's a direct image URL (not HTML page)
3. Ensure HTTPS
4. Check CORS headers on Cloudinary

### Issue: "Missing required field"

**Cause:** Frontmatter missing required field

**Fix:**

1. Check MDX frontmatter has:
   - `title`
   - `description`
   - `publishedAt`
   - `author`
2. Update and rebuild

### Issue: "Invalid date format"

**Cause:** Date not in ISO 8601 format

**Fix:**
Ensure dates in frontmatter are like:

```yaml
publishedAt: "2024-01-15"
# or
publishedAt: "2024-01-15T10:30:00Z"
```

### Issue: "Breadcrumb URLs don't match"

**Cause:** URL mismatch in breadcrumb schema

**Fix:**

1. Check breadcrumb URLs are absolute
2. Verify they match actual page URLs
3. Check for trailing slash consistency

### Issue: "Hreflang errors in GSC"

**Cause:** Missing or incorrect hreflang tags

**Fix:**

1. Verify both languages have the page
2. Check URLs are correct for each locale
3. Ensure x-default points to Spanish version

### Issue: "Duplicate canonical tags"

**Cause:** Multiple sources setting canonical

**Fix:**
Should only appear once - check that no plugins/components are adding extra canonical tags.

---

## ✅ Validation Checklist

Copy this checklist and mark off as you validate:

### Pre-Deployment (Local)

- [ ] Production build succeeds (`pnpm build`)
- [ ] No build errors related to metadata
- [ ] JSON-LD visible in page source (homepage)
- [ ] JSON-LD visible in page source (bio)
- [ ] JSON-LD visible in page source (sample article)
- [ ] Metadata tags present in `<head>` (canonical, hreflang, OG)
- [ ] All image URLs accessible
- [ ] No linting errors in SEO files

### Post-Deployment (Production)

- [ ] Homepage passes Google Rich Results Test
- [ ] Bio page passes Google Rich Results Test
- [ ] Sample article (EN) passes Google Rich Results Test
- [ ] Sample article (ES) passes Google Rich Results Test
- [ ] Sample work passes Google Rich Results Test
- [ ] Facebook preview looks correct
- [ ] LinkedIn preview looks correct
- [ ] Twitter card preview looks correct
- [ ] Sitemaps submitted to Google Search Console
- [ ] URL Inspection shows structured data
- [ ] No errors in GSC Coverage report
- [ ] No hreflang errors in GSC

### Week 1 Monitoring

- [ ] No new errors in GSC
- [ ] Structured data showing in GSC "Enhancements"
- [ ] Articles showing as "Valid" in rich results
- [ ] Breadcrumbs showing as "Valid"

---

## 📞 Support Resources

- **Google Rich Results Test:** https://search.google.com/test/rich-results
- **Schema.org Validator:** https://validator.schema.org/
- **Google Search Console:** https://search.google.com/search-console
- **Schema.org Documentation:** https://schema.org/
- **Next.js Metadata Docs:** https://nextjs.org/docs/app/building-your-application/optimizing/metadata

---

## 🎯 Success Metrics (3 Months)

Track these in Google Analytics + Search Console:

- **Organic Traffic:** +30-40% increase
- **Organic CTR:** +25-35% increase from rich results
- **Rich Results Impressions:** Should see data in GSC
- **Average Position:** Improvement for target keywords
- **Indexing:** More pages indexed (from sitemap)

---

**Validation Priority:**

1. ✅ Google Rich Results Test (CRITICAL)
2. ✅ Google Search Console submission (CRITICAL)
3. ✅ Social sharing previews (HIGH)
4. ✅ Schema.org validator (MEDIUM)
5. ⏭️ Ongoing monitoring (CONTINUOUS)

Good luck! 🚀
