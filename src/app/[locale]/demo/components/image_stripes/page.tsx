import React from "react";
import ImageSimpleStripe from "@/components/image_stripes/ImageSimpleStripe";
import LongStripe from "@/components/image_stripes/LongStripe";
import { TYPOGRAPHY } from "@/lib/typography";

export default function ImageStripesDemo() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto py-12 px-4">
          <header>
            <h1 className={`${TYPOGRAPHY.h1} text-black`}>
              Image Stripes Showcase
            </h1>
            <p className={`${TYPOGRAPHY.text18} mt-4`}>
              Interactive demonstration of image stripe components with
              responsive grid layouts.
            </p>
          </header>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-12 px-4 space-y-16">
        {/* Single Image Example */}
        <section>
          <div className="mb-8">
            <h2 className={`${TYPOGRAPHY.h2} text-black mb-4`}>
              ImageSimpleStripe - Single Image
            </h2>
            <p className={`${TYPOGRAPHY.text16} text-gray-600 mb-6`}>
              Example with a single image taking full width across all screen
              sizes.
            </p>

            {/* Code Example */}
            <div className="bg-gray-900 p-4 rounded-lg mb-6">
              <pre className="text-green-400 text-sm overflow-x-auto">
                {`<ImageSimpleStripe
  images={["/assets/images/photos/photo_1.jpg"]}
/>`}
              </pre>
            </div>
          </div>

          {/* Demo */}
          <div className="bg-white p-8 l:p-12 rounded-lg border border-gray-200">
            <ImageSimpleStripe images={["/assets/images/photos/photo_1.jpg"]} />
          </div>
        </section>

        {/* Two Images Example */}
        <section>
          <div className="mb-8">
            <h2 className={`${TYPOGRAPHY.h2} text-black mb-4`}>
              ImageSimpleStripe - Two Images
            </h2>
            <p className={`${TYPOGRAPHY.text16} text-gray-600 mb-6`}>
              Example with two images in equal columns on medium+ screens,
              stacked on small screens.
            </p>

            {/* Code Example */}
            <div className="bg-gray-900 p-4 rounded-lg mb-6">
              <pre className="text-green-400 text-sm overflow-x-auto">
                {`<ImageSimpleStripe
  images={[
    "/assets/images/cards/card_1.jpg",
    "/assets/images/cards/card_2.jpg"
  ]}
/>`}
              </pre>
            </div>
          </div>

          {/* Demo */}
          <div className="bg-white p-8 l:p-12 rounded-lg border border-gray-200">
            <ImageSimpleStripe
              images={[
                "/assets/images/cards/card_1.jpg",
                "/assets/images/cards/card_2.jpg",
              ]}
            />
          </div>
        </section>

        {/* Three Images Example */}
        <section>
          <div className="mb-8">
            <h2 className={`${TYPOGRAPHY.h2} text-black mb-4`}>
              ImageSimpleStripe - Three Images
            </h2>
            <p className={`${TYPOGRAPHY.text16} text-gray-600 mb-6`}>
              Example with three images: 1 column (small), 2 columns (medium), 3
              columns (large).
            </p>

            {/* Code Example */}
            <div className="bg-gray-900 p-4 rounded-lg mb-6">
              <pre className="text-green-400 text-sm overflow-x-auto">
                {`<ImageSimpleStripe
  images={[
    "/assets/images/cards/card_1.jpg",
    "/assets/images/cards/card_2.jpg",
    "/assets/images/cards/card_3.jpg"
  ]}
/>`}
              </pre>
            </div>
          </div>

          {/* Demo */}
          <div className="bg-white p-8 l:p-12 rounded-lg border border-gray-200">
            <ImageSimpleStripe
              images={[
                "/assets/images/cards/card_1.jpg",
                "/assets/images/cards/card_2.jpg",
                "/assets/images/cards/card_3.jpg",
              ]}
            />
          </div>
        </section>

        {/* Custom Height Example */}
        <section>
          <div className="mb-8">
            <h2 className={`${TYPOGRAPHY.h2} text-black mb-4`}>
              ImageSimpleStripe - Custom Height
            </h2>
            <p className={`${TYPOGRAPHY.text16} text-gray-600 mb-6`}>
              Example with custom height of 200px instead of the default 4:3
              aspect ratio.
            </p>

            {/* Code Example */}
            <div className="bg-gray-900 p-4 rounded-lg mb-6">
              <pre className="text-green-400 text-sm overflow-x-auto">
                {`<ImageSimpleStripe
  images={[
    "/assets/images/cards/card_1.jpg",
    "/assets/images/cards/card_2.jpg",
    "/assets/images/cards/card_3.jpg"
  ]}
  height={200}
/>`}
              </pre>
            </div>
          </div>

          {/* Demo */}
          <div className="bg-white p-8 l:p-12 rounded-lg border border-gray-200">
            <ImageSimpleStripe
              images={[
                "/assets/images/cards/card_1.jpg",
                "/assets/images/cards/card_2.jpg",
                "/assets/images/cards/card_3.jpg",
              ]}
              height={200}
            />
          </div>
        </section>

        {/* Custom Margin Example */}
        <section>
          <div className="mb-8">
            <h2 className={`${TYPOGRAPHY.h2} text-black mb-4`}>
              ImageSimpleStripe - Custom Margin
            </h2>
            <p className={`${TYPOGRAPHY.text16} text-gray-600 mb-6`}>
              Example with 60px vertical margins to create spacing above and
              below the stripe.
            </p>

            {/* Code Example */}
            <div className="bg-gray-900 p-4 rounded-lg mb-6">
              <pre className="text-green-400 text-sm overflow-x-auto">
                {`<ImageSimpleStripe
  images={[
    "/assets/images/cards/card_1.jpg",
    "/assets/images/cards/card_2.jpg"
  ]}
  margin={60}
/>`}
              </pre>
            </div>
          </div>

          {/* Demo */}
          <div className="bg-white p-8 l:p-12 rounded-lg border border-gray-200">
            <ImageSimpleStripe
              images={[
                "/assets/images/cards/card_1.jpg",
                "/assets/images/cards/card_2.jpg",
              ]}
              margin={60}
            />
          </div>
        </section>

        {/* Combined Custom Props Example */}
        <section>
          <div className="mb-8">
            <h2 className={`${TYPOGRAPHY.h2} text-black mb-4`}>
              ImageSimpleStripe - Custom Height & Margin
            </h2>
            <p className={`${TYPOGRAPHY.text16} text-gray-600 mb-6`}>
              Example combining custom height (150px) and vertical margin (40px)
              for a compact stripe with spacing.
            </p>

            {/* Code Example */}
            <div className="bg-gray-900 p-4 rounded-lg mb-6">
              <pre className="text-green-400 text-sm overflow-x-auto">
                {`<ImageSimpleStripe
  images={[
    "/assets/images/cards/card_1.jpg",
    "/assets/images/cards/card_2.jpg",
    "/assets/images/cards/card_3.jpg"
  ]}
  height={150}
  margin={40}
/>`}
              </pre>
            </div>
          </div>

          {/* Demo */}
          <div className="bg-white p-8 l:p-12 rounded-lg border border-gray-200">
            <ImageSimpleStripe
              images={[
                "/assets/images/cards/card_1.jpg",
                "/assets/images/cards/card_2.jpg",
                "/assets/images/cards/card_3.jpg",
              ]}
              height={150}
              margin={40}
            />
          </div>
        </section>

        {/* Max Images Test */}
        <section>
          <div className="mb-8">
            <h2 className={`${TYPOGRAPHY.h2} text-black mb-4`}>
              ImageSimpleStripe - Max Images Test
            </h2>
            <p className={`${TYPOGRAPHY.text16} text-gray-600 mb-6`}>
              Example with more than 3 images to demonstrate the 3-image limit
              (only first 3 will display).
            </p>

            {/* Code Example */}
            <div className="bg-gray-900 p-4 rounded-lg mb-6">
              <pre className="text-green-400 text-sm overflow-x-auto">
                {`<ImageSimpleStripe
  images={[
    "/assets/images/cards/card_1.jpg",
    "/assets/images/cards/card_2.jpg",
    "/assets/images/cards/card_3.jpg",
    "/assets/images/cards/card_4.jpg",
    "/assets/images/thoughts/thought_1.jpg"
  ]}
/>`}
              </pre>
            </div>
            <p className={`${TYPOGRAPHY.text14} text-orange-600 mb-6`}>
              Note: Only the first 3 images will be displayed due to the
              component&apos;s maximum limit.
            </p>
          </div>

          {/* Demo */}
          <div className="bg-white p-8 l:p-12 rounded-lg border border-gray-200">
            <ImageSimpleStripe
              images={[
                "/assets/images/cards/card_1.jpg",
                "/assets/images/cards/card_2.jpg",
                "/assets/images/cards/card_3.jpg",
                "/assets/images/cards/card_4.jpg",
                "/assets/images/thoughts/thought_1.jpg",
              ]}
            />
          </div>
        </section>

        {/* LongStripe Examples */}
        <section>
          <div className="mb-8">
            <h2 className={`${TYPOGRAPHY.h1} text-black mb-6`}>
              LongStripe Component
            </h2>
            <p className={`${TYPOGRAPHY.text18} text-gray-600 mb-8`}>
              Multi-row stripe component with alternating multi-image and
              featured image rows.
            </p>
          </div>
        </section>

        {/* LongStripe Basic Example */}
        <section>
          <div className="mb-8">
            <h2 className={`${TYPOGRAPHY.h2} text-black mb-4`}>
              LongStripe - Basic Example
            </h2>
            <p className={`${TYPOGRAPHY.text16} text-gray-600 mb-6`}>
              Example with alternating rows: multi-image rows (2-3 images) and
              featured image rows (single image).
            </p>

            {/* Code Example */}
            <div className="bg-gray-900 p-4 rounded-lg mb-6">
              <pre className="text-green-400 text-sm overflow-x-auto">
                {`<LongStripe
  images={[
    "/assets/images/cards/card_1.jpg",
    "/assets/images/cards/card_2.jpg",
    "/assets/images/cards/card_3.jpg",
    "/assets/images/cards/card_4.jpg",
    "/assets/images/thoughts/thought_1.jpg",
    "/assets/images/thoughts/thought_2.jpg"
  ]}
  featured_images={[
    "/assets/images/photos/photo_1.jpg",
    "/assets/images/thoughts/thought_3.jpg"
  ]}
  row_height={250}
/>`}
              </pre>
            </div>
          </div>

          {/* Demo */}
          <div className="bg-white p-8 l:p-12 rounded-lg border border-gray-200">
            <LongStripe
              images={[
                "/assets/images/cards/card_1.jpg",
                "/assets/images/cards/card_2.jpg",
                "/assets/images/cards/card_3.jpg",
                "/assets/images/cards/card_4.jpg",
                "/assets/images/thoughts/thought_1.jpg",
                "/assets/images/thoughts/thought_2.jpg",
              ]}
              featured_images={[
                "/assets/images/photos/photo_1.jpg",
                "/assets/images/thoughts/thought_3.jpg",
              ]}
              row_height={250}
            />
          </div>
        </section>

        {/* LongStripe with Margin */}
        <section>
          <div className="mb-8">
            <h2 className={`${TYPOGRAPHY.h2} text-black mb-4`}>
              LongStripe - With Vertical Margin
            </h2>
            <p className={`${TYPOGRAPHY.text16} text-gray-600 mb-6`}>
              Example with 40px vertical margin and custom row height of 200px.
            </p>

            {/* Code Example */}
            <div className="bg-gray-900 p-4 rounded-lg mb-6">
              <pre className="text-green-400 text-sm overflow-x-auto">
                {`<LongStripe
  images={[
    "/assets/images/cards/card_1.jpg",
    "/assets/images/cards/card_2.jpg",
    "/assets/images/cards/card_3.jpg",
    "/assets/images/cards/card_4.jpg"
  ]}
  featured_images={[
    "/assets/images/thoughts/thought_4.jpg"
  ]}
  row_height={200}
  margin={40}
/>`}
              </pre>
            </div>
          </div>

          {/* Demo */}
          <div className="bg-white p-8 l:p-12 rounded-lg border border-gray-200">
            <LongStripe
              images={[
                "/assets/images/cards/card_1.jpg",
                "/assets/images/cards/card_2.jpg",
                "/assets/images/cards/card_3.jpg",
                "/assets/images/cards/card_4.jpg",
              ]}
              featured_images={["/assets/images/thoughts/thought_4.jpg"]}
              row_height={200}
              margin={40}
            />
          </div>
        </section>

        {/* LongStripe Compact */}
        <section>
          <div className="mb-8">
            <h2 className={`${TYPOGRAPHY.h2} text-black mb-4`}>
              LongStripe - Compact Version
            </h2>
            <p className={`${TYPOGRAPHY.text16} text-gray-600 mb-6`}>
              Compact version with shorter row height (150px) for banner-style
              layouts.
            </p>

            {/* Code Example */}
            <div className="bg-gray-900 p-4 rounded-lg mb-6">
              <pre className="text-green-400 text-sm overflow-x-auto">
                {`<LongStripe
  images={[
    "/assets/images/cards/card_1.jpg",
    "/assets/images/cards/card_2.jpg",
    "/assets/images/cards/card_3.jpg"
  ]}
  featured_images={[
    "/assets/images/photos/photo_1.jpg"
  ]}
  row_height={150}
  margin={20}
/>`}
              </pre>
            </div>
          </div>

          {/* Demo */}
          <div className="bg-white p-8 l:p-12 rounded-lg border border-gray-200">
            <LongStripe
              images={[
                "/assets/images/cards/card_1.jpg",
                "/assets/images/cards/card_2.jpg",
                "/assets/images/cards/card_3.jpg",
              ]}
              featured_images={["/assets/images/photos/photo_1.jpg"]}
              row_height={150}
              margin={20}
            />
          </div>
        </section>

        {/* LongStripe with Different Row Heights */}
        <section>
          <div className="mb-8">
            <h2 className={`${TYPOGRAPHY.h2} text-black mb-4`}>
              LongStripe - Different Row Heights
            </h2>
            <p className={`${TYPOGRAPHY.text16} text-gray-600 mb-6`}>
              Example with different heights: 200px for multi-image rows and
              350px for featured rows.
            </p>

            {/* Code Example */}
            <div className="bg-gray-900 p-4 rounded-lg mb-6">
              <pre className="text-green-400 text-sm overflow-x-auto">
                {`<LongStripe
  images={[
    "/assets/images/cards/card_1.jpg",
    "/assets/images/cards/card_2.jpg",
    "/assets/images/cards/card_3.jpg",
    "/assets/images/cards/card_4.jpg"
  ]}
  featured_images={[
    "/assets/images/thoughts/thought_1.jpg",
    "/assets/images/thoughts/thought_2.jpg"
  ]}
  row_height={200}
  featured_row_height={350}
/>`}
              </pre>
            </div>
          </div>

          {/* Demo */}
          <div className="bg-white p-8 l:p-12 rounded-lg border border-gray-200">
            <LongStripe
              images={[
                "/assets/images/cards/card_1.jpg",
                "/assets/images/cards/card_2.jpg",
                "/assets/images/cards/card_3.jpg",
                "/assets/images/cards/card_4.jpg",
              ]}
              featured_images={[
                "/assets/images/thoughts/thought_1.jpg",
                "/assets/images/thoughts/thought_2.jpg",
              ]}
              row_height={300}
              featured_row_height={550}
            />
          </div>
        </section>

        {/* LongStripe with Custom Heights and Margin */}
        <section>
          <div className="mb-8">
            <h2 className={`${TYPOGRAPHY.h2} text-black mb-4`}>
              LongStripe - Custom Heights with Margin
            </h2>
            <p className={`${TYPOGRAPHY.text16} text-gray-600 mb-6`}>
              Example combining different row heights with vertical margin for
              enhanced visual hierarchy.
            </p>

            {/* Code Example */}
            <div className="bg-gray-900 p-4 rounded-lg mb-6">
              <pre className="text-green-400 text-sm overflow-x-auto">
                {`<LongStripe
  images={[
    "/assets/images/cards/card_1.jpg",
    "/assets/images/cards/card_2.jpg",
    "/assets/images/cards/card_3.jpg"
  ]}
  featured_images={[
    "/assets/images/photos/photo_1.jpg"
  ]}
  row_height={180}
  featured_row_height={280}
  margin={30}
/>`}
              </pre>
            </div>
          </div>

          {/* Demo */}
          <div className="bg-white p-8 l:p-12 rounded-lg border border-gray-200">
            <LongStripe
              images={[
                "/assets/images/cards/card_1.jpg",
                "/assets/images/cards/card_2.jpg",
                "/assets/images/cards/card_3.jpg",
              ]}
              featured_images={["/assets/images/photos/photo_1.jpg"]}
              row_height={400}
              featured_row_height={650}
              margin={30}
            />
          </div>
        </section>

        {/* Component Documentation */}
        <section className="space-y-8">
          <h2 className={`${TYPOGRAPHY.h2} text-black`}>
            Component Documentation
          </h2>

          {/* Component Properties */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>
              ImageSimpleStripe Properties
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-semibold text-sm mb-3">Props:</h5>
                <ul className="text-sm space-y-2 font-mono">
                  <li>
                    <strong>images:</strong> string[] (max 3 images)
                  </li>
                  <li>
                    <strong>height:</strong> number (optional, in pixels)
                  </li>
                  <li>
                    <strong>margin:</strong> number (optional, vertical margin
                    in pixels)
                  </li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-sm mb-3">Features:</h5>
                <ul className="text-sm space-y-2">
                  <li>• Responsive grid layout (1-3 columns)</li>
                  <li>• Automatic column calculation based on image count</li>
                  <li>• Scroll-triggered animations with staggered delays</li>
                  <li>• Customizable height (default: 4:3 aspect ratio)</li>
                  <li>• Adjustable vertical margins</li>
                  <li>• Seamless image connections (no gaps)</li>
                  <li>• Image optimization with Next.js Image component</li>
                  <li>• Mobile-first responsive design</li>
                  <li>• Maximum 3 images constraint</li>
                  <li>• Equal width columns</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Responsive Behavior */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>Responsive Behavior</h4>
            <div className="space-y-4">
              <div>
                <h5 className="font-semibold text-sm mb-2">
                  Layout by Screen Size:
                </h5>
                <ul className="text-sm space-y-2">
                  <li>
                    <strong>Small Screens (s):</strong> Always 1 column
                    (stacked)
                  </li>
                  <li>
                    <strong>Medium Screens (m):</strong> Up to 2 columns
                  </li>
                  <li>
                    <strong>Large Screens (l):</strong> Up to 3 columns
                  </li>
                </ul>
              </div>

              <div>
                <h5 className="font-semibold text-sm mb-2">Grid Patterns:</h5>
                <ul className="text-sm space-y-2">
                  <li>
                    <strong>1 Image:</strong> Full width on all screens
                  </li>
                  <li>
                    <strong>2 Images:</strong> Stacked (small) → 2 columns
                    (medium+)
                  </li>
                  <li>
                    <strong>3 Images:</strong> Stacked (small) → 2 columns
                    (medium) → 3 columns (large)
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Animation Details */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>Animation System</h4>
            <div className="space-y-4">
              <div>
                <h5 className="font-semibold text-sm mb-2">
                  Animation Sequence:
                </h5>
                <ul className="text-sm space-y-2">
                  <li>
                    <strong>Trigger:</strong> Images animate when entering
                    viewport with -100px margin
                  </li>
                  <li>
                    <strong>Staggered Delays:</strong> Each image has 0.1s delay
                    increment (0s, 0.1s, 0.2s)
                  </li>
                  <li>
                    <strong>Animation Type:</strong> Fade from bottom with Y
                    offset (30px)
                  </li>
                  <li>
                    <strong>Physics:</strong> Spring animation with 0.6s
                    duration, no bounce
                  </li>
                </ul>
              </div>

              <div>
                <h5 className="font-semibold text-sm mb-2">Performance:</h5>
                <ul className="text-sm space-y-2">
                  <li>
                    <strong>Animation Once:</strong> Animations only trigger
                    once per viewport entry
                  </li>
                  <li>
                    <strong>Image Optimization:</strong> Next.js Image component
                    with proper sizing
                  </li>
                  <li>
                    <strong>Aspect Ratio:</strong> Fixed 4:3 ratio prevents
                    layout shift
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Usage Guidelines */}
          <div className="bg-green-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>Usage Guidelines</h4>
            <div className="space-y-4">
              <div>
                <h5 className="font-semibold text-sm mb-2">
                  Import Component:
                </h5>
                <div className="bg-gray-900 p-3 rounded font-mono text-sm text-green-400">
                  <div>
                    import ImageSimpleStripe from
                    &apos;@/components/image_stripes/ImageSimpleStripe&apos;;
                  </div>
                </div>
              </div>

              <div>
                <h5 className="font-semibold text-sm mb-2">Best Practices:</h5>
                <ul className={`${TYPOGRAPHY.text16} space-y-2`}>
                  <li>
                    • <strong>Image Quality:</strong> Use high-resolution images
                    for best display quality
                  </li>
                  <li>
                    • <strong>Aspect Ratios:</strong> Images will be cropped
                    using object-cover (4:3 default or custom height)
                  </li>
                  <li>
                    • <strong>Custom Height:</strong> Use height prop for
                    specific design requirements (e.g., 150-300px for banners)
                  </li>
                  <li>
                    • <strong>Vertical Margins:</strong> Use margin prop to
                    create spacing above and below the stripe (20-80px typical)
                  </li>
                  <li>
                    • <strong>Image Count:</strong> Component works best with
                    1-3 images
                  </li>
                  <li>
                    • <strong>Seamless Design:</strong> Images connect without
                    gaps for cohesive stripe effect
                  </li>
                  <li>
                    • <strong>File Formats:</strong> Use optimized formats
                    (WebP, JPEG) for performance
                  </li>
                  <li>
                    • <strong>Content Type:</strong> Perfect for showcasing work
                    samples, process shots, or related visuals
                  </li>
                </ul>
              </div>

              <div>
                <h5 className="font-semibold text-sm mb-2">Example Usage:</h5>
                <div className="bg-gray-900 p-3 rounded font-mono text-sm text-green-400">
                  <pre className="text-green-400">
                    {`// Basic usage
<ImageSimpleStripe images={["/path/to/image.jpg"]} />

// With custom height
<ImageSimpleStripe 
  images={["img1.jpg", "img2.jpg"]} 
  height={200} 
/>

// With vertical margins
<ImageSimpleStripe 
  images={["img1.jpg", "img2.jpg", "img3.jpg"]} 
  margin={40} 
/>

// Custom height and vertical margin
<ImageSimpleStripe 
  images={["img1.jpg", "img2.jpg"]} 
  height={150} 
  margin={60} 
/>`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* LongStripe Properties */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>LongStripe Properties</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-semibold text-sm mb-3">Props:</h5>
                <ul className="text-sm space-y-2 font-mono">
                  <li>
                    <strong>images:</strong> string[] (for multi-image rows)
                  </li>
                  <li>
                    <strong>featured_images:</strong> string[] (for featured
                    rows)
                  </li>
                  <li>
                    <strong>row_height:</strong> number (height in pixels for
                    multi-image rows)
                  </li>
                  <li>
                    <strong>featured_row_height:</strong> number (optional,
                    height in pixels for featured rows)
                  </li>
                  <li>
                    <strong>margin:</strong> number (optional, vertical margin
                    in pixels)
                  </li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-sm mb-3">Features:</h5>
                <ul className="text-sm space-y-2">
                  <li>• Alternating multi-image and featured image rows</li>
                  <li>
                    • Intelligent image distribution (never single-image
                    multi-rows)
                  </li>
                  <li>• Reuses ImageSimpleStripe for multi-image rows</li>
                  <li>• Independent height control for different row types</li>
                  <li>• Consistent row heights within each row type</li>
                  <li>• Scroll-triggered animations</li>
                  <li>• Seamless row connections</li>
                  <li>• Responsive layout within each row</li>
                  <li>• Automatic handling of remaining images</li>
                </ul>
              </div>
            </div>
          </div>

          {/* LongStripe Row Distribution Logic */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>
              LongStripe Row Distribution Logic
            </h4>
            <div className="space-y-4">
              <div>
                <h5 className="font-semibold text-sm mb-2">Row Pattern:</h5>
                <ul className="text-sm space-y-2">
                  <li>
                    <strong>Multi-Image Row:</strong> 2-3 images from images
                    array (never 1 to distinguish from featured)
                  </li>
                  <li>
                    <strong>Featured Row:</strong> 1 image from featured_images
                    array
                  </li>
                  <li>
                    <strong>Alternating:</strong> Multi → Featured → Multi →
                    Featured → repeat
                  </li>
                </ul>
              </div>

              <div>
                <h5 className="font-semibold text-sm mb-2">
                  Smart Distribution:
                </h5>
                <ul className="text-sm space-y-2">
                  <li>
                    <strong>Never Single-Image Multi-Rows:</strong> Ensures
                    featured rows are visually distinct
                  </li>
                  <li>
                    <strong>Optimal Grouping:</strong> Takes 2-3 images per
                    multi-row, avoiding leaving exactly 1 image
                  </li>
                  <li>
                    <strong>Remaining Images:</strong> Adds leftover images to
                    the last multi-row when possible
                  </li>
                  <li>
                    <strong>Array Exhaustion:</strong> Handles cases where one
                    array runs out before the other
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* LongStripe Usage Guidelines */}
          <div className="bg-green-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>
              LongStripe Usage Guidelines
            </h4>
            <div className="space-y-4">
              <div>
                <h5 className="font-semibold text-sm mb-2">
                  Import Component:
                </h5>
                <div className="bg-gray-900 p-3 rounded font-mono text-sm text-green-400">
                  <div>
                    import LongStripe from
                    &apos;@/components/image_stripes/LongStripe&apos;;
                  </div>
                </div>
              </div>

              <div>
                <h5 className="font-semibold text-sm mb-2">Best Practices:</h5>
                <ul className={`${TYPOGRAPHY.text16} space-y-2`}>
                  <li>
                    • <strong>Image Arrays:</strong> Provide at least 4-6 images
                    for optimal stripe effect
                  </li>
                  <li>
                    • <strong>Featured Images:</strong> Use high-impact images
                    that work well as full-width displays
                  </li>
                  <li>
                    • <strong>Row Height:</strong> 150-300px works well for
                    multi-image rows depending on content
                  </li>
                  <li>
                    • <strong>Featured Row Height:</strong> Can be taller than
                    regular rows to emphasize key images (250-400px typical)
                  </li>
                  <li>
                    • <strong>Height Hierarchy:</strong> Use different heights
                    to create visual emphasis and rhythm
                  </li>
                  <li>
                    • <strong>Vertical Rhythm:</strong> Use margin prop for
                    spacing between content sections
                  </li>
                  <li>
                    • <strong>Content Balance:</strong> Balance the number of
                    regular and featured images for best visual flow
                  </li>
                  <li>
                    • <strong>Responsive Behavior:</strong> Multi-image rows
                    automatically adapt to screen size
                  </li>
                  <li>
                    • <strong>Performance:</strong> Component reuses
                    ImageSimpleStripe for consistency and optimization
                  </li>
                </ul>
              </div>

              <div>
                <h5 className="font-semibold text-sm mb-2">Example Usage:</h5>
                <div className="bg-gray-900 p-3 rounded font-mono text-sm text-green-400">
                  <pre className="text-green-400">
                    {`// Basic long stripe
<LongStripe 
  images={["img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg"]} 
  featured_images={["featured1.jpg", "featured2.jpg"]} 
  row_height={250} 
/>

// Different heights for visual hierarchy
<LongStripe 
  images={["img1.jpg", "img2.jpg", "img3.jpg"]} 
  featured_images={["featured.jpg"]} 
  row_height={200} 
  featured_row_height={350}
  margin={30}
/>

// Compact version with same height for all rows
<LongStripe 
  images={["img1.jpg", "img2.jpg", "img3.jpg"]} 
  featured_images={["featured.jpg"]} 
  row_height={150} 
  margin={40} 
/>

// Gallery style with emphasized featured images
<LongStripe 
  images={[...manyImages]} 
  featured_images={[...featuredImages]} 
  row_height={250} 
  featured_row_height={400}
  margin={0} 
/>`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
