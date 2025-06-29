import React from 'react';
import Footer from '@/components/layout/Footer';
import { TYPOGRAPHY } from '@/lib/typography';
import { SocialLink } from '@/lib/types';

// Sample data for demonstrations
const sampleSocialLinks: SocialLink[] = [
  { icon: 'instagram', label: 'Instagram', url: 'https://instagram.com' },
  { icon: 'twitter', label: 'X', url: 'https://x.com' },
  { icon: 'youtube', label: 'Youtube', url: 'https://youtube.com' },
  { icon: 'facebook', label: 'Facebook', url: 'https://facebook.com' },
  { icon: 'linkedIn', label: 'LinkedIn', url: 'https://linkedin.com' },
  { icon: 'tiktok', label: 'TikTok', url: 'https://tiktok.com' },
];

const sampleAddress = [
  '25 Lindsey Street',
  'Epping',
  'CM16 6RB',
  'United Kingdom'
];

export default function FooterComponentsDemo() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto py-12 px-4">
          <header>
            <h1 className={`${TYPOGRAPHY.h1} text-black`}>Footer Showcase</h1>
            <p className={`${TYPOGRAPHY.text18} mt-4`}>
              Interactive demonstration of the Footer component with various configurations.
            </p>
          </header>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-12 px-4 space-y-16">
        
        {/* Basic Footer Example */}
        <section>
          <div className="mb-8">
            <h2 className={`${TYPOGRAPHY.h2} text-black mb-4`}>Basic Footer</h2>
            <p className={`${TYPOGRAPHY.text16} text-gray-600 mb-6`}>
              Standard footer with all features enabled, including real-time clock.
            </p>
            
            {/* Code Example */}
            <div className="bg-gray-900 p-4 rounded-lg mb-6">
              <pre className="text-green-400 text-sm overflow-x-auto">
{`<Footer
  heading="MARK ASHTON"
  email="hello@markashton.com"
  phone="+44 20 7144 6699"
  address={["25 Lindsey Street", "Epping", "CM16 6RB", "United Kingdom"]}
  showCurrentTime={true}
  socialLinks={socialLinks}
  copyrightText="Copyright © 2025 Mark Ashton"
/>`}
              </pre>
            </div>
          </div>

          {/* Footer Demo */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <Footer
              heading="MARK ASHTON"
              email="hello@markashton.com"
              phone="+44 20 7144 6699"
              address={sampleAddress}
              showCurrentTime={true}
              socialLinks={sampleSocialLinks}
              copyrightText="Copyright © 2025 Mark Ashton"
            />
          </div>
        </section>

        {/* Footer Without Time */}
        <section>
          <div className="mb-8">
            <h2 className={`${TYPOGRAPHY.h2} text-black mb-4`}>Footer Without Time</h2>
            <p className={`${TYPOGRAPHY.text16} text-gray-600 mb-6`}>
              Footer configuration without the real-time clock display.
            </p>
            
            {/* Code Example */}
            <div className="bg-gray-900 p-4 rounded-lg mb-6">
              <pre className="text-green-400 text-sm overflow-x-auto">
{`<Footer
  heading="ENRIQUE VELASCO"
  email="contact@enriquevelasco.com"
  phone="+1 555 123 4567"
  address={["123 Design Street", "New York", "NY 10001", "United States"]}
  showCurrentTime={false}
  socialLinks={socialLinks}
  copyrightText="Copyright © 2025 Enrique Velasco"
/>`}
              </pre>
            </div>
          </div>

          {/* Footer Demo */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <Footer
              heading="ENRIQUE VELASCO"
              email="contact@enriquevelasco.com"
              phone="+1 555 123 4567"
              address={['123 Design Street', 'New York', 'NY 10001', 'United States']}
              showCurrentTime={false}
              socialLinks={sampleSocialLinks.slice(0, 4)} // Only show first 4 social links
              copyrightText="Copyright © 2025 Enrique Velasco"
            />
          </div>
        </section>

        {/* Component Documentation */}
        <section className="space-y-8">
          <h2 className={`${TYPOGRAPHY.h2} text-black`}>Component Documentation</h2>

          {/* Component Properties */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>Footer Properties</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-semibold text-sm mb-3">Props:</h5>
                <ul className="text-sm space-y-2 font-mono">
                  <li><strong>heading:</strong> string</li>
                  <li><strong>email:</strong> string</li>
                  <li><strong>phone:</strong> string</li>
                  <li><strong>address:</strong> string[]</li>
                  <li><strong>showCurrentTime:</strong> boolean</li>
                  <li><strong>socialLinks:</strong> SocialLink[]</li>
                  <li><strong>copyrightText:</strong> string</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-sm mb-3">Features:</h5>
                <ul className="text-sm space-y-2">
                  <li>• Large prominent heading in independent row</li>
                  <li>• 4-column content layout (medium/large screens)</li>
                  <li>• Contact information with copy-to-clipboard</li>
                  <li>• Real-time clock display (optional, dedicated column)</li>
                  <li>• Multi-line address support</li>
                  <li>• Social media links (icons only)</li>
                  <li>• Legal page navigation in white-98 footer</li>
                  <li>• Back-to-top functionality</li>
                  <li>• Responsive column stacking</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Typography Reference */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>Typography Classes Used</h4>
            <div className="space-y-2 text-sm font-mono">
              <div><strong>heading:</strong> text-h1-s m:text-h1-m l:text-h1-l (black-90)</div>
              <div><strong>email, phone:</strong> text-18-s m:text-18-m l:text-18-l (black-90)</div>
              <div><strong>address:</strong> text-18-s m:text-18-m l:text-18-l (black-50)</div>
              <div><strong>socialLinks:</strong> text-18-s m:text-18-m l:text-18-l (black-90, icons only)</div>
              <div><strong>legalLinks:</strong> text-14-s m:text-14-m l:text-14-l (black-90)</div>
              <div><strong>copyrightText:</strong> text-14-s m:text-14-m l:text-14-l (black-90)</div>
            </div>
          </div>

          {/* Layout Structure */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>Layout Structure</h4>
            <div className="space-y-3 text-sm">
              <div><strong>Heading Row:</strong> Independent row with large heading (TYPOGRAPHY.h1)</div>
              <div><strong>Content Row:</strong> 4 columns on medium/large, 1 column on small screens</div>
              <div><strong>Column 1:</strong> Email and phone links with copy buttons</div>
              <div><strong>Column 2:</strong> Current time display (or empty if disabled)</div>
              <div><strong>Column 3:</strong> Physical address (multi-line)</div>
              <div><strong>Column 4:</strong> Social media links (icons only)</div>
              <div><strong>Bottom Section:</strong> White-98 background with legal links and copyright</div>
              <div><strong>Typography:</strong> Bottom section uses TYPOGRAPHY.text14 with black-90 color</div>
            </div>
          </div>

          {/* Interactive Features */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>Interactive Features</h4>
            <div className="space-y-2 text-sm">
              <div><strong>Copy to Clipboard:</strong> Click icons next to email/phone to copy</div>
              <div><strong>Real-time Clock:</strong> Updates every second when showCurrentTime is true</div>
              <div><strong>Back to Top:</strong> Smooth scroll to top of page</div>
              <div><strong>External Links:</strong> Social links open in new tabs</div>
              <div><strong>Hover Effects:</strong> Color transitions on interactive elements</div>
            </div>
          </div>

          {/* Usage Guidelines */}
          <div className="bg-green-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>Usage Guidelines</h4>
            <div className="space-y-4">
              <div>
                <h5 className="font-semibold text-sm mb-2">Import Component:</h5>
                <div className="bg-gray-900 p-3 rounded font-mono text-sm text-green-400">
                  <div>import Footer from &apos;@/components/layout/Footer&apos;;</div>
                  <div>import &#123; SocialLink &#125; from &apos;@/lib/types&apos;;</div>
                </div>
              </div>
              
              <div>
                <h5 className="font-semibold text-sm mb-2">Best Practices:</h5>
                <ul className={`${TYPOGRAPHY.text16} space-y-2`}>
                  <li>• <strong>Heading:</strong> Use all caps for brand names, gets independent row</li>
                  <li>• <strong>Contact Info:</strong> Column 1 - email and phone with copy functionality</li>
                  <li>• <strong>Time Column:</strong> Column 2 - dedicated space for time or leave empty</li>
                  <li>• <strong>Address Format:</strong> Column 3 - break address into logical line segments</li>
                  <li>• <strong>Social Links:</strong> Column 4 - use icon property, not label</li>
                  <li>• <strong>4-Column Layout:</strong> Maintains structure on medium/large screens</li>
                  <li>• <strong>Bottom Section:</strong> Uses white-98 background with text-14 black-90</li>
                  <li>• <strong>Legal Links:</strong> Ensure all legal pages exist and are accessible</li>
                  <li>• <strong>Accessibility:</strong> All interactive elements have proper ARIA labels</li>
                </ul>
              </div>
            </div>
          </div>

          {/* SocialLink Interface */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>SocialLink Interface</h4>
            <div className="bg-gray-900 p-4 rounded font-mono text-sm text-green-400">
              <pre>{`interface SocialLink {
  icon: string;
  label?: string;
  url: string;
}`}</pre>
            </div>
            <p className="text-sm mt-3 text-gray-600">
              The <code>label</code> is optional and will fall back to <code>icon</code> if not provided.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}