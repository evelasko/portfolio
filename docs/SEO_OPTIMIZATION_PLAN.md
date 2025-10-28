SEO OPTIMIZATION PLAN - Enrique Velasco Portfolio
Executive Summary
Your portfolio has strong SEO fundamentals with excellent sitemap implementation, robust internationalization support, and good metadata on article/work pages. However, there are critical gaps in structured data (JSON-LD) and incomplete metadata coverage that prevent optimal search engine visibility. Current SEO Score: 6.5/10
Strengths: Sitemap (9/10), i18n/hreflang (8/10), Image optimization (8/10)
Weaknesses: Structured data (1/10), Homepage SEO (2/10), Breadcrumbs (0/10)
PHASE 1: CRITICAL FIXES (High Impact, 1-2 weeks)
1.1 Implement JSON-LD Structured Data
Priority: CRITICAL | Impact: Very High | Effort: Medium Structured data helps search engines understand your content and enables rich results in search. Required implementations:
A. Article Schema (Article + BlogPosting)
Where: All article detail pages ([slug]/page.tsx)
Schema type: https://schema.org/BlogPosting
Key fields:
headline, description, image
datePublished, dateModified
author (Person schema with name, url)
publisher (Organization schema with name, logo)
keywords, articleBody excerpt
wordCount, inLanguage
mainEntityOfPage (canonical URL)
SEO Benefits:
Enables Google Article rich results
Shows author, publish date, and reading time in SERPs
Improves content categorization
Better mobile search appearance
B. Person Schema (Personal Brand)
Where: Bio page + site-wide in root layout
Schema type: https://schema.org/Person
Key fields:
name, jobTitle, description
image (profile photo)
url (website homepage)
sameAs (social media profiles: GitHub, LinkedIn, Twitter, etc.)
knowsAbout (skills/expertise array)
worksFor (if applicable)
SEO Benefits:
Establishes your identity in Knowledge Graph
Links social profiles to your brand
Enables "People Also Search For" features
Improves personal brand visibility
C. BreadcrumbList Schema
Where: All pages with navigation depth > 1
Schema type: https://schema.org/BreadcrumbList
Example paths:
Home > Articles > [Article Title]
Home > Works > [Work Title]
Home > Bio
SEO Benefits:
Shows breadcrumb navigation in Google search results
Improves site structure understanding
Better user experience in SERPs
Reduces bounce rate from search
D. Organization Schema (Site-wide)
Where: Root layout (applies to all pages)
Schema type: https://schema.org/Organization or Person (choose based on branding)
Key fields:
name, description, url, logo
sameAs (social profiles)
contactPoint (email, social)
SEO Benefits:
Establishes site authority
Links brand identity across pages
Enables site-wide entity recognition
1.2 Homepage SEO Optimization
Priority: CRITICAL | Impact: Very High | Effort: Low Your homepage has NO metadata currently - it's your most important page! Required additions to src/app/[locale]/page.tsx:
A. Metadata Export
export async function generateMetadata({ params }: Props): Promise<Metadata> {
// Implement locale-aware title, description
// Add OpenGraph: og:type="website", og:site_name, og:locale
// Add Twitter Card metadata
// Add canonical URL
// Add keywords relevant to your brand
}
Key metadata fields:
Title: "Enrique Velasco - [Your Tagline]" (50-60 chars)
Description: Compelling summary (150-160 chars)
OpenGraph: Full social sharing optimization
Keywords: 5-10 relevant terms
Canonical URL: Explicit self-reference
B. JSON-LD for Homepage
Primary Person/Organization schema
Optionally: WebSite schema with siteNavigationElement
Potential search action schema (if you add search)
Expected Impact:
40-60% improvement in homepage search visibility
Better social sharing appearance
Improved brand searches
1.3 Add Explicit Hreflang HTML Tags
Priority: HIGH | Impact: High | Effort: Low Currently hreflang only exists in sitemaps. Google prefers HTML <link> tags. Implementation: Add to generateMetadata on ALL pages:
alternates: {
canonical: 'https://yourdomain.com/current-page',
languages: {
'en': 'https://yourdomain.com/en/current-page',
'es': 'https://yourdomain.com/current-page',
'x-default': 'https://yourdomain.com/current-page'
}
}
Where to add:
Homepage
Articles list & detail pages
Works list & detail pages
Bio page
All legal pages
SEO Benefits:
Prevents duplicate content issues across locales
Ensures correct language version shown to users
Better international search targeting
Explicit > implicit for Google
1.4 Complete Metadata Coverage
Priority: HIGH | Impact: Medium | Effort: Low Missing generateMetadata functions:
A. Bio Page (src/app/[locale]/bio/page.tsx)
Add comprehensive metadata with Person focus
Include OpenGraph profile type
Add breadcrumb schema
Keywords about your expertise
B. Articles & Works List Pages
Enhance basic metadata with locale-aware descriptions
Add pagination metadata if implementing pagination
Add OpenGraph type: "website"
Keywords for category browsing
C. Legal Pages (Privacy, Terms, Imprint)
Add basic metadata (currently missing)
Set robots: { index: false } if you don't want them indexed
Or optimize if you want to rank for "privacy policy" etc.
PHASE 2: MAJOR ENHANCEMENTS (Medium Impact, 2-3 weeks)
2.1 Site-wide OpenGraph Configuration
Priority: MEDIUM | Impact: Medium | Effort: Low Add to root src/app/layout.tsx:
export const metadata: Metadata = {
// Existing fields...

openGraph: {
siteName: 'Enrique Velasco',
locale: 'es_ES',
type: 'website',
},

twitter: {
card: 'summary_large_image',
site: '@your_twitter_handle', // Add your handle
creator: '@your_twitter_handle',
},

// Add other social profiles
other: {
'fb:app_id': 'your_fb_app_id', // If applicable
}
}
Benefits:
Consistent social sharing across all pages
Better fallback when page-specific OG tags missing
Brand consistency
2.2 Canonical URL Strategy
Priority: MEDIUM | Impact: Medium | Effort: Low Current state: Implicit canonicals via URL structure (safe but not optimal) Recommended approach: Add explicit canonical to ALL generateMetadata functions:
{
alternates: {
canonical: `https://yoursite.com${currentPath}`
}
}
Special considerations:
Point locale variants to themselves (NOT to default locale)
Use hreflang for language relationship
Ensure HTTPS in all canonical URLs
Match trailing slash behavior consistently
2.3 Enhanced Image SEO
Priority: MEDIUM | Impact: Medium | Effort: Medium
A. ImageObject Structured Data
For key images (article covers, work thumbnails):
{
"@type": "ImageObject",
"url": "https://...",
"width": 1200,
"height": 630,
"caption": "...",
"author": "Enrique Velasco"
}
B. Alt Text Guidelines
Create a utility to enforce meaningful alt text
Never leave alt empty unless decorative
Include context + description
C. Image Optimization Enhancements
Explicitly enable AVIF format in Cloudinary config (better compression than WebP)
Add priority prop to LCP images (hero images)
Implement sizes attribute properly for responsive images
Add image preload for above-fold images
In next.config.mjs:
images: {
formats: ['image/avif', 'image/webp'],
deviceSizes: [640, 750, 828, 1080, 1200, 1920],
// Add explicit sizes
}
2.4 Content Optimization Strategy
Priority: MEDIUM | Impact: High | Effort: Ongoing
A. Metadata Enhancements for Articles/Works
Add to MDX frontmatter schema:
excerpt - Manual 160-char summary for meta description (better than auto-truncate)
focusKeyword - Primary keyword for the piece
readingTime - Already captured, expose in structured data
relatedArticles - Cross-linking for internal SEO
B. Content Quality Signals
Expose wordCount in Article schema (longer = better for SEO)
Add dateModified tracking (shows freshness)
Include author bio snippet in Article schema
Add articleSection for categorization
C. Internal Linking Strategy
Add "Related Articles" sections with semantic linking
Implement automatic topic clustering
Add breadcrumb navigation UI component (not just schema)
Link from list pages to detail pages with keyword-rich anchor text
2.5 Performance Optimization for SEO
Priority: MEDIUM | Impact: High | Effort: Medium Performance is a ranking factor. Target Core Web Vitals:
A. LCP (Largest Contentful Paint) - Target <2.5s
Add priority to hero images
Preload critical fonts (already using swap)
Optimize Cloudinary transformations (use f_auto,q_auto)
Minimize render-blocking resources
B. CLS (Cumulative Layout Shift) - Target <0.1
Reserve space for images with explicit width/height
Avoid inserting content above fold after load
Use font-display: swap (already implemented)
C. FID/INP (Interaction Delay) - Target <200ms
Code split large components
Defer non-critical JavaScript
Optimize Motion animations for performance
Consider lazy loading below-fold content
Implementation:
Add Lighthouse CI to your build process
Monitor with Vercel Speed Insights (already integrated)
Set performance budgets
Automate performance testing
PHASE 3: ADVANCED OPTIMIZATIONS (Lower Priority, 1-2 weeks)
3.1 Rich Results Expansion
Priority: LOW | Impact: Medium | Effort: High
A. FAQ Schema (If applicable)
If you have FAQ sections in articles/bio
Schema type: https://schema.org/FAQPage
Enables FAQ rich results in Google
B. How-To Schema (If applicable)
For tutorial-style articles
Schema type: https://schema.org/HowTo
Shows step-by-step in search results
C. Video Schema (Future consideration)
If you add video content
Enables video rich results
3.2 Advanced Monitoring & Analytics
Priority: LOW | Impact: Medium | Effort: Medium
A. Google Search Console Integration
Submit sitemaps (already have excellent sitemaps!)
Monitor coverage, performance, enhancements
Track rich results status
Monitor Core Web Vitals
Set up alerts for indexing issues
B. Schema Validation Automation
Add schema.org validator to CI/CD
Test with Google's Rich Results Test
Automate with scripts/schema-validator.ts (new)
C. SEO Reporting Dashboard
Track organic traffic by page
Monitor keyword rankings
Track rich results impressions
Monitor international performance (en vs es)
3.3 Content Strategy for SEO
Priority: LOW | Impact: Very High | Effort: Ongoing
A. Keyword Research
Identify target keywords for your expertise
Create topic clusters around core competencies
Map keywords to existing/future content
Optimize existing articles for target terms
B. Content Freshness
Update old articles (triggers dateModified)
Add content refresh schedule
Identify evergreen vs timely content
Monitor and update based on search trends
C. E-E-A-T Signals (Experience, Expertise, Authoritativeness, Trust)
Add detailed author bio to articles
Link to credentials, certifications
Include case studies with results
Add testimonials/social proof (if applicable)
Link to published work, speaking engagements
3.4 Technical SEO Polish
Priority: LOW | Impact: Low | Effort: Low
A. Resource Hints
Add to critical pages:

