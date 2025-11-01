# Google Analytics 4 Testing Guide

**Quick guide to test your GA4 implementation**

---

## 🧪 Testing Checklist

### Before Deployment (Local Testing)

#### 1. Check Development Logging

```bash
pnpm dev
```

Visit: `http://localhost:3000`

**Open Browser Console** and you should see:

```text
[GA4 Event] article_view { article_title: "...", ... }
[Scroll Depth] 25% - Article Title
[Article View] { title: "...", ... }
```

**Test these pages:**

- [ ] Homepage (should load GA4 script)
- [ ] Any article page (scroll to trigger depth tracking)
- [ ] Any work page (should track view)
- [ ] Bio page (click CV, email, social links)

---

### After Deployment (Production Testing)

#### 2. Enable GA4 DebugView

**Option A: Chrome Extension (RECOMMENDED)**

1. Install: [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/)
2. Click extension icon to enable
3. Visit your site: `https://evelas.co`
4. Events will appear in DebugView

**Option B: URL Parameter**

Visit: `https://evelas.co?debug_mode=true`

#### 3. Open GA4 DebugView

1. Go to: `https://analytics.google.com/`
2. Select your property
3. Click **Admin** (bottom left)
4. Under "Property", click **DebugView**
5. You should see your device name

#### 4. Test Each Event Type

**Test Article Scroll Depth** (PRIORITY)

1. Visit any article
2. Scroll to 25% → Check DebugView for `article_scroll` (depth: 25)
3. Scroll to 50% → Check for `article_scroll` (depth: 50)
4. Scroll to 75% → Check for `article_scroll` (depth: 75)
5. Scroll to 100% → Check for `article_scroll` (depth: 100)

**Expected in DebugView:**

```text
Event: article_scroll
Parameters:
  scroll_depth: 25
  article_title: "Your Article Title"
  article_slug: "article-slug"
```

**Test Article View**

1. Visit any article
2. Check DebugView for `article_view`

**Expected:**

```text
Event: article_view
Parameters:
  article_title: "..."
  article_category: "..."
  reading_time: 5
  language: "en"
  article_slug: "..."
```

**Test Work View**

1. Visit any work page
2. Check DebugView for `work_view`

**Expected:**

```text
Event: work_view
Parameters:
  work_title: "..."
  work_category: "..."
  work_slug: "..."
  language: "es"
```

**Test Email Click** (PRIMARY CONVERSION)

1. Go to Bio page
2. Click email link
3. Check DebugView for `email_click`

**Expected:**

```text
Event: email_click
Parameters:
  email: "info@evelas.co"
  source: "bio"
```

**Test CV Download**

1. Go to Bio page
2. Click CV download button
3. Check DebugView for `cv_download`

**Expected:**

```text
Event: cv_download
Parameters:
  location: "bio_page"
  language: "es"
```

**Test Social Click**

1. Go to Bio page
2. Click LinkedIn link
3. Check DebugView for `social_click`

**Expected:**

```text
Event: social_click
Parameters:
  platform: "LinkedIn"
  location: "bio"
  profile_url: "https://..."
```

**Test External Click**

1. Visit any work page
2. Click "View Live Project"
3. Check DebugView for `external_click`

**Expected:**

```text
Event: external_click
Parameters:
  link_url: "https://..."
  link_type: "work"
  link_text: "View Live Project"
```

---

## 📊 Real-Time Reports

After testing in DebugView, check Real-Time reports:

1. Go to: **Reports → Realtime**
2. You should see:
   - Users by device
   - Event count by event name
   - Users by first user source

**Events to look for:**

- `article_view`
- `article_scroll`
- `work_view`
- `email_click`
- `cv_download`
- `social_click`
- `external_click`

---

## 🎯 Set Up Conversions

After verifying events work:

1. Go to: **Admin → Events**
2. Find these events:
   - `email_click` ⭐ PRIMARY
   - `cv_download`
   - `contact_click`
   - `social_click` (optional)
3. Click **Mark as conversion**

