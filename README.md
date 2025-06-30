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

## Component Library

This project includes a comprehensive set of reusable components organized by functionality. Below is the complete documentation for each component (excluding UI components from the `ui/` folder which are chadcn components).

### Banners

#### BlockQuoteBanner

A simple banner component for displaying block quotes with animation.

**Props:**

- `quote` (string, required) - The quote text to display

**Features:**

- Responsive typography using h5 styles
- Fade-in animation from top with spring physics
- White background with proper padding

#### ConnectBanner

A call-to-action banner with primary text, key text, and a CTA button.

**Props:**

- `primary_text` (string, required) - Main heading text (h6 typography)
- `key_text` (string, required) - Key message text (h5 typography)
- `cta_label` (string, required) - Text for the CTA button
- `cta_link` (string, required) - URL for the CTA button

**Features:**

- Responsive layout (2-column desktop, centered tablet/mobile)
- Staggered animations with spring physics
- Uses PortfolioButton component with light variant
- White text on dark backgrounds

### Buttons

#### PortfolioButton

A customizable button component with multiple variants and link support.

**Props:**

- `children` (React.ReactNode, required) - Button content
- `href` (string, optional) - URL for navigation
- `variant` ('dark' | 'light', optional, default: 'dark') - Visual style variant
- `className` (string, optional) - Additional CSS classes

**Features:**

- Two variants: dark (for light backgrounds) and light (for dark backgrounds)
- Rounded design with hover effects
- Supports both link and button behavior
- Responsive typography
- Uppercase text styling

### Cards

#### ProjectCard

A card component for displaying project information with overlay content on an image.

**Props:**

- `overtitle` (string, required) - Small text above title (mono typography)
- `title` (string, required) - Main project title (h4 typography)
- `subtitle` (string, required) - Project description (text16 typography)
- `image` (string, required) - Background image URL
- `link` (string, required) - Project URL

**Features:**

- 4:3 aspect ratio
- Hover scale animation
- Dark overlay for text readability
- Staggered content animations
- Responsive image sizing

#### ThoughtCard

A card component for blog posts/thoughts with image, title, and metadata.

**Props:**

- `title` (string, required) - Article title (h6 typography)
- `publishedAt` (string, required) - Publication date
- `readingTime` (number, required) - Estimated reading time in minutes
- `image` (string, required) - Cover image URL
- `link` (string, required) - Article URL

**Features:**

- 16:9 image aspect ratio
- Hover animations (card lift, image scale)
- Metadata display (published date, reading time)
- White background with subtle shadows

#### ThoughtCardMinimal

A simplified version of ThoughtCard with minimal metadata.

**Props:**

- `title` (string, required) - Article title (h6 typography)
- `publishedAt` (string, required) - Publication date
- `image` (string, required) - Cover image URL
- `link` (string, required) - Article URL

**Features:**

- 16:9 image aspect ratio
- Simplified layout with only title and date
- Hover image scale effect
- Responsive padding

### Headings

#### MainHeading

A section heading component with title and subtitle.

**Props:**

- `title` (string, required) - Section title (h8 typography, uppercase)
- `subtitle` (string, required) - Section subtitle (h4 typography)
- `className` (string, optional) - Additional CSS classes

**Features:**

- Responsive padding (larger on desktop)
- Staggered fade-in animations
- Uses TYPOGRAPHY constants for consistent styling

### Heroes

#### MainHero

A full-screen hero component with complex layout and animations.

**Props:**

- `topText` (string, required) - Top headline text
- `bottomText` (string, required) - Bottom headline text
- `sideTextHorizontal` (string, required) - Horizontal side text
- `sideTextVertical` (string, required) - Vertical side text
- `graphic` (string, required) - SVG/PNG graphic URL
- `graphicHeight` (number, optional, default: 100) - Graphic height
- `graphicWidth` (number, optional, default: 100) - Graphic width
- `subtitle` (string, required) - Subtitle text
- `images` (string[], required) - Array of background images for carousel
- `link` (string, required) - Navigation link URL
- `video` (string, optional) - Video URL (overrides image carousel)
- `stayDuration` (number, optional, default: 4000) - Image display duration in ms
- `transitionSpeed` (number, optional, default: 1.2) - Transition speed in seconds

**Features:**

- Video or image carousel background
- Complex responsive grid layout
- Character-by-character text animations
- Scroll-triggered animations for side text
- Animated arrow button
- Different layouts for desktop, tablet, and mobile

