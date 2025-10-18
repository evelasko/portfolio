# Article Translation Guide

This guide explains how to use the automated translation system for articles in this portfolio.

## Quick Start

To translate all missing articles from English to Spanish, simply tell Claude Code:

```
update article translations
```

or

```
translate missing articles to Spanish
```

Claude Code will automatically launch the translation agent to process all untranslated articles.

## How It Works

The translation system uses **two agents**:

### Single Article Translator
Translates ONE specific article (`.claude/agents/translate-single-article.md`)

### Translation Orchestrator
Identifies untranslated articles and calls the single-article translator for each one (`.claude/agents/article-translator.md`)

**Process:**

1. **Discovers** untranslated articles by comparing `src/content/articles/en/` with `src/content/articles/es/`
2. **For each article**, invokes the single-article translator which:
   - Reads the English article
   - Translates using DeepL AI (professional quality)
   - Preserves code blocks, MDX components, technical terms
   - Generates intelligent Spanish slug
   - Writes Spanish MDX file
   - Updates cross-references
3. **Reports** success and any failures

**Key principle:** One agent call = one article translation
This ensures **zero wasteful DeepL API calls** - each article is translated exactly once.

## Translation Process

### What Gets Translated

**Frontmatter fields:**
- `title` → Spanish title
- `description` → Spanish description
- `category` → Spanish category
- `tags` → Each tag translated individually

**Content:**
- All markdown text (headings, paragraphs, lists)
- Blockquotes
- Link text (URLs preserved)
- Image alt text

### What Gets Preserved

**Frontmatter fields:**
- `publishedAt` (same date)
- `updatedAt` (if present)
- `author` (same author)
- `featured` (same boolean)
- `draft` (same boolean)
- `coverImage` (same path)

**Content:**
- Code blocks (```language```)
- MDX components (`<Callout>`, etc.)
- URLs and links
- Technical terms (see [configuration-config.json])
- Proper nouns (names, companies)
- Markdown structure

## Configuration

### Non-Translatable Terms

Edit [translation-config.json](translation-config.json) to add/remove terms that should never be translated:

```json
{
  "nonTranslatableTerms": [
    "CENIE",
    "OpenPose",
    "MediaPipe",
    "Python",
    "React",
    ...
  ]
}
```

The agent loads this configuration before each translation run.

### Translation Settings

Current settings in `translation-config.json`:

- **Target Language:** Spanish (`es`)
- **Formality:** Default (informal/natural tone for creative content)
- **Formatting:** Preserved

## Examples

### Slug Translation

English slugs are intelligently translated to Spanish:

- `ai-as-co-choreographer` → `ia-como-co-coreografa`
- `from-stage-to-screen` → `del-escenario-a-la-pantalla`
- `building-creative-community` → `construyendo-comunidad-creativa`

### Frontmatter Example

**English:**
```yaml
---
title: "AI as Co-Choreographer: When Technology Learns to Dance"
description: "Exploring how artificial intelligence transforms..."
category: "Art + Technology"
tags: ["AI", "Dance", "Creative Technology"]
publishedAt: "2024-03-15"
author: "Enrique Velasco"
featured: false
draft: false
alternateLocales:
  es: "ia-como-co-coreografa"
---
```

**Spanish:**
```yaml
---
title: "IA como co-coreógrafa: Cuando la tecnología aprende a bailar"
description: "Explorando cómo la inteligencia artificial transforma..."
category: "Arte + Tecnología"
tags: ["AI", "Danza", "Tecnología creativa"]
publishedAt: "2024-03-15"
author: "Enrique Velasco"
featured: false
draft: false
alternateLocales:
  en: "ai-as-co-choreographer"
---
```

## Manual Translation

If you need to translate a specific article (not all missing ones):

```
translate the article "from-stage-to-screen" to Spanish
```

or translate a specific article by editing it manually and following the structure above.

## Verification

After translation, verify:

1. **File created:** Check `src/content/articles/es/{spanish-slug}.mdx` exists
2. **Frontmatter valid:** All required fields present, correct types
3. **Cross-links:** Both English and Spanish files reference each other
4. **Content quality:** Spanish reads naturally, no broken formatting
5. **Build succeeds:** Run `pnpm build` to validate MDX parsing

## Troubleshooting

### Translation Failed

If the agent reports a failed translation:

1. Check the error message in the report
2. Verify the English article has valid frontmatter
3. Look for special characters or formatting issues
4. Try translating that specific article manually
5. Report the issue if it persists

### Slug Conflicts

If a Spanish slug already exists:
- The agent will skip that article
- Check if translation already exists
- Rename existing file if needed

### DeepL API Issues

If DeepL translation fails:
- Check DeepL MCP server is running
- Verify API credentials
- Check rate limits
- Try again later

## Advanced Usage

### Batch Translate Specific Articles

Currently, the agent processes all missing translations. To translate specific articles, use the agent directly with custom parameters (advanced users).

### Custom Formality

To change translation formality, edit `translation-config.json`:

```json
{
  "translationSettings": {
    "formality": "more"  // Options: "less", "default", "more"
  }
}
```

### Re-translate Existing Article

To re-translate an already translated article:

1. Delete the Spanish version: `rm src/content/articles/es/{slug}.mdx`
2. Remove `alternateLocales.es` from English version
3. Run translation agent

## Agent Architecture

The translation agent is defined in [.claude/agents/article-translator.md](.claude/agents/article-translator.md).

**Agent type:** `general-purpose`

**Tools used:**
- Bash (file listing)
- Read (read articles and config)
- Write (create Spanish articles)
- Edit (update cross-links)
- DeepL MCP (translate content)

**Execution:** Sequential (one article at a time)

**Error handling:** Continue on failure, report at end

## Best Practices

1. **Review translations:** AI translations are high-quality but not perfect
2. **Update config:** Add new technical terms to `translation-config.json`
3. **Consistent slugs:** Let the agent generate slugs for consistency
4. **Test builds:** Run `pnpm build` after batch translations
5. **Version control:** Commit translations separately for easier review

## Future Improvements

Potential enhancements:
- Support for other target languages (French, German, etc.)
- Parallel translation with rate limiting
- Translation memory/glossary
- Preview mode (dry run)
- Selective re-translation
- Custom slug mapping

## Support

For issues or questions:
- Check [CLAUDE.md](CLAUDE.md) for project instructions
- Review [.claude/agents/article-translator.md](.claude/agents/article-translator.md) for agent details
- Ask Claude Code for help: "help with article translation"
