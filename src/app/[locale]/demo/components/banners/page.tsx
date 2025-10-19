import React from "react";
import BlockQuoteBanner from "@/components/banners/BlockQuoteBanner";
import ConnectBanner from "@/components/banners/ConnectBanner";
import { TYPOGRAPHY } from "@/lib/typography";
import { CodeExample, ComponentSection } from "../utilities";

export default function BannersComponentsDemo() {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4 space-y-16">
      {/* Page Header */}
      <header className="border-b border-gray-200 pb-8">
        <h1 className={`${TYPOGRAPHY.h1} text-black`}>Banners Showcase</h1>
        <p className={`${TYPOGRAPHY.text18} mt-4`}>
          Interactive demonstrations of the BlockQuoteBanner, PortfolioButton,
          and ConnectBanner components with various configurations.
        </p>
      </header>

      {/* BlockQuoteBanner Component */}
      <ComponentSection title="BlockQuoteBanner Component">
        <div className="space-y-12">
          {/* Basic Example */}
          <CodeExample
            title="Inspirational Quote Example"
            code={`<BlockQuoteBanner 
  quote="Design is not just what it looks like and feels like. Design is how it works."
/>`}
          >
            <BlockQuoteBanner quote="Design is not just what it looks like and feels like. Design is how it works." />
          </CodeExample>

          {/* Alternative Content */}
          <CodeExample
            title="Personal Philosophy Example"
            code={`<BlockQuoteBanner 
  quote="Great design is about creating meaningful connections between people and technology."
/>`}
          >
            <BlockQuoteBanner quote="Great design is about creating meaningful connections between people and technology." />
          </CodeExample>

          {/* Long Quote Example */}
          <CodeExample
            title="Long Quote Example"
            code={`<BlockQuoteBanner 
  quote="The best way to find out if you can trust somebody is to trust them. Trust is built with consistency, and consistency requires authenticity."
/>`}
          >
            <BlockQuoteBanner quote="The best way to find out if you can trust somebody is to trust them. Trust is built with consistency, and consistency requires authenticity." />
          </CodeExample>

          {/* Component Properties */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>
              BlockQuoteBanner Properties
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-semibold text-sm mb-2">Props:</h5>
                <ul className="text-sm space-y-1 font-mono">
                  <li>
                    <strong>quote:</strong> string
                  </li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-sm mb-2">Features:</h5>
                <ul className="text-sm space-y-1">
                  <li>• Full-width white background</li>
                  <li>• 200px top/bottom padding</li>
                  <li>• 60px left/right padding</li>
                  <li>• Animated entrance with spring effect</li>
                  <li>• Bold typography with proper spacing</li>
                  <li>• Responsive text sizing</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Animation Details */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>Animation Details</h4>
            <div className="space-y-2 text-sm">
              <div>
                <strong>Motion Library:</strong> Framer Motion
              </div>
              <div>
                <strong>Initial State:</strong> opacity: 0, y: -100
              </div>
              <div>
                <strong>Final State:</strong> opacity: 1, y: 0
              </div>
              <div>
                <strong>Transition:</strong> Spring animation (stiffness: 100,
                damping: 20)
              </div>
              <div>
                <strong>Viewport:</strong> Triggers once when component enters
                view
              </div>
            </div>
          </div>

          {/* Typography Reference */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>Typography Classes Used</h4>
            <div className="space-y-2 text-sm font-mono">
              <div>
                <strong>quote:</strong> text-h5-s m:text-h5-m l:text-h5-l
              </div>
              <div>
                <strong>color:</strong> var(--color-black-60)
              </div>
              <div>
                <strong>font-weight:</strong> var(--font-weight-bold)
              </div>
              <div>
                <strong>line-height:</strong> 1.4em
              </div>
              <div>
                <strong>letter-spacing:</strong> -0.04em
              </div>
            </div>
          </div>
        </div>
      </ComponentSection>

      {/* ConnectBanner Component */}
      <ComponentSection title="ConnectBanner Component">
        <div className="space-y-12">
          {/* Basic Example with Background */}
          <CodeExample
            title="Connect Banner with Background"
            code={`<div 
  className="relative"
  style={{
    backgroundImage: 'url(/assets/backgrounds/abstract_neutral_1.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }}
>
  <ConnectBanner
    primary_text="Have a project?"
    key_text="I'm available for new projects from 4th August 2025"
    cta_label="BOOK A FREE CALL"
    cta_link="/contact"
  />
</div>`}
          >
            <div
              className="relative rounded-lg overflow-hidden"
              style={{
                backgroundImage:
                  "url(/assets/backgrounds/abstract_neutral_1.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <ConnectBanner
                primary_text="Have a project?"
                key_text="I'm available for new projects from 4th August 2025"
                cta_label="BOOK A FREE CALL"
                cta_link="/contact"
              />
            </div>
          </CodeExample>

          {/* Alternative Example */}
          <CodeExample
            title="Alternative Connect Banner"
            code={`<div className="bg-gray-900">
  <ConnectBanner
    primary_text="Ready to collaborate?"
    key_text="Let's discuss your next project and bring your vision to life"
    cta_label="GET IN TOUCH"
    cta_link="/contact"
  />
</div>`}
          >
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <ConnectBanner
                primary_text="Ready to collaborate?"
                key_text="Let's discuss your next project and bring your vision to life"
                cta_label="GET IN TOUCH"
                cta_link="/contact"
              />
            </div>
          </CodeExample>

          {/* Component Properties */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>
              ConnectBanner Properties
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-semibold text-sm mb-2">Props:</h5>
                <ul className="text-sm space-y-1 font-mono">
                  <li>
                    <strong>primary_text:</strong> string
                  </li>
                  <li>
                    <strong>key_text:</strong> string
                  </li>
                  <li>
                    <strong>cta_label:</strong> string
                  </li>
                  <li>
                    <strong>cta_link:</strong> string
                  </li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-sm mb-2">Features:</h5>
                <ul className="text-sm space-y-1">
                  <li>• Responsive layouts (Desktop/Tablet/Mobile)</li>
                  <li>• Advanced spring animations</li>
                  <li>• White text optimized for dark backgrounds</li>
                  <li>• Motion library integration</li>
                  <li>• Semantic HTML structure</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Animation Details */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>Animation Details</h4>
            <div className="space-y-3 text-sm">
              <div>
                <strong>Primary & Key Text:</strong> Spring animation
                (stiffness: 200, damping: 60, mass: 1) with Y offset: 190px
              </div>
              <div>
                <strong>CTA Button:</strong> Ease-in-out animation with
                cubic-bezier(0.44, 0, 0.56, 1) and Y offset: 148px
              </div>
              <div>
                <strong>Viewport:</strong> Animations trigger once when
                component enters view
              </div>
              <div>
                <strong>Layout:</strong> Desktop uses 2-column grid,
                Tablet/Mobile use centered stacked layout
              </div>
            </div>
          </div>

          {/* Responsive Breakdown */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>Responsive Breakdown</h4>
            <div className="space-y-3 text-sm">
              <div>
                <strong>Desktop (L):</strong> 2-column grid with primary_text on
                left, key_text and CTA on right
              </div>
              <div>
                <strong>Tablet (M):</strong> Centered vertical stack with medium
                typography
              </div>
              <div>
                <strong>Mobile (S):</strong> Centered vertical stack with small
                typography
              </div>
              <div>
                <strong>Typography:</strong> Uses h6 classes for primary_text,
                h5 classes for key_text
              </div>
            </div>
          </div>
        </div>
      </ComponentSection>

      {/* Usage Guidelines */}
      <ComponentSection title="Usage Guidelines">
        <div className="bg-green-50 p-6 rounded-lg space-y-6">
          <div>
            <h4 className={`${TYPOGRAPHY.h5} mb-3`}>Import Components</h4>
            <div className="bg-gray-900 p-4 rounded font-mono text-sm text-green-400">
              <div>
                import BlockQuoteBanner from
                &apos;@/components/BlockQuoteBanner&apos;;
              </div>
              <div>
                import PortfolioButton from
                &apos;@/components/PortfolioButton&apos;;
              </div>
              <div>
                import ConnectBanner from
                &apos;@/components/ConnectBanner&apos;;
              </div>
            </div>
          </div>

          <div>
            <h4 className={`${TYPOGRAPHY.h5} mb-3`}>Best Practices</h4>
            <ul className={`${TYPOGRAPHY.text16} space-y-2`}>
              <li>
                • <strong>PortfolioButton:</strong> Use &apos;dark&apos; variant
                on light backgrounds, &apos;light&apos; variant on dark
                backgrounds
              </li>
              <li>
                • <strong>BlockQuoteBanner:</strong> Use for inspirational
                quotes, testimonials, or key messages
              </li>
              <li>
                • <strong>ConnectBanner:</strong> Perfect for call-to-action
                sections with background images
              </li>
              <li>
                • <strong>Content:</strong> Keep button text concise and quote
                text meaningful and impactful
              </li>
              <li>
                • <strong>Links:</strong> Ensure all href props point to valid
                routes
              </li>
              <li>
                • <strong>Accessibility:</strong> All components use semantic
                HTML and proper structures
              </li>
              <li>
                • <strong>Animation:</strong> Components trigger animations once
                when scrolled into view
              </li>
              <li>
                • <strong>Backgrounds:</strong> ConnectBanner works best with
                dark/neutral background images
              </li>
            </ul>
          </div>
        </div>
      </ComponentSection>
    </div>
  );
}
