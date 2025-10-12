import React from 'react';
import ContentHeadingBlock from '@/components/content_blocks/ContentHeadingBlock';
import InfoTextBlock from '@/components/content_blocks/InfoTextBlock';
import InfoImageBlock from '@/components/content_blocks/InfoImageBlock';
import InfoSimpleBlock from '@/components/content_blocks/InfoSimpleBlock';
import { TYPOGRAPHY } from '@/lib/typography';

export default function ContentBlocksDemo() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto py-12 px-4">
          <header>
            <h1 className={`${TYPOGRAPHY.h1} text-black`}>Content Blocks Showcase</h1>
            <p className={`${TYPOGRAPHY.text18} mt-4`}>
              Interactive demonstration of content block components with scroll-triggered animations.
            </p>
          </header>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-12 px-4 space-y-16">
        
        {/* ContentHeadingBlock Example - Reference Data */}
        <section>
          <div className="mb-8">
            <h2 className={`${TYPOGRAPHY.h2} text-black mb-4`}>ContentHeadingBlock - Photography Portfolio</h2>
            <p className={`${TYPOGRAPHY.text16} text-gray-600 mb-6`}>
              Example using the reference data from Oliver Hayes photography portfolio with all animation features.
            </p>
            
            {/* Code Example */}
            <div className="bg-gray-900 p-4 rounded-lg mb-6">
              <pre className="text-green-400 text-sm overflow-x-auto">
{`<ContentHeadingBlock
  overtitle="OLIVER HAYES"
  title="The Photographer"
  subtitle="A Blend of Elegance and Storytelling"
  date="SEPTEMBER 2024"
  quote="— In the digital age, a strong online presence is essential. Our studio crafted a portfolio website for photographer Oliver Hayes, showcasing his work and artistic vision in a seamless, functional design."
  list_label="SERVICES"
  list_items={["CONTENT STRATEGY", "UI/UX", "FRAMER DEVELOPMENT"]}
/>`}
              </pre>
            </div>
          </div>

          {/* Demo */}
          <div className="bg-white p-8 l:p-12 rounded-lg border border-gray-200">
            <ContentHeadingBlock
              overtitle="OLIVER HAYES"
              title="The Photographer"
              subtitle="A Blend of Elegance and Storytelling"
              date="SEPTEMBER 2024"
              quote="— In the digital age, a strong online presence is essential. Our studio crafted a portfolio website for photographer Oliver Hayes, showcasing his work and artistic vision in a seamless, functional design."
              list_label="SERVICES"
              list_items={["CONTENT STRATEGY", "UI/UX", "FRAMER DEVELOPMENT"]}
            />
          </div>
        </section>

        {/* Alternative Example - Design Studio */}
        <section>
          <div className="mb-8">
            <h2 className={`${TYPOGRAPHY.h2} text-black mb-4`}>ContentHeadingBlock - Design Studio</h2>
            <p className={`${TYPOGRAPHY.text16} text-gray-600 mb-6`}>
              Alternative example for a design studio project with different content.
            </p>
            
            {/* Code Example */}
            <div className="bg-gray-900 p-4 rounded-lg mb-6">
              <pre className="text-green-400 text-sm overflow-x-auto">
{`<ContentHeadingBlock
  overtitle="CREATIVE STUDIO"
  title="Brand Revolution"
  subtitle="Transforming Vision into Visual Identity"
  date="JANUARY 2024"
  quote="— Every great brand starts with a story. We partnered with emerging businesses to create compelling visual identities that resonate with their audience and drive meaningful connections."
  list_label="EXPERTISE"
  list_items={["BRAND STRATEGY", "VISUAL DESIGN", "DIGITAL MARKETING", "MOTION GRAPHICS"]}
/>`}
              </pre>
            </div>
          </div>

          {/* Demo */}
          <div className="bg-white p-8 l:p-12 rounded-lg border border-gray-200">
            <ContentHeadingBlock
              overtitle="CREATIVE STUDIO"
              title="Brand Revolution"
              subtitle="Transforming Vision into Visual Identity"
              date="JANUARY 2024"
              quote="— Every great brand starts with a story. We partnered with emerging businesses to create compelling visual identities that resonate with their audience and drive meaningful connections."
              list_label="EXPERTISE"
              list_items={["BRAND STRATEGY", "VISUAL DESIGN", "DIGITAL MARKETING", "MOTION GRAPHICS"]}
            />
          </div>
        </section>

        {/* Tech Project Example */}
        <section>
          <div className="mb-8">
            <h2 className={`${TYPOGRAPHY.h2} text-black mb-4`}>ContentHeadingBlock - Tech Project</h2>
            <p className={`${TYPOGRAPHY.text16} text-gray-600 mb-6`}>
              Example for a technology project showcasing different types of content.
            </p>
            
            {/* Code Example */}
            <div className="bg-gray-900 p-4 rounded-lg mb-6">
              <pre className="text-green-400 text-sm overflow-x-auto">
{`<ContentHeadingBlock
  overtitle="INNOVATION LAB"
  title="AI Platform Launch"
  subtitle="Next-Generation Machine Learning Solutions"
  date="MARCH 2024"
  quote="— Artificial intelligence is reshaping industries. Our team developed a comprehensive AI platform that empowers businesses to leverage machine learning without technical complexity."
  list_label="TECHNOLOGIES"
  list_items={["MACHINE LEARNING", "CLOUD COMPUTING", "API DEVELOPMENT", "DATA ANALYTICS"]}
/>`}
              </pre>
            </div>
          </div>

          {/* Demo */}
          <div className="bg-white p-8 l:p-12 rounded-lg border border-gray-200">
            <ContentHeadingBlock
              overtitle="INNOVATION LAB"
              title="AI Platform Launch"
              subtitle="Next-Generation Machine Learning Solutions"
              date="MARCH 2024"
              quote="— Artificial intelligence is reshaping industries. Our team developed a comprehensive AI platform that empowers businesses to leverage machine learning without technical complexity."
              list_label="TECHNOLOGIES"
              list_items={["MACHINE LEARNING", "CLOUD COMPUTING", "API DEVELOPMENT", "DATA ANALYTICS"]}
            />
          </div>
        </section>

        {/* InfoTextBlock Example - Reference Data */}
        <section>
          <div className="mb-8">
            <h2 className={`${TYPOGRAPHY.h2} text-black mb-4`}>InfoTextBlock - Achievements Section</h2>
            <p className={`${TYPOGRAPHY.text16} text-gray-600 mb-6`}>
              Example using the reference data from the achievements section with testimonial and info text layout.
            </p>
            
            {/* Code Example */}
            <div className="bg-gray-900 p-4 rounded-lg mb-6">
              <pre className="text-green-400 text-sm overflow-x-auto">
{`<InfoTextBlock
  heading="ACHIEVEMENTS"
  subheading="Collaborating with Mark Ashton and his team was a seamless experience. Their expertise in web design beautifully showcased Oliver Hayes' photography, creating a stunning and intuitive portfolio that perfectly reflects his artistic vision."
  info_text="The website project achieved a visually captivating online presence, enhanced user engagement through intuitive navigation, implemented a fully responsive design for optimal performance across devices, effectively reinforced the studio's brand identity, and garnered positive feedback for showcasing Oliver Hayes' work and attracting potential clients."
  quote="The portfolio successfully enhanced the studio's online presence, increased user engagement with intuitive navigation, ensured optimal performance with a responsive design, reinforced brand identity, and received positive feedback for effectively showcasing Oliver Hayes' work."
  quote_author="— Sarah Mitchell, Creative Director at Lumina Creative"
/>`}
              </pre>
            </div>
          </div>

          {/* Demo */}
          <div className="bg-white p-8 l:p-12 rounded-lg border border-gray-200">
            <InfoTextBlock
              heading="ACHIEVEMENTS"
              subheading="Collaborating with Mark Ashton and his team was a seamless experience. Their expertise in web design beautifully showcased Oliver Hayes' photography, creating a stunning and intuitive portfolio that perfectly reflects his artistic vision."
              info_text="The website project achieved a visually captivating online presence, enhanced user engagement through intuitive navigation, implemented a fully responsive design for optimal performance across devices, effectively reinforced the studio's brand identity, and garnered positive feedback for showcasing Oliver Hayes' work and attracting potential clients."
              quote="The portfolio successfully enhanced the studio's online presence, increased user engagement with intuitive navigation, ensured optimal performance with a responsive design, reinforced brand identity, and received positive feedback for effectively showcasing Oliver Hayes' work."
              quote_author="— Sarah Mitchell, Creative Director at Lumina Creative"
            />
          </div>
        </section>

        {/* Alternative InfoTextBlock Example */}
        <section>
          <div className="mb-8">
            <h2 className={`${TYPOGRAPHY.h2} text-black mb-4`}>InfoTextBlock - Project Results</h2>
            <p className={`${TYPOGRAPHY.text16} text-gray-600 mb-6`}>
              Alternative example for project results with different content structure.
            </p>
            
            {/* Code Example */}
            <div className="bg-gray-900 p-4 rounded-lg mb-6">
              <pre className="text-green-400 text-sm overflow-x-auto">
{`<InfoTextBlock
  heading="PROJECT RESULTS"
  subheading="Working with the design team exceeded our expectations. The new brand identity perfectly captures our vision and has significantly improved our market presence."
  info_text="The comprehensive rebranding initiative resulted in a 40% increase in brand recognition, improved customer engagement across all digital platforms, streamlined visual communication, and positioned the company as a leader in sustainable innovation."
  quote="The project delivered measurable results that transformed our brand perception and market position, establishing a strong foundation for future growth."
  quote_author="— Michael Chen, CEO at GreenTech Solutions"
/>`}
              </pre>
            </div>
          </div>

          {/* Demo */}
          <div className="bg-white p-8 l:p-12 rounded-lg border border-gray-200">
            <InfoTextBlock
              heading="PROJECT RESULTS"
              subheading="Working with the design team exceeded our expectations. The new brand identity perfectly captures our vision and has significantly improved our market presence."
              info_text="The comprehensive rebranding initiative resulted in a 40% increase in brand recognition, improved customer engagement across all digital platforms, streamlined visual communication, and positioned the company as a leader in sustainable innovation."
              quote="The project delivered measurable results that transformed our brand perception and market position, establishing a strong foundation for future growth."
              quote_author="— Michael Chen, CEO at GreenTech Solutions"
            />
          </div>
        </section>

        {/* InfoImageBlock Example - Approach Section */}
        <section>
          <div className="mb-8">
            <h2 className={`${TYPOGRAPHY.h2} text-black mb-4`}>InfoImageBlock - Approach Section</h2>
            <p className={`${TYPOGRAPHY.text16} text-gray-600 mb-6`}>
              Example using the reference data from the approach section with image and content layout.
            </p>
            
            {/* Code Example */}
            <div className="bg-gray-900 p-4 rounded-lg mb-6">
              <pre className="text-green-400 text-sm overflow-x-auto">
{`<InfoImageBlock
  heading="APPROACH"
  image_path="/assets/images/photos/photo_1.jpg"
  image_caption="Fashion shooting in the studio"
  info_text="We adopted a user-centric design methodology, which involved extensive research, iterative design processes, and close collaboration with Oliver to ensure the final product aligned with his vision. From initial concept development to the final launch, our focus remained on creating a platform that not only showcases his work beautifully but also enhances user engagement and brand identity."
  quote="The design process began with a comprehensive discovery phase, where we analyzed the competitive landscape and gathered insights into the target audience's preferences and behaviors. This informed the creation of detailed wireframes and prototypes, which were iteratively refined based on feedback from Oliver and usability testing sessions."
/>`}
              </pre>
            </div>
          </div>

          {/* Demo */}
          <div className="bg-white p-8 l:p-12 rounded-lg border border-gray-200">
            <InfoImageBlock
              heading="APPROACH"
              image_path="/assets/images/photos/photo_1.jpg"
              image_caption="Fashion shooting in the studio"
              info_text="We adopted a user-centric design methodology, which involved extensive research, iterative design processes, and close collaboration with Oliver to ensure the final product aligned with his vision. From initial concept development to the final launch, our focus remained on creating a platform that not only showcases his work beautifully but also enhances user engagement and brand identity."
              quote="The design process began with a comprehensive discovery phase, where we analyzed the competitive landscape and gathered insights into the target audience's preferences and behaviors. This informed the creation of detailed wireframes and prototypes, which were iteratively refined based on feedback from Oliver and usability testing sessions."
            />
          </div>
        </section>

        {/* Alternative InfoImageBlock Example */}
        <section>
          <div className="mb-8">
            <h2 className={`${TYPOGRAPHY.h2} text-black mb-4`}>InfoImageBlock - Creative Process</h2>
            <p className={`${TYPOGRAPHY.text16} text-gray-600 mb-6`}>
              Alternative example for creative process documentation with different content structure.
            </p>
            
            {/* Code Example */}
            <div className="bg-gray-900 p-4 rounded-lg mb-6">
              <pre className="text-green-400 text-sm overflow-x-auto">
{`<InfoImageBlock
  heading="PROCESS"
  image_path="/assets/images/cards/card_1.jpg"
  image_caption="Collaborative design workshop"
  info_text="Our creative process emphasizes collaboration and iteration. We begin with comprehensive research and discovery, followed by ideation sessions that bring together diverse perspectives. Through rapid prototyping and continuous feedback loops, we ensure that every design decision is informed by user insights and business objectives."
  quote="The workshop sessions were instrumental in aligning stakeholder vision and identifying key user pain points. This collaborative approach ensured that the final solution addressed real needs while maintaining aesthetic excellence and technical feasibility."
/>`}
              </pre>
            </div>
          </div>

          {/* Demo */}
          <div className="bg-white p-8 l:p-12 rounded-lg border border-gray-200">
            <InfoImageBlock
              heading="PROCESS"
              image_path="/assets/images/cards/card_1.jpg"
              image_caption="Collaborative design workshop"
              info_text="Our creative process emphasizes collaboration and iteration. We begin with comprehensive research and discovery, followed by ideation sessions that bring together diverse perspectives. Through rapid prototyping and continuous feedback loops, we ensure that every design decision is informed by user insights and business objectives."
              quote="The workshop sessions were instrumental in aligning stakeholder vision and identifying key user pain points. This collaborative approach ensured that the final solution addressed real needs while maintaining aesthetic excellence and technical feasibility."
            />
          </div>
        </section>

        {/* InfoSimpleBlock Example - Process Section */}
        <section>
          <div className="mb-8">
            <h2 className={`${TYPOGRAPHY.h2} text-black mb-4`}>InfoSimpleBlock - Process Section</h2>
            <p className={`${TYPOGRAPHY.text16} text-gray-600 mb-6`}>
              Example using the reference data from the process section with simple two-column text layout.
            </p>
            
            {/* Code Example */}
            <div className="bg-gray-900 p-4 rounded-lg mb-6">
              <pre className="text-green-400 text-sm overflow-x-auto">
{`<InfoSimpleBlock
  heading="PROCESS"
  subheading="By leveraging a combination of design thinking, agile methodologies, and collaborative feedback loops, we ensured that each stage of development was aligned with Oliver's artistic vision and business objectives."
  info_text="The project process began with a discovery phase to understand Oliver's goals, followed by wireframe and mockup development to shape the website's design. Incorporating Oliver feedback, we then moved into development, focusing on a responsive and visually appealing site. Rigorous testing ensured functionality across devices, culminating in a successful launch and a handover session for future site management."
/>`}
              </pre>
            </div>
          </div>

          {/* Demo */}
          <div className="bg-white p-8 l:p-12 rounded-lg border border-gray-200">
            <InfoSimpleBlock
              heading="PROCESS"
              subheading="By leveraging a combination of design thinking, agile methodologies, and collaborative feedback loops, we ensured that each stage of development was aligned with Oliver's artistic vision and business objectives."
              info_text="The project process began with a discovery phase to understand Oliver's goals, followed by wireframe and mockup development to shape the website's design. Incorporating Oliver feedback, we then moved into development, focusing on a responsive and visually appealing site. Rigorous testing ensured functionality across devices, culminating in a successful launch and a handover session for future site management."
            />
          </div>
        </section>

        {/* Alternative InfoSimpleBlock Example */}
        <section>
          <div className="mb-8">
            <h2 className={`${TYPOGRAPHY.h2} text-black mb-4`}>InfoSimpleBlock - Methodology</h2>
            <p className={`${TYPOGRAPHY.text16} text-gray-600 mb-6`}>
              Alternative example for methodology documentation with different content structure.
            </p>
            
            {/* Code Example */}
            <div className="bg-gray-900 p-4 rounded-lg mb-6">
              <pre className="text-green-400 text-sm overflow-x-auto">
{`<InfoSimpleBlock
  heading="METHODOLOGY"
  subheading="Our approach centers on human-centered design principles, ensuring that every decision is informed by user research and validated through iterative testing and refinement cycles."
  info_text="We begin each project with comprehensive stakeholder interviews and competitive analysis to establish a solid foundation. This research phase informs our design strategy, which emphasizes accessibility, usability, and aesthetic excellence. Throughout the development process, we maintain close collaboration with clients, incorporating feedback at every milestone to ensure the final product exceeds expectations and delivers measurable business value."
/>`}
              </pre>
            </div>
          </div>

          {/* Demo */}
          <div className="bg-white p-8 l:p-12 rounded-lg border border-gray-200">
            <InfoSimpleBlock
              heading="METHODOLOGY"
              subheading="Our approach centers on human-centered design principles, ensuring that every decision is informed by user research and validated through iterative testing and refinement cycles."
              info_text="We begin each project with comprehensive stakeholder interviews and competitive analysis to establish a solid foundation. This research phase informs our design strategy, which emphasizes accessibility, usability, and aesthetic excellence. Throughout the development process, we maintain close collaboration with clients, incorporating feedback at every milestone to ensure the final product exceeds expectations and delivers measurable business value."
            />
          </div>
        </section>

        {/* Component Documentation */}
        <section className="space-y-8">
          <h2 className={`${TYPOGRAPHY.h2} text-black`}>Component Documentation</h2>

          {/* ContentHeadingBlock Properties */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>ContentHeadingBlock Properties</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-semibold text-sm mb-3">Props:</h5>
                <ul className="text-sm space-y-2 font-mono">
                  <li><strong>overtitle:</strong> string</li>
                  <li><strong>title:</strong> string</li>
                  <li><strong>subtitle:</strong> string</li>
                  <li><strong>date:</strong> string</li>
                  <li><strong>quote:</strong> string</li>
                  <li><strong>list_label:</strong> string</li>
                  <li><strong>list_items:</strong> string[]</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-sm mb-3">Features:</h5>
                <ul className="text-sm space-y-2">
                  <li>• Sophisticated scroll-triggered animations</li>
                  <li>• Per-word fade animations with spring physics</li>
                  <li>• Per-character Y-rotation for title</li>
                  <li>• Staggered animation delays</li>
                  <li>• Responsive typography system</li>
                  <li>• Semantic HTML structure</li>
                  <li>• Maximum width constraints for readability</li>
                  <li>• Custom animation timing and easing</li>
                </ul>
              </div>
            </div>
          </div>

          {/* InfoTextBlock Properties */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>InfoTextBlock Properties</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-semibold text-sm mb-3">Props:</h5>
                <ul className="text-sm space-y-2 font-mono">
                  <li><strong>heading:</strong> string</li>
                  <li><strong>subheading:</strong> string</li>
                  <li><strong>info_text:</strong> string</li>
                  <li><strong>quote:</strong> string</li>
                  <li><strong>quote_author:</strong> string</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-sm mb-3">Features:</h5>
                <ul className="text-sm space-y-2">
                  <li>• Responsive two-column layout</li>
                  <li>• Scroll-triggered animations with spring physics</li>
                  <li>• Testimonial quote with author attribution</li>
                  <li>• Highlighted quote block with visual styling</li>
                  <li>• Heading with bottom border</li>
                  <li>• Staggered animation delays</li>
                  <li>• Semantic HTML structure</li>
                  <li>• Mobile-first responsive design</li>
                </ul>
              </div>
            </div>
          </div>

          {/* ContentHeadingBlock Typography Reference */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>ContentHeadingBlock Typography Classes</h4>
            <div className="space-y-2 text-sm font-mono">
              <div><strong>overtitle:</strong> mono-24-s m:mono-24-m l:mono-24-l (black-40, uppercase)</div>
              <div><strong>title:</strong> text-h1-s m:text-h1-m l:text-h1-l (black-90)</div>
              <div><strong>subtitle:</strong> text-h9-s m:text-h9-m l:text-h9-l (black-50)</div>
              <div><strong>date:</strong> mono-24-s m:mono-24-m l:mono-24-l (black-40, uppercase)</div>
              <div><strong>quote:</strong> text-h6-s m:text-h6-m l:text-h6-l (black-80)</div>
              <div><strong>list_label:</strong> mono-16-s m:mono-16-m l:mono-16-l (black-40, uppercase)</div>
              <div><strong>list_items:</strong> mono-16-s m:mono-16-m l:mono-16-l (black-60, uppercase)</div>
            </div>
          </div>

          {/* InfoTextBlock Typography Reference */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>InfoTextBlock Typography Classes</h4>
            <div className="space-y-2 text-sm font-mono">
              <div><strong>heading:</strong> mono-20-s m:mono-20-m l:mono-20-l (black-90, uppercase)</div>
              <div><strong>subheading:</strong> text-20-s m:text-20-m l:text-20-l (black-50, italic)</div>
              <div><strong>info_text:</strong> text-h9-s m:text-h9-m l:text-h9-l (black-80)</div>
              <div><strong>quote:</strong> text-h6-s m:text-h6-m l:text-h6-l (black-80, font-bold, tracking-[-0.03em])</div>
              <div><strong>quote_author:</strong> text-18-s m:text-18-m l:text-18-l (black-50)</div>
            </div>
          </div>

          {/* InfoImageBlock Properties */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>InfoImageBlock Properties</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-semibold text-sm mb-3">Props:</h5>
                <ul className="text-sm space-y-2 font-mono">
                  <li><strong>heading:</strong> string</li>
                  <li><strong>image_path:</strong> string</li>
                  <li><strong>image_caption:</strong> string</li>
                  <li><strong>info_text:</strong> string</li>
                  <li><strong>quote:</strong> string</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-sm mb-3">Features:</h5>
                <ul className="text-sm space-y-2">
                  <li>• Responsive two-column layout</li>
                  <li>• Scroll-triggered animations with spring physics</li>
                  <li>• Responsive image with aspect ratio preservation</li>
                  <li>• Image caption with italic styling</li>
                  <li>• Heading with bottom border in left column</li>
                  <li>• Highlighted quote block with visual styling</li>
                  <li>• Staggered animation delays</li>
                  <li>• Semantic HTML structure</li>
                </ul>
              </div>
            </div>
          </div>

          {/* InfoImageBlock Typography Reference */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>InfoImageBlock Typography Classes</h4>
            <div className="space-y-2 text-sm font-mono">
              <div><strong>heading:</strong> mono-20-s m:mono-20-m l:mono-20-l (black-90, uppercase)</div>
              <div><strong>image_caption:</strong> text-16-s m:text-16-m l:text-16-l (black-50, italic)</div>
              <div><strong>info_text:</strong> text-h9-s m:text-h9-m l:text-h9-l (black-80)</div>
              <div><strong>quote:</strong> text-18-s m:text-18-m l:text-18-l (black-50, tracking-[-0.03em])</div>
            </div>
          </div>

          {/* InfoSimpleBlock Properties */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>InfoSimpleBlock Properties</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-semibold text-sm mb-3">Props:</h5>
                <ul className="text-sm space-y-2 font-mono">
                  <li><strong>heading:</strong> string</li>
                  <li><strong>subheading:</strong> string</li>
                  <li><strong>info_text:</strong> string</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-sm mb-3">Features:</h5>
                <ul className="text-sm space-y-2">
                  <li>• Clean two-column layout</li>
                  <li>• Scroll-triggered animations with spring physics</li>
                  <li>• Simplified content structure</li>
                  <li>• Heading with bottom border in left column</li>
                  <li>• Responsive typography system</li>
                  <li>• Staggered animation delays</li>
                  <li>• Semantic HTML structure</li>
                  <li>• Mobile-first responsive design</li>
                </ul>
              </div>
            </div>
          </div>

          {/* InfoSimpleBlock Typography Reference */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>InfoSimpleBlock Typography Classes</h4>
            <div className="space-y-2 text-sm font-mono">
              <div><strong>heading:</strong> mono-20-s m:mono-20-m l:mono-20-l (black-90, uppercase)</div>
              <div><strong>subheading:</strong> text-18-s m:text-18-m l:text-18-l (black-50)</div>
              <div><strong>info_text:</strong> text-h9-s m:text-h9-m l:text-h9-l (black-80)</div>
            </div>
          </div>

          {/* Animation Details */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className={`${TYPOGRAPHY.h5} mb-4`}>Animation System</h4>
            <div className="space-y-4">
              <div>
                <h5 className="font-semibold text-sm mb-2">Animation Sequence:</h5>
                <ul className="text-sm space-y-2">
                  <li><strong>Overtitle (0s):</strong> Per-word fade from bottom, Y offset 30px, spring physics</li>
                  <li><strong>Title (0.2s delay):</strong> Per-character Y-rotation from 90°, cubic-bezier easing</li>
                  <li><strong>Subtitle (0.3s delay):</strong> Per-word fade from bottom, spring physics</li>
                  <li><strong>Date (0.4s delay):</strong> Same animation as subtitle</li>
                  <li><strong>Quote (0.4s delay):</strong> Same animation as subtitle</li>
                  <li><strong>Services (0.6s-0.7s):</strong> Staggered fade-up animation</li>
                </ul>
              </div>
              
              <div>
                <h5 className="font-semibold text-sm mb-2">Animation Physics:</h5>
                <ul className="text-sm space-y-2">
                  <li><strong>Spring Duration:</strong> 1 second for natural motion</li>
                  <li><strong>Character Rotation:</strong> 0.6s with cubic-bezier(0.44, 0, 0.56, 1)</li>
                  <li><strong>Stagger Delays:</strong> 0.03s between words, 0.02s between characters</li>
                  <li><strong>Viewport Trigger:</strong> -100px margin for early activation</li>
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
                  <div>import ContentHeadingBlock from &apos;@/components/content_blocks/ContentHeadingBlock&apos;;</div>
                  <div>import InfoTextBlock from &apos;@/components/content_blocks/InfoTextBlock&apos;;</div>
                  <div>import InfoImageBlock from &apos;@/components/content_blocks/InfoImageBlock&apos;;</div>
                  <div>import InfoSimpleBlock from &apos;@/components/content_blocks/InfoSimpleBlock&apos;;</div>
                </div>
              </div>
              
              <div>
                <h5 className="font-semibold text-sm mb-2">Best Practices:</h5>
                <ul className={`${TYPOGRAPHY.text16} space-y-2`}>
                  <li>• <strong>ContentHeadingBlock Overtitle:</strong> Use short, identifying text (person, company, or category name)</li>
                  <li>• <strong>ContentHeadingBlock Title:</strong> Keep concise for optimal character animation effect</li>
                  <li>• <strong>ContentHeadingBlock Date:</strong> Use consistent date formatting (MONTH YEAR)</li>
                  <li>• <strong>ContentHeadingBlock Quote:</strong> Start with em dash (—) for visual consistency</li>
                  <li>• <strong>InfoTextBlock Heading:</strong> Use section identifiers (ACHIEVEMENTS, RESULTS, etc.)</li>
                  <li>• <strong>InfoTextBlock Subheading:</strong> Use as testimonial quote with quotation marks</li>
                  <li>• <strong>InfoImageBlock Heading:</strong> Use process identifiers (APPROACH, PROCESS, METHOD, etc.)</li>
                  <li>• <strong>InfoImageBlock Images:</strong> Use high-quality images with 4:3 aspect ratio for best display</li>
                  <li>• <strong>InfoSimpleBlock Heading:</strong> Use methodology identifiers (PROCESS, METHODOLOGY, STRATEGY, etc.)</li>
                  <li>• <strong>InfoSimpleBlock Subheading:</strong> Provide overview or approach summary in left column</li>
                  <li>• <strong>Content Balance:</strong> Keep left and right column content proportionally balanced</li>
                  <li>• <strong>Text Hierarchy:</strong> Use proper typography contrast between headings and body text</li>
                  <li>• <strong>Responsive Layout:</strong> All components adapt gracefully to all screen sizes</li>
                  <li>• <strong>Animation Sequence:</strong> Consider scroll position for optimal animation viewing</li>
                </ul>
              </div>

              <div>
                <h5 className="font-semibold text-sm mb-2">Performance Notes:</h5>
                <ul className={`${TYPOGRAPHY.text16} space-y-2`}>
                  <li>• <strong>Animation Complexity:</strong> High due to per-character/word animations</li>
                  <li>• <strong>Mobile Optimization:</strong> Consider reduced animations on smaller screens</li>
                  <li>• <strong>Text Length:</strong> Longer titles may impact animation performance</li>
                  <li>• <strong>Viewport Settings:</strong> Animations trigger once when entering viewport</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}