# Article Category System

Centralized category management for portfolio articles with multi-locale support.

## Overview

The category system provides:
- **Consistent translations** across English and Spanish
- **Type-safe** category handling in TypeScript
- **Validation** via Zod schemas
- **Easy integration** with MDX articles and translation scripts

## File Structure

```
src/
├── content/
│   └── article-categories.json    # Category definitions (source of truth)
└── lib/
    └── categories/
        ├── index.ts               # Main utilities and helper functions
        ├── types.ts               # TypeScript type definitions
        ├── schema.json            # JSON schema for validation
        └── README.md              # This file
```

## Usage

### In TypeScript/React Components

```typescript
import {
  getCategory,
  getCategoryByKey,
  getAllCategories,
  getCategoryName
} from "@/lib/categories";

// Get category by localized name
const category = getCategory("Art + Technology");
console.log(category.getName("es")); // "Arte + Tecnología"

// Get category by key
const category = getCategoryByKey("art-technology");

// Get all categories
const categories = getAllCategories();
categories.forEach(cat => {
  console.log(`${cat.getName("en")} / ${cat.getName("es")}`);
});

// Get category name for specific locale
const spanishName = getCategoryName("art-technology", "es");
```

### In MDX Articles

Article frontmatter must use exact category names from the definitions:

```yaml
---
title: "Article Title"
category: "Art + Technology"  # Must match article-categories.json
tags: ["AI", "Dance"]
---
```

The category will be validated against the Zod schema, which pulls valid values from `article-categories.json`.

### In Translation Scripts

The Python translation script automatically loads categories:

```python
# Automatically loads from article-categories.json
# Categories are translated via lookup table (no DeepL API calls)

# English: "Art + Technology"
# Spanish: "Arte + Tecnología"  (from lookup)
```

## Adding New Categories

### 1. Add to `article-categories.json`

```json
{
  "categories": {
    "your-category-key": {
      "key": "your-category-key",
      "slug": "your-category-slug",
      "translations": {
        "en": "Your Category Name",
        "es": "Tu Categoría"
      },
      "description": "Brief description in English"
    }
  }
}
```

### 2. Update TypeScript Types

Add the new key to [types.ts](types.ts):

```typescript
export type CategoryKey =
  | "art-technology"
  | "creative-process"
  // ... existing categories
  | "your-category-key";  // Add your new category
```

### 3. Use in Articles

```yaml
---
category: "Your Category Name"  # English
# or
category: "Tu Categoría"        # Spanish
---
```

Both are valid and will be recognized.

## Category Guidelines

### Naming Conventions

- **Keys**: lowercase-with-hyphens (`art-technology`)
- **Slugs**: Same as keys, URL-safe
- **English names**: Title Case with `+` for compound categories
- **Spanish names**: Capitalize first word, use `+` for compound categories

### Examples

| Key | English | Spanish |
|-----|---------|---------|
| `art-technology` | Art + Technology | Arte + Tecnología |
| `creative-process` | Creative Process | Proceso Creativo |
| `business-strategy` | Business Strategy | Estrategia de Negocio |

### Best Practices

1. **Keep it specific but broad** - Categories should be discoverable but not too granular
2. **Avoid duplication** - Check existing categories before adding new ones
3. **Use compound categories sparingly** - Only when truly represents intersection
4. **Translate carefully** - Ensure Spanish names sound natural

## Validation

Categories are validated at multiple levels:

### 1. JSON Schema Validation

`article-categories.json` is validated against `schema.json`:
- Keys match pattern: `^[a-z][a-z0-9-]*$`
- All required fields present
- Translations exist for all supported locales

### 2. Zod Schema Validation

MDX frontmatter validation (in [src/lib/mdx/types.ts](../mdx/types.ts)):
- Category must be a valid name from `article-categories.json`
- Works for both English and Spanish names
- Provides clear error messages

### 3. Runtime Validation

Helper functions provide validation:

```typescript
import { isValidCategory, getCategory } from "@/lib/categories";

// Check if valid
if (isValidCategory("Art + Technology")) {
  // Valid category
}

// Get category (returns undefined if invalid)
const category = getCategory("Invalid Category"); // undefined
```

## API Reference

### Main Functions

#### `getCategoryByKey(key: CategoryKey): Category | undefined`

Get category by its key identifier.

```typescript
const category = getCategoryByKey("art-technology");
```

#### `getCategory(name: string): Category | undefined`

Get category by its localized name (works in any locale).

```typescript
const category = getCategory("Art + Technology");
// or
const category = getCategory("Arte + Tecnología");
```

#### `getAllCategories(): Category[]`

Get all categories.

```typescript
const categories = getAllCategories();
```

#### `getCategoryName(key: CategoryKey, locale: Locale): string`

Get the category name for a specific locale.

```typescript
const name = getCategoryName("art-technology", "es"); // "Arte + Tecnología"
```

#### `getCategoryTranslation(englishName: string, targetLocale: Locale): string | undefined`

Get translation for a category (used in translation scripts).

```typescript
const spanish = getCategoryTranslation("Art + Technology", "es");
```

#### `isValidCategory(name: string, locale?: Locale): boolean`

Check if a string is a valid category name.

```typescript
if (isValidCategory("Art + Technology")) {
  // Valid
}
```

#### `getValidCategoryNames(locale: Locale): string[]`

Get all valid category names for a locale.

```typescript
const enNames = getValidCategoryNames("en");
const esNames = getValidCategoryNames("es");
```

### Category Object

```typescript
interface Category {
  key: CategoryKey;
  slug: string;
  translations: Record<Locale, string>;
  description?: string;
  getName: (locale: Locale) => string;
  matches: (value: string) => boolean;
}
```

## Troubleshooting

### "Invalid category" validation error

**Cause**: Category name doesn't match any entry in `article-categories.json`

**Solution**: Use exact category name from the file:
```yaml
# ❌ Wrong
category: "Art and Technology"

# ✅ Correct
category: "Art + Technology"
```

### Category not found in translation

**Cause**: Category key not in lookup table

**Solution**: Add category to `article-categories.json` with both locales

### TypeScript type error with category key

**Cause**: New category added to JSON but not to TypeScript types

**Solution**: Update `CategoryKey` type in [types.ts](types.ts)

## Migration Guide

### From Free-Text Categories

If you have existing articles with free-text categories:

1. **Audit existing categories:**
   ```bash
   grep -h "^category:" src/content/articles/en/*.mdx | sort -u
   ```

2. **Map to standardized categories:**
   Create mapping of old → new categories

3. **Update `article-categories.json`:**
   Add any new categories needed

4. **Update articles:**
   ```bash
   # Use find/replace or script to update frontmatter
   ```

5. **Validate:**
   ```bash
   pnpm build  # Should fail if invalid categories remain
   ```

## Related Files

- [src/content/article-categories.json](../../content/article-categories.json) - Category definitions
- [src/lib/mdx/types.ts](../mdx/types.ts) - MDX validation with categories
- [scripts/translate_articles.py](../../../scripts/translate_articles.py) - Translation script using categories

## Future Enhancements

Potential improvements:

- **Category colors** - Add color codes for UI
- **Category icons** - Add icon identifiers
- **Category descriptions** - Localized descriptions
- **Category hierarchies** - Parent/child relationships
- **Category aliases** - Alternative names for same category

---

**Questions?** See [CLAUDE.md](../../../CLAUDE.md) for project documentation.