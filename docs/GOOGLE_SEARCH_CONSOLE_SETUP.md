# Google Search Console Setup Guide

**Complete guide to set up Google Search Console for evelas.co**

---

## 🎯 Why Set Up Before Deployment?

✅ **Immediate monitoring** - Track indexing as soon as you deploy  
✅ **Catch errors early** - See any issues within hours  
✅ **Historical data** - Start building baseline metrics  
✅ **Sitemap submission** - Can submit sitemaps right away

---

## 📝 Step-by-Step Setup

### Step 1: Access Google Search Console

1. Go to: **https://search.google.com/search-console**
2. Sign in with your Google account (use the one you want to manage the site with)
3. Click **"Add Property"** or **"Start now"** (if first time)

### Step 2: Choose Property Type

You'll see two options:

#### Option A: Domain Property (RECOMMENDED ⭐)

**Best for:**

- Covers ALL subdomains (www, api, etc.)
- Covers both HTTP and HTTPS
- Most comprehensive

**Enter:**

```
evelas.co
```

#### Option B: URL Prefix

**Best for:**

- Simpler verification
- Only need to verify specific URL

**Enter:**

```
https://evelas.co
```

**My Recommendation:** Use **Domain Property** - it's future-proof and covers all variations.

---

### Step 3: Verify Ownership

#### For Domain Property (DNS Verification Required)

Google will show you a TXT record like:

```
google-site-verification=abc123xyz456def789ghi012jkl345mno678pqr901stu234
```

**Where to add this depends on your domain registrar:**

#### If Using Vercel (RECOMMENDED)

1. Go to your Vercel dashboard
2. Navigate to **Settings → Domains**
3. Find `evelas.co`
4. Click **"Edit"** or **"Configure"**
5. Scroll to **"DNS Records"**
6. Click **"Add Record"**
7. Fill in:
   - **Type:** `TXT`
   - **Name:** `@` (or leave empty - represents root domain)
   - **Value:** Paste the full `google-site-verification=...` string
   - **TTL:** `3600` (or leave default)
8. Click **"Save"**

#### If Using Cloudflare

1. Log in to Cloudflare
2. Select your domain (`evelas.co`)
3. Go to **DNS → Records**
4. Click **"Add record"**
5. Fill in:
   - **Type:** `TXT`
   - **Name:** `@` (represents root domain)
   - **Content:** Paste the full `google-site-verification=...` string
   - **Proxy status:** DNS only (gray cloud)
   - **TTL:** Auto
6. Click **"Save"**

#### If Using GoDaddy

1. Log in to GoDaddy
2. Go to **My Products → DNS**
3. Find `evelas.co`
4. Click **"DNS"** or **"Manage DNS"**
5. Scroll to **DNS Records**
6. Click **"Add"**
7. Fill in:
   - **Type:** `TXT`
   - **Host:** `@`
   - **TXT Value:** Paste `google-site-verification=...`
   - **TTL:** 600 (or 1 hour)
8. Click **"Save"**

#### If Using Namecheap

1. Log in to Namecheap
2. Go to **Domain List → Manage**
3. Click **"Advanced DNS"**
4. Under **"Host Records"**, click **"Add New Record"**
5. Fill in:
   - **Type:** `TXT Record`
   - **Host:** `@`
   - **Value:** Paste `google-site-verification=...`
   - **TTL:** Automatic
6. Click **"Save All Changes"**

#### If Using Other Provider

Look for:

- "DNS Management"
- "DNS Records"
- "Advanced DNS"
- "TXT Records"

Then add:

- **Type:** TXT
- **Name/Host:** `@` or leave empty
- **Value/Content:** The full verification string

---

### Step 4: Wait for DNS Propagation (5-60 minutes)

DNS changes can take time:

- **Vercel/Cloudflare:** Usually 5-15 minutes
- **Other providers:** Up to 1 hour

**Check if DNS is propagated:**

```bash
# Mac/Linux Terminal
dig evelas.co TXT

# Windows PowerShell
nslookup -type=TXT evelas.co

# Or use online tool
# https://dnschecker.org/#TXT/evelas.co
```

Look for your verification string in the results.

---

### Step 5: Verify in Google Search Console

1. Go back to Google Search Console
2. Click **"Verify"**
3. If successful: ✅ "Ownership verified"
4. If failed: Wait longer for DNS propagation, then try again

**Troubleshooting:**

- **"TXT record not found"** → Wait 15 more minutes
- **"Could not verify"** → Check you copied the full string
- **"Multiple TXT records"** → Fine, Google can handle it

---

### Step 6: Alternative Verification Methods (URL Prefix Only)

If you chose **URL Prefix** property, you have more options:

#### Method 1: HTML File Upload

1. Google gives you a file like `google1234567890abcdef.html`
2. Download it
3. Add to your Next.js project:
   ```
   /public/google1234567890abcdef.html
   ```
