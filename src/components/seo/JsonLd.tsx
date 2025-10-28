/**
 * JSON-LD Script Component
 * Renders structured data as a script tag in the page head
 */

import React from "react";

interface JsonLdProps {
  data: Record<string, unknown>;
}

/**
 * Component to render JSON-LD structured data
 * Usage: <JsonLd data={schemaObject} />
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data, null, 0),
      }}
    />
  );
}

export default JsonLd;
