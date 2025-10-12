"use client";

import { TYPOGRAPHY } from "@/lib/typography";
import { JSX, useEffect, useRef, useState } from "react";
import { useLayout } from "@/contexts/LayoutContext";

export default function TypographyPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { setHeroRef, setShowNavBar, setShowFooter, setFooterVariant } =
    useLayout();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    setHeroRef(heroRef);
    setShowNavBar(true);
    setShowFooter(true);
    setFooterVariant("minimal");
  }, [setHeroRef, setShowNavBar, setShowFooter, setFooterVariant]);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const TypographyExample = ({
    label,
    constant,
    example,
    tag = "div",
  }: {
    label: string;
    constant: keyof typeof TYPOGRAPHY;
    example: string;
    tag?: string;
  }) => {
    const Tag = tag as keyof JSX.IntrinsicElements;
    const usage = `import { TYPOGRAPHY } from "@/lib/typography";\n\n<${tag} className={TYPOGRAPHY.${constant}}>${example}</${tag}>`;

    return (
      <div className="border-black-20 mb-8 border-b pb-8">
        <div className="mb-4 flex items-baseline justify-between gap-4">
          <h3 className={TYPOGRAPHY.mono16 + " text-black-70"}>{label}</h3>
          <button
            onClick={() => copyToClipboard(usage, constant)}
            className={
              TYPOGRAPHY.mono14 +
              " text-orange-100 hover:text-black-100 transition-colors"
            }
          >
            {copiedKey === constant ? "Copied!" : "Copy usage"}
          </button>
        </div>
        <Tag className={TYPOGRAPHY[constant] + " text-black-100 mb-4"}>
          {example}
        </Tag>
        <pre
          className={
            TYPOGRAPHY.mono14 +
            " bg-black-10 text-black-80 overflow-x-auto rounded p-4"
          }
        >
          <code>{usage}</code>
        </pre>
      </div>
    );
  };

  const LinkExample = ({
    label,
    constant,
  }: {
    label: string;
    constant: keyof typeof TYPOGRAPHY;
  }) => {
    const usage = `import { TYPOGRAPHY } from "@/lib/typography";\n\n<a href="#" className={TYPOGRAPHY.${constant}}>Link Text</a>`;

    return (
      <div className="border-black-20 mb-8 border-b pb-8">
        <div className="mb-4 flex items-baseline justify-between gap-4">
          <h3 className={TYPOGRAPHY.mono16 + " text-black-70"}>{label}</h3>
          <button
            onClick={() => copyToClipboard(usage, constant)}
            className={
              TYPOGRAPHY.mono14 +
              " text-orange-100 hover:text-black-100 transition-colors"
            }
          >
            {copiedKey === constant ? "Copied!" : "Copy usage"}
          </button>
        </div>
        <div
          className={
            constant === "linkDark" || constant === "linkWhiteToOrange"
              ? "bg-black-100 p-6 rounded mb-4"
              : "bg-white-96 p-6 rounded mb-4"
          }
        >
          <a href="#" className={TYPOGRAPHY[constant]}>
            Hover over this link to see the effect
          </a>
        </div>
        <pre
          className={
            TYPOGRAPHY.mono14 +
            " bg-black-10 text-black-80 overflow-x-auto rounded p-4"
          }
        >
          <code>{usage}</code>
        </pre>
      </div>
    );
  };

  return (
    <div className="bg-white-100 min-h-screen">
      <div ref={heroRef} className="bg-black-100 text-white-100 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h1 className={TYPOGRAPHY.h1 + " mb-6"}>Typography System</h1>
          <p className={TYPOGRAPHY.text20 + " text-white-96 max-w-3xl"}>
            A comprehensive responsive typography system with 9 heading levels,
            4 text sizes, 5 monospace sizes, and custom link styles. All
            typography includes built-in responsive scaling across three
            breakpoints: small (0px), medium (810px), and large (1200px).
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Usage Instructions */}
        <section className="mb-16">
          <h2 className={TYPOGRAPHY.h3 + " text-black-100 mb-6"}>How to Use</h2>
          <div className="bg-orange-100 text-white-100 rounded-lg p-8 mb-8">
            <p className={TYPOGRAPHY.text18 + " mb-4"}>
              <strong>Always use the TYPOGRAPHY constant</strong> instead of
              writing responsive classes manually. This ensures consistency and
              maintainability.
            </p>
            <pre className={TYPOGRAPHY.mono14 + " overflow-x-auto"}>
              <code>{`import { TYPOGRAPHY } from "@/lib/typography";

<h1 className={TYPOGRAPHY.h1}>Heading</h1>
<p className={TYPOGRAPHY.text18}>Body text</p>`}</code>
            </pre>
          </div>

          <div className="bg-black-10 rounded-lg p-8">
            <h3 className={TYPOGRAPHY.h6 + " text-black-100 mb-4"}>
              Responsive Behavior
            </h3>
            <ul className={TYPOGRAPHY.text16 + " text-black-80 space-y-2"}>
              <li>
                <strong className="text-black-100">Small (0px+):</strong> Mobile
                and small screens - default size
              </li>
              <li>
                <strong className="text-black-100">Medium (810px+):</strong>{" "}
                Tablets and small laptops
              </li>
              <li>
                <strong className="text-black-100">Large (1200px+):</strong>{" "}
                Desktops and large screens
              </li>
            </ul>
          </div>
        </section>

        {/* Headings */}
        <section className="mb-16">
          <h2 className={TYPOGRAPHY.h3 + " text-black-100 mb-8"}>
            Headings (H1-H9)
          </h2>
          <TypographyExample
            label="H1 - Main Hero Heading"
            constant="h1"
            example="The Quick Brown Fox"
            tag="h1"
          />
          <TypographyExample
            label="H2 - Section Heading"
            constant="h2"
            example="Jumps Over The Lazy Dog"
            tag="h2"
          />
          <TypographyExample
            label="H3 - Large Subsection"
            constant="h3"
            example="Typography Matters"
            tag="h3"
          />
          <TypographyExample
            label="H4 - Medium Subsection"
            constant="h4"
            example="Clear Visual Hierarchy"
            tag="h4"
          />
          <TypographyExample
            label="H5 - Small Subsection"
            constant="h5"
            example="Responsive Design System"
            tag="h5"
          />
          <TypographyExample
            label="H6 - Tertiary Heading"
            constant="h6"
            example="Consistent Typography"
            tag="h6"
          />
          <TypographyExample
            label="H7 - Minor Heading"
            constant="h7"
            example="Built for Scale"
            tag="h5"
          />
          <TypographyExample
            label="H8 - Small Emphasis"
            constant="h8"
            example="Professional Quality"
            tag="h6"
          />
          <TypographyExample
            label="H9 - Minimal Heading"
            constant="h9"
            example="Attention to Detail"
            tag="h6"
          />
        </section>

        {/* Body Text */}
        <section className="mb-16">
          <h2 className={TYPOGRAPHY.h3 + " text-black-100 mb-8"}>
            Body Text Sizes
          </h2>
          <TypographyExample
            label="Text 20 - Large Body Text"
            constant="text20"
            example="This is the largest body text size, perfect for introductory paragraphs and important content that needs emphasis. It maintains excellent readability with a 1.7em line height."
            tag="p"
          />
          <TypographyExample
            label="Text 18 - Standard Body Text"
            constant="text18"
            example="This is the standard body text size, ideal for most paragraph content. It provides a comfortable reading experience with balanced spacing and a 1.5em line height."
            tag="p"
          />
          <TypographyExample
            label="Text 16 - Secondary Body Text"
            constant="text16"
            example="This is the secondary body text size, useful for supporting content, captions, and less prominent information. It has a 1.6em line height for optimal readability."
            tag="p"
          />
          <TypographyExample
            label="Text 14 - Small Body Text"
            constant="text14"
            example="This is the smallest body text size with medium weight, designed for footnotes, fine print, or UI elements where space is limited but readability is still important."
            tag="p"
          />
        </section>

        {/* Monospace */}
        <section className="mb-16">
          <h2 className={TYPOGRAPHY.h3 + " text-black-100 mb-8"}>
            Monospace Sizes
          </h2>
          <TypographyExample
            label="Mono 24 - Large Code/Data"
            constant="mono24"
            example="const portfolio = { design: true, code: true };"
            tag="code"
          />
          <TypographyExample
            label="Mono 20 - Standard Code"
            constant="mono20"
            example="function calculateTotal(items) { return sum; }"
            tag="code"
          />
          <TypographyExample
            label="Mono 18 - Navigation/Menu"
            constant="mono18"
            example="ABOUT · WORK · CONTACT"
            tag="nav"
          />
          <TypographyExample
            label="Mono 16 - Small Code"
            constant="mono16"
            example="import { TYPOGRAPHY } from '@/lib/typography';"
            tag="code"
          />
          <TypographyExample
            label="Mono 14 - Tiny Code/Labels"
            constant="mono14"
            example="v2.1.0 · MIT License · 2024"
            tag="small"
          />
        </section>

        {/* Special Styles */}
        <section className="mb-16">
          <h2 className={TYPOGRAPHY.h3 + " text-black-100 mb-8"}>
            Special Styles
          </h2>
          <TypographyExample
            label="Menu - Large Navigation"
            constant="menu"
            example="PROJECTS"
            tag="div"
          />
          <TypographyExample
            label="NavBar - Header Navigation"
            constant="navBar"
            example="ABOUT · WORK · CONTACT"
            tag="nav"
          />
        </section>

        {/* Link Styles */}
        <section className="mb-16">
          <h2 className={TYPOGRAPHY.h3 + " text-black-100 mb-8"}>
            Link Styles
          </h2>
          <LinkExample
            label="Link Dark - White to Light Gray"
            constant="linkDark"
          />
          <LinkExample
            label="Link Light - Gray to Lighter Gray"
            constant="linkLight"
          />
          <LinkExample
            label="Link White to Orange - Brand Accent"
            constant="linkWhiteToOrange"
          />
          <LinkExample
            label="Link Orange to Orange - Underline Effect"
            constant="linkOrangeToOrange"
          />
        </section>

        {/* Color Reference */}
        <section className="mb-16">
          <h2 className={TYPOGRAPHY.h3 + " text-black-100 mb-8"}>
            Color Utilities
          </h2>
          <p className={TYPOGRAPHY.text18 + " text-black-80 mb-6"}>
            Typography classes do not include colors by default. Use Tailwind
            color utilities with the TYPOGRAPHY constants:
          </p>
          <div className="bg-black-10 rounded-lg p-8">
            <pre className={TYPOGRAPHY.mono14 + " overflow-x-auto"}>
              <code>{`// Black scale (10 shades)
text-black-100  // #000000
text-black-90   // #1a1a1a
text-black-80   // #333333
text-black-70   // #4d4d4d
text-black-60   // #666666
text-black-50   // #808080
text-black-40   // #999999
text-black-30   // #b3b3b3
text-black-20   // #cccccc
text-black-10   // #e6e6e6

// White scale
text-white-100  // #ffffff
text-white-98   // #fafafa
text-white-96   // #f5f5f5

// Accent
text-orange-100 // #ff4400`}</code>
            </pre>
          </div>
        </section>

        {/* Combining Example */}
        <section className="bg-black-100 text-white-100 -mx-6 px-6 py-16 rounded-lg">
          <div className="max-w-4xl mx-auto">
            <h2 className={TYPOGRAPHY.h3 + " mb-8"}>Combining Typography</h2>
            <p className={TYPOGRAPHY.text18 + " text-white-96 mb-6"}>
              Use the <code className={TYPOGRAPHY.mono16}>clsx</code> utility to
              combine typography constants with color and spacing utilities:
            </p>
            <div className="bg-white-100 text-black-100 rounded p-8 mb-6">
              <h3 className={TYPOGRAPHY.h4 + " text-orange-100 mb-4"}>
                Example Heading
              </h3>
              <p className={TYPOGRAPHY.text18 + " text-black-80 mb-4"}>
                This paragraph demonstrates combining TYPOGRAPHY constants with
                Tailwind utilities for complete control over appearance.
              </p>
              <a href="#" className={TYPOGRAPHY.linkOrangeToOrange}>
                Read More →
              </a>
            </div>
            <pre
              className={
                TYPOGRAPHY.mono14 + " bg-black-90 p-6 rounded overflow-x-auto"
              }
            >
              <code>{`import { TYPOGRAPHY } from "@/lib/typography";
import clsx from "clsx";

<h3 className={clsx(TYPOGRAPHY.h4, "text-orange-100 mb-4")}>
  Example Heading
</h3>
<p className={clsx(TYPOGRAPHY.text18, "text-black-80 mb-4")}>
  This paragraph demonstrates...
</p>
<a href="#" className={TYPOGRAPHY.linkOrangeToOrange}>
  Read More →
</a>`}</code>
            </pre>
          </div>
        </section>
      </div>
    </div>
  );
}
