import React from 'react';
import MinimalHero from '@/components/heroes/MinimalHero';
import { TYPOGRAPHY } from '@/lib/typography';
import { CodeExample, ComponentSection } from '../../utilities';

export default function MinimalHeroComponentsDemo() {
  return (
    <div className="w-full">
      {/* Live MinimalHero Demo - Fullscreen */}
      <MinimalHero 
        title="Journey of Innovation and Creativity —"
        subtitle="Explore two decades of dedicated design work and innovation, from global brand transformations to everyday products that people enjoy."
        image="/assets/images/cards/card_1.jpg"
        link="#documentation"
      />

      {/* Documentation Section */}
      <div id="documentation" className="max-w-6xl mx-auto py-12 px-4 space-y-16">
        
        {/* Page Header */}
        <header className="border-b border-gray-200 pb-8">
          <h1 className={`${TYPOGRAPHY.h1} text-black`}>MinimalHero Component</h1>
          <p className={`${TYPOGRAPHY.text18} mt-4`}>
            A clean, minimal hero component with fullscreen background image and elegant text animations.
          </p>
        </header>

        {/* Component Implementation */}
        <ComponentSection title="Implementation">
          <div className="space-y-12">
            
            {/* Basic Usage */}
            <CodeExample 
              title="Basic MinimalHero Implementation"
              code={`<MinimalHero 
  title="Journey of Innovation and Creativity —"
  subtitle="Explore two decades of dedicated design work and innovation, from global brand transformations to everyday products that people enjoy."
  image="/assets/images/cards/card_4.jpg"
  link="#next-section"
/>`}
            >
              <div className="bg-gray-100 p-4 rounded-lg text-center">
                <p className="text-gray-600">
                  The MinimalHero component above demonstrates the full implementation.
                  It features a fullscreen layout with smooth text animations and responsive design.
                </p>
              </div>
            </CodeExample>

            {/* Alternative Configuration */}
            <CodeExample 
              title="Alternative Configuration"
              code={`<MinimalHero 
  title="Crafting Digital Experiences"
  subtitle="Where creativity meets functionality in modern web design."
  image="/assets/images/backgrounds/abstract_neutral_1.jpg"
  link="#portfolio"
/>`}
            >
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-800">
                  <strong>Note:</strong> This example shows how to customize the component with different content and background images.
                </p>
              </div>
            </CodeExample>

            {/* Component Properties */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h4 className={`${TYPOGRAPHY.h5} mb-4`}>MinimalHero Properties</h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-sm mb-3">Props:</h5>
                  <ul className="text-sm space-y-2 font-mono">
                    <li><strong>title:</strong> string - Main heading text (h1 with h3 styling)</li>
                    <li><strong>subtitle:</strong> string - Supporting descriptive text</li>
                    <li><strong>image:</strong> string - Fullscreen background image URL</li>
                    <li><strong>link:</strong> string - URL for arrow scroll link</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-sm mb-3">Features:</h5>
                  <ul className="text-sm space-y-2">
                    <li>• Fullscreen viewport height layout</li>
                    <li>• Sequential text animations with blur effects</li>
                    <li>• Responsive typography and spacing</li>
                    <li>• Animated scroll arrow with looping motion</li>
                    <li>• Dark overlay for optimal text readability</li>
                    <li>• Optimized Next.js Image component</li>
                    <li>• Clean, minimal design aesthetic</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Animation Details */}
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h4 className={`${TYPOGRAPHY.h5} mb-4`}>Animation System</h4>
              <div className="space-y-3 text-sm">
                <div><strong>Title Animation:</strong> Fade in from bottom with 140px Y offset + blur (10px), 1s duration, 0.2s delay</div>
                <div><strong>Subtitle Animation:</strong> Same effect as title, executed right after title completes (1.2s delay)</div>
                <div><strong>Arrow Animation:</strong> Appears after text, continuous Y motion (0 → 8px → 0), 2s loop</div>
                <div><strong>Timing Sequence:</strong> Title (0.2s) → Subtitle (1.2s) → Arrow (2.4s)</div>
                <div><strong>Easing:</strong> Consistent ease-out for smooth, professional feel</div>
              </div>
            </div>

            {/* Typography Reference */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className={`${TYPOGRAPHY.h5} mb-4`}>Typography Classes Used</h4>
              <div className="space-y-2 text-sm font-mono">
                <div><strong>title:</strong> TYPOGRAPHY.h3 (white, font-medium)</div>
                <div><strong>subtitle:</strong> TYPOGRAPHY.text18 (white/90 opacity)</div>
              </div>
            </div>

            {/* Responsive Behavior */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className={`${TYPOGRAPHY.h5} mb-4`}>Responsive Behavior</h4>
              <div className="space-y-2 text-sm">
                <div><strong>Desktop (L):</strong> 80px horizontal padding, full content width</div>
                <div><strong>Tablet (M):</strong> 48px horizontal padding, maintained layout</div>
                <div><strong>Mobile (S):</strong> 16px horizontal padding, optimized text sizing</div>
                <div><strong>Images:</strong> Full viewport coverage with object-cover</div>
                <div><strong>Content:</strong> Centered vertically, left-aligned text</div>
                <div><strong>Typography:</strong> Scales appropriately for each breakpoint</div>
              </div>
            </div>

            {/* Technical Notes */}
            <div className="bg-red-50 p-6 rounded-lg">
              <h4 className={`${TYPOGRAPHY.h5} mb-4`}>Technical Implementation Notes</h4>
              <div className="space-y-2 text-sm">
                <div><strong>Animation Framework:</strong> Motion/React with sequential timing</div>
                <div><strong>Performance:</strong> Optimized with Next.js Image component and priority loading</div>
                <div><strong>Accessibility:</strong> Proper semantic HTML structure with h1 heading</div>
                <div><strong>Z-Index Management:</strong> Layered background, overlay, and content</div>
                <div><strong>Responsive Images:</strong> Full viewport sizing with appropriate object-fit</div>
                <div><strong>Text Contrast:</strong> Semi-transparent dark overlay ensures readability</div>
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
                <div>import MinimalHero from &apos;@/components/heroes/MinimalHero&apos;;</div>
              </div>
            </div>
            
            <div>
              <h4 className={`${TYPOGRAPHY.h5} mb-3`}>Best Practices</h4>
              <ul className={`${TYPOGRAPHY.text16} space-y-2`}>
                <li>• <strong>Images:</strong> Use high-quality images (minimum 1920x1080) for best results</li>
                <li>• <strong>Title Length:</strong> Keep titles concise and impactful for better visual hierarchy</li>
                <li>• <strong>Subtitle Content:</strong> Use descriptive text that complements the title</li>
                <li>• <strong>Image Selection:</strong> Choose images with good contrast areas for text overlay</li>
                <li>• <strong>Link Target:</strong> Ensure arrow link points to next section or relevant page</li>
                <li>• <strong>Content Balance:</strong> Maintain appropriate text-to-image ratio</li>
                <li>• <strong>Performance:</strong> Optimize images before implementation</li>
                <li>• <strong>Accessibility:</strong> Ensure sufficient color contrast for text readability</li>
                <li>• <strong>Animation Timing:</strong> Default timing works well, avoid customization unless necessary</li>
                <li>• <strong>Testing:</strong> Test on various devices to ensure smooth animation performance</li>
              </ul>
            </div>
          </div>
        </ComponentSection>
      </div>
    </div>
  );
}