import React from 'react';
import SkillsItem from '@/components/list_items/SkillsItem';
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
            <h4 className={`${TYPOGRAPHY.h5} mb-3`}>Import Component</h4>
            <div className="bg-gray-900 p-4 rounded font-mono text-sm text-green-400">
              <div>import SkillsItem from &apos;@/components/list_items/SkillsItem&apos;;</div>
            </div>
          </div>
          
          <div>
            <h4 className={`${TYPOGRAPHY.h5} mb-3`}>Best Practices</h4>
            <ul className={`${TYPOGRAPHY.text16} space-y-2`}>
              <li>• <strong>Item Numbers:</strong> Use sequential numbering starting from 1</li>
              <li>• <strong>Title Length:</strong> Keep titles concise and descriptive (2-4 words)</li>
              <li>• <strong>Description:</strong> Write clear, benefit-focused descriptions (1-3 sentences)</li>
              <li>• <strong>Skills Array:</strong> List 3-8 relevant skills for optimal two-column layout</li>
              <li>• <strong>Skills Naming:</strong> Use consistent, professional skill names (will be uppercase)</li>
              <li>• <strong>List Spacing:</strong> Use space-y-16 l:space-y-20 between items</li>
              <li>• <strong>Container Width:</strong> Use max-w-4xl or larger for two-column layout</li>
              <li>• <strong>Content Hierarchy:</strong> Maintain consistent formatting across items</li>
              <li>• <strong>Animation:</strong> Component includes scroll-triggered animations</li>
              <li>• <strong>Accessibility:</strong> Semantic HTML ensures screen reader compatibility</li>
            </ul>
          </div>

          <div>
            <h4 className={`${TYPOGRAPHY.h5} mb-3`}>Layout Recommendations</h4>
            <ul className={`${TYPOGRAPHY.text16} space-y-2`}>
              <li>• <strong>Two-Column Layout:</strong> Left column for content, right for skills on large screens</li>
              <li>• <strong>Responsive Design:</strong> Automatically stacks to single column on smaller screens</li>
              <li>• <strong>Proportional Columns:</strong> 70% left content, 30% right skills on large screens</li>
              <li>• <strong>Vertical Spacing:</strong> Allow generous space between items</li>
              <li>• <strong>Content Alignment:</strong> Left-align all content for readability</li>
              <li>• <strong>Section Context:</strong> Use within expertise or skills sections</li>
            </ul>
          </div>
        </div>
      </ComponentSection>
    </div>
  );
}