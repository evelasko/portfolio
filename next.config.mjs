/** @type {import('next').NextConfig} */
import createNextIntlPlugin from "next-intl/plugin";
import withMDX from "@next/mdx";

const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    remotePatterns: [{ hostname: "res.cloudinary.com" }],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  outputFileTracingIncludes: {
    "/[locale]/articles/[slug]": ["./src/content/articles/**/*"],
    "/[locale]/works/[slug]": ["./src/content/works/**/*"],
    "/[locale]/articles": ["./src/content/articles/**/*"],
    "/[locale]/works": ["./src/content/works/**/*"],
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
const withNextIntl = createNextIntlPlugin();
const withMDXPlugin = withMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});
export default withNextIntl(withMDXPlugin(nextConfig));