Now you can track conversions in reports!

---

## 🔗 Link Google Search Console

1. Go to: **Admin → Product Links → Search Console**
2. Click **Link**
3. Select your Search Console property
4. Click **Submit**

Benefits:

- See search queries that lead to engagement
- Landing page performance
- Combined SEO + behavior data

---

## 🚨 Troubleshooting

### Events not showing in DebugView?

**Check:**

1. Is debug mode enabled?
   - Chrome extension active OR
   - Using `?debug_mode=true` parameter
2. Is GA4 loading?
   - Check console for `gtag` function
   - Check network tab for `gtag/js` request
3. Correct Measurement ID?
   - Check `.env.local` has correct ID
4. In production?
   - GA4 only loads in production mode

### Events showing but wrong parameters?

**Check:**

1. Event data in console (development mode)
2. Verify TrackedLink props are correct
3. Check component is properly mounted

### Scroll depth not triggering?

**Check:**

1. Page has scrollable content
2. Article is long enough to scroll
3. ScrollDepthTracker component is mounted
4. Check console for tracking logs

---

## ✅ Success Checklist

After testing, verify:

- [ ] DebugView shows events in real-time
- [ ] All event types tested and working:
  - [ ] article_view
  - [ ] article_scroll (25%, 50%, 75%, 100%)
  - [ ] work_view
  - [ ] email_click
  - [ ] cv_download
  - [ ] social_click
  - [ ] external_click
- [ ] Event parameters are correct
- [ ] Real-Time report shows events
- [ ] Conversions marked in GA4
- [ ] Google Search Console linked
- [ ] No console errors

---

## 📈 What to Monitor

### Week 1

- [ ] Check events are firing daily
- [ ] Verify scroll depth distribution
- [ ] Check conversion events (email, CV)
- [ ] Monitor for errors

### Month 1

- [ ] Review top articles
- [ ] Analyze average scroll depth
- [ ] Check conversion rate
- [ ] Review traffic sources

### Month 3

- [ ] Content performance trends
- [ ] User journey analysis
- [ ] Conversion funnel optimization
- [ ] SEO impact (via GSC link)

---

## 🎓 GA4 Reports to Use

### 1. Realtime Report

**Path:** Reports → Realtime

**Use for:** Live testing, verify events

### 2. Engagement Report

**Path:** Reports → Engagement → Events

**Use for:** See all events, counts, parameters

### 3. Conversion Report

**Path:** Reports → Monetization → Conversions

**Use for:** Track email clicks, CV downloads

### 4. Acquisition Report

**Path:** Reports → Acquisition

**Use for:** Traffic sources, campaigns

### 5. User Report

**Path:** Reports → Users

**Use for:** Demographics, interests, geography

---

## 🔧 Advanced Testing

### Custom Event Report

1. Go to: **Explore → Blank**
2. Add:
   - Dimension: Event name
   - Metric: Event count
   - Metric: Total users
3. Filter: Custom events only
4. See all your tracked events

### Scroll Depth Analysis

1. Go to: **Explore → Blank**
2. Add:
   - Dimension: Event parameter `scroll_depth`
   - Dimension: Event parameter `article_title`
   - Metric: Event count
3. See which articles have best engagement

### Conversion Funnel

1. Go to: **Explore → Funnel exploration**
2. Create funnel:
   - Step 1: `article_view`
   - Step 2: `article_scroll` (depth = 75)
   - Step 3: `email_click`
3. See conversion drop-off

---

## 📚 Resources

- **DebugView:** `https://support.google.com/analytics/answer/7201382`
- **Real-Time Reports:** `https://support.google.com/analytics/answer/9271392`
- **Custom Events:** `https://support.google.com/analytics/answer/12229021`
- **GA4 Debugger Extension:** `https://chrome.google.com/webstore/detail/google-analytics-debugger`

---

**Testing Time:** 15-30 minutes  
**Priority:** Test scroll depth first (your priority event)  
**Next:** Set up conversions and monitor for first week

Good luck! 🚀