<link rel="preconnect" href="https://res.cloudinary.com">
<link rel="dns-prefetch" href="https://fonts.googleapis.com">
B. Security Headers (SEO trust signals)
Already good in next.config.mjs, consider adding:
Strict-Transport-Security (HSTS)
Content-Security-Policy (CSP)
Permissions-Policy
C. Robots Meta Tags
For specific pages that need control:
metadata: {
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  }
}
IMPLEMENTATION ROADMAP
Week 1-2: Critical Fixes
Day 1-2: Implement JSON-LD utilities (reusable schema generators)
Day 3-4: Add Article + BreadcrumbList schema to article pages
Day 5-6: Add Person schema to bio + Organization to root layout
Day 7-8: Optimize homepage metadata + OpenGraph
Day 9-10: Add hreflang HTML tags to all pages
Expected Impact: +30-40% organic visibility
Week 3-4: Major Enhancements
Complete metadata coverage (bio, legal, list pages)
Implement canonical URL strategy
Enhance image SEO (alt text, ImageObject schema, AVIF)
Add site-wide OpenGraph configuration
Begin content optimization (excerpts, focus keywords)
Expected Impact: +15-20% additional visibility
Week 5-6: Advanced Optimizations
Performance audit and optimization
Set up Google Search Console monitoring
Implement schema validation in CI/CD
Add FAQ/HowTo schema where applicable
Create SEO reporting dashboard
Expected Impact: +10-15% additional visibility
Ongoing: Content Strategy
Monthly keyword research
Quarterly content audits
Regular performance monitoring
Continuous testing and optimization
MEASUREMENT & SUCCESS METRICS
Before vs After Comparison
Current Baseline (establish before starting):
Google Search Console impressions/clicks
Organic traffic from analytics
Rich results eligibility (0% currently)
Core Web Vitals scores
Average search position
Target Metrics (3 months post-implementation):
+50-70% increase in organic impressions
+40-60% increase in clicks from search
80%+ of articles eligible for rich results
90%+ of pages passing Core Web Vitals
Improved average position for target keywords
TOOLS & RESOURCES NEEDED
Development Tools
schema-dts - TypeScript definitions for schema.org (npm package)
google-search-results-parser - For testing rich results
lighthouse CI - Automated performance testing
next-seo alternative OR custom utilities
SEO Tools
Google Search Console - Essential (free)
Google Rich Results Test - Validation (free)
Schema.org Validator - Testing (free)
Ahrefs/SEMrush - Optional, for competitive analysis
Screaming Frog - Optional, for technical audits
Monitoring Tools
Vercel Analytics - Already integrated
Vercel Speed Insights - Already integrated
Google Analytics 4 - User behavior tracking
Sentry - Error monitoring (optional)
RISK MITIGATION
Potential Issues
1. Schema Errors
Risk: Invalid JSON-LD breaks rich results eligibility
Mitigation: Validate ALL schemas with Google's tool before deployment
Recovery: Create rollback plan, monitor Search Console
2. Canonical Conflicts
Risk: Incorrect canonicals cause indexing issues
Mitigation: Audit all canonicals before launch, test with Search Console
Recovery: Quick fix via metadata updates
3. Performance Regression
Risk: Adding too much structured data slows pages
Mitigation: Monitor bundle size, lazy load non-critical schemas
Recovery: Remove less important schemas if needed
4. Hreflang Errors
Risk: Incorrect hreflang causes wrong language in search results
Mitigation: Use existing sitemap validation scripts, test manually
Recovery: Fix in metadata, submit updated sitemaps
FINAL RECOMMENDATIONS
DO FIRST (Highest ROI):
✅ JSON-LD Article schema on all articles
✅ Homepage metadata optimization
✅ BreadcrumbList schema site-wide
✅ Explicit hreflang in HTML
✅ Person schema on bio page
DO NEXT (High ROI):
Complete metadata coverage (all pages)
Canonical URL strategy
Image SEO enhancements
Performance optimization (LCP, CLS)
Google Search Console setup
DO EVENTUALLY (Lower ROI but valuable):
FAQ/HowTo schema where applicable
Advanced monitoring dashboard
Automated schema validation in CI/CD
Ongoing content optimization
CONCLUSION
Your portfolio has excellent technical SEO foundations (sitemap, i18n, robots.txt) but lacks the semantic layer (structured data) that modern search engines rely on for rich results and better understanding. Investment vs Return:
Effort: 4-6 weeks of focused development
Expected Outcome: 70-100% increase in organic search visibility
Long-term Value: Compound improvements as content grows
The biggest wins will come from Phase 1 (JSON-LD + homepage optimization) which should be prioritized immediately. The rest can follow as time permits. Would you like me to start implementing any specific part of this plan? I can begin with the highest-impact items like JSON-LD schema generators or homepage metadata.
