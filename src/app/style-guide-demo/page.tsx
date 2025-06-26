import React from 'react';

export default function StyleGuideDemo() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 space-y-12">
      <h1 className="text-h1-s m:text-h1-m l:text-h1-l">Heading 1 (h1)</h1>
      <h2 className="text-h2-s m:text-h2-m l:text-h2-l">Heading 2 (h2)</h2>
      <h3 className="text-h3-s m:text-h3-m l:text-h3-l">Heading 3 (h3)</h3>
      <h4 className="text-h4-s m:text-h4-m l:text-h4-l">Heading 4 (h4)</h4>
      <h5 className="text-h5-s m:text-h5-m l:text-h5-l">Heading 5 (h5)</h5>
      <h6 className="text-h6-s m:text-h6-m l:text-h6-l">Heading 6 (h6)</h6>
      <div className="menu text-menu-s m:text-menu-m l:text-menu-l">Menu Example (menu)</div>

      <div>
        <div className="font-bold mb-2">Text Styles</div>
        <p className="text-20 text-20-s m:text-20-m l:text-20-l">Text 20: Responsive, Regular, black-90, 1.7em, 0em, mb-20</p>
        <p className="text-18 text-18-s m:text-18-m l:text-18-l">Text 18: Responsive, Regular, black-90, 1.5em, -0.02em, mb-0</p>
        <p className="text-16 text-16-s m:text-16-m l:text-16-l">Text 16: Responsive, Regular, black-90, 1.6em, -0.02em, mb-20</p>
        <p className="text-14 text-14-s m:text-14-m l:text-14-l">Text 14: Responsive, Medium, black-100, 1.6em, 0em, mb-20</p>
      </div>

      <div>
        <div className="font-bold mb-2">Monospace Styles</div>
        <div className="mono-24 mono mono-24-l m:mono-24-m l:mono-24-l">Mono 24: Responsive, Regular, black-100, 1.3em, 0em, mb-20</div>
        <div className="mono-20 mono mono-20-l m:mono-20-m l:mono-20-l">Mono 20: Responsive, Regular, black-90, 1.5em, -0.02em, mb-20</div>
        <div className="mono-18 mono mono-18-l m:mono-18-m l:mono-18-l">Mono 18: Responsive, Regular, black-90, 1.4em, -0.05em, mb-40</div>
        <div className="mono-16 mono mono-16-l m:mono-16-m l:mono-16-l">Mono 16: Responsive, Regular, black-90, 1.4em, 0em, mb-0</div>
        <div className="mono-14 mono mono-14-l m:mono-14-m l:mono-14-l">Mono 14: Responsive, Regular, black-90, 1.6em, 0em, mb-20</div>
      </div>

      <div>
        <div className="font-bold mb-2">Link Styles</div>
        <div className="space-x-4">
          <a href="#" className="link-dark">Link Dark</a>
          <a href="#" className="link-dark current">Link Dark (Current)</a>
          <a href="#" className="link-light">Link Light</a>
          <a href="#" className="link-light current">Link Light (Current)</a>
          <a href="#" className="link-white-to-orange">White to Orange</a>
          <a href="#" className="link-white-to-orange current">White to Orange (Current)</a>
          <a href="#" className="link-orange-to-orange">Orange to Orange</a>
          <a href="#" className="link-orange-to-orange current">Orange to Orange (Current)</a>
        </div>
      </div>
    </div>
  );
} 