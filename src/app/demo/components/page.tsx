import React from 'react';

export default function ComponentsDemo() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 space-y-8">
      <h1 className="text-3xl font-bold mb-8">Font Family Debug Page</h1>
      
      {/* Test with CSS Variables */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">CSS Variable Tests</h2>
        <div style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}>
          Direct CSS Variable: Plus Jakarta Sans (--font-plus-jakarta-sans)
        </div>
        <div style={{ fontFamily: 'var(--font-fragment-mono)' }}>
          Direct CSS Variable: Fragment Mono (--font-fragment-mono)
        </div>
      </div>

      {/* Test with Tailwind Classes */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Tailwind Font Family Tests</h2>
        <div className="font-sans">
          Tailwind font-sans class
        </div>
        <div className="font-mono">
          Tailwind font-mono class
        </div>
      </div>

      {/* Test with Custom CSS Classes */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Custom Mono Class Tests</h2>
        <div className="mono-24">
          Custom mono-24 class
        </div>
        <div className="mono-20">
          Custom mono-20 class
        </div>
        <div className="mono-16">
          Custom mono-16 class
        </div>
      </div>

      {/* Show Variable Values */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">CSS Variable Values</h2>
        <div className="text-sm font-mono bg-gray-100 p-4 rounded">
          <div>--font-plus-jakarta-sans: <span id="sans-var">Loading...</span></div>
          <div>--font-fragment-mono: <span id="mono-var">Loading...</span></div>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
          // Show CSS variable values
          const computedStyle = getComputedStyle(document.documentElement);
          document.getElementById('sans-var').textContent = computedStyle.getPropertyValue('--font-plus-jakarta-sans') || 'Not defined';
          document.getElementById('mono-var').textContent = computedStyle.getPropertyValue('--font-fragment-mono') || 'Not defined';
        `
      }} />
    </div>
  );
}