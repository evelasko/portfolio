import React from "react";
import ProjectCard from "@/components/cards/ProjectCard";
import ThoughtCard from "@/components/cards/ThoughtCard";
import ThoughtCardMinimal from "@/components/cards/ThoughtCardMinimal";
import { TYPOGRAPHY } from "@/lib/typography";
import { CodeExample, ComponentSection } from "../utilities";

export default function CardsComponentsDemo() {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4 space-y-16">
      {/* Page Header */}
      <header className="border-b border-gray-200 pb-8">
        <h1 className={`${TYPOGRAPHY.h1} text-black`}>Cards Showcase</h1>
        <p className={`${TYPOGRAPHY.text18} mt-4`}>
          Interactive demonstrations of the card components with various
          configurations.
        </p>
      </header>

      {/* ProjectCard Component */}
      <ComponentSection title="ProjectCard Component">
        <div className="space-y-12">
          {/* Basic Example */}
          <CodeExample
            title="Project Card Example"
            code={`<ProjectCard
  overtitle="PHOTOGRAPHY"
  title="The Photographer"
  subtitle="A Blend of Elegance and Storytelling"
  image="/assets/images/cards/card_1.jpg"
  link="/works/photographer"
/>`}
          >
            <div className="max-w-md mx-auto">
              <ProjectCard
                overtitle="PHOTOGRAPHY"
                title="The Photographer"
                subtitle="A Blend of Elegance and Storytelling"
                image="/assets/images/cards/card_1.jpg"
                link="/works/photographer"
              />
            </div>
          </CodeExample>

          {/* Multiple Cards Grid */}
          <CodeExample
            title="Multiple Project Cards Grid"
            code={`<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  <ProjectCard
    overtitle="WEB DESIGN"
    title="Portfolio Website"
    subtitle="Modern and minimalist design approach"
    image="/assets/images/cards/card_1.jpg"
    link="/works/portfolio"
  />
  <ProjectCard
    overtitle="BRANDING"
    title="Identity Design"
    subtitle="Complete brand identity solution"
    image="/assets/images/cards/card_1.jpg"
    link="/works/branding"
  />
  <ProjectCard
    overtitle="UI/UX"
    title="Mobile App"
    subtitle="User-centered design process"
    image="/assets/images/cards/card_1.jpg"
    link="/works/mobile-app"
  />
</div>`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ProjectCard
                overtitle="WEB DESIGN"
                title="Portfolio Website"
                subtitle="Modern and minimalist design approach"
                image="/assets/images/cards/card_1.jpg"
                link="/works/portfolio"
              />
              <ProjectCard
                overtitle="BRANDING"
                title="Identity Design"
                subtitle="Complete brand identity solution"
                image="/assets/images/cards/card_1.jpg"
                link="/works/branding"
              />
              <ProjectCard
                overtitle="UI/UX"
                title="Mobile App"
                subtitle="User-centered design process"
                image="/assets/images/cards/card_1.jpg"
                link="/works/mobile-app"
              />
            </div>
          </CodeExample>

          {/* Alternative Content */}
          <CodeExample
            title="Alternative Project Card"
            code={`<ProjectCard
  overtitle="DEVELOPMENT"
  title="E-commerce Platform"
  subtitle="Full-stack solution with modern technologies"
  image="/assets/images/cards/card_1.jpg"
  link="/works/ecommerce"
/>`}
          >
            <div className="max-w-md mx-auto">
              <ProjectCard
                overtitle="DEVELOPMENT"
                title="E-commerce Platform"
                subtitle="Full-stack solution with modern technologies"
                image="/assets/images/cards/card_1.jpg"
                link="/works/ecommerce"
              />
            </div>
          </CodeExample>

          {/* Component Properties */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>ProjectCard Properties</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-semibold text-sm mb-2">Props:</h5>
                <ul className="text-sm space-y-1 font-mono">
                  <li>
                    <strong>overtitle:</strong> string
                  </li>
                  <li>
                    <strong>title:</strong> string
                  </li>
                  <li>
                    <strong>subtitle:</strong> string
                  </li>
                  <li>
                    <strong>image:</strong> string
                  </li>
                  <li>
                    <strong>link:</strong> string
                  </li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-sm mb-2">Features:</h5>
                <ul className="text-sm space-y-1">
                  <li>• 4:3 aspect ratio for consistent layout</li>
                  <li>• Responsive padding (L&M: 40px, S: 20px)</li>
                  <li>• Hover animations and scaling effects</li>
                  <li>• Dark overlay for text readability</li>
                  <li>• Staggered text animations</li>
                  <li>• Optimized Next.js Image component</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Animation Details */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>Animation Details</h4>
            <div className="space-y-3 text-sm">
              <div>
                <strong>Hover Effect:</strong> Scale 1.02x with smooth easing
              </div>
              <div>
                <strong>Content Animation:</strong> Fade in from bottom with
                staggered delays
              </div>
              <div>
                <strong>Overtitle:</strong> 0.1s delay, ease-out transition
              </div>
              <div>
                <strong>Title:</strong> 0.2s delay, ease-out transition
              </div>
              <div>
                <strong>Subtitle:</strong> 0.3s delay, ease-out transition
              </div>
              <div>
                <strong>Overlay:</strong> Background opacity changes on hover
              </div>
            </div>
          </div>

          {/* Typography Reference */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>Typography Classes Used</h4>
            <div className="space-y-2 text-sm font-mono">
              <div>
                <strong>overtitle:</strong> mono-16-s m:mono-16-m l:mono-16-l
                (white-98, uppercase)
              </div>
              <div>
                <strong>title:</strong> text-h4-s m:text-h4-m l:text-h4-l
                (white-100)
              </div>
              <div>
                <strong>subtitle:</strong> text-16-s m:text-16-m l:text-16-l
                (white-98)
              </div>
            </div>
          </div>

          {/* Responsive Behavior */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>Responsive Behavior</h4>
            <div className="space-y-2 text-sm">
              <div>
                <strong>Desktop (L):</strong> 40px padding, largest text sizes
              </div>
              <div>
                <strong>Tablet (M):</strong> 40px padding, medium text sizes
              </div>
              <div>
                <strong>Mobile (S):</strong> 20px padding, smallest text sizes
              </div>
              <div>
                <strong>Images:</strong> Responsive sizes with Next.js
                optimization
              </div>
              <div>
                <strong>Layout:</strong> Maintains 4:3 aspect ratio across all
                devices
              </div>
            </div>
          </div>
        </div>
      </ComponentSection>

      {/* ThoughtCard Component */}
      <ComponentSection title="ThoughtCard Component">
        <div className="space-y-12">
          {/* Basic Example */}
          <CodeExample
            title="Thought Card Example"
            code={`<ThoughtCard
  title="Making of Stellar Odyssey"
  publishedAt="July 31, 2024"
  readingTime={2}
  image="/assets/images/thoughts/thought_1.jpg"
  link="/thoughts/stellar-odyssey"
/>`}
          >
            <div className="max-w-md mx-auto">
              <ThoughtCard
                title="Making of Stellar Odyssey"
                publishedAt="July 31, 2024"
                readingTime={2}
                image="/assets/images/thoughts/thought_1.jpg"
                link="/thoughts/stellar-odyssey"
              />
            </div>
          </CodeExample>

          {/* Multiple Cards Grid */}
          <CodeExample
            title="Multiple Thought Cards Grid"
            code={`<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  <ThoughtCard
    title="Design System Evolution"
    publishedAt="August 15, 2024"
    readingTime={5}
    image="/assets/images/thoughts/thought_1.jpg"
    link="/thoughts/design-system"
  />
  <ThoughtCard
    title="Creative Process Insights"
    publishedAt="July 28, 2024"
    readingTime={3}
    image="/assets/images/thoughts/thought_1.jpg"
    link="/thoughts/creative-process"
  />
  <ThoughtCard
    title="Future of Web Design"
    publishedAt="July 10, 2024"
    readingTime={7}
    image="/assets/images/thoughts/thought_1.jpg"
    link="/thoughts/future-web-design"
  />
</div>`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ThoughtCard
                title="Design System Evolution"
                publishedAt="August 15, 2024"
                readingTime={5}
                image="/assets/images/thoughts/thought_1.jpg"
                link="/thoughts/design-system"
              />
              <ThoughtCard
                title="Creative Process Insights"
                publishedAt="July 28, 2024"
                readingTime={3}
                image="/assets/images/thoughts/thought_1.jpg"
                link="/thoughts/creative-process"
              />
              <ThoughtCard
                title="Future of Web Design"
                publishedAt="July 10, 2024"
                readingTime={7}
                image="/assets/images/thoughts/thought_1.jpg"
                link="/thoughts/future-web-design"
              />
            </div>
          </CodeExample>

          {/* Alternative Format */}
          <CodeExample
            title="Alternative Date Format"
            code={`<ThoughtCard
  title="The Art of Minimalist Design"
  publishedAt="7/31/24"
  readingTime={4}
  image="/assets/images/thoughts/thought_1.jpg"
  link="/thoughts/minimalist-design"
/>`}
          >
            <div className="max-w-md mx-auto">
              <ThoughtCard
                title="The Art of Minimalist Design"
                publishedAt="7/31/24"
                readingTime={4}
                image="/assets/images/thoughts/thought_1.jpg"
                link="/thoughts/minimalist-design"
              />
            </div>
          </CodeExample>

          {/* Component Properties */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>ThoughtCard Properties</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-semibold text-sm mb-2">Props:</h5>
                <ul className="text-sm space-y-1 font-mono">
                  <li>
                    <strong>title:</strong> string
                  </li>
                  <li>
                    <strong>publishedAt:</strong> string
                  </li>
                  <li>
                    <strong>readingTime:</strong> number
                  </li>
                  <li>
                    <strong>image:</strong> string
                  </li>
                  <li>
                    <strong>link:</strong> string
                  </li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-sm mb-2">Features:</h5>
                <ul className="text-sm space-y-1">
                  <li>• 16:9 aspect ratio for blog-style images</li>
                  <li>• Responsive padding (L&M: 40px/20px, S: 20px/10px)</li>
                  <li>• Subtle hover animations</li>
                  <li>• Clean white background design</li>
                  <li>• Semantic HTML article structure</li>
                  <li>• Optimized Next.js Image component</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Animation Details */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>Animation Details</h4>
            <div className="space-y-3 text-sm">
              <div>
                <strong>Hover Effect:</strong> Lift up by 4px with shadow
                enhancement
              </div>
              <div>
                <strong>Image Animation:</strong> Scale 1.05x on hover with
                smooth transition
              </div>
              <div>
                <strong>Content Animation:</strong> Fade in from bottom
              </div>
              <div>
                <strong>Title:</strong> Immediate animation on scroll into view
              </div>
              <div>
                <strong>Metadata:</strong> 0.1s delay for staggered effect
              </div>
              <div>
                <strong>Card Shadow:</strong> Transitions from subtle to medium
                on hover
              </div>
            </div>
          </div>

          {/* Typography Reference */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>Typography Classes Used</h4>
            <div className="space-y-2 text-sm font-mono">
              <div>
                <strong>title:</strong> text-h6-s m:text-h6-m l:text-h6-l
                (black-80)
              </div>
              <div>
                <strong>labels:</strong> text-16-s m:text-16-m l:text-16-l
                (black-40)
              </div>
              <div>
                <strong>values:</strong> text-16-s m:text-16-m l:text-16-l
                (black-90)
              </div>
            </div>
          </div>

          {/* Responsive Behavior */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>Responsive Behavior</h4>
            <div className="space-y-2 text-sm">
              <div>
                <strong>Desktop (L):</strong> 40px horizontal, 20px vertical
                padding
              </div>
              <div>
                <strong>Tablet (M):</strong> 40px horizontal, 20px vertical
                padding
              </div>
              <div>
                <strong>Mobile (S):</strong> 20px horizontal, 10px vertical
                padding
              </div>
              <div>
                <strong>Metadata Layout:</strong> Stacked on mobile, horizontal
                on desktop
              </div>
              <div>
                <strong>Images:</strong> Maintains 16:9 aspect ratio across all
                devices
              </div>
            </div>
          </div>
        </div>
      </ComponentSection>

      {/* ThoughtCardMinimal Component */}
      <ComponentSection title="ThoughtCardMinimal Component">
        <div className="space-y-12">
          {/* Basic Example */}
          <CodeExample
            title="Minimal Thought Card Example"
            code={`<ThoughtCardMinimal
  title="Visualizing the Future: Crafting 'Last Journey to Mars'"
  publishedAt="JULY 2, 2024"
  image="/assets/images/thoughts/thought_1.jpg"
  link="/thoughts/mars-journey"
/>`}
          >
            <div className="max-w-md mx-auto">
              <ThoughtCardMinimal
                title="Visualizing the Future: Crafting 'Last Journey to Mars'"
                publishedAt="JULY 2, 2024"
                image="/assets/images/thoughts/thought_1.jpg"
                link="/thoughts/mars-journey"
              />
            </div>
          </CodeExample>

          {/* Multiple Cards Grid */}
          <CodeExample
            title="Multiple Minimal Cards Grid"
            code={`<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  <ThoughtCardMinimal
    title="The Art of Visual Storytelling"
    publishedAt="AUGUST 15, 2024"
    image="/assets/images/thoughts/thought_1.jpg"
    link="/thoughts/visual-storytelling"
  />
  <ThoughtCardMinimal
    title="Digital Renaissance in Design"
    publishedAt="JULY 28, 2024"
    image="/assets/images/thoughts/thought_1.jpg"
    link="/thoughts/digital-renaissance"
  />
  <ThoughtCardMinimal
    title="Beyond Traditional Boundaries"
    publishedAt="JULY 10, 2024"
    image="/assets/images/thoughts/thought_1.jpg"
    link="/thoughts/beyond-boundaries"
  />
</div>`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ThoughtCardMinimal
                title="The Art of Visual Storytelling"
                publishedAt="AUGUST 15, 2024"
                image="/assets/images/thoughts/thought_1.jpg"
                link="/thoughts/visual-storytelling"
              />
              <ThoughtCardMinimal
                title="Digital Renaissance in Design"
                publishedAt="JULY 28, 2024"
                image="/assets/images/thoughts/thought_1.jpg"
                link="/thoughts/digital-renaissance"
              />
              <ThoughtCardMinimal
                title="Beyond Traditional Boundaries"
                publishedAt="JULY 10, 2024"
                image="/assets/images/thoughts/thought_1.jpg"
                link="/thoughts/beyond-boundaries"
              />
            </div>
          </CodeExample>

          {/* Alternative Format */}
          <CodeExample
            title="Alternative Date Format"
            code={`<ThoughtCardMinimal
  title="Minimalism in Modern Web Design"
  publishedAt="7/31/24"
  image="/assets/images/thoughts/thought_1.jpg"
  link="/thoughts/minimalism-web"
/>`}
          >
            <div className="max-w-md mx-auto">
              <ThoughtCardMinimal
                title="Minimalism in Modern Web Design"
                publishedAt="7/31/24"
                image="/assets/images/thoughts/thought_1.jpg"
                link="/thoughts/minimalism-web"
              />
            </div>
          </CodeExample>

          {/* Component Properties */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>
              ThoughtCardMinimal Properties
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-semibold text-sm mb-2">Props:</h5>
                <ul className="text-sm space-y-1 font-mono">
                  <li>
                    <strong>title:</strong> string
                  </li>
                  <li>
                    <strong>publishedAt:</strong> string
                  </li>
                  <li>
                    <strong>image:</strong> string
                  </li>
                  <li>
                    <strong>link:</strong> string
                  </li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-sm mb-2">Features:</h5>
                <ul className="text-sm space-y-1">
                  <li>• 16:9 aspect ratio for consistent imagery</li>
                  <li>• Minimal design without card background</li>
                  <li>• Responsive padding (L&M: 40px/20px, S: 20px/10px)</li>
                  <li>• Subtle hover animations</li>
                  <li>• Clean typography hierarchy</li>
                  <li>• Optimized Next.js Image component</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Animation Details */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>Animation Details</h4>
            <div className="space-y-3 text-sm">
              <div>
                <strong>Entry Animation:</strong> Fade in from bottom with 20px
                offset
              </div>
              <div>
                <strong>Image Hover:</strong> Scale 1.05x with smooth transition
              </div>
              <div>
                <strong>Content Animation:</strong> Staggered fade in for date
                and title
              </div>
              <div>
                <strong>Date:</strong> 0.1s delay, ease-out transition
              </div>
              <div>
                <strong>Title:</strong> 0.2s delay with color change on hover
              </div>
              <div>
                <strong>Duration:</strong> 0.5-0.6s for smooth, professional
                feel
              </div>
            </div>
          </div>

          {/* Typography Reference */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>Typography Classes Used</h4>
            <div className="space-y-2 text-sm font-mono">
              <div>
                <strong>title:</strong> text-h6-s m:text-h6-m l:text-h6-l
                (black-80)
              </div>
              <div>
                <strong>publishedAt:</strong> text-16-s m:text-16-m l:text-16-l
                (black-40, uppercase)
              </div>
            </div>
          </div>

          {/* Responsive Behavior */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>Responsive Behavior</h4>
            <div className="space-y-2 text-sm">
              <div>
                <strong>Desktop (L):</strong> 40px horizontal, 20px vertical
                padding
              </div>
              <div>
                <strong>Tablet (M):</strong> 40px horizontal, 20px vertical
                padding
              </div>
              <div>
                <strong>Mobile (S):</strong> 20px horizontal, 10px vertical
                padding
              </div>
              <div>
                <strong>Layout:</strong> Maintains vertical stack across all
                devices
              </div>
              <div>
                <strong>Images:</strong> Maintains 16:9 aspect ratio with
                rounded corners
              </div>
            </div>
          </div>

          {/* Design Comparison */}
          <div className="bg-yellow-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>vs. Regular ThoughtCard</h4>
            <div className="space-y-2 text-sm">
              <div>
                <strong>Background:</strong> No card background vs. white card
                background
              </div>
              <div>
                <strong>Content:</strong> Only date and title vs. date, title,
                and reading time
              </div>
              <div>
                <strong>Labels:</strong> No &quot;Published&quot; label vs.
                explicit labels
              </div>
              <div>
                <strong>Layout:</strong> Simpler, more minimal approach
              </div>
              <div>
                <strong>Use Case:</strong> Better for galleries and minimalist
                layouts
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
                import ProjectCard from
                &apos;@/components/cards/ProjectCard&apos;;
              </div>
              <div>
                import ThoughtCard from
                &apos;@/components/cards/ThoughtCard&apos;;
              </div>
              <div>
                import ThoughtCardMinimal from
                &apos;@/components/cards/ThoughtCardMinimal&apos;;
              </div>
            </div>
          </div>

          <div>
            <h4 className={`${TYPOGRAPHY.h5} mb-3`}>Best Practices</h4>
            <ul className={`${TYPOGRAPHY.text16} space-y-2`}>
              <li>
                • <strong>ProjectCard Images:</strong> Use high-quality images
                with 4:3 aspect ratio for best results
              </li>
              <li>
                • <strong>ThoughtCard Images:</strong> Use 16:9 aspect ratio
                images for blog-style layout
              </li>
              <li>
                • <strong>ProjectCard Content:</strong> Keep overtitle short,
                title compelling, subtitle descriptive
              </li>
              <li>
                • <strong>ThoughtCard Content:</strong> Use clear titles and
                consistent date formatting
              </li>
              <li>
                • <strong>ThoughtCardMinimal:</strong> Perfect for gallery
                layouts and minimal design approaches
              </li>
              <li>
                • <strong>Reading Time:</strong> Calculate accurately for better
                user expectations
              </li>
              <li>
                • <strong>Links:</strong> Ensure all href props point to valid
                project/article pages
              </li>
              <li>
                • <strong>Grid Layout:</strong> Use CSS Grid or Flexbox for
                responsive card grids
              </li>
              <li>
                • <strong>Content:</strong> Keep text concise as space is
                limited on smaller screens
              </li>
              <li>
                • <strong>Accessibility:</strong> Images include proper alt text
                for screen readers
              </li>
              <li>
                • <strong>Consistency:</strong> Use consistent date formats
                across all cards
              </li>
            </ul>
          </div>
        </div>
      </ComponentSection>
    </div>
  );
}
