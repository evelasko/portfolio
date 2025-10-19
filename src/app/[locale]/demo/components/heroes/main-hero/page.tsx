import React from "react";
import MainHero from "@/components/heroes/MainHero";
import { TYPOGRAPHY } from "@/lib/typography";
import { CodeExample, ComponentSection } from "../../utilities";

export default function MainHeroComponentsDemo() {
  return (
    <div className="w-full">
      {/* Live MainHero Demo - Fullscreen */}
      <MainHero
        topText="MARK"
        bottomText="ASHTON"
        // topText="ENrique"
        // bottomText="VELASCO"
        sideTextHorizontal="2K25"
        sideTextVertical="./ PORTFOLIO"
        graphic="/assets/graphics/signature_black.svg"
        graphicHeight={120}
        graphicWidth={250}
        subtitle={`TIMELESS VISUAL STORIES\nFOR LEGENDARY BRANDS`}
        video="/assets/videos/throwback-slo-mo.mp4"
        images={[
          "/assets/images/cards/card_1.jpg",
          "/assets/images/cards/card_2.jpg",
          "/assets/images/cards/card_3.jpg",
        ]}
        link="#documentation"
        stayDuration={5000}
        transitionSpeed={0.8}
      />

      {/* Documentation Section */}
      <div
        id="documentation"
        className="max-w-6xl mx-auto py-12 px-4 space-y-16"
      >
        {/* Page Header */}
        <header className="border-b border-gray-200 pb-8">
          <h1 className={`${TYPOGRAPHY.h1} text-black`}>MainHero Component</h1>
          <p className={`${TYPOGRAPHY.text18} mt-4`}>
            Fullscreen hero component with complex animations, image carousel,
            and sophisticated layout structure.
          </p>
        </header>

        {/* Component Implementation */}
        <ComponentSection title="Implementation">
          <div className="space-y-12">
            {/* Basic Usage */}
            <CodeExample
              title="Basic MainHero Implementation"
              code={`<MainHero
  topText="MARK"
  bottomText="ASHTON"
  sideTextHorizontal="2K25"
  sideTextVertical="./ PORTFOLIO"
  graphic="/assets/graphics/signature.svg"
  graphicHeight={120}
  graphicWidth={250}
  subtitle="TIMELESS VISUAL STORIES FOR LEGENDARY BRANDS"
  images={[
    "/assets/backgrounds/abstract_neutral_1.jpg",
    "/assets/images/cards/card_1.jpg",
    "/assets/images/thoughts/thought_1.jpg"
  ]}
  link="#next-section"
  stayDuration={4000}
  transitionSpeed={1.2}
/>`}
            >
              <div className="bg-gray-100 p-4 rounded-lg text-center">
                <p className="text-gray-600">
                  The MainHero component above demonstrates the full
                  implementation. It features a fullscreen layout with complex
                  animations and responsive design.
                </p>
              </div>
            </CodeExample>

            {/* Alternative Configuration */}
            <CodeExample
              title="Alternative Configuration"
              code={`<MainHero
  topText="CREATIVE"
  bottomText="STUDIO"
  sideTextHorizontal="2024"
  sideTextVertical="./ DESIGN"
  graphic="/assets/graphics/logo.svg"
  graphicHeight={100}
  graphicWidth={200}
  subtitle="INNOVATIVE SOLUTIONS FOR MODERN BRANDS"
  images={[
    "/assets/images/hero/hero_1_L.jpg",
    "/assets/images/hero/hero_2_L.jpg"
  ]}
  link="#portfolio"
  stayDuration={5000}
  transitionSpeed={0.6}
/>`}
            >
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-800">
                  <strong>Note:</strong> This example shows how to customize the
                  component with different content and images.
                </p>
              </div>
            </CodeExample>

            {/* Video Background Configuration */}
            <CodeExample
              title="Video Background Configuration"
              code={`<MainHero
  topText="CINEMATIC"
  bottomText="EXPERIENCE"
  sideTextHorizontal="2025"
  sideTextVertical="./ MOTION"
  graphic="/assets/graphics/signature.svg"
  graphicHeight={120}
  graphicWidth={250}
  subtitle="BRINGING STORIES TO LIFE THROUGH MOTION"
  images={[]} // Ignored when video is provided
  video="/assets/videos/hero-background.mp4"
  link="#portfolio"
/>`}
            >
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-green-800">
                  <strong>Video Background:</strong> When the video prop is
                  provided, it takes precedence over the image carousel. The
                  video will autoplay, loop, and be muted for optimal web
                  performance.
                </p>
              </div>
            </CodeExample>

            {/* Component Properties */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h4 className={`${TYPOGRAPHY.h5} mb-4`}>MainHero Properties</h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-sm mb-3">Props:</h5>
                  <ul className="text-sm space-y-2 font-mono">
                    <li>
                      <strong>topText:</strong> string - Large heading text (top
                      section)
                    </li>
                    <li>
                      <strong>bottomText:</strong> string - Large heading text
                      (bottom section)
                    </li>
                    <li>
                      <strong>sideTextHorizontal:</strong> string - Side text
                      (horizontal)
                    </li>
                    <li>
                      <strong>sideTextVertical:</strong> string - Side text
                      (vertical)
                    </li>
                    <li>
                      <strong>graphic:</strong> string - SVG/PNG path for
                      signature/logo
                    </li>
                    <li>
                      <strong>graphicHeight:</strong> number - Graphic height
                      (default: 100)
                    </li>
                    <li>
                      <strong>graphicWidth:</strong> number - Graphic width
                      (default: 100)
                    </li>
                    <li>
                      <strong>subtitle:</strong> string - Subtitle text in
                      bottom section
                    </li>
                    <li>
                      <strong>images:</strong> string[] - Array of background
                      images (ignored if video is provided)
                    </li>
                    <li>
                      <strong>link:</strong> string - URL for arrow scroll link
                    </li>
                    <li>
                      <strong>video:</strong> string (optional) - Video URL for
                      background video instead of image carousel
                    </li>
                    <li>
                      <strong>stayDuration:</strong> number - Image stay time in
                      ms (default: 4000, carousel only)
                    </li>
                    <li>
                      <strong>transitionSpeed:</strong> number - Transition
                      speed in seconds (default: 1.2, carousel only)
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-sm mb-3">Features:</h5>
                  <ul className="text-sm space-y-2">
                    <li>• Fullscreen viewport height layout</li>
                    <li>• Three-section vertical structure</li>
                    <li>
                      • Background image carousel with smooth transitions OR
                      video background
                    </li>
                    <li>• Per-character text animations with blur effects</li>
                    <li>• Complex side text animations (-404px Y offset)</li>
                    <li>• Responsive typography and spacing</li>
                    <li>• Animated scroll arrow with looping motion</li>
                    <li>• Vertical text orientation for portfolio label</li>
                    <li>• Dark overlay for text readability</li>
                    <li>
                      • Optimized Next.js Image components and HTML5 video
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Layout Structure */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className={`${TYPOGRAPHY.h5} mb-4`}>Layout Structure</h4>
              <div className="space-y-4 text-sm">
                <div>
                  <strong>Section 1 (Top):</strong>
                  <div className="ml-4 mt-1">
                    • Contains topText (left-aligned)
                    <br />
                    • Uses h1 typography with character-by-character animation
                    <br />• Blur and Y-offset entrance effects
                  </div>
                </div>
                <div>
                  <strong>Section 2 (Middle):</strong>
                  <div className="ml-4 mt-1">
                    • Two-column layout
                    <br />
                    • Left: sideTextHorizontal + sideTextVertical (stacked,
                    left-aligned)
                    <br />
                    • Right: graphic (centered, slightly pushed right)
                    <br />• Side text animated as a block with -404px Y offset
                  </div>
                </div>
                <div>
                  <strong>Section 3 (Bottom):</strong>
                  <div className="ml-4 mt-1">
                    • bottomText (right-aligned)
                    <br />
                    • subtitle (left-aligned, below bottomText)
                    <br />
                    • Arrow link (left-aligned, below subtitle)
                    <br />• Character animations with staggered delays
                  </div>
                </div>
              </div>
            </div>

            {/* Animation Details */}
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h4 className={`${TYPOGRAPHY.h5} mb-4`}>Animation System</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <strong>Text Character Animation:</strong> Blur (10px) + Y
                  offset (150px) → Clear + Position, 0.6s delay + staggered
                </div>
                <div>
                  <strong>Side Text Block:</strong> Y offset (-404px) →
                  Position, 1s duration, ease-in-out
                </div>
                <div>
                  <strong>Subtitle Animation:</strong> X offset (100px) + Blur →
                  Position + Clear, 0.6s delay
                </div>
                <div>
                  <strong>Graphic Animation:</strong> Scale (0.8) + Opacity →
                  Scale (1) + Opacity, 0.8s delay
                </div>
                <div>
                  <strong>Arrow Animation:</strong> Continuous Y motion (0 →
                  10px → 0), 2s loop
                </div>
                <div>
                  <strong>Background Carousel:</strong> Horizontal slide
                  transitions, 4s intervals
                </div>
                <div>
                  <strong>Timing Sequence:</strong> topText (0.6s) → sideText
                  (scroll trigger) → bottomText (1.2s) → subtitle (1.8s)
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
                  <strong>topText & bottomText:</strong> text-h1-s m:text-h1-m
                  l:text-h1-l (white-100, uppercase)
                </div>
                <div>
                  <strong>sideTextHorizontal & sideTextVertical:</strong>{" "}
                  mono-24-s m:mono-24-m l:mono-24-l (white-100, uppercase)
                </div>
                <div>
                  <strong>subtitle:</strong> mono-24-s m:mono-24-m l:mono-24-l
                  (white-100, uppercase)
                </div>
              </div>
            </div>

            {/* Responsive Behavior */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className={`${TYPOGRAPHY.h5} mb-4`}>Responsive Behavior</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Desktop (L):</strong> 80px padding, largest text
                  sizes, full layout
                </div>
                <div>
                  <strong>Tablet (M):</strong> 48px padding, medium text sizes,
                  maintained layout
                </div>
                <div>
                  <strong>Mobile (S):</strong> 16px padding, smallest text
                  sizes, adapted spacing
                </div>
                <div>
                  <strong>Images:</strong> Full viewport coverage with
                  object-cover
                </div>
                <div>
                  <strong>Layout:</strong> Maintains three-section structure
                  across all devices
                </div>
                <div>
                  <strong>Typography:</strong> Scales appropriately for each
                  breakpoint
                </div>
              </div>
            </div>

            {/* Carousel Configuration */}
            <div className="bg-purple-50 p-6 rounded-lg">
              <h4 className={`${TYPOGRAPHY.h5} mb-4`}>
                Carousel Configuration
              </h4>
              <div className="space-y-4 text-sm">
                <div>
                  <strong>stayDuration</strong> (milliseconds):
                  <div className="ml-4 mt-1">
                    • Controls how long each image is displayed
                    <br />
                    • Default: 4000ms (4 seconds)
                    <br />
                    • Shorter values create faster slideshow pace
                    <br />• Longer values allow more time to appreciate each
                    image
                  </div>
                </div>
                <div>
                  <strong>transitionSpeed</strong> (seconds):
                  <div className="ml-4 mt-1">
                    • Controls the speed of the slide transition animation
                    <br />
                    • Default: 1.2 seconds
                    <br />
                    • Lower values create snappier transitions (0.6-0.8s)
                    <br />• Higher values create smoother, more cinematic
                    transitions (1.5-2.0s)
                  </div>
                </div>
                <div className="bg-purple-100 p-3 rounded mt-3">
                  <strong>Recommended Combinations:</strong>
                  <br />• Fast slideshow: stayDuration={`{2000}`},
                  transitionSpeed={`{0.6}`}
                  <br />• Standard: stayDuration={`{4000}`}, transitionSpeed=
                  {`{1.2}`}
                  <br />• Cinematic: stayDuration={`{6000}`}, transitionSpeed=
                  {`{2.0}`}
                </div>
              </div>
            </div>

            {/* Video Background Details */}
            <div className="bg-green-50 p-6 rounded-lg">
              <h4 className={`${TYPOGRAPHY.h5} mb-4`}>
                Video Background Implementation
              </h4>
              <div className="space-y-4 text-sm">
                <div>
                  <strong>Video Attributes:</strong>
                  <div className="ml-4 mt-1">
                    • <strong>autoPlay:</strong> Starts playing automatically
                    <br />• <strong>loop:</strong> Repeats indefinitely
                    <br />• <strong>muted:</strong> Required for autoplay to
                    work in most browsers
                    <br />• <strong>playsInline:</strong> Prevents fullscreen on
                    mobile devices
                    <br />• <strong>preload=&quot;metadata&quot;:</strong> Loads
                    video metadata without downloading entire file
                  </div>
                </div>
                <div>
                  <strong>Format Support:</strong>
                  <div className="ml-4 mt-1">
                    • Primary: MP4 (H.264) for broad browser support
                    <br />
                    • Fallback: WebM for modern browsers (better compression)
                    <br />• Graceful degradation to gray background if video
                    fails
                  </div>
                </div>
                <div>
                  <strong>Performance Optimization:</strong>
                  <div className="ml-4 mt-1">
                    • CSS object-fit: cover for responsive fullscreen scaling
                    <br />
                    • Metadata preloading for faster start times
                    <br />• Conditional rendering - video takes precedence over
                    images
                  </div>
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
                  <strong>Background Logic:</strong> Conditional rendering
                  between video and image carousel
                </div>
                <div>
                  <strong>Carousel Logic:</strong> Auto-advancing with React
                  useEffect and useState (disabled when video is used)
                </div>
                <div>
                  <strong>Animation Framework:</strong> Motion/React with
                  complex animation sequences
                </div>
                <div>
                  <strong>Performance:</strong> Optimized with Next.js Image
                  component and HTML5 video best practices
                </div>
                <div>
                  <strong>Accessibility:</strong> Proper alt texts and semantic
                  HTML structure
                </div>
                <div>
                  <strong>Z-Index Management:</strong> Layered background,
                  overlay, and content
                </div>
                <div>
                  <strong>Memory Management:</strong> Automatic cleanup of
                  interval timers
                </div>
                <div>
                  <strong>Carousel Control:</strong> Configurable timing with
                  stayDuration and transitionSpeed props
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
                  import MainHero from &apos;@/components/heroes/MainHero&apos;;
                </div>
              </div>
            </div>

            <div>
              <h4 className={`${TYPOGRAPHY.h5} mb-3`}>Best Practices</h4>
              <ul className={`${TYPOGRAPHY.text16} space-y-2`}>
                <li>
                  • <strong>Images:</strong> Use high-quality images (minimum
                  1920x1080) for background carousel
                </li>
                <li>
                  • <strong>Video Files:</strong> Optimize video files for web
                  (H.264 MP4, under 10MB, 15-30 seconds max)
                </li>
                <li>
                  • <strong>Video vs Images:</strong> Video takes precedence -
                  if video prop is provided, images are ignored
                </li>
                <li>
                  • <strong>Text Length:</strong> Keep topText and bottomText
                  concise for better visual impact
                </li>
                <li>
                  • <strong>Image Count:</strong> Use 2-4 images in carousel for
                  optimal performance
                </li>
                <li>
                  • <strong>Graphic Files:</strong> SVG files work best for
                  scalable graphics/signatures
                </li>
                <li>
                  • <strong>Link Target:</strong> Ensure link points to next
                  section or valid page
                </li>
                <li>
                  • <strong>Content Hierarchy:</strong> Use contrasting content
                  between top and bottom text
                </li>
                <li>
                  • <strong>Side Text:</strong> Keep portfolio/year information
                  concise
                </li>
                <li>
                  • <strong>Subtitle:</strong> Use compelling tagline that fits
                  the brand
                </li>
                <li>
                  • <strong>Performance:</strong> Optimize images and videos
                  before using
                </li>
                <li>
                  • <strong>Video Quality:</strong> Ensure video content is
                  engaging but not distracting from text
                </li>
                <li>
                  • <strong>Accessibility:</strong> Consider providing video
                  alternatives for users with reduced motion preferences
                </li>
                <li>
                  • <strong>Carousel Timing:</strong> Adjust stayDuration and
                  transitionSpeed to match content pace (image carousel only)
                </li>
                <li>
                  • <strong>User Experience:</strong> Longer stay times work
                  better for text-heavy designs
                </li>
                <li>
                  • <strong>Testing:</strong> Test animations and video playback
                  on various devices for smooth performance
                </li>
              </ul>
            </div>
          </div>
        </ComponentSection>
      </div>
    </div>
  );
}
