# Enrique Velasco's Portfolio

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Style Guide Usage (Tailwind v4)

This project uses Tailwind CSS v4 with a custom configuration based on the style guide in `style-guide.md`.

### Typography Classes

- **Headings:** Use semantic HTML tags (`h1`-`h6`) with responsive font size classes:
  - `<h1 className="text-h1-s m:text-h1-m l:text-h1-l">Heading</h1>`
- **Text styles:** Use custom classes combined with responsive font sizes:
  - `<p className="text-20 text-20-s m:text-20-m l:text-20-l">Text</p>`
- **Monospace:** Use custom classes combined with responsive font sizes:
  - `<div className="mono-24 mono-24-s m:mono-24-m l:mono-24-l">Mono</div>`
- **Menu:** Use the menu class with responsive font sizes:
  - `<div className="menu text-menu-s m:text-menu-m l:text-menu-l">Menu</div>`

### Colors

- Use standard Tailwind color utilities:
  - `text-black-100`, `text-white-100`, `bg-orange-100`, etc.

### Links

- Use custom link classes for different styles:
  - `<a className="link-dark">Dark Link</a>`
  - `<a className="link-light">Light Link</a>`
  - `<a className="link-white-to-orange">White to Orange</a>`
  - `<a className="link-orange-to-orange">Orange to Orange</a>`

### Breakpoints

- Custom breakpoints: `m` (810px), `l` (1200px)
- Use responsive prefixes: `m:text-h1-m`, `l:text-h1-l`

### Demo Page

Visit `/style-guide-demo` to see all styles in action.

See `style-guide.md` for the complete design system specification.
