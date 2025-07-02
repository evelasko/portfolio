import React from 'react';
import BioBlock from '@/components/misc/BioBlock';
import { TYPOGRAPHY } from '@/lib/typography';
import { RichTextField, LinkField } from "@prismicio/client";
import { PrismicSocialLink } from '@/lib/types';

export default function BioBlockDemo() {
  // Mock RichText field for bio
  const mockBio: RichTextField = [
    {
      type: 'paragraph',
      text: 'Renowned for my innovative approach to creativity, I began my career with small boutique agencies, swiftly establishing my distinctive design style. My creative success propelled me to lead teams at international agencies, where I drove significant brand transformations.',
      spans: [
        {
          start: 23,
          end: 32,
          type: 'strong'
        },
        {
          start: 146,
          end: 157,
          type: 'strong'
        },
        {
          start: 273,
          end: 295,
          type: 'strong'
        }
      ]
    },
    {
      type: 'paragraph',
      text: 'Currently, I continue to innovate and work with brands through contract-based work, consistently pushing the boundaries of digital design, 3D production.',
      spans: [
        {
          start: 75,
          end: 95,
          type: 'strong'
        },
        {
          start: 145,
          end: 159,
          type: 'strong'
        },
        {
          start: 161,
          end: 175,
          type: 'strong'
        }
      ]
    },
    {
      type: 'paragraph',
      text: 'Based and work in London 🇬🇧',
      spans: []
    }
  ];

  // Mock social links with Lucide icon names
  const mockSocialLinks: PrismicSocialLink[] = [
    {
      icon: "Mail",
      link: {
        link_type: "Web",
        url: "mailto:hello@markashton.com",
        text: "Email",
        target: "_blank"
      }
    },
    {
      icon: "Twitter",
      link: {
        link_type: "Web", 
        url: "https://twitter.com/markashton",
        text: "Twitter",
        target: "_blank"
      }
    },
    {
      icon: "Instagram",
      link: {
        link_type: "Web",
        url: "https://instagram.com/markashton",
        text: "Instagram", 
        target: "_blank"
      }
    },
    {
      icon: "Linkedin",
      link: {
        link_type: "Web",
        url: "https://linkedin.com/in/markashton",
        text: "LinkedIn",
        target: "_blank"
      }
    },
    {
      icon: "Github", 
      link: {
        link_type: "Web",
        url: "https://github.com/markashton",
        text: "GitHub",
        target: "_blank"
      }
    }
  ];

  // Mock other links
  const mockOtherLinks: LinkField[] = [
    {
      link_type: "Web",
      url: "/resume.pdf",
      text: "RESUME",
      target: "_blank"
    },
    {
        link_type: "Web",
        url: "/resume.pdf",
        text: "FULL bio",
        target: "_blank"
      }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto py-12 px-4">
          <header>
            <h1 className={`${TYPOGRAPHY.h1} text-black`}>BioBlock Showcase</h1>
            <p className={`${TYPOGRAPHY.text18} mt-4`}>
              Interactive demonstration of the BioBlock component with photo, biography text, social links, and animations.
            </p>
          </header>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-12 px-4 space-y-16">
        
        {/* Basic Bio Block Example */}
        <section>
          <div className="mb-8">
            <h2 className={`${TYPOGRAPHY.h2} text-black mb-4`}>BioBlock - Complete Example</h2>
            <p className={`${TYPOGRAPHY.text16} text-gray-600 mb-6`}>
              Full BioBlock with black background, 40% photo width, 1:2 aspect ratio, and all features. Photo column takes 40% width on medium+ screens.
            </p>
            
            {/* Code Example */}
            <div className="bg-gray-900 p-4 rounded-lg mb-6">
              <pre className="text-green-400 text-sm overflow-x-auto">
{`<BioBlock
  photo_path="/assets/images/photos/photo_2.jpg"
  over_photo_text="AWARD-WINNING DESIGNER, ARTIST AND ENTREPRENEUR"
  short_bio={richTextBio}
  social_links={[
    { icon: "Mail", link: { url: "mailto:hello@example.com" } },
    { icon: "Twitter", link: { url: "https://twitter.com" } },
    { icon: "Instagram", link: { url: "https://instagram.com" } }
  ]}
  other_links={[
    { url: "/resume.pdf", text: "RESUME" }
  ]}
  margin={60}
/>`}
              </pre>
            </div>
          </div>

          {/* Demo */}
          <div className="rounded-lg overflow-hidden border border-gray-200">
            <BioBlock
              photo_path="/assets/images/photos/photo_2.jpg"
              over_photo_text="AWARD-WINNING DESIGNER, ARTIST AND ENTREPRENEUR"
              short_bio={mockBio}
              social_links={mockSocialLinks}
              other_links={mockOtherLinks}
              margin={60}
            />
          </div>
        </section>

        {/* Bio Block with Graphic */}
        <section>
          <div className="mb-8">
            <h2 className={`${TYPOGRAPHY.h2} text-black mb-4`}>BioBlock - With Over Photo Graphic</h2>
            <p className={`${TYPOGRAPHY.text16} text-gray-600 mb-6`}>
              Example including an over-photo graphic element. Over-photo elements are constrained to half the width of the photo container.
            </p>
            
            {/* Code Example */}
            <div className="bg-gray-900 p-4 rounded-lg mb-6">
              <pre className="text-green-400 text-sm overflow-x-auto">
{`<BioBlock
  photo_path="/assets/images/photos/photo_2.jpg"
  over_photo_text="DESIGNER & ARTIST"
  over_photo_graphic="/assets/graphics/signature_white.svg"
  graphic_width={120}
  graphic_height={60}
  short_bio={richTextBio}
  social_links={socialLinks}
  other_links={otherLinks}
  margin={40}
/>`}
              </pre>
            </div>
          </div>

          {/* Demo */}
          <div className="rounded-lg overflow-hidden border border-gray-200">
            <BioBlock
              photo_path="/assets/images/photos/photo_2.jpg"
              over_photo_text="DESIGNER & ARTIST"
              over_photo_graphic="/assets/graphics/signature_white.svg"
              graphic_width={120}
              graphic_height={60}
              short_bio={mockBio}
              social_links={mockSocialLinks.slice(0, 3)}
              other_links={mockOtherLinks}
              margin={40}
            />
          </div>
        </section>

        {/* Minimal Bio Block */}
        <section>
          <div className="mb-8">
            <h2 className={`${TYPOGRAPHY.h2} text-black mb-4`}>BioBlock - Minimal Version</h2>
            <p className={`${TYPOGRAPHY.text16} text-gray-600 mb-6`}>
              Simplified version with custom margin. Demonstrates the component&apos;s flexibility with fewer elements.
            </p>
            
            {/* Code Example */}
            <div className="bg-gray-900 p-4 rounded-lg mb-6">
              <pre className="text-green-400 text-sm overflow-x-auto">
{`<BioBlock
  photo_path="/assets/images/photos/photo_2.jpg"
  short_bio={richTextBio}
  social_links={[
    { icon: "Mail", link: { url: "mailto:hello@example.com" } },
    { icon: "Twitter", link: { url: "https://twitter.com" } }
  ]}
  other_links={[]}
  margin={80}
/>`}
              </pre>
            </div>
          </div>

          {/* Demo */}
          <div className="rounded-lg overflow-hidden border border-gray-200">
            <BioBlock
              photo_path="/assets/images/photos/photo_2.jpg"
              short_bio={mockBio}
              social_links={mockSocialLinks.slice(0, 2)}
              other_links={[]}
              margin={80}
            />
          </div>
        </section>

        {/* No Margin Example */}
        <section>
          <div className="mb-8">
            <h2 className={`${TYPOGRAPHY.h2} text-black mb-4`}>BioBlock - No Margin</h2>
            <p className={`${TYPOGRAPHY.text16} text-gray-600 mb-6`}>
              Example with zero margin to show how the component can be flush with container edges.
            </p>
            
            {/* Code Example */}
            <div className="bg-gray-900 p-4 rounded-lg mb-6">
              <pre className="text-green-400 text-sm overflow-x-auto">
{`<BioBlock
  photo_path="/assets/images/photos/photo_2.jpg"
  over_photo_text="CREATIVE DIRECTOR"
  short_bio={richTextBio}
  social_links={socialLinks}
  other_links={otherLinks}
  margin={0}
/>`}
              </pre>
            </div>
          </div>

          {/* Demo */}
          <div className="rounded-lg overflow-hidden border border-gray-200">
            <BioBlock
              photo_path="/assets/images/photos/photo_2.jpg"
              over_photo_text="CREATIVE DIRECTOR"
              short_bio={mockBio}
              social_links={mockSocialLinks.slice(0, 4)}
              other_links={mockOtherLinks}
              margin={0}
            />
          </div>
        </section>

        {/* Component Documentation */}
        <section className="space-y-8">
          <h2 className={`${TYPOGRAPHY.h2} text-black`}>Component Documentation</h2>

          {/* Component Properties */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>BioBlock Properties</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-semibold text-sm mb-3">Props:</h5>
                <ul className="text-sm space-y-2 font-mono">
                  <li><strong>photo_path:</strong> string (required)</li>
                  <li><strong>over_photo_text?:</strong> string</li>
                  <li><strong>over_photo_graphic?:</strong> string</li>
                  <li><strong>graphic_width?:</strong> number (default: 100)</li>
                  <li><strong>graphic_height?:</strong> number (default: 100)</li>
                  <li><strong>short_bio:</strong> RichTextField</li>
                  <li><strong>social_links:</strong> PrismicSocialLink[]</li>
                  <li><strong>other_links:</strong> LinkField[]</li>
                  <li><strong>margin?:</strong> number (default: 0)</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-sm mb-3">Features:</h5>
                <ul className="text-sm space-y-2">
                  <li>• Black background (black-100)</li>
                  <li>• Responsive layout (40% photo on medium+, stacked mobile)</li>
                  <li>• 1:2 aspect ratio photo container</li>
                  <li>• Constrained over-photo elements (50% photo width)</li>
                  <li>• Customizable vertical margin/padding</li>
                  <li>• Grayscale photo effect</li>
                  <li>• Rich text bio with bold highlighting</li>
                  <li>• Dynamic social media icons</li>
                  <li>• Scroll-triggered animations</li>
                  <li>• Spring physics animations</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Layout Details */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>Layout System</h4>
            <div className="space-y-4">
              <div>
                <h5 className="font-semibold text-sm mb-2">Responsive Layout:</h5>
                <ul className="text-sm space-y-2">
                  <li><strong>Mobile (s):</strong> Single column, photo full width, 1:2 aspect ratio</li>
                  <li><strong>Medium (m):</strong> Two columns, photo 40% width, content fills remaining space</li>
                  <li><strong>Large (l):</strong> Two columns, photo 40% width, content fills remaining space</li>
                  <li><strong>Flexbox Layout:</strong> Uses flex for better control than CSS Grid</li>
                </ul>
              </div>
              
              <div>
                <h5 className="font-semibold text-sm mb-2">Photo Container:</h5>
                <ul className="text-sm space-y-2">
                  <li><strong>Aspect Ratio:</strong> 1:2 (1 width × 2 height) for portrait orientation</li>
                  <li><strong>Image Coverage:</strong> object-cover ensures full container coverage</li>
                  <li><strong>Effect:</strong> Grayscale filter applied</li>
                  <li><strong>Responsive Sizing:</strong> Adjusts from 100% to 40% width</li>
                </ul>
              </div>

              <div>
                <h5 className="font-semibold text-sm mb-2">Over-Photo Elements:</h5>
                <ul className="text-sm space-y-2">
                  <li><strong>Container Width:</strong> 50% of photo container width (w-1/2)</li>
                  <li><strong>Positioning:</strong> Centered within photo container</li>
                  <li><strong>Text Alignment:</strong> Center-aligned for better readability</li>
                  <li><strong>Element Stacking:</strong> Graphic above text with proper spacing</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Margin System */}
          <div className="bg-green-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>Margin System</h4>
            <div className="space-y-4">
              <div>
                <h5 className="font-semibold text-sm mb-2">Margin Property:</h5>
                <ul className="text-sm space-y-2">
                  <li><strong>Type:</strong> number (pixels)</li>
                  <li><strong>Default:</strong> 0 (no margin)</li>
                  <li><strong>Application:</strong> Applied as paddingTop and paddingBottom</li>
                  <li><strong>Purpose:</strong> Controls vertical spacing around the entire component</li>
                </ul>
              </div>
              
              <div>
                <h5 className="font-semibold text-sm mb-2">Common Margin Values:</h5>
                <ul className="text-sm space-y-2 font-mono">
                  <li><strong>0:</strong> No margin - flush with container</li>
                  <li><strong>20-40:</strong> Subtle spacing for tight layouts</li>
                  <li><strong>60-80:</strong> Standard spacing for most use cases</li>
                  <li><strong>100+:</strong> Generous spacing for hero sections</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Animation Details */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>Animation System</h4>
            <div className="space-y-4">
              <div>
                <h5 className="font-semibold text-sm mb-2">Photo Container:</h5>
                <ul className="text-sm space-y-2">
                  <li><strong>Scale:</strong> 1.4 → 1 (scale down effect)</li>
                  <li><strong>Y Offset:</strong> 150px fade from bottom</li>
                  <li><strong>Physics:</strong> Spring (stiffness: 200, damping: 65, mass: 1)</li>
                  <li><strong>Effect:</strong> Grayscale filter applied</li>
                </ul>
              </div>
              
              <div>
                <h5 className="font-semibold text-sm mb-2">Over Photo Elements:</h5>
                <ul className="text-sm space-y-2">
                  <li><strong>Graphic:</strong> 300px Y offset, 0.9 → 1 scale</li>
                  <li><strong>Text:</strong> 160px Y offset, 0.9 → 1 scale</li>
                  <li><strong>Physics:</strong> Same spring settings as photo</li>
                  <li><strong>Typography:</strong> TYPOGRAPHY.mono14 with white-96 color</li>
                </ul>
              </div>

              <div>
                <h5 className="font-semibold text-sm mb-2">Content Animations:</h5>
                <ul className="text-sm space-y-2">
                  <li><strong>Bio Text:</strong> 40px Y offset with easeInOut timing</li>
                  <li><strong>Social Links:</strong> Staggered (0.5s base + 0.1s per item)</li>
                  <li><strong>Social Physics:</strong> Spring with bounce: 0.2, duration: 1s</li>
                  <li><strong>Typography:</strong> TYPOGRAPHY.h9 for bio, mono18 for links</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Usage Guidelines */}
          <div className="bg-green-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>Usage Guidelines</h4>
            <div className="space-y-4">
              <div>
                <h5 className="font-semibold text-sm mb-2">Import Component:</h5>
                <div className="bg-gray-900 p-3 rounded font-mono text-sm text-green-400">
                  <div>import BioBlock from &apos;@/components/misc/BioBlock&apos;;</div>
                  <div>import {`{ PrismicSocialLink }`} from &apos;@/lib/types&apos;;</div>
                  <div>import {`{ RichTextField, LinkField }`} from &apos;@prismicio/client&apos;;</div>
                </div>
              </div>
              
              <div>
                <h5 className="font-semibold text-sm mb-2">Best Practices:</h5>
                <ul className={`${TYPOGRAPHY.text16} space-y-2`}>
                  <li>• <strong>Photo Quality:</strong> Use high-resolution portrait images (1:2 ratio works best)</li>
                  <li>• <strong>Dark Theme:</strong> Component has black background - design accordingly</li>
                  <li>• <strong>Margin Usage:</strong> Use margin prop to control spacing in your layout</li>
                  <li>• <strong>Over-Photo Text:</strong> Keep text concise due to 50% width constraint</li>
                  <li>• <strong>Mobile Layout:</strong> Test responsiveness as layout stacks on mobile</li>
                  <li>• <strong>Content Balance:</strong> 40% photo width works well with substantial bio text</li>
                  <li>• <strong>Social Links:</strong> Prioritize most important links first for mobile</li>
                  <li>• <strong>Animation Performance:</strong> Component uses optimized scroll triggers</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}