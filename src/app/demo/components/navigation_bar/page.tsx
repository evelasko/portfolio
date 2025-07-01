import React from 'react';
import { LinkField } from "@prismicio/client";
import { PrismicSocialLink } from '@/lib/types';
import NavigationBar from '@/components/navigation_bar/NavigationBar';
import { TYPOGRAPHY } from '@/lib/typography';

export default function NavigationBarDemo() {
  // Mock Prismic LinkField data for main navigation
  const mockMainLinks: LinkField[] = [
    {
      link_type: "Web",
      url: "/work",
      text: "WORK",
      target: undefined
    },
    {
      link_type: "Web", 
      url: "/about",
      text: "ABOUT",
      target: undefined
    },
    {
      link_type: "Web",
      url: "/thoughts", 
      text: "THOUGHTS",
      target: undefined
    }
  ];

  // Mock PrismicSocialLink data for social links with icons
  const mockSocialLinks: PrismicSocialLink[] = [
    {
      icon: "Mail", // Lucide icon name
      link: {
        link_type: "Web",
        url: "mailto:hello@markashton.com",
        text: "MAIL",
        target: "_blank"
      }
    },
    {
      icon: "Twitter", // Lucide icon name
      link: {
        link_type: "Web",
        url: "https://twitter.com/markashton",
        text: "TW", 
        target: "_blank"
      }
    },
    {
      icon: "Instagram", // Lucide icon name
      link: {
        link_type: "Web",
        url: "https://instagram.com/markashton",
        text: "IG",
        target: "_blank"
      }
    },
    {
      icon: "Linkedin", // Lucide icon name
      link: {
        link_type: "Web",
        url: "https://linkedin.com/in/markashton", 
        text: "LI",
        target: "_blank"
      }
    }
  ];

  // Mock social links without icons (fallback to text)
  const mockSocialLinksNoIcons: PrismicSocialLink[] = [
    {
      icon: null, // No icon, will show text
      link: {
        link_type: "Web",
        url: "mailto:hello@markashton.com",
        text: "MAIL",
        target: "_blank"
      }
    },
    {
      icon: null,
      link: {
        link_type: "Web",
        url: "https://twitter.com/markashton",
        text: "TW", 
        target: "_blank"
      }
    },
    {
      icon: null,
      link: {
        link_type: "Web",
        url: "https://instagram.com/markashton",
        text: "IG",
        target: "_blank"
      }
    },
    {
      icon: null,
      link: {
        link_type: "Web",
        url: "https://linkedin.com/in/markashton", 
        text: "LI",
        target: "_blank"
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto py-12 px-4">
          <header>
            <h1 className={`${TYPOGRAPHY.h1} text-black`}>NavigationBar Showcase</h1>
            <p className={`${TYPOGRAPHY.text18} mt-4`}>
              Interactive demonstration of responsive navigation bar with desktop and mobile views.
            </p>
          </header>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-12 px-4 space-y-16">
        
        {/* NavigationBar with Icons */}
        <section>
          <div className="mb-8">
            <h2 className={`${TYPOGRAPHY.h2} text-black mb-4`}>NavigationBar - With Social Icons</h2>
            <p className={`${TYPOGRAPHY.text16} text-gray-600 mb-6`}>
              Example using PrismicSocialLink with Lucide icons. Main navigation expands to fill space, social links shrink to fit.
            </p>
            
            {/* Code Example */}
            <div className="bg-gray-900 p-4 rounded-lg mb-6">
              <pre className="text-green-400 text-sm overflow-x-auto">
{`<NavigationBar
  links={[
    { link_type: "Web", url: "/work", text: "WORK" },
    { link_type: "Web", url: "/about", text: "ABOUT" },
    { link_type: "Web", url: "/thoughts", text: "THOUGHTS" }
  ]}
  socialLinks={[
    {
      icon: "Mail",
      link: { link_type: "Web", url: "mailto:hello@example.com", text: "MAIL" }
    },
    {
      icon: "Twitter", 
      link: { link_type: "Web", url: "https://twitter.com", text: "TW" }
    },
    {
      icon: "Instagram",
      link: { link_type: "Web", url: "https://instagram.com", text: "IG" }
    },
    {
      icon: "Linkedin",
      link: { link_type: "Web", url: "https://linkedin.com", text: "LI" }
    }
  ]}
/>`}
              </pre>
            </div>
          </div>

          {/* Demo */}
          <div className="bg-black rounded-lg border border-gray-200 overflow-hidden">
            <NavigationBar 
              links={mockMainLinks}
              socialLinks={mockSocialLinks}
            />
            
            {/* Desktop Preview */}
            <div className="p-8 border-t border-gray-800">
              <p className={`${TYPOGRAPHY.text14} text-gray-400 mb-4`}>
                Desktop view: Main navigation expands (flex-1), social icons shrink to fit (flex-shrink-0)
              </p>
              <p className={`${TYPOGRAPHY.text14} text-gray-400`}>
                Mobile view: Hamburger menu with full-screen overlay showing icons (resize to see)
              </p>
            </div>
          </div>
        </section>

        {/* NavigationBar without Icons */}
        <section>
          <div className="mb-8">
            <h2 className={`${TYPOGRAPHY.h2} text-black mb-4`}>NavigationBar - Text Fallback</h2>
            <p className={`${TYPOGRAPHY.text16} text-gray-600 mb-6`}>
              Example with social links that have no icons (fallback to text display).
            </p>
            
            {/* Code Example */}
            <div className="bg-gray-900 p-4 rounded-lg mb-6">
              <pre className="text-green-400 text-sm overflow-x-auto">
{`<NavigationBar
  links={mainNavigationLinks}
  socialLinks={[
    {
      icon: null, // No icon
      link: { link_type: "Web", url: "mailto:hello@example.com", text: "MAIL" }
    },
    {
      icon: null,
      link: { link_type: "Web", url: "https://twitter.com", text: "TW" }
    }
    // ... more links without icons
  ]}
/>`}
              </pre>
            </div>
          </div>

          {/* Demo */}
          <div className="bg-black rounded-lg border border-gray-200 overflow-hidden">
            <NavigationBar 
              links={mockMainLinks}
              socialLinks={mockSocialLinksNoIcons}
            />
            
            <div className="p-8 border-t border-gray-800">
              <p className={`${TYPOGRAPHY.text14} text-gray-400`}>
                When icon field is null or empty, the component falls back to showing the link text
              </p>
            </div>
          </div>
        </section>

        {/* NavigationBar without Social Links */}
        <section>
          <div className="mb-8">
            <h2 className={`${TYPOGRAPHY.h2} text-black mb-4`}>NavigationBar - No Social Links</h2>
            <p className={`${TYPOGRAPHY.text16} text-gray-600 mb-6`}>
              Example with only main navigation links (no social links provided).
            </p>
            
            {/* Code Example */}
            <div className="bg-gray-900 p-4 rounded-lg mb-6">
              <pre className="text-green-400 text-sm overflow-x-auto">
{`<NavigationBar
  links={[
    { link_type: "Web", url: "/work", text: "WORK" },
    { link_type: "Web", url: "/about", text: "ABOUT" },
    { link_type: "Web", url: "/thoughts", text: "THOUGHTS" }
  ]}
  // No socialLinks prop
/>`}
              </pre>
            </div>
          </div>

          {/* Demo */}
          <div className="bg-black rounded-lg border border-gray-200 overflow-hidden">
            <NavigationBar links={mockMainLinks} />
            
            <div className="p-8 border-t border-gray-800">
              <p className={`${TYPOGRAPHY.text14} text-gray-400`}>
                Main navigation takes all available space when no social links are provided
              </p>
            </div>
          </div>
        </section>

        {/* Component Documentation */}
        <section className="space-y-8">
          <h2 className={`${TYPOGRAPHY.h2} text-black`}>Component Documentation</h2>

          {/* Component Properties */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>NavigationBar Properties</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-semibold text-sm mb-3">Props:</h5>
                <ul className="text-sm space-y-2 font-mono">
                  <li><strong>links:</strong> LinkField[] (main navigation links)</li>
                  <li><strong>socialLinks:</strong> PrismicSocialLink[] (optional, social media links with icons)</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-sm mb-3">Features:</h5>
                <ul className="text-sm space-y-2">
                  <li>• Responsive design (desktop + mobile)</li>
                  <li>• Animated mobile menu overlay</li>
                  <li>• Prismic CMS integration</li>
                  <li>• Dynamic Lucide icons support</li>
                  <li>• Flexible layout with flex-1 for main nav</li>
                  <li>• Icon fallback to text</li>
                  <li>• Hover states and transitions</li>
                  <li>• Accessible keyboard navigation</li>
                </ul>
              </div>
            </div>
          </div>

          {/* PrismicSocialLink Structure */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>PrismicSocialLink Structure</h4>
            <div className="space-y-4">
              <div>
                <h5 className="font-semibold text-sm mb-2">PrismicSocialLink Interface:</h5>
                <div className="bg-gray-900 p-3 rounded font-mono text-sm text-green-400">
                  <pre>{`interface PrismicSocialLink {
  icon: KeyTextField;     // Lucide icon name or null
  link: LinkField;        // Standard Prismic link field
}`}</pre>
                </div>
              </div>
              
              <div>
                <h5 className="font-semibold text-sm mb-2">Icon Behavior:</h5>
                <ul className="text-sm space-y-2">
                  <li><strong>Icon Field Filled:</strong> Shows Lucide icon using DynamicIcon component</li>
                  <li><strong>Icon Field Empty:</strong> Falls back to displaying link.text</li>
                  <li><strong>Supported Icons:</strong> Any icon name from Lucide React library</li>
                  <li><strong>Icon Size:</strong> 20px (w-5 h-5) on desktop, 24px (w-6 h-6) on mobile</li>
                </ul>
              </div>

              <div>
                <h5 className="font-semibold text-sm mb-2">Popular Icon Names:</h5>
                <ul className="text-sm space-y-2 font-mono">
                  <li><strong>Mail:</strong> Email/contact links</li>
                  <li><strong>Twitter:</strong> Twitter/X social media</li>
                  <li><strong>Instagram:</strong> Instagram social media</li>
                  <li><strong>Linkedin:</strong> LinkedIn professional network</li>
                  <li><strong>Github:</strong> GitHub code repository</li>
                  <li><strong>Facebook:</strong> Facebook social media</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Layout System */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>Layout System</h4>
            <div className="space-y-4">
              <div>
                <h5 className="font-semibold text-sm mb-2">Desktop Layout:</h5>
                <ul className="text-sm space-y-2">
                  <li><strong>Main Navigation:</strong> flex-1 (expands to fill available space)</li>
                  <li><strong>Social Links:</strong> flex-shrink-0 (only takes needed space)</li>
                  <li><strong>Spacing:</strong> space-x-12 for main nav, space-x-8 for social</li>
                  <li><strong>Alignment:</strong> Items center-aligned vertically</li>
                </ul>
              </div>
              
              <div>
                <h5 className="font-semibold text-sm mb-2">Mobile Layout:</h5>
                <ul className="text-sm space-y-2">
                  <li><strong>Header:</strong> Brand name left, hamburger menu right</li>
                  <li><strong>Menu:</strong> Full viewport overlay with centered content</li>
                  <li><strong>Main Links:</strong> Right-aligned, spaced vertically</li>
                  <li><strong>Social Links:</strong> Horizontal row at bottom, spaced evenly</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Usage Guidelines */}
          <div className="bg-green-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>Usage Guidelines</h4>
            <div className="space-y-4">
              <div>
                <h5 className="font-semibold text-sm mb-2">Import Components:</h5>
                <div className="bg-gray-900 p-3 rounded font-mono text-sm text-green-400">
                  <div>import NavigationBar from &apos;@/components/navigation_bar/NavigationBar&apos;;</div>
                  <div>import {`{ PrismicSocialLink }`} from &apos;@/lib/types&apos;;</div>
                </div>
              </div>
              
              <div>
                <h5 className="font-semibold text-sm mb-2">Best Practices:</h5>
                <ul className={`${TYPOGRAPHY.text16} space-y-2`}>
                  <li>• <strong>Icon Names:</strong> Use exact Lucide React icon names (case-sensitive)</li>
                  <li>• <strong>Fallback Text:</strong> Always provide meaningful link.text for accessibility</li>
                  <li>• <strong>Layout Flexibility:</strong> Main navigation automatically expands to use available space</li>
                  <li>• <strong>Icon Consistency:</strong> Use consistent icon style (outline vs filled)</li>
                  <li>• <strong>Social Order:</strong> Consider standard social media ordering conventions</li>
                  <li>• <strong>Link Targets:</strong> Use _blank for external social links</li>
                  <li>• <strong>Performance:</strong> Icons load dynamically only when needed</li>
                </ul>
              </div>

              <div>
                <h5 className="font-semibold text-sm mb-2">Example Usage:</h5>
                <div className="bg-gray-900 p-3 rounded font-mono text-sm text-green-400">
                  <pre className="text-green-400">
{`// Recommended usage with icons
<NavigationBar 
  links={mainNavigationLinks}
  socialLinks={[
    {
      icon: "Mail",
      link: { link_type: "Web", url: "mailto:hello@example.com", target: "_blank" }
    },
    {
      icon: "Twitter", 
      link: { link_type: "Web", url: "https://twitter.com/username", target: "_blank" }
    }
  ]}
/>

// Text fallback when no icons
<NavigationBar 
  links={mainNavigationLinks}
  socialLinks={socialLinksWithoutIcons}
/>

// Main navigation only
<NavigationBar links={mainNavigationLinks} />`}
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