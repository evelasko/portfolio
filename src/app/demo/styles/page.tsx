import React from 'react';
import { TYPOGRAPHY } from '@/lib/typography';
import clsx from 'clsx';

function HeadingBanner({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-orange-600 p-4 rounded mt-6 mb-6">
      {children}
    </div>
  )
}

export default function StyleGuideDemo() {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4 space-y-16">
      {/* Page Title */}
      <header className="border-b border-gray-200 pb-8">
        <h1 className={`${TYPOGRAPHY.h1} text-black`}>Complete Typography System</h1>
        <p className={`${TYPOGRAPHY.text18} mt-4`}>
          Comprehensive showcase of all typography classes with simplified constants and responsive sizing.
        </p>
      </header>

      {/* Heading Styles */}
      <section>
       <HeadingBanner>
        <h2 className={clsx(TYPOGRAPHY.h2, 'text-white-100 m-0 p-0')}>Heading Styles (H1-H9)</h2>
       </HeadingBanner>

        <div className="space-y-8">
          <div>
            <h1 className={`${TYPOGRAPHY.h1} text-black`}>H1 Heading</h1>
            <div className="bg-gray-50 p-4 rounded mt-3">
              <p className="text-sm font-mono text-gray-700 mb-2">
                <strong>Constant:</strong> <code className="bg-white px-2 py-1 rounded">TYPOGRAPHY.h1</code>
              </p>
              <p className="text-sm font-mono text-gray-700 mb-2">
                <strong>Classes:</strong> <code className="bg-white px-2 py-1 rounded">{TYPOGRAPHY.h1}</code>
              </p>
              <p className="text-sm text-gray-600">
                <strong>Properties:</strong> Extrabold, White-100, 1em line-height, -0.05em letter-spacing, 40px margin-bottom
              </p>
            </div>
          </div>
          
          <div>
            <h2 className={TYPOGRAPHY.h2}>H2 Heading</h2>
            <div className="bg-gray-50 p-4 rounded mt-3">
              <p className="text-sm font-mono text-gray-700 mb-2">
                <strong>Constant:</strong> <code className="bg-white px-2 py-1 rounded">TYPOGRAPHY.h2</code>
              </p>
              <p className="text-sm font-mono text-gray-700 mb-2">
                <strong>Classes:</strong> <code className="bg-white px-2 py-1 rounded">{TYPOGRAPHY.h2}</code>
              </p>
              <p className="text-sm text-gray-600">
                <strong>Properties:</strong> Bold, Black-90, 1.1em line-height, -0.02em letter-spacing, 40px margin-bottom
              </p>
            </div>
          </div>
          
          <div>
            <h3 className={TYPOGRAPHY.h3}>H3 Heading</h3>
            <div className="bg-gray-50 p-4 rounded mt-3">
              <p className="text-sm font-mono text-gray-700 mb-2">
                <strong>Constant:</strong> <code className="bg-white px-2 py-1 rounded">TYPOGRAPHY.h3</code>
              </p>
              <p className="text-sm font-mono text-gray-700 mb-2">
                <strong>Classes:</strong> <code className="bg-white px-2 py-1 rounded">{TYPOGRAPHY.h3}</code>
              </p>
              <p className="text-sm text-gray-600">
                <strong>Properties:</strong> Bold, Black-90, 1.2em line-height, -0.02em letter-spacing, 40px margin-bottom
              </p>
            </div>
          </div>
          
          <div>
            <h4 className={TYPOGRAPHY.h4}>H4 Heading</h4>
            <div className="bg-gray-50 p-4 rounded mt-3">
              <p className="text-sm font-mono text-gray-700 mb-2">
                <strong>Constant:</strong> <code className="bg-white px-2 py-1 rounded">TYPOGRAPHY.h4</code>
              </p>
              <p className="text-sm font-mono text-gray-700 mb-2">
                <strong>Classes:</strong> <code className="bg-white px-2 py-1 rounded">{TYPOGRAPHY.h4}</code>
              </p>
              <p className="text-sm text-gray-600">
                <strong>Properties:</strong> Bold, Black-90, 1.2em line-height, -0.04em letter-spacing, 40px margin-bottom
              </p>
            </div>
          </div>
          
          <div>
            <h5 className={TYPOGRAPHY.h5}>H5 Heading</h5>
            <div className="bg-gray-50 p-4 rounded mt-3">
              <p className="text-sm font-mono text-gray-700 mb-2">
                <strong>Constant:</strong> <code className="bg-white px-2 py-1 rounded">TYPOGRAPHY.h5</code>
              </p>
              <p className="text-sm font-mono text-gray-700 mb-2">
                <strong>Classes:</strong> <code className="bg-white px-2 py-1 rounded">{TYPOGRAPHY.h5}</code>
              </p>
              <p className="text-sm text-gray-600">
                <strong>Properties:</strong> Bold, Black-90, 1.4em line-height, -0.04em letter-spacing, 40px margin-bottom
              </p>
            </div>
          </div>
          
          <div>
            <h6 className={TYPOGRAPHY.h6}>H6 Heading</h6>
            <div className="bg-gray-50 p-4 rounded mt-3">
              <p className="text-sm font-mono text-gray-700 mb-2">
                <strong>Constant:</strong> <code className="bg-white px-2 py-1 rounded">TYPOGRAPHY.h6</code>
              </p>
              <p className="text-sm font-mono text-gray-700 mb-2">
                <strong>Classes:</strong> <code className="bg-white px-2 py-1 rounded">{TYPOGRAPHY.h6}</code>
              </p>
              <p className="text-sm text-gray-600">
                <strong>Properties:</strong> Bold, Black-90, 1.4em line-height, -0.03em letter-spacing, 40px margin-bottom
              </p>
            </div>
          </div>

          <div>
            <div className={TYPOGRAPHY.h7}>H7 Heading</div>
            <div className="bg-gray-50 p-4 rounded mt-3">
              <p className="text-sm font-mono text-gray-700 mb-2">
                <strong>Constant:</strong> <code className="bg-white px-2 py-1 rounded">TYPOGRAPHY.h7</code>
              </p>
              <p className="text-sm font-mono text-gray-700 mb-2">
                <strong>Classes:</strong> <code className="bg-white px-2 py-1 rounded">{TYPOGRAPHY.h7}</code>
              </p>
              <p className="text-sm text-gray-600">
                <strong>Properties:</strong> Semibold, Black-90, 1.4em line-height, -0.04em letter-spacing, 40px margin-bottom
              </p>
            </div>
          </div>

          <div>
            <div className={TYPOGRAPHY.h8}>H8 Heading</div>
            <div className="bg-gray-50 p-4 rounded mt-3">
              <p className="text-sm font-mono text-gray-700 mb-2">
                <strong>Constant:</strong> <code className="bg-white px-2 py-1 rounded">TYPOGRAPHY.h8</code>
              </p>
              <p className="text-sm font-mono text-gray-700 mb-2">
                <strong>Classes:</strong> <code className="bg-white px-2 py-1 rounded">{TYPOGRAPHY.h8}</code>
              </p>
              <p className="text-sm text-gray-600">
                <strong>Properties:</strong> Medium, Black-70, 1.4em line-height, -0.03em letter-spacing, 40px margin-bottom
              </p>
            </div>
          </div>

          <div>
            <div className={TYPOGRAPHY.h9}>H9 Heading</div>
            <div className="bg-gray-50 p-4 rounded mt-3">
              <p className="text-sm font-mono text-gray-700 mb-2">
                <strong>Constant:</strong> <code className="bg-white px-2 py-1 rounded">TYPOGRAPHY.h9</code>
              </p>
              <p className="text-sm font-mono text-gray-700 mb-2">
                <strong>Classes:</strong> <code className="bg-white px-2 py-1 rounded">{TYPOGRAPHY.h9}</code>
              </p>
              <p className="text-sm text-gray-600">
                <strong>Properties:</strong> Medium, Black-90, 1.6em line-height, -0.02em letter-spacing, 40px margin-bottom
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Text Styles */}
      <section>
        <HeadingBanner>
        <h2 className={clsx(TYPOGRAPHY.h2, 'text-white-100 m-0 p-0')}>Text Styles</h2>
        </HeadingBanner>
        <div className="space-y-8">
          <div>
            <p className={TYPOGRAPHY.text20}>
              Text 20: This is body text with responsive sizing. Regular weight, black-90 color, 1.7em line-height, 0em letter-spacing, 20px margin-bottom.
            </p>
            <div className="bg-gray-50 p-4 rounded mt-3">
              <p className="text-sm font-mono text-gray-700 mb-2">
                <strong>Constant:</strong> <code className="bg-white px-2 py-1 rounded">TYPOGRAPHY.text20</code>
              </p>
              <p className="text-sm font-mono text-gray-700 mb-2">
                <strong>Classes:</strong> <code className="bg-white px-2 py-1 rounded">{TYPOGRAPHY.text20}</code>
              </p>
              <p className="text-sm text-gray-600">
                <strong>Properties:</strong> Regular, Black-90, 1.7em line-height, 0em letter-spacing, 20px margin-bottom
              </p>
            </div>
          </div>
          
          <div>
            <p className={TYPOGRAPHY.text18}>
              Text 18: This is body text with responsive sizing. Regular weight, black-90 color, 1.5em line-height, -0.02em letter-spacing, no margin-bottom.
            </p>
            <div className="bg-gray-50 p-4 rounded mt-3">
              <p className="text-sm font-mono text-gray-700 mb-2">
                <strong>Constant:</strong> <code className="bg-white px-2 py-1 rounded">TYPOGRAPHY.text18</code>
              </p>
              <p className="text-sm font-mono text-gray-700 mb-2">
                <strong>Classes:</strong> <code className="bg-white px-2 py-1 rounded">{TYPOGRAPHY.text18}</code>
              </p>
              <p className="text-sm text-gray-600">
                <strong>Properties:</strong> Regular, Black-90, 1.5em line-height, -0.02em letter-spacing, 0px margin-bottom
              </p>
            </div>
          </div>
          
          <div>
            <p className={TYPOGRAPHY.text16}>
              Text 16: This is body text with responsive sizing. Regular weight, black-90 color, 1.6em line-height, -0.02em letter-spacing, 20px margin-bottom.
            </p>
            <div className="bg-gray-50 p-4 rounded mt-3">
              <p className="text-sm font-mono text-gray-700 mb-2">
                <strong>Constant:</strong> <code className="bg-white px-2 py-1 rounded">TYPOGRAPHY.text16</code>
              </p>
              <p className="text-sm font-mono text-gray-700 mb-2">
                <strong>Classes:</strong> <code className="bg-white px-2 py-1 rounded">{TYPOGRAPHY.text16}</code>
              </p>
              <p className="text-sm text-gray-600">
                <strong>Properties:</strong> Regular, Black-90, 1.6em line-height, -0.02em letter-spacing, 20px margin-bottom
              </p>
            </div>
          </div>
          
          <div>
            <p className={TYPOGRAPHY.text14}>
              Text 14: This is small body text with responsive sizing. Medium weight, black-100 color, 1.6em line-height, 0em letter-spacing, 20px margin-bottom.
            </p>
            <div className="bg-gray-50 p-4 rounded mt-3">
              <p className="text-sm font-mono text-gray-700 mb-2">
                <strong>Constant:</strong> <code className="bg-white px-2 py-1 rounded">TYPOGRAPHY.text14</code>
              </p>
              <p className="text-sm font-mono text-gray-700 mb-2">
                <strong>Classes:</strong> <code className="bg-white px-2 py-1 rounded">{TYPOGRAPHY.text14}</code>
              </p>
              <p className="text-sm text-gray-600">
                <strong>Properties:</strong> Medium, Black-100, 1.6em line-height, 0em letter-spacing, 20px margin-bottom
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Monospace Styles */}
      <section>
        <HeadingBanner>
        <h2 className={clsx(TYPOGRAPHY.h2, 'text-white-100 m-0 p-0')}>Monospace Styles</h2>
        </HeadingBanner>
        <div className="space-y-8">
          <div>
            <div className={TYPOGRAPHY.mono24}>
              Mono 24: Code and technical text with Fragment Mono font. Regular weight, black-100 color, 1.3em line-height, 0em letter-spacing, 20px margin-bottom.
            </div>
            <div className="bg-gray-50 p-4 rounded mt-3">
              <p className="text-sm font-mono text-gray-700 mb-2">
                <strong>Constant:</strong> <code className="bg-white px-2 py-1 rounded">TYPOGRAPHY.mono24</code>
              </p>
              <p className="text-sm font-mono text-gray-700 mb-2">
                <strong>Classes:</strong> <code className="bg-white px-2 py-1 rounded">{TYPOGRAPHY.mono24}</code>
              </p>
              <p className="text-sm text-gray-600">
                <strong>Properties:</strong> Regular, Black-100, 1.3em line-height, 0em letter-spacing, 20px margin-bottom
              </p>
            </div>
          </div>
          
          <div>
            <div className={TYPOGRAPHY.mono20}>
              Mono 20: Code and technical text with Fragment Mono font. Regular weight, black-90 color, 1.5em line-height, -0.02em letter-spacing, 20px margin-bottom.
            </div>
            <div className="bg-gray-50 p-4 rounded mt-3">
              <p className="text-sm font-mono text-gray-700 mb-2">
                <strong>Constant:</strong> <code className="bg-white px-2 py-1 rounded">TYPOGRAPHY.mono20</code>
              </p>
              <p className="text-sm font-mono text-gray-700 mb-2">
                <strong>Classes:</strong> <code className="bg-white px-2 py-1 rounded">{TYPOGRAPHY.mono20}</code>
              </p>
              <p className="text-sm text-gray-600">
                <strong>Properties:</strong> Regular, Black-90, 1.5em line-height, -0.02em letter-spacing, 20px margin-bottom
              </p>
            </div>
          </div>
          
          <div>
            <div className={TYPOGRAPHY.mono18}>
              Mono 18: Code and technical text with Fragment Mono font. Regular weight, black-90 color, 1.4em line-height, -0.05em letter-spacing, 40px margin-bottom.
            </div>
            <div className="bg-gray-50 p-4 rounded mt-3">
              <p className="text-sm font-mono text-gray-700 mb-2">
                <strong>Constant:</strong> <code className="bg-white px-2 py-1 rounded">TYPOGRAPHY.mono18</code>
              </p>
              <p className="text-sm font-mono text-gray-700 mb-2">
                <strong>Classes:</strong> <code className="bg-white px-2 py-1 rounded">{TYPOGRAPHY.mono18}</code>
              </p>
              <p className="text-sm text-gray-600">
                <strong>Properties:</strong> Regular, Black-90, 1.4em line-height, -0.05em letter-spacing, 40px margin-bottom
              </p>
            </div>
          </div>
          
          <div>
            <div className={TYPOGRAPHY.mono16}>
              Mono 16: Code and technical text with Fragment Mono font. Regular weight, black-90 color, 1.4em line-height, 0em letter-spacing, no margin-bottom.
            </div>
            <div className="bg-gray-50 p-4 rounded mt-3">
              <p className="text-sm font-mono text-gray-700 mb-2">
                <strong>Constant:</strong> <code className="bg-white px-2 py-1 rounded">TYPOGRAPHY.mono16</code>
              </p>
              <p className="text-sm font-mono text-gray-700 mb-2">
                <strong>Classes:</strong> <code className="bg-white px-2 py-1 rounded">{TYPOGRAPHY.mono16}</code>
              </p>
              <p className="text-sm text-gray-600">
                <strong>Properties:</strong> Regular, Black-90, 1.4em line-height, 0em letter-spacing, 0px margin-bottom
              </p>
            </div>
          </div>
          
          <div>
            <div className={TYPOGRAPHY.mono14}>
              Mono 14: Small code and technical text with Fragment Mono font. Regular weight, black-90 color, 1.6em line-height, 0em letter-spacing, 20px margin-bottom.
            </div>
            <div className="bg-gray-50 p-4 rounded mt-3">
              <p className="text-sm font-mono text-gray-700 mb-2">
                <strong>Constant:</strong> <code className="bg-white px-2 py-1 rounded">TYPOGRAPHY.mono14</code>
              </p>
              <p className="text-sm font-mono text-gray-700 mb-2">
                <strong>Classes:</strong> <code className="bg-white px-2 py-1 rounded">{TYPOGRAPHY.mono14}</code>
              </p>
              <p className="text-sm text-gray-600">
                <strong>Properties:</strong> Regular, Black-90, 1.6em line-height, 0em letter-spacing, 20px margin-bottom
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Style */}
      <section>
        <HeadingBanner>
        <h2 className={clsx(TYPOGRAPHY.h2, 'text-white-100 m-0 p-0')}>Menu Style</h2>
        </HeadingBanner>
        <div>
          <div className={TYPOGRAPHY.menu}>
            Menu Navigation Text
          </div>
          <div className="bg-gray-50 p-4 rounded mt-3">
            <p className="text-sm font-mono text-gray-700 mb-2">
              <strong>Constant:</strong> <code className="bg-white px-2 py-1 rounded">TYPOGRAPHY.menu</code>
            </p>
            <p className="text-sm font-mono text-gray-700 mb-2">
              <strong>Classes:</strong> <code className="bg-white px-2 py-1 rounded">{TYPOGRAPHY.menu}</code>
            </p>
            <p className="text-sm text-gray-600">
              <strong>Properties:</strong> Bold, Black-80, 1.3em line-height, -0.03em letter-spacing, uppercase, 40px margin-bottom
            </p>
          </div>
        </div>
        <div>
            <div className={TYPOGRAPHY.navBar}>
              Nav Bar Item
            </div>
            <div className="bg-gray-50 p-4 rounded mt-3">
              <p className="text-sm font-mono text-gray-700 mb-2">
                <strong>Constant:</strong> <code className="bg-white px-2 py-1 rounded">TYPOGRAPHY.navBar</code>
              </p>
              <p className="text-sm font-mono text-gray-700 mb-2">
                <strong>Classes:</strong> <code className="bg-white px-2 py-1 rounded">{TYPOGRAPHY.navBar}</code>
              </p>
              <p className="text-sm text-gray-600">
                <strong>Properties:</strong> Regular, Black-90, 1.4em line-height, -0.05em letter-spacing, uppercase, 40px margin-bottom
              </p>
            </div>
          </div>
      </section>

      {/* Link Styles */}
      <section>
        <HeadingBanner>
        <h2 className={clsx(TYPOGRAPHY.h2, 'text-white-100 m-0 p-0')}>Link Styles</h2>
        </HeadingBanner>
        <div className="space-y-8">
          <div className="bg-black p-6 rounded">
            <div className="space-x-6">
              <a href="#" className={TYPOGRAPHY.linkDark}>Link Dark (Normal)</a>
              <a href="#" className={`${TYPOGRAPHY.linkDark} current`}>Link Dark (Current)</a>
            </div>
            <div className="bg-gray-800 p-4 rounded mt-3">
              <p className="text-sm font-mono text-gray-300 mb-2">
                <strong>Constant:</strong> <code className="bg-gray-900 px-2 py-1 rounded text-gray-200">TYPOGRAPHY.linkDark</code>
              </p>
              <p className="text-sm font-mono text-gray-300 mb-2">
                <strong>Classes:</strong> <code className="bg-gray-900 px-2 py-1 rounded text-gray-200">{TYPOGRAPHY.linkDark}</code>
              </p>
              <p className="text-sm text-gray-400">
                <strong>Properties:</strong> White-100, hover: Black-10, current: Black-100
              </p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 rounded">
            <div className="space-x-6">
              <a href="#" className={TYPOGRAPHY.linkLight}>Link Light (Normal)</a>
              <a href="#" className={`${TYPOGRAPHY.linkLight} current`}>Link Light (Current)</a>
            </div>
            <div className="bg-gray-100 p-4 rounded mt-3">
              <p className="text-sm font-mono text-gray-700 mb-2">
                <strong>Constant:</strong> <code className="bg-white px-2 py-1 rounded">TYPOGRAPHY.linkLight</code>
              </p>
              <p className="text-sm font-mono text-gray-700 mb-2">
                <strong>Classes:</strong> <code className="bg-white px-2 py-1 rounded">{TYPOGRAPHY.linkLight}</code>
              </p>
              <p className="text-sm text-gray-600">
                <strong>Properties:</strong> Black-70, hover: Black-40, current: Black-100
              </p>
            </div>
          </div>
          
          <div className="bg-black p-6 rounded">
            <div className="space-x-6">
              <a href="#" className={TYPOGRAPHY.linkWhiteToOrange}>White to Orange (Normal)</a>
              <a href="#" className={`${TYPOGRAPHY.linkWhiteToOrange} current`}>White to Orange (Current)</a>
            </div>
            <div className="bg-gray-800 p-4 rounded mt-3">
              <p className="text-sm font-mono text-gray-300 mb-2">
                <strong>Constant:</strong> <code className="bg-gray-900 px-2 py-1 rounded text-gray-200">TYPOGRAPHY.linkWhiteToOrange</code>
              </p>
              <p className="text-sm font-mono text-gray-300 mb-2">
                <strong>Classes:</strong> <code className="bg-gray-900 px-2 py-1 rounded text-gray-200">{TYPOGRAPHY.linkWhiteToOrange}</code>
              </p>
              <p className="text-sm text-gray-400">
                <strong>Properties:</strong> White-100, hover & current: Orange-100
              </p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 rounded">
            <div className="space-x-6">
              <a href="#" className={TYPOGRAPHY.linkOrangeToOrange}>Orange to Orange (Normal)</a>
              <a href="#" className={`${TYPOGRAPHY.linkOrangeToOrange} current`}>Orange to Orange (Current)</a>
            </div>
            <div className="bg-gray-100 p-4 rounded mt-3">
              <p className="text-sm font-mono text-gray-700 mb-2">
                <strong>Constant:</strong> <code className="bg-white px-2 py-1 rounded">TYPOGRAPHY.linkOrangeToOrange</code>
              </p>
              <p className="text-sm font-mono text-gray-700 mb-2">
                <strong>Classes:</strong> <code className="bg-white px-2 py-1 rounded">{TYPOGRAPHY.linkOrangeToOrange}</code>
              </p>
              <p className="text-sm text-gray-600">
                <strong>Properties:</strong> Orange-100, hover: underline, current: Orange-100
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Font Size Reference */}
      <section>
        <HeadingBanner>
        <h2 className={clsx(TYPOGRAPHY.h2, 'text-white-100 m-0 p-0')}>Font Size Reference</h2>
        </HeadingBanner>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-4 rounded">
            <h3 className="font-bold mb-3">Heading Sizes (px)</h3>
            <div className="text-sm space-y-1 font-mono">
              <div>H1: 50 → 100 → 160</div>
              <div>H2: 32 → 60 → 80</div>
              <div>H3: 32 → 42 → 60</div>
              <div>H4: 28 → 32 → 50</div>
              <div>H5: 24 → 32 → 48</div>
              <div>H6: 22 → 28 → 32</div>
              <div>H7: 26 → 28 → 34</div>
              <div>H8: 20 → 24 → 28</div>
              <div>H9: 18 → 18 → 24</div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded">
            <h3 className="font-bold mb-3">Text Sizes (px)</h3>
            <div className="text-sm space-y-1 font-mono">
              <div>Text 20: 18 → 20 → 20</div>
              <div>Text 18: 18 → 18 → 18</div>
              <div>Text 16: 15 → 18 → 16</div>
              <div>Text 14: 12 → 12 → 14</div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded">
            <h3 className="font-bold mb-3">Mono Sizes (px)</h3>
            <div className="text-sm space-y-1 font-mono">
              <div>Mono 24: 16 → 20 → 24</div>
              <div>Mono 20: 20 → 20 → 20</div>
              <div>Mono 18: 18 → 18 → 18</div>
              <div>Mono 16: 14 → 16 → 16</div>
              <div>Mono 14: 14 → 14 → 14</div>
              <div>Menu: 52 → 53 → 52</div>
            </div>
          </div>
        </div>
        <p className={`${TYPOGRAPHY.text14} mt-4`}>
          Format: Small (0px+) → Medium (810px+) → Large (1200px+)
        </p>
      </section>

      {/* Usage Instructions */}
      <section>
        <HeadingBanner>
        <h2 className={clsx(TYPOGRAPHY.h2, 'text-white-100 m-0 p-0')}>Usage Instructions</h2>
        </HeadingBanner>
        <div className="bg-blue-50 p-6 rounded-lg space-y-4">
          <div>
            <h3 className="font-bold text-lg mb-2">Import Typography Constants</h3>
                         <div className="bg-gray-900 p-4 rounded font-mono text-sm text-green-400">
               <div>{`// Import all constants`}</div>
               <div>import &#123; TYPOGRAPHY &#125; from &apos;@/lib/typography&apos;;</div>
               <div className="mt-2">{`// Or import specific constants`}</div>
               <div>import &#123; h1, text20, mono16 &#125; from &apos;@/lib/typography&apos;;</div>
             </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-2">Usage Examples</h3>
            <div className="bg-gray-900 p-4 rounded font-mono text-sm text-green-400 space-y-2">
              <div>&lt;h1 className=&#123;TYPOGRAPHY.h1&#125;&gt;Main Title&lt;/h1&gt;</div>
              <div>&lt;p className=&#123;TYPOGRAPHY.text20&#125;&gt;Body text&lt;/p&gt;</div>
              <div>&lt;code className=&#123;TYPOGRAPHY.mono16&#125;&gt;Code text&lt;/code&gt;</div>
              <div>&lt;nav className=&#123;TYPOGRAPHY.menu&#125;&gt;NAVIGATION&lt;/nav&gt;</div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-2">Key Benefits</h3>
            <ul className={`${TYPOGRAPHY.text16} space-y-2`}>
              <li>• <strong>Simplified Usage:</strong> Use constants instead of long responsive class strings</li>
              <li>• <strong>Type Safety:</strong> TypeScript support with TypographyKey type</li>
              <li>• <strong>Consistency:</strong> Ensures all responsive breakpoints are applied correctly</li>
              <li>• <strong>Maintainability:</strong> Central location for all typography definitions</li>
              <li>• <strong>Autocomplete:</strong> IDE support for discovering available typography options</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
} 