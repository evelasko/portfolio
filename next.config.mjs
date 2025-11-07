/** @type {import('next').NextConfig} */
import createNextIntlPlugin from "next-intl/plugin";
import withMDX from "@next/mdx";

const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    remotePatterns: [{ hostname: "res.cloudinary.com" }],
  },
  outputFileTracingIncludes: {
    "/[locale]/articles/[slug]": ["./src/content/articles/**/*"],
    "/[locale]/works/[slug]": ["./src/content/works/**/*"],
    "/[locale]/articles": ["./src/content/articles/**/*"],
    "/[locale]/works": ["./src/content/works/**/*"],
    "/[locale]/(legal)/privacy": ["./src/content/legal/**/*"],
    "/[locale]/(legal)/terms": ["./src/content/legal/**/*"],
    "/[locale]/(legal)/imprint": ["./src/content/legal/**/*"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");
const withMDXPlugin = withMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});
export default withNextIntl(withMDXPlugin(nextConfig));