4. Deploy to production
5. Verify at: `https://evelas.co/google1234567890abcdef.html`
6. Click "Verify" in GSC

#### Method 2: HTML Meta Tag

1. Google gives you a meta tag:
   ```html
   <meta name="google-site-verification" content="abc123..." />
   ```
2. Add to `src/app/layout.tsx`:
   ```typescript
   export const metadata: Metadata = {
     // ... existing metadata
     verification: {
       google: "abc123...", // Just the content value
     },
   };
   ```
3. Deploy to production
4. Click "Verify" in GSC

#### Method 3: Google Analytics (If You Use It)

1. Ensure Google Analytics is installed
2. Use the same Google account for both
3. GSC will auto-verify

#### Method 4: Google Tag Manager (If You Use It)

1. Ensure GTM container is installed
2. Use the same Google account
3. GSC will auto-verify

---

## ✅ Immediate Actions After Verification

### 1. Submit Your Sitemaps

Your portfolio has EXCELLENT sitemaps already! Submit them:

1. In Google Search Console, click **"Sitemaps"** (left sidebar)
2. Click **"Add a new sitemap"**
3. Submit these one by one:

```
sitemap.xml
sitemap-pages.xml
sitemap-articles.xml
sitemap-works.xml
sitemap-legal.xml
```

**How to submit:**

- Enter: `sitemap.xml`
- Click: **"Submit"**
- Repeat for each sitemap

**Expected result:**

- Status: "Success" or "Couldn't fetch" (first time is normal)
- Wait 24-48 hours for Google to process

### 2. Request Indexing for Key Pages

Don't wait for Google to crawl naturally:

1. Click **"URL Inspection"** (top of GSC)
2. Enter each URL:
   ```
   https://evelas.co/
   https://evelas.co/bio
   https://evelas.co/en/
   https://evelas.co/en/bio
   ```
3. Click **"Test Live URL"**
4. If indexable, click **"Request Indexing"**