#### MinimalHero

A simplified hero component with title, subtitle, and background image.

**Props:**

- `title` (string, required) - Hero title (h3 typography)
- `subtitle` (string, required) - Hero subtitle (text18 typography)
- `image` (string, required) - Background image URL
- `link` (string, required) - Navigation link URL

**Features:**

- Full-screen background image
- Bottom-aligned content
- Staggered animations with blur effects
- Animated arrow link

#### PhotoHero

A hero component featuring a photo alongside text content.

**Props:**

- `title` (string, required) - Hero title (h3 typography)
- `subtitle` (string, required) - Hero subtitle (text18 typography)
- `backgroundImage` (string, required) - Background image URL
- `photo` (string, required) - Featured photo URL
- `link` (string, required) - Navigation link URL

**Features:**

- Split layout (text + photo) on desktop/tablet
- Stacked layout on mobile
- Photo positioned differently per breakpoint
- Staggered animations with blur effects

#### ThoughtHero

A hero component specifically designed for blog post/thought pages.

**Props:**

- `title` (string, required) - Article title (h3 typography)
- `coverImage` (string, required) - Cover image URL
- `leftInfoLabel` (string, required) - Left metadata label
- `leftInfoValue` (string, required) - Left metadata value
- `rightInfoLabel` (string, required) - Right metadata label
- `rightInfoValue` (string, required) - Right metadata value

**Features:**

- White background design
- Metadata row with left/right information
- 16:9 cover image with rounded corners
- Staggered animations throughout

### Layout

#### Footer

A comprehensive footer component with contact info, social links, and legal pages.

**Props:**

- `heading` (string, required) - Main footer heading (h1 typography)
- `email` (string, required) - Contact email address
- `phone` (string, required) - Contact phone number
- `address` (string[], required) - Physical address lines
- `showCurrentTime` (boolean, required) - Whether to show current time
- `socialLinks` (SocialLink[], required) - Array of social media links
- `copyrightText` (string, required) - Copyright text

**SocialLink Interface:**

- `icon` (string, required) - Lucide icon name
- `label` (string, optional) - Link label
- `url` (string, required) - Link URL

**Features:**

- 4-column responsive grid
- Real-time clock display (London GMT)
- Copy-to-clipboard functionality for email/phone
- Legal links section
- Back-to-top button
- Dynamic icons for social links

#### NavBar

Currently an empty component file - no implementation yet.

### List Items

#### ProjectItem

A list item component for displaying projects in a grid layout.

**Props:**

- `label` (string, required) - Project category (mono16 typography, uppercase)
- `title` (string, required) - Project title (h7 typography)
- `description` (string, required) - Project description (text16 typography)
- `image` (string, required) - Project image URL
- `link` (string, required) - Project URL

**Features:**

- Fixed height (300px on desktop, 400px on mobile)
- 2-column grid (image + content) on desktop
- Stacked layout on mobile
- Responsive image sizing with padding

#### SkillsItem

A list item component for displaying skills and expertise areas.

**Props:**

- `title` (string, required) - Skill area title (h6 typography)
- `description` (string, required) - Skill description (text16 typography)
- `itemNumber` (number, required) - Sequential item number
- `skills` (string[], required) - Array of specific skills

**Features:**

- 70/30 column split on desktop
- Sequential numbering (/.01, /.02, etc.)
- Skills list with separators
- Spring animation on scroll into view
- Blur effect during animation

#### TestimonialItem

A list item component for displaying client testimonials.

**Props:**

- `name` (string, required) - Client name (mono18 typography, uppercase)
- `title` (string, required) - Client title/position (mono16 typography, uppercase)
- `message` (string, required) - Testimonial text (h9 typography)
- `avatar` (string, required) - Client avatar image URL

**Features:**

- Card-style design with border and shadow
- 42px circular avatar
- Flexible message area
- Clean typography hierarchy

## Component Usage Examples

```tsx
// Basic usage examples
<BlockQuoteBanner quote="Design is not just what it looks like, but how it works." />

<PortfolioButton variant="light" href="/contact">
  Get In Touch
</PortfolioButton>

<ProjectCard 
  overtitle="Web Design"
  title="Portfolio Website"
  subtitle="A modern portfolio showcasing creative work"
  image="/images/project1.jpg"
  link="/works/portfolio"
/>
```
