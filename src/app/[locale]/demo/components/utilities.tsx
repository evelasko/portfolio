import React from 'react';
import { TYPOGRAPHY } from "@/lib/typography";

export function ComponentSection({ title, children }: { title: string; children: React.ReactNode }) {
    return (
      <section className="space-y-6">
        <div className="bg-orange-600 p-4 rounded">
          <h2 className={`${TYPOGRAPHY.h3} text-white-100 m-0 p-0`}>{title}</h2>
        </div>
        {children}
      </section>
    );
  }
  
  export function CodeExample({ title, code, children }: { title: string; code: string; children: React.ReactNode }) {
    return (
      <div className="space-y-4">
        <h3 className={TYPOGRAPHY.h4}>{title}</h3>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          {/* Component Demo */}
          <div className="p-6 bg-white">
            {children}
          </div>
          
          {/* Code Display */}
          <div className="bg-gray-900 p-4">
            <div className="text-sm text-gray-400 mb-2">Code:</div>
            <pre className="text-green-400 text-sm overflow-x-auto font-mono">
              <code className="text-green-400 text-sm overflow-x-auto">{code}</code>
            </pre>
          </div>
        </div>
      </div>
    );
  }