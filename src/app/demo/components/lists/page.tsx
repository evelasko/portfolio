import React from 'react';
import SkillsItem from '@/components/list_items/SkillsItem';
import ProjectItem from '@/components/list_items/ProjectItem';
import TestimonialItem from '@/components/list_items/TestimonialItem';
import { TYPOGRAPHY } from '@/lib/typography';
import { CodeExample, ComponentSection } from '../utilities';

export default function ListsComponentsDemo() {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4 space-y-16">
      {/* Page Header */}
      <header className="border-b border-gray-200 pb-8">
        <h1 className={`${TYPOGRAPHY.h1} text-black`}>Lists Showcase</h1>
        <p className={`${TYPOGRAPHY.text18} mt-4`}>
          Interactive demonstrations of the list components with various configurations.
        </p>
      </header>

      {/* ProjectItem Component */}
      <ComponentSection title="ProjectItem Component">
        <div className="space-y-12">
          
          {/* Basic Example */}
          <CodeExample 
            title="Project Item Example"
            code={`<ProjectItem
  label="Web Design"
  title="Stellar Odyssey"
  description="From Concept to Creation - Breathing Life into Cinematic 3D Characters"
  image="/assets/images/cards/card_1.jpg"
  link="/works/stellar-odyssey"
/>`}
          >
            <div className="w-full">
              <ProjectItem
                label="Web Design"
                title="Stellar Odyssey"
                description="From Concept to Creation - Breathing Life into Cinematic 3D Characters"
                image="/assets/images/cards/card_1.jpg"
                link="/works/stellar-odyssey"
              />
            </div>
          </CodeExample>

          {/* Multiple Projects List */}
          <CodeExample 
            title="Projects List Layout"
            code={`<div className="space-y-0 border-b border-black-10">
  <ProjectItem
    label="Photography"
    title="The Photographer"
    description="A Blend of Elegance and Storytelling"
    image="/assets/images/cards/card_1.jpg"
    link="/works/photographer"
  />
  
  <ProjectItem
    label="Branding"
    title="Identity Design"
    description="Complete brand identity solution for modern businesses"
    image="/assets/images/cards/card_2.jpg"
    link="/works/branding"
  />
  
  <ProjectItem
    label="UI/UX Design"
    title="Mobile Experience"
    description="User-centered design process for mobile applications"
    image="/assets/images/cards/card_3.jpg"
    link="/works/mobile-app"
  />
</div>`}
          >
            <div className="w-full space-y-0 border-b border-black-10">
              <ProjectItem
                label="Photography"
                title="The Photographer"
                description="A Blend of Elegance and Storytelling"
                image="/assets/images/cards/card_1.jpg"
                link="/works/photographer"
              />
              
              <ProjectItem
                label="Branding"
                title="Identity Design"
                description="Complete brand identity solution for modern businesses"
                image="/assets/images/cards/card_2.jpg"
                link="/works/branding"
              />
              
              <ProjectItem
                label="UI/UX Design"
                title="Mobile Experience"
                description="User-centered design process for mobile applications"
                image="/assets/images/cards/card_3.jpg"
                link="/works/mobile-app"
              />
            </div>
          </CodeExample>

          {/* Alternating Layout Example */}
          <CodeExample 
            title="Alternating Layout (Future Enhancement)"
            code={`<div className="space-y-0 border-b border-black-10">
  <ProjectItem
    label="Development"
    title="E-commerce Platform"
    description="Full-stack solution with modern technologies and seamless user experience"
    image="/assets/images/cards/card_1.jpg"
    link="/works/ecommerce"
  />
  
  {/* Future: Add reversed prop for alternating layout */}
  <ProjectItem
    label="Motion Graphics" 
    title="Brand Animation"
    description="Dynamic visual storytelling through motion design and animation"
    image="/assets/images/cards/card_2.jpg"
    link="/works/animation"
    // reversed={true}
  />
</div>`}
          >
            <div className="w-full space-y-0 border-b border-black-10">
              <ProjectItem
                label="Development"
                title="E-commerce Platform"
                description="Full-stack solution with modern technologies and seamless user experience"
                image="/assets/images/cards/card_1.jpg"
                link="/works/ecommerce"
              />
              
              <ProjectItem
                label="Motion Graphics"
                title="Brand Animation"
                description="Dynamic visual storytelling through motion design and animation"
                image="/assets/images/cards/card_2.jpg"
                link="/works/animation"
              />
            </div>
          </CodeExample>

          {/* Component Properties */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>ProjectItem Properties</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-semibold text-sm mb-2">Props:</h5>
                <ul className="text-sm space-y-1 font-mono">
                  <li><strong>label:</strong> string</li>
                  <li><strong>title:</strong> string</li>
                  <li><strong>description:</strong> string</li>
                  <li><strong>image:</strong> string</li>
                  <li><strong>link:</strong> string</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-sm mb-2">Features:</h5>
                <ul className="text-sm space-y-1">
                  <li>• Full viewport width layout</li>
                  <li>• Two-column layout on large screens</li>
                  <li>• Single column on mobile (image top)</li>
                  <li>• Responsive height (600px → 400px → 300px)</li>
                  <li>• Content and image sections</li>
                  <li>• Full clickable area as Link</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Layout Structure */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>Layout Structure</h4>
            <div className="space-y-3 text-sm">
              <div><strong>Container:</strong> Full width with CSS Grid layout and top border</div>
              <div><strong>Large Screens:</strong> 2-column grid (content | image)</div>
              <div><strong>Mobile/Tablet:</strong> 1-column grid (image on top, content below)</div>
              <div><strong>Heights:</strong> 600px (S) → 300px (M) → 300px (L)</div>
              <div><strong>Image Height:</strong> Fixed 200px on small, full height on medium/large</div>
              <div><strong>Content Padding:</strong> 24px (S) → 32px (M) → 48px (L)</div>
              <div><strong>Content Spacing:</strong> 24px (S) → 32px (L) between label/title/description</div>
              <div><strong>Borders:</strong> 1px top border (black-10), bottom border on list container</div>
            </div>
          </div>

          {/* Responsive Behavior */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>Responsive Behavior</h4>
            <div className="space-y-2 text-sm">
              <div><strong>Small Screens:</strong> Image on top (200px), content below, 600px total height</div>
              <div><strong>Medium Screens:</strong> Side-by-side layout, 300px height</div>
              <div><strong>Large Screens:</strong> Side-by-side layout, content left, image right, 300px height</div>
              <div><strong>Content Alignment:</strong> Vertically centered in content area</div>
              <div><strong>Image Display:</strong> Full coverage with object-cover</div>
              <div><strong>Content Spacing:</strong> Label has more space to title (24px/32px) than title to description</div>
            </div>
          </div>

          {/* Typography Reference */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>Typography Classes Used</h4>
            <div className="space-y-2 text-sm font-mono">
              <div><strong>label:</strong> mono-16-s m:mono-16-m l:mono-16-l (black-50, uppercase)</div>
              <div><strong>title:</strong> text-h7-s m:text-h7-m l:text-h7-l (black-90)</div>
              <div><strong>description:</strong> text-16-s m:text-16-m l:text-16-l (black-50)</div>
            </div>
          </div>

          {/* Usage Guidelines */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>Usage Guidelines</h4>
            <div className="space-y-2 text-sm">
              <div><strong>List Layout:</strong> Stack items with no spacing (space-y-0) for continuous design</div>
              <div><strong>List Borders:</strong> Add border-b border-black-10 to list container for bottom border</div>
              <div><strong>Container:</strong> Use full width containers, not grid systems</div>
              <div><strong>Content Order:</strong> Built-in responsive ordering (no manual configuration needed)</div>
              <div><strong>Image Sizing:</strong> 200px height on mobile, full height on larger screens</div>
              <div><strong>Content Spacing:</strong> Increased space between label and title for better hierarchy</div>
              <div><strong>Link Coverage:</strong> Entire item area is clickable</div>
              <div><strong>Accessibility:</strong> Semantic HTML with proper heading hierarchy</div>
            </div>
          </div>
        </div>
      </ComponentSection>

      {/* TestimonialItem Component */}
      <ComponentSection title="TestimonialItem Component">
        <div className="space-y-12">
          
          {/* Basic Example */}
          <CodeExample 
            title="Testimonial Item Example"
            code={`<TestimonialItem
  name="Timothy Rodgers"
  title="Head of Projects, Microshaft"
  message="Mark transformed Microshaft's brand with his visionary design. His creativity and attention to detail brought our ideas to life, exceeding all expectations."
  avatar="/assets/images/photos/photo_1.jpg"
/>`}
          >
            <div className="max-w-2xl mx-auto">
              <TestimonialItem
                name="Timothy Rodgers"
                title="Head of Projects, Microshaft"
                message="Mark transformed Microshaft's brand with his visionary design. His creativity and attention to detail brought our ideas to life, exceeding all expectations."
                avatar="/assets/images/photos/photo_1.jpg"
              />
            </div>
          </CodeExample>

          {/* Multiple Testimonials Grid */}
          <CodeExample 
            title="Multiple Testimonials Grid"
            code={`<div className="grid grid-cols-1 m:grid-cols-2 l:grid-cols-3 gap-6">
  <TestimonialItem
    name="Sarah Chen"
    title="Marketing Director, TechCorp"
    message="Working with Mark was an absolute pleasure. His innovative approach to design and meticulous attention to detail elevated our brand to new heights."
    avatar="/assets/images/photos/photo_1.jpg"
  />
  
  <TestimonialItem
    name="David Wilson"
    title="CEO, StartupXYZ"
    message="Mark's design expertise transformed our user experience. His ability to translate complex ideas into beautiful, functional designs is unmatched."
    avatar="/assets/images/photos/photo_1.jpg"
  />
  
  <TestimonialItem
    name="Emily Rodriguez"
    title="Product Manager, InnovateLab"
    message="Mark delivered exceptional results on time and within budget. His collaborative approach and creative vision made our project a huge success."
    avatar="/assets/images/photos/photo_1.jpg"
  />
</div>`}
          >
            <div className="grid grid-cols-1 m:grid-cols-2 l:grid-cols-3 gap-6">
              <TestimonialItem
                name="Sarah Chen"
                title="Marketing Director, TechCorp"
                message="Working with Mark was an absolute pleasure. His innovative approach to design and meticulous attention to detail elevated our brand to new heights."
                avatar="/assets/images/photos/photo_1.jpg"
              />
              
              <TestimonialItem
                name="David Wilson"
                title="CEO, StartupXYZ"
                message="Mark's design expertise transformed our user experience. His ability to translate complex ideas into beautiful, functional designs is unmatched."
                avatar="/assets/images/photos/photo_1.jpg"
              />
              
              <TestimonialItem
                name="Emily Rodriguez"
                title="Product Manager, InnovateLab"
                message="Mark delivered exceptional results on time and within budget. His collaborative approach and creative vision made our project a huge success."
                avatar="/assets/images/photos/photo_1.jpg"
              />
            </div>
          </CodeExample>

          {/* Single Column Layout */}
          <CodeExample 
            title="Single Column Testimonials"
            code={`<div className="max-w-4xl mx-auto space-y-8">
  <TestimonialItem
    name="Michael Thompson"
    title="Creative Director, Design Studio"
    message="Mark's ability to understand our vision and translate it into stunning visual designs was remarkable. He brought fresh perspectives and innovative solutions to every challenge."
    avatar="/assets/images/photos/photo_1.jpg"
  />
  
  <TestimonialItem
    name="Lisa Park"
    title="Brand Manager, Global Corp"
    message="The collaboration with Mark was seamless. His professionalism, creativity, and dedication to excellence made our rebranding project a tremendous success."
    avatar="/assets/images/photos/photo_1.jpg"
  />
</div>`}
          >
            <div className="max-w-4xl mx-auto space-y-8">
              <TestimonialItem
                name="Michael Thompson"
                title="Creative Director, Design Studio"
                message="Mark's ability to understand our vision and translate it into stunning visual designs was remarkable. He brought fresh perspectives and innovative solutions to every challenge."
                avatar="/assets/images/photos/photo_1.jpg"
              />
              
              <TestimonialItem
                name="Lisa Park"
                title="Brand Manager, Global Corp"
                message="The collaboration with Mark was seamless. His professionalism, creativity, and dedication to excellence made our rebranding project a tremendous success."
                avatar="/assets/images/photos/photo_1.jpg"
              />
            </div>
          </CodeExample>

          {/* Component Properties */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>TestimonialItem Properties</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-semibold text-sm mb-2">Props:</h5>
                <ul className="text-sm space-y-1 font-mono">
                  <li><strong>name:</strong> string</li>
                  <li><strong>title:</strong> string</li>
                  <li><strong>message:</strong> string</li>
                  <li><strong>avatar:</strong> string</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-sm mb-2">Features:</h5>
                <ul className="text-sm space-y-1">
                  <li>• Card-based layout with shadow and border</li>
                  <li>• Circular avatar (42px)</li>
                  <li>• Responsive padding and spacing</li>
                  <li>• Testimonial message with proper typography</li>
                  <li>• Author info with name and title</li>
                  <li>• Flexible grid layout support</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Typography Reference */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>Typography Classes Used</h4>
            <div className="space-y-2 text-sm font-mono">
              <div><strong>message:</strong> text-h9-s m:text-h9-m l:text-h9-l (black-70)</div>
              <div><strong>name:</strong> mono-18-s m:mono-18-m l:mono-18-l (black-90, uppercase)</div>
              <div><strong>title:</strong> mono-16-s m:mono-16-m l:mono-16-l (black-50, uppercase)</div>
            </div>
          </div>

          {/* Layout Guidelines */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>Layout Guidelines</h4>
            <div className="space-y-2 text-sm">
              <div><strong>Card Design:</strong> White background with subtle shadow and border</div>
              <div><strong>Message Layout:</strong> Testimonial text at top with generous bottom margin</div>
              <div><strong>Author Layout:</strong> Horizontal flex with avatar and text information</div>
              <div><strong>Avatar Size:</strong> Fixed 42px circular image</div>
              <div><strong>Responsive Padding:</strong> 32px (S) → 40px (M) → 48px (L)</div>
              <div><strong>Grid Support:</strong> Works well in 1, 2, or 3 column layouts</div>
            </div>
          </div>

          {/* Responsive Behavior */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>Responsive Behavior</h4>
            <div className="space-y-2 text-sm">
              <div><strong>Typography:</strong> Responsive text sizes across all breakpoints</div>
              <div><strong>Spacing:</strong> Increased padding on larger screens</div>
              <div><strong>Avatar:</strong> Fixed size across all breakpoints</div>
              <div><strong>Grid Layout:</strong> Stacks to single column on mobile</div>
              <div><strong>Message Text:</strong> Line height adjusts for readability</div>
            </div>
          </div>

          {/* Usage Guidelines */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>Usage Guidelines</h4>
            <div className="space-y-2 text-sm">
              <div><strong>Message Length:</strong> Keep testimonials concise but meaningful (1-3 sentences)</div>
              <div><strong>Avatar Images:</strong> Use high-quality, professional headshots</div>
              <div><strong>Name Format:</strong> Use full names in proper case (will be uppercased)</div>
              <div><strong>Title Format:</strong> Include role and company for credibility</div>
              <div><strong>Grid Spacing:</strong> Use gap-6 or gap-8 for optimal visual separation</div>
              <div><strong>Container Width:</strong> Max-width constraints work well for readability</div>
            </div>
          </div>
        </div>
      </ComponentSection>

      {/* SkillsItem Component */}
      <ComponentSection title="SkillsItem Component">
        <div className="space-y-12">
          
          {/* Basic Example */}
          <CodeExample 
            title="Skills Item Example"
            code={`<SkillsItem
  itemNumber={1}
  title="Digital Strategy"
  description="Creating a comprehensive digital strategy tailored to your business goals and user needs. From industry analysis to goal setting, I construct a roadmap to guide your online ventures to success."
  skills={["Strategic Planning", "Market Analysis", "Campaign Development", "Analytics and Insights"]}
/>`}
          >
            <div className="max-w-2xl mx-auto">
              <SkillsItem
                itemNumber={1}
                title="Digital Strategy"
                description="Creating a comprehensive digital strategy tailored to your business goals and user needs. From industry analysis to goal setting, I construct a roadmap to guide your online ventures to success."
                skills={["Strategic Planning", "Market Analysis", "Campaign Development", "Analytics and Insights"]}
              />
            </div>
          </CodeExample>

          {/* Multiple Items List */}
          <CodeExample 
            title="Multiple Skills Items"
            code={`<div className="space-y-16 l:space-y-20">
  <SkillsItem
    itemNumber={1}
    title="Digital Strategy"
    description="Creating a comprehensive digital strategy tailored to your business goals and user needs. From industry analysis to goal setting, I construct a roadmap to guide your online ventures to success."
    skills={["Strategic Planning", "Market Analysis", "Campaign Development", "Analytics and Insights"]}
  />
  
  <SkillsItem
    itemNumber={2}
    title="Brand Identity"
    description="I help businesses create a powerful, memorable brand identity that connects with their customer base. This includes setting up brand strategy and building comprehensive brand guidelines to maintain consistency across platforms."
    skills={["Brand Strategy", "Logo Design", "Brand Guidelines", "Brand Collateral"]}
  />
  
  <SkillsItem
    itemNumber={3}
    title="User Experience Design"
    description="Designing intuitive and engaging user experiences that drive conversions and customer satisfaction. Through research, prototyping, and testing, I create digital products that users love."
    skills={["User Research", "Wireframing", "Prototyping", "Usability Testing"]}
  />
</div>`}
          >
            <div className="max-w-4xl mx-auto space-y-16 l:space-y-20">
              <SkillsItem
                itemNumber={1}
                title="Digital Strategy"
                description="Creating a comprehensive digital strategy tailored to your business goals and user needs. From industry analysis to goal setting, I construct a roadmap to guide your online ventures to success."
                skills={["Strategic Planning", "Market Analysis", "Campaign Development", "Analytics and Insights"]}
              />
              
              <SkillsItem
                itemNumber={2}
                title="Brand Identity"
                description="I help businesses create a powerful, memorable brand identity that connects with their customer base. This includes setting up brand strategy and building comprehensive brand guidelines to maintain consistency across platforms."
                skills={["Brand Strategy", "Logo Design", "Brand Guidelines", "Brand Collateral"]}
              />
              
              <SkillsItem
                itemNumber={3}
                title="User Experience Design"
                description="Designing intuitive and engaging user experiences that drive conversions and customer satisfaction. Through research, prototyping, and testing, I create digital products that users love."
                skills={["User Research", "Wireframing", "Prototyping", "Usability Testing"]}
              />
            </div>
          </CodeExample>

          {/* Development Skills Example */}
          <CodeExample 
            title="Development Skills Example"
            code={`<SkillsItem
  itemNumber={4}
  title="Web Development"
  description="Building modern, responsive web applications using cutting-edge technologies and frameworks. Focus on performance, accessibility, and maintainable code architecture."
  skills={["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "API Development"]}
/>`}
          >
            <div className="max-w-2xl mx-auto">
              <SkillsItem
                itemNumber={4}
                title="Web Development"
                description="Building modern, responsive web applications using cutting-edge technologies and frameworks. Focus on performance, accessibility, and maintainable code architecture."
                skills={["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "API Development"]}
              />
            </div>
          </CodeExample>

          {/* Minimal Skills Example */}
          <CodeExample 
            title="Minimal Skills List"
            code={`<SkillsItem
  itemNumber={5}
  title="Consulting"
  description="Strategic consulting for digital transformation and business growth."
  skills={["Business Strategy", "Digital Transformation"]}
/>`}
          >
            <div className="max-w-2xl mx-auto">
              <SkillsItem
                itemNumber={5}
                title="Consulting"
                description="Strategic consulting for digital transformation and business growth."
                skills={["Business Strategy", "Digital Transformation"]}
              />
            </div>
          </CodeExample>

          {/* Component Properties */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>SkillsItem Properties</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-semibold text-sm mb-2">Props:</h5>
                <ul className="text-sm space-y-1 font-mono">
                  <li><strong>itemNumber:</strong> number</li>
                  <li><strong>title:</strong> string</li>
                  <li><strong>description:</strong> string</li>
                  <li><strong>skills:</strong> string[]</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-sm mb-2">Features:</h5>
                <ul className="text-sm space-y-1">
                  <li>• Numbered item with padded display (01, 02, etc.)</li>
                  <li>• Proportional two-column layout (70/30) on large screens, single column on smaller</li>
                  <li>• Spring animation on scroll into view</li>
                  <li>• Unordered list for skills with clean typography</li>
                  <li>• Responsive grid layout for optimal readability</li>
                  <li>• Semantic HTML structure for accessibility</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Animation Details */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>Animation Details</h4>
            <div className="space-y-3 text-sm">
              <div><strong>Entry Animation:</strong> Fade in from bottom with 170px Y offset</div>
              <div><strong>Blur Effect:</strong> Starts with 10px blur, animates to 0px</div>
              <div><strong>Spring Physics:</strong> Stiffness: 300, Damping: 60, Mass: 1</div>
              <div><strong>Duration:</strong> 0.8s for smooth, professional feel</div>
              <div><strong>Viewport Trigger:</strong> Animates once when entering viewport</div>
              <div><strong>Trigger Margin:</strong> -100px for early activation</div>
            </div>
          </div>

          {/* Typography Reference */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>Typography Classes Used</h4>
            <div className="space-y-2 text-sm font-mono">
              <div><strong>itemNumber:</strong> mono-16-s m:mono-16-m l:mono-16-l (black-40)</div>
              <div><strong>title:</strong> text-h6-s m:text-h6-m l:text-h6-l (black-90)</div>
              <div><strong>description:</strong> text-16-s m:text-16-m l:text-16-l (black-50)</div>
              <div><strong>skills:</strong> mono-16-s m:mono-16-m l:mono-16-l (black-90, uppercase)</div>
            </div>
          </div>

          {/* Responsive Behavior */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>Responsive Behavior</h4>
            <div className="space-y-2 text-sm">
              <div><strong>Grid Layout:</strong> Single column on S&M, 70/30 split (left/right) on L</div>
              <div><strong>Column Gap:</strong> 24px (6) gap on S&M, 32px (8) gap on L screens</div>
              <div><strong>Content Spacing:</strong> 24px (6) spacing on S&M, 32px (8) on L screens</div>
              <div><strong>Typography:</strong> Responsive text sizes across all breakpoints</div>
              <div><strong>Skills List:</strong> Vertical stack with 8px spacing between items</div>
            </div>
          </div>

          {/* Styling Details */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>Styling Details</h4>
            <div className="space-y-2 text-sm">
              <div><strong>Item Number:</strong> Zero-padded format (01, 02, 03...)</div>
              <div><strong>Skills List:</strong> Unordered list with 14px bottom padding</div>
              <div><strong>List Border:</strong> 1px bottom border with black-10 color</div>
              <div><strong>Skills Typography:</strong> Uppercase mono-16 font styling</div>
              <div><strong>Color Hierarchy:</strong> Black-90 → Black-50 → Black-40</div>
              <div><strong>Typography Weights:</strong> Bold titles, regular body text</div>
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
              <div>import ProjectItem from &apos;@/components/list_items/ProjectItem&apos;;</div>
              <div>import SkillsItem from &apos;@/components/list_items/SkillsItem&apos;;</div>
              <div>import TestimonialItem from &apos;@/components/list_items/TestimonialItem&apos;;</div>
            </div>
          </div>
          
          <div>
            <h4 className={`${TYPOGRAPHY.h5} mb-3`}>Best Practices</h4>
            <ul className={`${TYPOGRAPHY.text16} space-y-2`}>
              <li>• <strong>ProjectItem Images:</strong> Use high-quality images that work well cropped</li>
              <li>• <strong>ProjectItem Content:</strong> Keep labels short, titles compelling, descriptions concise</li>
              <li>• <strong>ProjectItem Layout:</strong> Use as full-width list items, not in grid systems</li>
              <li>• <strong>ProjectItem Links:</strong> Ensure all href props point to valid project pages</li>
              <li>• <strong>ProjectItem Spacing:</strong> Stack with space-y-0 for continuous visual flow</li>
              <li>• <strong>ProjectItem Borders:</strong> Each item has top border, add bottom border to list container</li>
              <li>• <strong>TestimonialItem Content:</strong> Keep messages concise, use professional headshots</li>
              <li>• <strong>TestimonialItem Layout:</strong> Works well in 1-3 column grids with proper spacing</li>
              <li>• <strong>TestimonialItem Credibility:</strong> Include full names and job titles for authenticity</li>
              <li>• <strong>SkillsItem Numbers:</strong> Use sequential numbering starting from 1</li>
              <li>• <strong>SkillsItem Titles:</strong> Keep titles concise and descriptive (2-4 words)</li>
              <li>• <strong>SkillsItem Descriptions:</strong> Write clear, benefit-focused descriptions (1-3 sentences)</li>
              <li>• <strong>Skills Arrays:</strong> List 3-8 relevant skills for optimal two-column layout</li>
              <li>• <strong>Skills Naming:</strong> Use consistent, professional skill names (will be uppercase)</li>
              <li>• <strong>List Spacing:</strong> Use space-y-16 l:space-y-20 between SkillsItems</li>
              <li>• <strong>Container Width:</strong> Use max-w-4xl or larger for SkillsItem two-column layout</li>
              <li>• <strong>Content Hierarchy:</strong> Maintain consistent formatting across items</li>
              <li>• <strong>Animation:</strong> ProjectItem and SkillsItem include scroll-triggered animations</li>
              <li>• <strong>Accessibility:</strong> Semantic HTML ensures screen reader compatibility</li>
            </ul>
          </div>

          <div>
            <h4 className={`${TYPOGRAPHY.h5} mb-3`}>Layout Recommendations</h4>
            <ul className={`${TYPOGRAPHY.text16} space-y-2`}>
              <li>• <strong>ProjectItem Layout:</strong> Full-width list items with two-column structure</li>
              <li>• <strong>SkillsItem Layout:</strong> 70% content, 30% skills on large screens</li>
              <li>• <strong>TestimonialItem Layout:</strong> Card-based design suitable for grid layouts</li>
              <li>• <strong>Responsive Design:</strong> All components stack appropriately on mobile</li>
              <li>• <strong>Vertical Spacing:</strong> ProjectItem uses space-y-0, others use generous spacing</li>
              <li>• <strong>Content Alignment:</strong> Left-align content for optimal readability</li>
              <li>• <strong>Section Context:</strong> Use components in appropriate page sections</li>
            </ul>
          </div>
        </div>
      </ComponentSection>
    </div>
  );
}