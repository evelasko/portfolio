import React from "react";
import PhotoHero from "@/components/heroes/PhotoHero";
import { TYPOGRAPHY } from "@/lib/typography";
import { CodeExample, ComponentSection } from "../../utilities";

export default function PhotoHeroComponentsDemo() {
  return (
    <div className="w-full">
      {/* Live PhotoHero Demo - Fullscreen */}
      <PhotoHero
        title="Creative Insights & Design Journeys —"
        subtitle="Welcome to my Thoughts, where you'll get an inside look at my latest projects and product ideas. Explore, discover, and stay updated on what my team and I have been working on recently."
        backgroundImage="/assets/backgrounds/abstract_neutral_1.jpg"
        photo="/assets/images/photos/photo_1.jpg"
        link="#documentation"
      />

      {/* Documentation Section */}
      <div
        id="documentation"
        className="max-w-6xl mx-auto py-12 px-4 space-y-16"
      >
        {/* Page Header */}
        <header className="border-b border-gray-200 pb-8">
          <h1 className={`${TYPOGRAPHY.h1} text-black`}>PhotoHero Component</h1>
          <p className={`${TYPOGRAPHY.text18} mt-4`}>
            A sophisticated hero component featuring a two-column layout with
            text content and a prominent photo element.
          </p>
        </header>

        {/* Component Implementation */}
        <ComponentSection title="Implementation">
          <div className="space-y-12">
            {/* Basic Usage */}
            <CodeExample
              title="Basic PhotoHero Implementation"
              code={`<PhotoHero 
  title="Creative Insights & Design Journeys —"
  subtitle="Welcome to my Thoughts, where you&apos;ll get an inside look at my latest projects and product ideas. Explore, discover, and stay updated on what my team and I have been working on recently."
  backgroundImage="/assets/backgrounds/abstract_neutral_1.jpg"
  photo="/assets/images/cards/card_1.jpg"
  link="#next-section"
/>`}
            >
              <div className="bg-gray-100 p-4 rounded-lg text-center">
                <p className="text-gray-600">
                  The PhotoHero component above demonstrates the full
                  implementation. It features a split layout with text on the
                  left and photo on the right for desktop/tablet.
                </p>
              </div>
            </CodeExample>

            {/* Alternative Configuration */}
            <CodeExample
              title="Alternative Configuration"
              code={`<PhotoHero 
  title="Portfolio Showcase"
  subtitle="Discover a curated collection of design work spanning multiple disciplines and creative challenges."
  backgroundImage="/assets/images/hero/hero_1_L.jpg"
  photo="/assets/images/thoughts/thought_2.jpg"
  link="#portfolio"
/>`}
            >
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-800">
                  <strong>Note:</strong> This example shows how to customize the
                  component with different background images and photos.
                </p>
              </div>
            </CodeExample>

            {/* Component Properties */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h4 className={`${TYPOGRAPHY.h5} mb-4`}>PhotoHero Properties</h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-sm mb-3">Props:</h5>
                  <ul className="text-sm space-y-2 font-mono">
                    <li>
                      <strong>title:</strong> string - Main heading text (h1
                      with h3 styling)
                    </li>
                    <li>
                      <strong>subtitle:</strong> string - Supporting descriptive
                      text
                    </li>
                    <li>
                      <strong>backgroundImage:</strong> string - Fullscreen
                      background image URL
                    </li>
                    <li>
                      <strong>photo:</strong> string - Foreground portrait/photo
                      image URL
                    </li>
                    <li>
                      <strong>link:</strong> string - URL for arrow scroll link
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-sm mb-3">Features:</h5>
                  <ul className="text-sm space-y-2">
                    <li>• Fullscreen viewport height layout</li>
                    <li>
                      • Two-column desktop layout (text left, photo right)
                    </li>
                    <li>• Responsive mobile layout (photo top, text bottom)</li>
                    <li>• Synchronized text and photo animations</li>
                    <li>• Rounded photo corners with proper aspect ratio</li>
                    <li>• Dark overlay for optimal text readability</li>
                    <li>• Animated scroll arrow with looping motion</li>
                    <li>• Optimized Next.js Image components</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Layout Structure */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className={`${TYPOGRAPHY.h5} mb-4`}>Layout Structure</h4>
              <div className="space-y-4 text-sm">
                <div>
                  <strong>Desktop/Tablet (M & L):</strong>
                  <div className="ml-4 mt-1">
                    • Two-column layout with equal flex distribution
                    <br />
                    • Left column: Text content (title, subtitle, arrow)
                    bottom-aligned
                    <br />
                    • Right column: Photo bottom-aligned with center horizontal
                    positioning
                    <br />• Both columns have 80px bottom padding for
                    consistency
                  </div>
                </div>
                <div>
                  <strong>Mobile (S):</strong>
                  <div className="ml-4 mt-1">
                    • Single column vertical stack
                    <br />
                    • Photo positioned at top center with padding
                    <br />
                    • Text content positioned at bottom
                    <br />• Arrow centered for mobile-friendly interaction
                  </div>
                </div>
              </div>
            </div>

            {/* Animation Details */}
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h4 className={`${TYPOGRAPHY.h5} mb-4`}>Animation System</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <strong>Title Animation:</strong> Fade in from bottom with
                  140px Y offset + blur (10px), 1s duration, 0.2s delay
                </div>
                <div>
                  <strong>Photo Animation:</strong> Same timing as title - fade
                  in from bottom with 140px Y offset + blur (10px), 1s duration,
                  0.2s delay
                </div>
                <div>
                  <strong>Subtitle Animation:</strong> Same effect as title,
                  executed right after title completes (1.2s delay)
                </div>
                <div>
                  <strong>Arrow Animation:</strong> Appears after text,
                  continuous Y motion (0 → 8px → 0), 2s loop
                </div>
                <div>
                  <strong>Timing Sequence:</strong> Title + Photo (0.2s) →
                  Subtitle (1.2s) → Arrow (2.4s)
                </div>
                <div>
                  <strong>Synchronized Elements:</strong> Title and photo
                  animate simultaneously for visual cohesion
                </div>
              </div>
            </div>

            {/* Typography Reference */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className={`${TYPOGRAPHY.h5} mb-4`}>
                Typography Classes Used
              </h4>
              <div className="space-y-2 text-sm font-mono">
                <div>
                  <strong>title:</strong> TYPOGRAPHY.h3 (white, font-medium)
                </div>
                <div>
                  <strong>subtitle:</strong> TYPOGRAPHY.text18 (white/90
                  opacity)
                </div>
              </div>
            </div>

            {/* Photo Specifications */}
            <div className="bg-purple-50 p-6 rounded-lg">
              <h4 className={`${TYPOGRAPHY.h5} mb-4`}>Photo Specifications</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <strong>Aspect Ratio:</strong> 4:5 (portrait orientation) for
                  optimal visual balance
                </div>
                <div>
                  <strong>Desktop Size:</strong> Maximum width 350px, height
                  auto-calculated
                </div>
                <div>
                  <strong>Mobile Size:</strong> Maximum width 280px, height
                  auto-calculated
                </div>
                <div>
                  <strong>Border Radius:</strong> Rounded corners (rounded-lg)
                  for modern aesthetic
                </div>
                <div>
                  <strong>Object Fit:</strong> Cover to maintain aspect ratio
                  and fill container
                </div>
                <div>
                  <strong>Animation:</strong> Synchronized with title text for
                  cohesive entrance
                </div>
              </div>
            </div>

            {/* Responsive Behavior */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className={`${TYPOGRAPHY.h5} mb-4`}>Responsive Behavior</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Desktop (L):</strong> 80px horizontal padding,
                  two-column layout, 350px max photo width
                </div>
                <div>
                  <strong>Tablet (M):</strong> 48px horizontal padding,
                  maintained two-column layout, responsive photo sizing
                </div>
                <div>
                  <strong>Mobile (S):</strong> 16px horizontal padding, vertical
                  stack layout, 280px max photo width
                </div>
                <div>
                  <strong>Background:</strong> Full viewport coverage with
                  object-cover and overlay
                </div>
                <div>
                  <strong>Content Flow:</strong> Photo-first on mobile,
                  side-by-side on larger screens
                </div>
                <div>
                  <strong>Typography:</strong> Scales appropriately for each
                  breakpoint
                </div>
              </div>
            </div>

            {/* Technical Notes */}
            <div className="bg-red-50 p-6 rounded-lg">
              <h4 className={`${TYPOGRAPHY.h5} mb-4`}>
                Technical Implementation Notes
              </h4>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Layout System:</strong> Flexbox with responsive column
                  distribution
                </div>
                <div>
                  <strong>Animation Framework:</strong> Motion/React with
                  synchronized timing
                </div>
                <div>
                  <strong>Performance:</strong> Optimized with Next.js Image
                  components and priority loading
                </div>
                <div>
                  <strong>Accessibility:</strong> Proper semantic HTML structure
                  and alt text
                </div>
                <div>
                  <strong>Z-Index Management:</strong> Layered background,
                  overlay, and content
                </div>
                <div>
                  <strong>Image Optimization:</strong> Responsive sizing with
                  proper aspect ratios
                </div>
                <div>
                  <strong>Mobile-First:</strong> Responsive design with mobile
                  considerations
                </div>
              </div>
            </div>
          </div>
        </ComponentSection>

        {/* Usage Guidelines */}
        <ComponentSection title="Usage Guidelines">
          <div className="bg-green-50 p-6 rounded-lg space-y-6">
            <div>
              <h4 className={`${TYPOGRAPHY.h5} mb-3`}>Import Component</h4>
              <div className="bg-gray-900 p-4 rounded font-mono text-sm text-green-400">
                <div>
                  import PhotoHero from
                  &apos;@/components/heroes/PhotoHero&apos;;
                </div>
              </div>
            </div>

            <div>
              <h4 className={`${TYPOGRAPHY.h5} mb-3`}>Best Practices</h4>
              <ul className={`${TYPOGRAPHY.text16} space-y-2`}>
                <li>
                  • <strong>Background Images:</strong> Use high-quality images
                  (minimum 1920x1080) with good contrast areas
                </li>
                <li>
                  • <strong>Photo Selection:</strong> Portrait orientation works
                  best (4:5 aspect ratio recommended)
                </li>
                <li>
                  • <strong>Photo Quality:</strong> Use high-resolution photos
                  (minimum 800x1000 pixels) for crisp display
                </li>
                <li>
                  • <strong>Title Length:</strong> Keep titles concise and
                  impactful for better visual hierarchy
                </li>
                <li>
                  • <strong>Subtitle Content:</strong> Use descriptive text that
                  complements both title and photo
                </li>
                <li>
                  • <strong>Background vs Photo:</strong> Ensure background
                  doesn&apos;t compete with foreground photo
                </li>
                <li>
                  • <strong>Color Contrast:</strong> Test text readability
                  against background with overlay
                </li>
                <li>
                  • <strong>Mobile Layout:</strong> Consider how photo and text
                  work together vertically
                </li>
                <li>
                  • <strong>Performance:</strong> Optimize both background and
                  photo images before implementation
                </li>
                <li>
                  • <strong>Content Balance:</strong> Maintain appropriate
                  text-to-image ratio on all devices
                </li>
                <li>
                  • <strong>Animation Timing:</strong> Default synchronized
                  timing works well for most use cases
                </li>
                <li>
                  • <strong>Testing:</strong> Test layout on various screen
                  sizes to ensure proper scaling
                </li>
              </ul>
            </div>

            <div>
              <h4 className={`${TYPOGRAPHY.h5} mb-3`}>
                Image Optimization Tips
              </h4>
              <ul className={`${TYPOGRAPHY.text16} space-y-2`}>
                <li>
                  • <strong>Background Image:</strong> Can be wider/landscape
                  oriented for full coverage
                </li>
                <li>
                  • <strong>Photo Image:</strong> Portrait orientation (taller
                  than wide) works best for the layout
                </li>
                <li>
                  • <strong>File Formats:</strong> Use WebP when possible, with
                  JPEG fallbacks
                </li>
                <li>
                  • <strong>Loading Strategy:</strong> Both images use priority
                  loading for immediate visibility
                </li>
                <li>
                  • <strong>Responsive Sizing:</strong> Images scale
                  appropriately across breakpoints
                </li>
              </ul>
            </div>
          </div>
        </ComponentSection>
      </div>
    </div>
  );
}
