import React from 'react';
import PortfolioButton from '@/components/buttons/PortfolioButton';
import { TYPOGRAPHY } from '@/lib/typography';
import { CodeExample, ComponentSection } from '../utilities';



export default function ComponentsDemo() {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4 space-y-16">
      {/* Page Header */}
      <header className="border-b border-gray-200 pb-8">
        <h1 className={`${TYPOGRAPHY.h1} text-black`}>Buttons Showcase</h1>
        <p className={`${TYPOGRAPHY.text18} mt-4`}>
          Interactive demonstrations of the PortfolioButton component with various configurations.
        </p>
      </header>

      {/* PortfolioButton Component */}
      <ComponentSection title="PortfolioButton Component">
        <div className="space-y-12">
          
          {/* Dark Variant Examples */}
          <CodeExample 
            title="Dark Variant (for light backgrounds)"
            code={`<PortfolioButton variant="dark" href="/about">
  Get in Touch
</PortfolioButton>`}
          >
            <div className="bg-gray-50 p-8 rounded">
              <PortfolioButton variant="dark" href="/about">
                Get in Touch
              </PortfolioButton>
            </div>
          </CodeExample>

          {/* Light Variant Examples */}
          <CodeExample 
            title="Light Variant (for dark backgrounds)"
            code={`<PortfolioButton variant="light" href="/works">
  View My Work
</PortfolioButton>`}
          >
            <div className="bg-gray-900 p-8 rounded">
              <PortfolioButton variant="light" href="/works">
                View My Work
              </PortfolioButton>
            </div>
          </CodeExample>

          {/* Multiple Buttons */}
          <CodeExample 
            title="Multiple Buttons Example"
            code={`<div className="flex gap-4 flex-wrap">
  <PortfolioButton variant="dark" href="/contact">
    Contact Me
  </PortfolioButton>
  <PortfolioButton variant="dark" href="/resume">
    Download Resume
  </PortfolioButton>
  <PortfolioButton variant="dark" href="/portfolio">
    View Portfolio
  </PortfolioButton>
</div>`}
          >
            <div className="bg-gray-50 p-8 rounded">
              <div className="flex gap-4 flex-wrap">
                <PortfolioButton variant="dark" href="/contact">
                  Contact Me
                </PortfolioButton>
                <PortfolioButton variant="dark" href="/resume">
                  Download Resume
                </PortfolioButton>
                <PortfolioButton variant="dark" href="/portfolio">
                  View Portfolio
                </PortfolioButton>
              </div>
            </div>
          </CodeExample>

          {/* Custom Class Example */}
          <CodeExample 
            title="With Custom Classes"
            code={`<PortfolioButton 
  variant="light" 
  href="/special" 
  className="w-full"
>
  Full Width Button
</PortfolioButton>`}
          >
            <div className="bg-gray-900 p-8 rounded">
              <PortfolioButton 
                variant="light" 
                href="/special" 
                className="w-full"
              >
                Full Width Button
              </PortfolioButton>
            </div>
          </CodeExample>

          {/* Component Properties */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>PortfolioButton Properties</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-semibold text-sm mb-2">Props:</h5>
                <ul className="text-sm space-y-1 font-mono">
                  <li><strong>children:</strong> React.ReactNode</li>
                  <li><strong>href?:</strong> string</li>
                  <li><strong>variant?:</strong> dark | light</li>
                  <li><strong>className?:</strong> string</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-sm mb-2">Features:</h5>
                <ul className="text-sm space-y-1">
                  <li>• Responsive typography (text-14)</li>
                  <li>• Uppercase text transformation</li>
                  <li>• Smooth hover transitions</li>
                  <li>• 54px fixed height</li>
                  <li>• Rounded corners</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </ComponentSection>

    </div>
  );
}