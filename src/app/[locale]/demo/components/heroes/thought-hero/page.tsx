import React from "react";
import ThoughtHero from "@/components/heroes/ThoughtHero";
import { TYPOGRAPHY } from "@/lib/typography";
import { CodeExample, ComponentSection } from "../../utilities";

export default function ThoughtHeroComponentsDemo() {
  return (
    <div className="w-full">
      {/* Live ThoughtHero Demo */}
      <ThoughtHero
        title="Making of Stellar Odyssey"
        coverImage="/assets/images/thoughts/thought_1.jpg"
        leftInfoLabel="Published on"
        leftInfoValue="July 31, 2024"
        rightInfoLabel="Reading Time"
        rightInfoValue="2 mins"
      />

      {/* Documentation Section */}
      <div className="max-w-6xl mx-auto py-12 px-4 space-y-16">
        {/* Page Header */}
        <header className="border-b border-gray-200 pb-8">
          <h1 className={`${TYPOGRAPHY.h1} text-black`}>
            ThoughtHero Component
          </h1>
          <p className={`${TYPOGRAPHY.text18} mt-4`}>
            A blog-style hero component designed for articles and thought
            pieces, featuring metadata and a prominent cover image.
          </p>
        </header>

        {/* Component Implementation */}
        <ComponentSection title="Implementation">
          <div className="space-y-12">
            {/* Basic Usage */}
            <CodeExample
              title="Basic ThoughtHero Implementation"
              code={`<ThoughtHero 
  title="Making of Stellar Odyssey"
  coverImage="/assets/images/thoughts/thought_1.jpg"
  leftInfoLabel="Published on"
  leftInfoValue="July 31, 2024"
  rightInfoLabel="Reading Time"
  rightInfoValue="2 mins"
/>`}
            >
              <div className="bg-gray-100 p-4 rounded-lg text-center">
                <p className="text-gray-600">
                  The ThoughtHero component above demonstrates a typical blog
                  post header. It features a clean layout with metadata and a
                  cover image.
                </p>
              </div>
            </CodeExample>

            {/* Alternative Configuration */}
            <CodeExample
              title="Alternative Configuration"
              code={`<ThoughtHero 
  title="Design Process Deep Dive"
  coverImage="/assets/images/thoughts/thought_2.jpg"
  leftInfoLabel="Category"
  leftInfoValue="Design Process"
  rightInfoLabel="Difficulty"
  rightInfoValue="Advanced"
/>`}
            >
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-800">
                  <strong>Note:</strong> The metadata fields are flexible and
                  can be used for different types of information like
                  categories, difficulty levels, or author details.
                </p>
              </div>
            </CodeExample>

            {/* Component Properties */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h4 className={`${TYPOGRAPHY.h5} mb-4`}>
                ThoughtHero Properties
              </h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-sm mb-3">Props:</h5>
                  <ul className="text-sm space-y-2 font-mono">
                    <li>
                      <strong>title:</strong> string - Main article title (h1
                      with h3 styling)
                    </li>
                    <li>
                      <strong>coverImage:</strong> string - Article cover image
                      URL
                    </li>
                    <li>
                      <strong>leftInfoLabel:</strong> string - Left metadata
                      label
                    </li>
                    <li>
                      <strong>leftInfoValue:</strong> string - Left metadata
                      value
                    </li>
                    <li>
                      <strong>rightInfoLabel:</strong> string - Right metadata
                      label
                    </li>
                    <li>
                      <strong>rightInfoValue:</strong> string - Right metadata
                      value
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-sm mb-3">Features:</h5>
                  <ul className="text-sm space-y-2">
                    <li>• Container-based layout (max-width 6xl)</li>
                    <li>• Sequential text animations with blur effects</li>
                    <li>• Responsive metadata layout</li>
                    <li>• 16:9 aspect ratio cover image</li>
                    <li>• Rounded corners for modern aesthetic</li>
                    <li>• White background for article pages</li>
                    <li>• Flexible metadata fields</li>
                    <li>• Optimized Next.js Image component</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Layout Structure */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className={`${TYPOGRAPHY.h5} mb-4`}>Layout Structure</h4>
              <div className="space-y-4 text-sm">
                <div>
                  <strong>Container:</strong>
                  <div className="ml-4 mt-1">
                    • Max-width 6xl (1152px) with centered alignment
                    <br />
                    • Responsive padding: S (16px), M (32px), L (48px)
                    <br />• Vertical padding: S (48px), M (64px), L (80px)
                  </div>
                </div>
                <div>
                  <strong>Title Section:</strong>
                  <div className="ml-4 mt-1">
                    • Large heading using h3 typography classes
                    <br />
                    • Bottom margin: S (32px), M&L (48px)
                    <br />• Black text with medium font weight
                  </div>
                </div>
                <div>
                  <strong>Metadata Section:</strong>
                  <div className="ml-4 mt-1">
                    • Responsive flex layout: vertical on mobile, horizontal on
                    tablet/desktop
                    <br />
                    • Left info: left-aligned on all devices
                    <br />
                    • Right info: left-aligned on mobile, right-aligned on
                    tablet/desktop
                    <br />• Label/value pairs stacked vertically
                  </div>
                </div>
                <div>
                  <strong>Cover Image:</strong>
                  <div className="ml-4 mt-1">
                    • Full container width with 16:9 aspect ratio
                    <br />
                    • Rounded corners (rounded-xl)
                    <br />• Object-cover for proper image scaling
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
                  <strong>Metadata Animation:</strong> Both left and right info
                  animate simultaneously with same effect as title, 1.2s delay
                </div>
                <div>
                  <strong>Cover Image Animation:</strong> Same fade effect as
                  other elements, 2.4s delay (after metadata)
                </div>
                <div>
                  <strong>Timing Sequence:</strong> Title (0.2s) → Metadata
                  (1.2s) → Cover Image (2.4s)
                </div>
                <div>
                  <strong>Easing:</strong> Consistent ease-out for smooth,
                  professional feel
                </div>
                <div>
                  <strong>Blur Effect:</strong> 10px blur that clears during
                  animation for sharp focus
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
                  <strong>title:</strong> TYPOGRAPHY.h3 (black, font-medium)
                </div>
                <div>
                  <strong>leftInfoLabel & rightInfoLabel:</strong>{" "}
                  TYPOGRAPHY.text16 (black-40 color)
                </div>
                <div>
                  <strong>leftInfoValue & rightInfoValue:</strong>{" "}
                  TYPOGRAPHY.text16 (black, font-medium)
                </div>
              </div>
            </div>

            {/* Image Specifications */}
            <div className="bg-purple-50 p-6 rounded-lg">
              <h4 className={`${TYPOGRAPHY.h5} mb-4`}>
                Cover Image Specifications
              </h4>
              <div className="space-y-3 text-sm">
                <div>
                  <strong>Aspect Ratio:</strong> 16:9 (landscape orientation)
                  for optimal article header display
                </div>
                <div>
                  <strong>Dimensions:</strong> Minimum 1200x675 pixels for
                  high-quality display
                </div>
                <div>
                  <strong>Border Radius:</strong> Rounded-xl for modern,
                  friendly aesthetic
                </div>
                <div>
                  <strong>Object Fit:</strong> Cover to maintain aspect ratio
                  and fill container
                </div>
                <div>
                  <strong>Loading:</strong> Priority loading for immediate
                  visibility
                </div>
                <div>
                  <strong>Responsive Sizing:</strong> Full container width at
                  all breakpoints
                </div>
                <div>
                  <strong>Animation:</strong> Delayed entrance for sequential
                  content loading
                </div>
              </div>
            </div>

            {/* Responsive Behavior */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className={`${TYPOGRAPHY.h5} mb-4`}>Responsive Behavior</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Desktop (L):</strong> 48px horizontal padding,
                  horizontal metadata layout, right-aligned right info
                </div>
                <div>
                  <strong>Tablet (M):</strong> 32px horizontal padding,
                  maintained horizontal metadata layout
                </div>
                <div>
                  <strong>Mobile (S):</strong> 16px horizontal padding, vertical
                  metadata stack, left-aligned info
                </div>
                <div>
                  <strong>Container:</strong> Max-width 1152px with centered
                  alignment
                </div>
                <div>
                  <strong>Typography:</strong> Scales appropriately for each
                  breakpoint
                </div>
                <div>
                  <strong>Spacing:</strong> Responsive margins and padding for
                  optimal readability
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
                  <strong>Layout System:</strong> Container-based with max-width
                  constraint
                </div>
                <div>
                  <strong>Animation Framework:</strong> Motion/React with
                  sequential timing
                </div>
                <div>
                  <strong>Performance:</strong> Optimized with Next.js Image
                  component and priority loading
                </div>
                <div>
                  <strong>Accessibility:</strong> Proper semantic HTML structure
                  with h1 heading
                </div>
                <div>
                  <strong>Image Optimization:</strong> Responsive sizing and
                  modern loading strategies
                </div>
                <div>
                  <strong>Content Structure:</strong> Designed for article/blog
                  post headers
                </div>
                <div>
                  <strong>Metadata Flexibility:</strong> Generic label/value
                  pairs for various use cases
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
                  import ThoughtHero from
                  &apos;@/components/heroes/ThoughtHero&apos;;
                </div>
              </div>
            </div>

            <div>
              <h4 className={`${TYPOGRAPHY.h5} mb-3`}>Best Practices</h4>
              <ul className={`${TYPOGRAPHY.text16} space-y-2`}>
                <li>
                  • <strong>Cover Images:</strong> Use high-quality landscape
                  images (minimum 1200x675) relevant to content
                </li>
                <li>
                  • <strong>Title Length:</strong> Keep titles concise but
                  descriptive for better engagement
                </li>
                <li>
                  • <strong>Metadata Labels:</strong> Use clear, consistent
                  labels across your content
                </li>
                <li>
                  • <strong>Date Format:</strong> Use readable date formats
                  (e.g., &quot;July 31, 2024&quot; vs &quot;2024-07-31&quot;)
                </li>
                <li>
                  • <strong>Reading Time:</strong> Calculate accurately or use
                  &quot;X min read&quot; format
                </li>
                <li>
                  • <strong>Image Selection:</strong> Choose images that
                  represent the article content effectively
                </li>
                <li>
                  • <strong>Content Hierarchy:</strong> Ensure title stands out
                  prominently
                </li>
                <li>
                  • <strong>Metadata Balance:</strong> Use similar
                  length/complexity for left and right metadata
                </li>
                <li>
                  • <strong>Performance:</strong> Optimize cover images for web
                  before implementation
                </li>
                <li>
                  • <strong>Consistency:</strong> Maintain consistent metadata
                  structure across articles
                </li>
                <li>
                  • <strong>Accessibility:</strong> Use descriptive alt text for
                  cover images
                </li>
                <li>
                  • <strong>Animation Timing:</strong> Default timing works well
                  for most content
                </li>
              </ul>
            </div>

            <div>
              <h4 className={`${TYPOGRAPHY.h5} mb-3`}>
                Common Metadata Patterns
              </h4>
              <div className="space-y-4">
                <div>
                  <strong>Blog Posts:</strong>
                  <div className="ml-4 mt-1 text-sm">
                    • Left: &quot;Published on&quot; / Date
                    <br />• Right: &quot;Reading Time&quot; / Duration
                  </div>
                </div>
                <div>
                  <strong>Case Studies:</strong>
                  <div className="ml-4 mt-1 text-sm">
                    • Left: &quot;Project Type&quot; / Category
                    <br />• Right: &quot;Duration&quot; / Timeline
                  </div>
                </div>
                <div>
                  <strong>Tutorials:</strong>
                  <div className="ml-4 mt-1 text-sm">
                    • Left: &quot;Difficulty&quot; / Level
                    <br />• Right: &quot;Time to Complete&quot; / Duration
                  </div>
                </div>
                <div>
                  <strong>Product Updates:</strong>
                  <div className="ml-4 mt-1 text-sm">
                    • Left: &quot;Release Date&quot; / Date
                    <br />• Right: &quot;Version&quot; / Number
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ComponentSection>
      </div>
    </div>
  );
}