**Limit:** ~10 requests per day (Google's quota)

### 3. Set Up Email Notifications

1. Click **Settings** (gear icon, top right)
2. Click **"Users and permissions"**
3. Verify your email is listed
4. Google will email you about:
   - Critical errors
   - Manual actions
   - Security issues
   - New features

### 4. Enable All Data Collection

1. In GSC, click **"Settings"** → **"Crawl stats"**
2. Ensure data collection is enabled (it should be by default)

---

## 📊 What to Monitor After Deployment

### First 24 Hours

- **Coverage** → Should see new pages discovered
- **Sitemaps** → Status should change to "Success"
- **URL Inspection** → Test homepage, bio, sample article

### First Week

- **Enhancements** → Structured data should appear
  - Articles (BlogPosting)
  - Breadcrumbs
- **Coverage** → Valid pages increasing
- **Experience** → Core Web Vitals data starting

### First Month

- **Performance** → Impressions and clicks
- **Rich results** → Article rich results showing
- **Coverage** → All pages indexed

---

## 🔍 Key Google Search Console Features to Use

### 1. Performance Report

**Path:** Performance (left sidebar)

**What to track:**

- Total clicks (organic traffic)
- Total impressions (visibility)
- Average CTR (click-through rate)
- Average position (ranking)
- Top queries (keywords you rank for)
- Top pages (best performing content)

**Filter by:**

- Date range (compare before/after SEO changes)
- Query
- Page
- Country (Spain vs other)
- Device (mobile vs desktop)

### 2. Coverage Report

**Path:** Coverage (under "Index" section)

**Monitor for:**

- ✅ Valid pages (should increase)
- ⚠️ Valid with warnings (investigate)
- ❌ Errors (fix immediately)
- 🚫 Excluded (understand why)

**Common exclusions (usually fine):**

- "Duplicate, Google chose different canonical"
- "Alternate page with proper canonical tag"

**Red flags (fix these):**

- "Server error (5xx)"
- "Submitted URL not found (404)"
- "Redirect error"

### 3. Enhancements Report

**Path:** Enhancements (left sidebar)

**After SEO implementation, you'll see:**

- **Articles** (BlogPosting schema)
  - Valid items
  - Items with warnings
  - Invalid items
- **Breadcrumbs** (BreadcrumbList schema)
  - Valid items
  - Items with warnings

**Goal:** 0 errors, maximize valid items

### 4. URL Inspection Tool

**Path:** Top search bar

**Use for:**

- Testing individual pages
- Seeing how Google sees your page
- Checking if page is indexed
- Viewing rendered HTML
- Requesting re-indexing
- Checking structured data

### 5. Core Web Vitals Report

**Path:** Experience → Core Web Vitals

**Metrics:**

- **LCP** (Largest Contentful Paint) - Target: <2.5s
- **FID/INP** (Interaction delay) - Target: <200ms
- **CLS** (Cumulative Layout Shift) - Target: <0.1

**Status:**

- Good (green)
- Needs improvement (yellow)
- Poor (red)

---

## 🎯 Expected Timeline

### Week 1

- ✅ Sitemaps processed
- ✅ Key pages discovered
- ✅ First structured data appears

### Week 2-3

- ✅ Structured data fully recognized
- ✅ Rich results eligible
- ✅ Coverage report fills out
- ✅ Performance data starts showing

### Month 1-3

- ✅ Rich results appearing in search
- ✅ Organic traffic growth measurable
- ✅ Impressions increasing
- ✅ Rankings improving

---

## 🚨 Common Issues & Solutions

### Issue: "TXT record not found"

**Solution:**

- Wait 30-60 minutes for DNS propagation
- Verify TXT record exists: `dig evelas.co TXT`
- Check you used `@` as the host/name
- Try verification again

### Issue: "Sitemap couldn't be fetched"

**Solution:**

- Normal on first submission
- Wait 24-48 hours
- Verify sitemap URL works: `https://evelas.co/sitemap.xml`
- Check it returns valid XML (not HTML 404 page)

### Issue: "Page with redirect"

**Solution:**

- Ensure all sitemaps use `https://` not `http://`
- Check locale redirects aren't affecting sitemap URLs
- Verify canonical URLs match sitemap URLs

### Issue: "Submitted URL not found (404)"

**Solution:**

- Ensure page exists after deployment
- Check for typos in sitemap URLs
- Verify dynamic routes are generating correctly

### Issue: No structured data showing

**Solution:**

- Wait 7-14 days (Google needs time to process)
- Test with Rich Results Test first
- Verify JSON-LD is in page source
- Check for JavaScript errors blocking render

---

## ✅ Pre-Deployment Checklist

Before you deploy your SEO changes:

- [ ] Google Search Console verified (DNS TXT record added)
- [ ] Verification status shows "Ownership verified"
- [ ] Email notifications enabled
- [ ] Have GSC open and ready to submit sitemaps
- [ ] Bookmark these GSC pages:
  - Performance
  - Coverage
  - Enhancements
  - URL Inspection

---

## 🚀 Post-Deployment Checklist

Immediately after deploying:

- [ ] Submit all 5 sitemaps to GSC
- [ ] Request indexing for homepage (both en/es)
- [ ] Request indexing for bio page (both en/es)
- [ ] Test 1-2 articles with URL Inspection
- [ ] Check Rich Results Test for validation
- [ ] Monitor Coverage report daily for 7 days
- [ ] Check for errors in Coverage report
- [ ] Watch for structured data in Enhancements (7-14 days)

---

## 📞 Resources

- **Google Search Console:** https://search.google.com/search-console
- **GSC Help:** https://support.google.com/webmasters
- **Rich Results Test:** https://search.google.com/test/rich-results
- **DNS Checker:** https://dnschecker.org
- **Sitemap Validator:** https://www.xml-sitemaps.com/validate-xml-sitemap.html

---

## 🎓 Pro Tips

### Tip 1: Set Up Both Property Types

Add both "Domain" and "URL Prefix" properties:

- **Domain:** `evelas.co` (for comprehensive coverage)
- **URL Prefix:** `https://evelas.co` (for easier verification)

They'll show the same data, but URL Prefix has more verification options.

### Tip 2: Add Team Members Early

**Settings → Users and permissions → Add user**

- Use role: "Owner" (full access) or "Full" (can't add users)
- Good for backup access

### Tip 3: Connect to Google Analytics

If you use GA4:

- Link in **Settings → Associations**
- Get combined data insights
- Easier verification for future properties

### Tip 4: Use Property Sets (If You Have Multiple Sites)

If you later create CENIE site:

- Create Property Set in GSC
- Group `evelas.co` and `cenie.com`
- See combined performance

### Tip 5: Export Data Monthly

- Performance → Export → CSV/Sheets
- Track your SEO progress over time
- Compare before/after SEO implementation

---

## 🎯 Success Metrics to Track

### Week 1

- [ ] All sitemaps showing "Success"
- [ ] Homepage indexed
- [ ] Bio page indexed
- [ ] 0 coverage errors

### Month 1

- [ ] 50%+ of articles indexed
- [ ] Structured data showing in Enhancements
- [ ] 0 structured data errors
- [ ] First impressions showing in Performance

### Month 3

- [ ] 90%+ of content indexed
- [ ] Rich results impressions visible
- [ ] +30-40% impressions vs baseline
- [ ] +25-35% CTR improvement
- [ ] Average position improvement

---

## 🎉 You're Ready!

**Order of Operations:**

1. ✅ **Add DNS TXT record** (do this now)
2. ⏳ **Wait 15-60 minutes** (DNS propagation)
3. ✅ **Verify in GSC**
4. ✅ **Deploy your SEO changes**
5. ✅ **Submit sitemaps**
6. ✅ **Request indexing for key pages**
7. 📊 **Monitor daily for first week**

**Total setup time:** 15-30 minutes (mostly waiting for DNS)

Good luck! 🚀
